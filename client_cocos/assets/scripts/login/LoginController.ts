import PinusUtil from "../util/PinusUtil";
import { Session } from "./LoginModel";

export class LoginController {

    public static Init(callback?: Function) {
        PinusUtil.init('127.0.0.1', 3100, () => { })
    }

    public static reqLogin(account: string, password: string, success: Function) {
        PinusUtil.request("gate.gateHandler.login", { account: account, password: password }, (resp: any) => {
            if (resp.code == 0) {
                Session.Account = resp.data.account
                Session.Password = resp.data.password
                if (success) {
                    success()
                }
                return
            }
            console.error(resp.msg)
        })
    }

    public static reqRegister(account: string, password: string, success: Function) {
        PinusUtil.request("gate.gateHandler.register", { account: account, password: password }, (resp: any) => {
            if (resp.code == 0) {
                Session.Account = resp.data.account
                Session.Password = resp.data.password
                if (success) {
                    success()
                }
                return
            }
            console.error(resp.msg)
        })
    }

}