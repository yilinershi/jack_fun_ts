import { Application, FrontendSession, RemoterClass } from "pinus";
import { RedisProxy } from "../../../redis/RedisProxy";


declare global {
    interface UserRpc {
        user: {
            Remote: RemoterClass<FrontendSession, Remote>;
        }
    }
}

export default function (app: Application) {
    return new Remote(app);
}

/**
 * 一切与用户相关的服务，如用户信息，货币，好友等
 */
export class Remote {
    constructor(private app: Application) {
        this.app = app;
    }

    /**
     * 获取用户信息
     * @param uid 
     * @returns 
     */
    public async GetUserInfo(uid: number) {
        let redisProxy: RedisProxy = this.app.get("redisProxy");
        let db_user_jsonString = await redisProxy.hget("db_user", uid.toString())
       
        if (db_user_jsonString != null) {
            return JSON.parse(db_user_jsonString)
        }

        return null
    }
}
