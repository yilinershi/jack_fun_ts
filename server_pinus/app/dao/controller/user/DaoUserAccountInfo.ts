import DaoBase from "../DaoBase";
import { DaoExecute } from "../../model/DaoExecute";
import { DaoResponse } from "../../model/DaoResponse";
import { DbAccountInfo } from "../../model/account/DbAccountInfo";
import { DefDaoTable } from "../../../define/DefDaoTable";
import { DaoLogger } from "../../logger/DaoLogger";

export class DaoUserAccountInfo extends DaoBase {
    /**
     * 注册
     * @param info 
     */
    public static async register(info: DbAccountInfo): Promise<DaoResponse<DbAccountInfo>> {
        return await this.execute(async (exe: DaoExecute): Promise<DaoResponse<DbAccountInfo>> => {
            let sql = `INSERT INTO ${DefDaoTable.ACCOUNT_INFO}(account,password,nickname,gender,avatar) VALUES(?,?,?,?,?)`;
            DaoLogger.debug("sql= " + sql)

            let param = [info.account, info.password, info.nickname, info.gender, info.avatar];
            let res = await exe.insert(sql, param);
            if (res.affectedRows <= 0) {
                return DaoResponse.fail('注册失败');
            }
            DaoLogger.debug("写入成功")

            let sql2 = `SELECT * from ${DefDaoTable.ACCOUNT_INFO} WHERE uid=?`
            DaoLogger.debug("sql2= " + sql2)
            // sql = exe.format('select * from %s where uid=?', DefDaoTable.ACCOUNT_INFO);
            let param2 = [res.insertId];
            let user = await exe.select(sql2, param2);
            if (user.length <= 0) {
                return DaoResponse.fail('注册失败');
            }

            DaoLogger.debug("查成功 user= " + JSON.stringify(user[0]))
            return DaoResponse.succeed(user[0]);
        });
    }
    /**
     * 登录
     * @param account 
     * @param password 
     */
    public static async login(account: string, password: string): Promise<DaoResponse<DbAccountInfo>> {
        return await this.execute(async (exe: DaoExecute): Promise<DaoResponse<DbAccountInfo>> => {
            let sql = exe.format('select * from %s where account=? and password=?', DefDaoTable.ACCOUNT_INFO);
            let param = [account, password];
            let res = await exe.select(sql, param);
            if (res.length <= 0) {
                return DaoResponse.fail('账号或密码错误');
            }
            return DaoResponse.succeed(res[0]);
        });
    }
    /**
     * 查询用户信息
     * @param uid 
     */
    public static async queryAccountInfo(uid: number): Promise<DaoResponse<DbAccountInfo>> {
        return await this.execute(async (exe: DaoExecute): Promise<DaoResponse<DbAccountInfo>> => {
            let sql = exe.format('select * from %s where uid=? ', DefDaoTable.ACCOUNT_INFO);
            let param = [uid];
            let res = await exe.select(sql, param);
            if (res.length <= 0) {
                return DaoResponse.fail('操作失败');
            }
            return DaoResponse.succeed(res[0]);
        });
    }
    /**
     * 更新用户信息
     * @param uid 
     * @param data 
     */
    public static async updateAccountInfo(uid: number, data: { [key: string]: any }): Promise<DaoResponse<boolean>> {
        return await this.execute(async (exe: DaoExecute): Promise<DaoResponse<boolean>> => {
            let sql = exe.format('update %s set ? where uid=?', DefDaoTable.ACCOUNT_INFO);
            let param = [data, uid];
            let res = await exe.update(sql, param);
            if (res.affectedRows <= 0) {
                return DaoResponse.fail('操作失败');
            }
            return DaoResponse.succeed(true);
        });
    }
}