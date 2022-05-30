import { E_GameType } from "../define/Enum"
import { Session } from "../login/LoginModel"
import PinusUtil from "../util/PinusUtil"

export class HallController {

    public static JoinRoom(gameType: E_GameType, roomId: string, success?: Function) {
        let req = {
            account: Session.account.account,
            token: Session.account.token,
            uid: Session.account.uid,
            gameType: gameType,
            roomId: roomId,
        }
        PinusUtil.call("connector.Handler.JoinRoom", req, (data: any) => {
            if (data.code == 0) {
                if (success) {
                    success()
                }
                return
            }
            console.error(data.msg)
        })
    }

}