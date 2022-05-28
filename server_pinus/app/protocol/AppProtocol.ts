/**
 * 请求结果返回码
 */
export class ErrorCode {
    public static FAIL = { code: -1, msg: "默认错误" };
    public static SUCCEED = { code: 0, msg: "成功" };
    public static REQ_ARGS_ERR = { code: 1, msg: "请求参数格式错误" };
    public static ACCOUNT_EXIST = { code: 2, msg: "账号已存在" };
    public static DB_CON_ERR = { code: 3, msg: "连接数据库失败" };
    public static DB_SAVE_ERR = { code: 4, msg: "保存数据失败" };
}

/**
 * 所有请求数据的基类
 */
export abstract class RequestBase {

}

/**
 * 所有请求结果的基类
 */
export abstract class ResponseBase {
    public errCode: ErrorCode = ErrorCode.FAIL;
}

export class AppProtocol {

    /**
     * 将客户端发来的消息转换为对应的对象
     * @param arg 转换的对象
     * @param msg 消息对象
     */
    public static convert<T>(arg: T, msg: any): T {
        if (typeof arg !== 'object') return null;
        if (typeof msg !== 'object') return null;
        if (Array.isArray(arg)) {
            let arry = this.copyArray(arg, msg);
            if (arry == null) return null;
            arg = <any>arry;
            return arg;
        }
        for (let name in arg) {
            if (msg.hasOwnProperty(name)) {
                //属性成员是否是数组
                if (Array.isArray(arg[name])) {
                    let arry = this.copyArray(arg[name], msg[name])
                    if (arry == null) return null;
                    arg[name] = <any>arry;
                    //属性成员是否是object
                } else if (typeof arg[name] === 'object') {
                    arg[name] = this.convert(arg[name], msg[name]);
                    if (arg[name] === null) return null;//转换对象失败
                } else {
                    if (typeof arg[name] !== typeof msg[name]) return null;//数据类型校验
                    arg[name] = msg[name];
                }
            }
            //客户端消息缺少属性
            else if (!(arg[name] instanceof Function)) {
                return null;
            }
        }
        return arg;
    }

    protected static copyArray(arg, msg) {
        if (Array.isArray(msg) === false) return null;//客户端数据不是数组
        let argArry = <Array<any>>(<any>arg);
        let msgArry = <Array<any>>msg;
        if (argArry.length <= 0) return null;//数组定义必须初始化添加一个元素
        let arry = [];
        if (typeof argArry[0] == 'object') {
            for (let i = 0; i < msgArry.length; i++) {
                let item = this.clone(argArry[0]);
                item = this.convert(item, msgArry[i]);
                if (item === null) return null;//转换对象失败
                arry.push(item);
            }
        } else {
            for (let i = 0; i < msgArry.length; i++) {
                if (typeof argArry[0] !== typeof msgArry[i]) return null;//数据类型校验
                arry.push(msgArry[i]);
            }
        }
        return arry;
    }

    protected static clone(obj: any) {
        if (typeof obj !== 'object') throw "克隆必须是对象";
        let temp = null;
        if (obj instanceof Array) {
            temp = obj.concat();
        } else if (obj instanceof Function) {
            //函数是共享的是无所谓的，js也没有什么办法可以在定义后再修改函数内容
            temp = obj;
        } else {
            temp = new Object();
            for (let item in obj) {
                let val = obj[item];
                temp[item] = typeof val == 'object' ? this.clone(val) : val; //这里也没有判断是否为函数，因为对于函数，我们将它和一般值一样处理
            }
        }
        return temp;
    }

    /**
     * 将source和dest相同的字段复制给dest
     * @param dest 
     * @param source 
     */
    public static copy(dest: object, source: object) {
        for (const key in dest) {
            if (source.hasOwnProperty(key)) {
                dest[key] = source[key];
            }
        }
    }
}