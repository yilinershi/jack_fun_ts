
import { Application, BackendSession } from 'pinus'
import { RedisProxy } from '../../../redis/redis';

export default function (app: Application) {
    return new gateHandler(app);
}

export class gateHandler {
    constructor(private app: Application) {

    }

    

    public async login(msg: { account: string, password: string }, session: BackendSession) {
        let redisProxy: RedisProxy = this.app.get("redisProxy");
        let res = await redisProxy.hget("db_account", msg.account)
        if (res == null) {
            return { code: -101, msg: '您还未注册' };
        }
        let accountInfo = JSON.parse(res);
        if (accountInfo.password != msg.password) {
            return { code: -102, msg: '密码不正确' };
        }


        return { code: 0, msg: "success", data: accountInfo };
    }

    public async register(msg: { account: string, password: string }, session: BackendSession) {
        let redisProxy: RedisProxy = this.app.get("redisProxy");
        let res = await redisProxy.hget("db_account", msg.account)
        if (res != null) {
            return { code: -103, msg: '账号已注册' };
        }
        redisProxy.hset("db_account", msg.account, JSON.stringify(msg))
        return { code: 0, msg: "success", };
    }

    

}