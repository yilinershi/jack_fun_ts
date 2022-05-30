import moment = require("moment");
import { DaoExecute } from "../DaoExecute";
import { DbAccountInfo } from "../model/DbModel";
import { DaoTable } from "../../define/DaoTable";
import DaoManager from "../DaoManager";
import { ErrorCode } from "../../protocol/ProtocolErrorCode";

/**
* 定义一个register的db返回的数据结构
*/
interface dbRegisterResp { code: ErrorCode, data?: DbAccountInfo, }
interface dbLoginResp { code: ErrorCode, data?: DbAccountInfo, }

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




    /**
     * 登录
     * @param account 
     * @param password 
     */
    public static async login(account: string, password: string): Promise<dbLoginResp> {
        //step1:连接数据库
        let exe = new DaoExecute(DaoManager.mPool);
        let connect = await exe.startConnection();
        if (connect == false) {
            return {
                code: ErrorCode.DB_CON_ERR
            };
        }

        //step2:检测账号，密码是否正确
        let sql = `SELECT * FROM ${DaoTable.ACCOUNT_INFO} WHERE account=? and password=?`;
        let param = [account,password];
        let res = await exe.select(sql, param);
        if (res.length < 0) {
            return {
                code: ErrorCode.ACCOUNT_OR_PASSWORD_ERROR
            };
        }

         //step3:关闭数据库连接
         await exe.stopConnection();

         //step4:返回结果
         let dbResult = res[0] as DbAccountInfo
         return {
             code: ErrorCode.SUCCEED,
             data: dbResult
         }
    }
  
}