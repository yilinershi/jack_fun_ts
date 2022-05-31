import { Application, FrontendSession } from 'pinus';
import { ProtocolConnector } from '../../../protocol/ProtocolConnector';
import { ConnectLogger } from '../logger/ConnectLogger';
import { plainToInstance } from 'class-transformer'
import { ErrorCode } from '../../../protocol/ProtocolErrorCode';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {
        this.app = app
    }

    /**
     * 验证权限，由于登录是在gate服务器上完成的，这里需要验证一下是否登录过
     * @param msg 
     * @param session 
     * @returns 
     */
    public async OnAuth(msg: any, session: FrontendSession) {
        let req = plainToInstance(ProtocolConnector.Auth.Request, msg)
        if (req == null) {
            let resp = new ProtocolConnector.Auth.Response()
            resp.errCode = ErrorCode.REQ_ARGS_ERR
            return resp
        }
        let sessionService = this.app.get("sessionService");


        // ConnectLogger.error("````````````````````````````````")
        // ConnectLogger.error(rpcFunc)
        // ConnectLogger.error("````````````````````````````````")

        //向gate服务器发送一条rpc消息，检查是否登录过
        let isLogin = await this.app.rpc.gate.Remote.isLogin.route(session)(req.uid, req.token)

        if (isLogin == false) {
            ConnectLogger.debug("is login == false")


            let resp = new ProtocolConnector.Auth.Response()
            resp.errCode = ErrorCode.AUTH_ERR

            //token错误，服务器断开连接,这里可以先踢人再返回resp的原因是，该方法会在下一个tick执行
            sessionService.kickBySessionId(session.id);
            return resp
        }

        //token正确，则绑定session和uid
        if (!sessionService.getByUid(req.uid.toString())) {
            session.bind(req.uid.toString(), (err: Error, result) => {
                if(err){
                    ConnectLogger.info("session bind token id error: ", err.stack);
                    return
                }
                ConnectLogger.info("session bind uid success!");
            });
            session.on("closed", (session: FrontendSession) => {
                //玩家断开连接事件
                ConnectLogger.debug(`玩家断开连接,uid= ${session.uid}`)
            });
        }

        let resp = new ProtocolConnector.Auth.Response()
        resp.errCode = ErrorCode.SUCCEED
        return resp
    }

}


