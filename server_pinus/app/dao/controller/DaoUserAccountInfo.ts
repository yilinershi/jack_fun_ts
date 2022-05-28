import { DaoExecute } from "../DaoExecute";
import { DbAccountInfo } from "../model/DbModel";
import { DaoTable } from "../../define/DaoTable";
import DaoManager from "../DaoManager";
import moment = require("moment");
import { ErrorCode } from "../../protocol/AppProtocol";

/**
* 定义一个register的db返回的数据结构
*/
interface dbRegisterResp { code: ErrorCode, data?: DbAccountInfo, }

/**
 * account相关的db逻辑
 */
export class DaoAccountInfo {
    /**
    * 注册
    * @param account 
    * @param password 
    * @returns dbRegisterResp
    */
    public static async register(account: string, password: string): Promise<dbRegisterResp> {

        //step1:连接数据库
        let exe = new DaoExecute(DaoManager.mPool);
        let connect = await exe.startConnection();
        if (connect == false) {
            return {
                code: ErrorCode.DB_CON_ERR
            };
        }

        //step2:检测账号是否已存在

        let sql1 = `SELECT ACCOUNT FROM ${DaoTable.ACCOUNT_INFO} WHERE account=?`;
        let param1 = [account];
        let res1 = await exe.select(sql1, param1);
        if (res1.length > 0) {
            return {
                code: ErrorCode.ACCOUNT_EXIST
            };
        }

        //step3:将账户信息保存到数据库
        let info: DbAccountInfo = new DbAccountInfo()
        info.account = account
        info.password = password
        info.gender = 0
        info.nickname = account
        info.avatar = ""
        info.register_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

        let sql2 = `INSERT INTO ${DaoTable.ACCOUNT_INFO}(account,password,nickname,gender,avatar,register_at) VALUES(?,?,?,?,?,?)`;
        let param2 = [info.account, info.password, info.nickname, info.gender, info.avatar, info.register_at];
        let res2 = await exe.insert(sql2, param2);
        if (res2.affectedRows <= 0) {
            return {
                code: ErrorCode.DB_CON_ERR
            };
        }

        //step4:获取账户完事信息
        let sql3 = `SELECT * FROM ${DaoTable.ACCOUNT_INFO} WHERE uid=?`
        let param3 = [res2.insertId];
        let res3 = await exe.select(sql3, param3);
        if (res3.length <= 0) {
            return {
                code: ErrorCode.DB_SAVE_ERR
            };
        }

        //step5:关闭数据库连接
        await exe.stopConnection();

        //step6:返回结果
        let dbResult = res3[0] as DbAccountInfo
        return {
            code: ErrorCode.SUCCEED,
            data: dbResult
        }

    }




    // /**
    //  * 注册
    //  * @param info 
    //  */
    // public static async register(info: DbAccountInfo): Promise<DaoResponse<DbAccountInfo>> {
    //     return await this.execute(async (exe: DaoExecute): Promise<DaoResponse<DbAccountInfo>> => {
    //         let sql = `INSERT INTO ${DefDaoTable.ACCOUNT_INFO}(account,password,nickname,gender,avatar) VALUES(?,?,?,?,?)`;
    //         DaoLogger.debug("sql= " + sql)

    //         let param = [info.account, info.password, info.nickname, info.gender, info.avatar];
    //         let res = await exe.insert(sql, param);
    //         if (res.affectedRows <= 0) {
    //             return DaoResponse.fail('注册失败');
    //         }
    //         DaoLogger.debug("写入成功")

    //         let sql2 = `SELECT * from ${DefDaoTable.ACCOUNT_INFO} WHERE uid=?`
    //         DaoLogger.debug("sql2= " + sql2)
    //         // sql = exe.format('select * from %s where uid=?', DefDaoTable.ACCOUNT_INFO);
    //         let param2 = [res.insertId];
    //         let user = await exe.select(sql2, param2);
    //         if (user.length <= 0) {
    //             return DaoResponse.fail('注册失败');
    //         }

    //         DaoLogger.debug("查成功 user= " + JSON.stringify(user[0]))
    //         return DaoResponse.succeed(user[0]);
    //     });
    // }


    // /**
    //  * 登录
    //  * @param account 
    //  * @param password 
    //  */
    // public static async login(account: string, password: string): Promise<DaoResponse<DbAccountInfo>> {
    //     return await this.execute(async (exe: DaoExecute): Promise<DaoResponse<DbAccountInfo>> => {
    //         let sql = exe.format('select * from %s where account=? and password=?', DefDaoTable.ACCOUNT_INFO);
    //         let param = [account, password];
    //         let res = await exe.select(sql, param);
    //         if (res.length <= 0) {
    //             return DaoResponse.fail('账号或密码错误');
    //         }
    //         return DaoResponse.succeed(res[0]);
    //     });
    // }
    // /**
    //  * 查询用户信息
    //  * @param uid 
    //  */
    // public static async queryAccountInfo(uid: number): Promise<DaoResponse<DbAccountInfo>> {
    //     return await this.execute(async (exe: DaoExecute): Promise<DaoResponse<DbAccountInfo>> => {
    //         let sql = exe.format('select * from %s where uid=? ', DefDaoTable.ACCOUNT_INFO);
    //         let param = [uid];
    //         let res = await exe.select(sql, param);
    //         if (res.length <= 0) {
    //             return DaoResponse.fail('操作失败');
    //         }
    //         return DaoResponse.succeed(res[0]);
    //     });
    // }
    // /**
    //  * 更新用户信息
    //  * @param uid 
    //  * @param data 
    //  */
    // public static async updateAccountInfo(uid: number, data: { [key: string]: any }): Promise<DaoResponse<boolean>> {
    //     return await this.execute(async (exe: DaoExecute): Promise<DaoResponse<boolean>> => {
    //         let sql = exe.format('update %s set ? where uid=?', DefDaoTable.ACCOUNT_INFO);
    //         let param = [data, uid];
    //         let res = await exe.update(sql, param);
    //         if (res.affectedRows <= 0) {
    //             return DaoResponse.fail('操作失败');
    //         }
    //         return DaoResponse.succeed(true);
    //     });
    // }
}