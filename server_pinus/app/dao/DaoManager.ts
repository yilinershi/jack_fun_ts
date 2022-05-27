import { Application } from "pinus";
import DaoBase from "./controller/DaoBase";
import { DaoUserAccountInfo } from "./controller/user/DaoUserAccountInfo";
import { DbAccountInfo } from "./model/account/DbAccountInfo";
var mysql = require('mysql');

export default class DaoManager {
    private mPool: any = null;

    public constructor(app) {
        this.init(app);
    }

    public init(app: Application) {
        let mysqlConfig = app.get('mysql');
        this.mPool = mysql.createPool({
            host: mysqlConfig.host,
            user: mysqlConfig.user,
            password: mysqlConfig.password,
            database: mysqlConfig.database,
            port: mysqlConfig.port || '3306',
            charset: 'utf8mb4',
        });
        DaoBase.init(this.mPool);
    }
}
