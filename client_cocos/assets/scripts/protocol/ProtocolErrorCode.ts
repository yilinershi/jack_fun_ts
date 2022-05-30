export enum ErrorCode {
    FAIL,
    SUCCEED,
    REQ_ARGS_ERR,
    ACCOUNT_EXIST,
    DB_CON_ERR,
    DB_SAVE_ERR,
    ACCOUNT_OR_PASSWORD_ERROR,
}

export let ErrorCode2Str = (errCode: ErrorCode) => {
    switch (errCode) {
        case ErrorCode.FAIL:
            return "默认错误"
        case ErrorCode.SUCCEED:
            return "成功"
        case ErrorCode.REQ_ARGS_ERR:
            return "请求参数格式错误"
        case ErrorCode.ACCOUNT_EXIST:
            return "账号已存在"
        case ErrorCode.DB_CON_ERR:
            return "连接数据库失败"
        case ErrorCode.DB_SAVE_ERR:
            return "保存数据失败"
        case ErrorCode.ACCOUNT_OR_PASSWORD_ERROR:
            return "账号不存在或密码错误"
        default:
            break;
    }
}