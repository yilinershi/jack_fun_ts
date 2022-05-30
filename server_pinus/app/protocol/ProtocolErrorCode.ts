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
    public static ACCOUNT_OR_PASSWORD_ERROR = { code: 5, msg: "账号不存在或密码错误" };
}