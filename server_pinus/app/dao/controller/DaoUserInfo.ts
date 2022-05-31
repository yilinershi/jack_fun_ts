import moment = require("moment");
import { DaoExecute } from "../DaoExecute";
import { DbAccountInfo, DbUserInfo } from "../model/DbModel";
import { DaoTable } from "../../define/DaoTable";
import DaoManager from "../DaoManager";
import { ErrorCode } from "../../protocol/ProtocolErrorCode";


interface dbGetUserInfoResp { code: ErrorCode, data?: DbUserInfo}

export class DaoUserInfo{

     /**
    * 获取用户个人信息
    * @param uid 用户uid
    */
      public static async getUserInfo(uid: number): Promise<dbGetUserInfoResp> {
        //step1:连接数据库
        let exe = new DaoExecute(DaoManager.mPool);
        let connect = await exe.startConnection();
        if (connect == false) {
            return {
                code: ErrorCode.DB_CON_ERR
            };
        }

        //step2:查看用户数据
        let sql = `SELECT * FROM ${DaoTable.USER_INFO} WHERE uid=?`
        let param = [uid];
        let res = await exe.select(sql, param);
        if (res.length <= 0) {
            return {
                code: ErrorCode.USER_UN_EXIST 
            };
        }

        //step3:关闭数据库连接
        await exe.stopConnection();

        //step4:返回结果
        let dbResult = res[0] as DbUserInfo
        return {
            code: ErrorCode.SUCCEED,
            data: dbResult
        }
    }
}