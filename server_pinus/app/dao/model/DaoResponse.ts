
export class DaoResponse<T>{
    public isSucceed: boolean = false;
    public data: T = null;
    public describe: string = '';
    public error: any = null;
    public static succeed<T>(result: T): DaoResponse<T> {
        let obj = new DaoResponse<T>();
        obj.isSucceed = true;
        obj.data = result;
        return obj;
    }
    public static fail<T>(describe: string, err?: any): DaoResponse<T> {
        let obj = new DaoResponse<T>();
        obj.isSucceed = false;
        obj.describe = describe;
        obj.error = err;
        return obj;
    }
}