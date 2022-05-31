import { E_GameType } from "../define/Enum"
import { Session } from "../login/LoginModel"
import { ErrorCode, ErrorCode2Str } from "../protocol/ProtocolErrorCode"
import { ProtocolLobby } from "../protocol/ProtocolLobby"
import PinusUtil from "../util/PinusUtil"

export class HallController {

    /**
     * 获取玩家信息
     */
    public static async GetUserInfo() {
        let req = new ProtocolLobby.GetUserInfo.Request()
        let resp = await PinusUtil.call<ProtocolLobby.GetUserInfo.Request, ProtocolLobby.GetUserInfo.Response>(ProtocolLobby.GetUserInfo.Router, req)
        if (resp.errCode != ErrorCode.SUCCEED) {
            console.log(ErrorCode2Str(resp.errCode))
            return
        }
        Session.userInfo.avator = resp.avatar
        Session.userInfo.nickName = resp.nickname
        Session.userInfo.gold = resp.gold
        Session.userInfo.uid = resp.uid
    }

    /**
     * 修改玩家nickname
     * @param nickName 要修改的nickname
     * @returns 
     */
    public static async ChangeNickName(nickName: string) {
        let req = new ProtocolLobby.ChangeNickName.Request()
        req.nick = nickName

        let resp = await PinusUtil.call<ProtocolLobby.ChangeNickName.Request, ProtocolLobby.ChangeNickName.Response>(ProtocolLobby.ChangeNickName.Router, req)
        if (resp.errCode != ErrorCode.SUCCEED) {
            console.log(ErrorCode2Str(resp.errCode))
            return
        }
        Session.userInfo.nickName = nickName
    }


}