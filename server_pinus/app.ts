import { pinus, RESERVED, RouteRecord, FrontendOrBackendSession, HandlerCallback } from "pinus";
import { preload } from "./preload";
import * as routeUtil from "./app/util/RouteUtil";
import { RedisProxy } from "./app/redis/RedisProxy";

/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload();

function errorHandler(err: Error, msg: any, resp: any, session: FrontendOrBackendSession, cb: HandlerCallback) {
    const errMsg = `\n error serverId=${pinus.app.serverId} \n error handler msg[${JSON.stringify(msg)}] \n resp[${JSON.stringify(resp)}] ,to resolve unknown exception: sessionId:${JSON.stringify(session.export())} ,error stack: ${err.stack}`;
    console.error(errMsg);
    if (!resp) {
        resp = { code: 1003, message: errMsg };
    }
    cb(err, resp);
}

function globalErrorHandler(err: Error, msg: any, resp: any, session: FrontendOrBackendSession, cb: HandlerCallback) {
    const errMsg = `${pinus.app.serverId} globalErrorHandler msg[${JSON.stringify(msg)}] ,resp[${JSON.stringify(resp)}] ,to resolve unknown exception: sessionId:${JSON.stringify(session.export())} ,error stack: ${err.stack}`;
    console.error(errMsg);

    if (cb) {
        cb(err, resp ? resp : { code: 503, message: errMsg });
    }
}

let app = pinus.createApp();
app.set("name", "jack-fun-ts-server");

app.configure("production|development|test", "game", () => {

});

app.configure("development|production|test", "connector", () => {
    app.set("connectorConfig", {
        connector: pinus.connectors.hybridconnector,
        heartbeat: 3,
        useDict: true,
    });
});

app.configure("development|production|test", "gate", () => {
    app.set("connectorConfig", {
        connector: pinus.connectors.hybridconnector,
    });
});

app.configure("production|development|test", () => {
    app.set(RESERVED.ERROR_HANDLER, errorHandler);
    app.set(RESERVED.GLOBAL_ERROR_HANDLER, globalErrorHandler);
    app.globalAfter((err: Error, routeRecord: RouteRecord, req: any, session: FrontendOrBackendSession, resp: any, cb: HandlerCallback) => {
        console.log(`global after,err=${JSON.stringify(err)}\nrouteRecorrd=${JSON.stringify(routeRecord)}\nreq=${JSON.stringify(req)}\nresp=${JSON.stringify(resp)}`);
    });
    // route configures
    app.route("game", routeUtil.game);
});

app.configure("production|development|test", () => {
    let redisProxy = new RedisProxy();
    app.set("redisProxy", redisProxy);
})

app.start();

process.on("uncaughtException", (err) => {
    console.error(" Caught exception: " + err.stack);
});