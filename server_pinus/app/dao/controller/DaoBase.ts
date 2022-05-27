import { DaoExecute } from "../model/DaoExecute";
import { DaoResponse } from "../model/DaoResponse";
import { DaoLogger } from "../logger/DaoLogger";

export default abstract class DaoBase {
    protected static mPool: any = null;

    public static init(pool) {
        this.mPool = pool;
    }

    public static async execute<T>(fun: (execute: DaoExecute) => Promise<DaoResponse<T>>): Promise<DaoResponse<T>> {
        try {
            let exe = new DaoExecute(this.mPool);
            let connect = await exe.startConnection();
            if (connect == false) {
                return DaoResponse.fail<T>('get connection fail');
            }
            let result = await fun(exe);
            await exe.stopConnection();
            return result;
        } catch (error) {
            DaoLogger.error(error);
            return DaoResponse.fail<T>('dao error', error);
        }
    }

    public static async executeTransaction<T>(fun: (execute: DaoExecute) => Promise<DaoResponse<T>>): Promise<DaoResponse<T>> {
        let exe: DaoExecute = null;
        try {
            exe = new DaoExecute(this.mPool);
            let connect = await exe.startConnection();
            if (connect == false) {
                return DaoResponse.fail<T>('get connection fail');
            }
            let isOk = await exe.beginTransaction();
            if (isOk == false) {
                return DaoResponse.fail<T>('db Transaction fail');
            }
            let result = await fun(exe);
            isOk = false;
            if (result && result.isSucceed) {
                isOk = await exe.commit();
            }
            if (!isOk) {
                await exe.rollback();
            }
            await exe.stopConnection();
            return result;
        } catch (error) {
            if (exe && exe.isTransaction()) {
                await exe.rollback();
            }
            DaoLogger.error(error);
            return DaoResponse.fail<T>('dao error', error);
        }
    }
}