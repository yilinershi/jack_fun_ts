import PinusUtil from "../util/PinusUtil";
import { Session } from "./LoginModel";

export class LoginController {

    public static Init(callback?: Function) {
        PinusUtil.init('127.0.0.1', 3010)
    }

    public static reqRegister(account: string, password: string, success: Function) {

        let req = {
            account: account,
            password: password,
            nickname: "又酸又菜又多余",
            gender: 0,
            avatar: "http://this.is.avatar.url",
        }

        PinusUtil.request("connector.ConnectHandler.onRegister", req, (data: any) => {
            if (data.code == 0) {
                Session.account.account = account
                Session.account.password = password
                if (success) {
                    success()
                }
                return
            }
            console.error(data.msg)
        })
    }

    public static reqLogin(account: string, password: string, success: Function) {
        PinusUtil.request("gate.Handler.Login", { account: account, password: password }, (data: any) => {
            if (data.code == 0) {
                Session.account.account = data.resp.account.account
                Session.account.password = data.resp.account.password
                Session.account.uid = data.resp.account.uid
                Session.account.token = data.resp.account.token
                Session.host = data.resp.localConnector.host
                Session.port = data.resp.localConnector.port
                if (success) {
                    success()
                }
                return
            }
            console.error(data.msg)
        })
    }

    public static reqEnterGame(success: Function) {
        //先与gate服务器断开连接
        PinusUtil.disconnect()
        //再与connector服务器连接
        PinusUtil.init(Session.host, Session.port, () => {
            PinusUtil.request("connector.Handler.Enter", { account: Session.account.account, uid: Session.account.uid, token: Session.account.token }, (data: any) => {
                if (data.code == 0) {
                    Session.userInfo.uid = data.resp.userInfo.uid
                    Session.userInfo.sex = data.resp.userInfo.sex
                    Session.userInfo.nickName = data.resp.userInfo.nickName
                    Session.userInfo.gold = data.resp.userInfo.gold
                    Session.userInfo.avator = data.resp.userInfo.avator
                    if (success) {
                        success()
                    }
                    return
                }
                console.error(data.msg)
            })
        })
    }
}