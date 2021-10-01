import { Application, FrontendSession } from "pinus";
import GameConfig from "../../../internal/define/Config";
import { E_GameType } from "../../../internal/define/Enum";
import UToken from "../../../util/UToken";

export default (app: Application) => { return new Handler(app); }

class Handler {
    constructor(private app: Application) {
        this.app = app;
    }

    public async Enter(msg: { account: string, token: string, uid: number }, session: FrontendSession) {
        let uToken = new UToken(msg.account).decode(msg.token);
        let sessionService = this.app.get("sessionService");
        if (uToken.isValid == false) {
            sessionService.kickBySessionId(session.id);
            return { code: -102, msg: "无效的token" }
        }

        let userInfo = await this.app.rpc.user.Remote.GetUserInfo.route(session)(msg.uid)
        let resp = {
            gameInfo: GameConfig.GameInfo,
            userInfo: userInfo
        }
        return { code: 0, msg: "success", resp: resp }
    }


    public async JoinRoom(msg: { account: string, token: string, uid: number, gameType: E_GameType, roomId: string }, session: FrontendSession) {
        let uToken = new UToken(msg.account).decode(msg.token);
        let sessionService = this.app.get("sessionService");
        if (uToken.isValid == false) {
            sessionService.kickBySessionId(session.id);
            return { code: -102, msg: "无效的token" }
        }

        switch (msg.gameType) {
            case E_GameType.Brnn:
                {
                    let rid = msg.roomId;
                    let uid = msg.uid.toString()
                    let serverId: string = this.app.get("serverId")

                    if (!sessionService.getByUid(uid)) {
                        session.bind(uid, (err: Error, result) => {
                            if (err) {
                                console.log("session bind success");
                            }
                        });
                        session.set("rid", rid);
                        session.push("rid", (err: Error) => {
                            if (err) {
                                console.error("set rid for session service fail! error:", err)
                            }
                        });
                        session.on("closed", () => {
                            let remoteMsg = {
                                userId: msg.uid,
                                serverId: serverId,
                                roomId: rid
                            }
                            this.app.rpc.brnn.Remote.RoomExit.route(session)(remoteMsg)
                        });
                    }

                    if (serverId) {
                        let remoteMsg = {
                            userId: msg.uid,
                            serverId: serverId,
                            roomId: msg.roomId
                        }
                        let resp = await this.app.rpc.brnn.Remote.RoomJoin.route(session)(remoteMsg);
                        return resp
                    }
                }
                break;
        }
    }
}