import { Application, BackendSession, FrontendSession } from 'pinus';
import { plainToInstance } from 'class-transformer'
import { ErrorCode } from '../../../protocol/ProtocolErrorCode';
import { ProtocolLobby } from '../../../protocol/ProtocolLobby';
import { DaoUserInfo } from '../../../dao/controller/DaoUserInfo';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {
        this.app = app
    }
    /**
     * 客户端请求修改用户昵称
     * @param msg 
     * @param session 
     * @returns 
     */
    public async OnChangeNickName(msg: any, session: BackendSession) {
        //step1:检查req格式，这里用到了'class-transformer'这个库，用于检测msg是否符合ProtocolGate.Register.Request这个class结构
        let req = plainToInstance(ProtocolLobby.ChangeNickName.Request, msg)
        if (req == null) {
            let resp = new ProtocolLobby.ChangeNickName.Response()
            resp.errCode = ErrorCode.REQ_ARGS_ERR
            return resp
        }

        let resp = new ProtocolLobby.ChangeNickName.Response()
        resp.errCode = ErrorCode.SUCCEED
        return resp
    }

    public async OnGetUserInfo(msg: any, session: BackendSession) {
        let uid = Number(session.uid)
        let result = await DaoUserInfo.getUserInfo(uid)
        if (result.code != ErrorCode.SUCCEED) {
            let resp = new ProtocolLobby.GetUserInfo.Response()
            resp.errCode = result.code
            return
        }

        let resp = new ProtocolLobby.GetUserInfo.Response()
        resp.errCode = ErrorCode.SUCCEED
        resp.avatar = result.data.avatar
        resp.gender = result.data.gender
        resp.gold = result.data.gold
        resp.nickname = result.data.nickname
        return resp
    }

}


