
import { Application, BackendSession } from "pinus"
import { E_Sex } from "../../../internal/define/Enum";
import { DbAccount } from '../../../redis/db/DbAccount';
import { DbUser } from "../../../redis/db/DbUser";
import { RedisProxy } from '../../../redis/RedisProxy';
import UToken from "../../../util/UToken";

export default function (app: Application) {
    return new Handler(app);
}

class Handler {
    constructor(private app: Application) {
        this.app=app
    }

    public async Register(msg: { account: string, password: string }, session: BackendSession) {
        let redisProxy: RedisProxy = this.app.get("redisProxy");
        let res = await redisProxy.hget("db_account", msg.account)
        if (res != null) {
            return { code: -103, msg: '账号已注册' };
        }

        let uid: number = 10000
        let db_uid_info = await redisProxy.hget("db_ids", "uid")
        if (db_uid_info != null) {
            let jsonData = JSON.parse(db_uid_info);
            uid = Number(jsonData) + 1
        }
        redisProxy.hset("db_ids", "uid", uid.toString())

        //创建账户
        let dbAccount = new DbAccount()
        dbAccount.account = msg.account
        dbAccount.password = msg.password
        dbAccount.uid = uid
        redisProxy.hset("db_account", msg.account, JSON.stringify(dbAccount))

        //给新用户默认用户信息
        let dbUser = new DbUser()
        dbUser.uid = uid
        let randomIconIndex = Math.floor(Math.random() * 100)
        dbUser.avator = "default_icon_" + randomIconIndex
        dbUser.sex = E_Sex.Male
        dbUser.nickName = msg.account + "_" + uid.toString()
        dbUser.gold = 1000
        redisProxy.hset("db_user", dbUser.uid.toString(), JSON.stringify(dbUser))

        return { code: 0, msg: "success" };
    }

    public async Login(msg: { account: string, password: string }, session: BackendSession) {
        let redisProxy: RedisProxy = this.app.get("redisProxy");
        let db_account_string = await redisProxy.hget("db_account", msg.account)
        if (db_account_string == null) {
            return { code: -101, msg: '您还未注册' };
        }
        let db_account = JSON.parse(db_account_string) as DbAccount;
        if (db_account.password != msg.password) {
            return { code: -102, msg: '密码不正确' };
        }
        let connectors = this.app.getServersByType("connector");
        if (!connectors || connectors.length === 0) {
            return { code: -103, msg: "can't find connectors" };
        }

        let tokenString = new UToken(msg.account).encode();
        db_account.token = tokenString

        //随机选择一个connector
        // let randIndex = Math.floor(Math.random() * (connectors.length - 1))
        let connector = connectors[0];

        await redisProxy.hset("db_account", db_account.account, JSON.stringify(db_account))
        let resp = {
            account: db_account,
            localConnector: { id: connector.id, host: connector.host, port: connector.clientPort },
            remoteConnector: { id: connector.id, host: '127.0.0.1', port: connector.clientPort }
        }
        return { code: 0, msg: "success", resp: resp };
    }


}
