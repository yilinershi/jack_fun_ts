import { Application, Channel, ChannelService, FrontendSession, RemoterClass } from "pinus";
import { BrnnRoom } from "../../../internal/brnnRoom/BrnnRoom";


declare global {
    interface UserRpc {
        brnn: {
            Remote: RemoterClass<FrontendSession, Remote>;
        }
    }
}

export default function (app: Application) {
    return new Remote(app);
}

/**
 * 一切与用户相关的服务，如用户信息，货币，好友等
 */
class Remote {
    private channelService: ChannelService;
    private channel: Channel
    constructor(private app: Application) {
        this.app = app;
        this.channelService = this.app.get("channelService");
        let room = new BrnnRoom()
        let roomId = "brnn_1"
        this.channel = this.channelService.createChannel(roomId);
        room.Start(this.channel)
    }

    /**
     * 房间进入玩家
     */
    public async RoomJoin(msg: { userId: number, serverId: string, roomId: string }) {
        if (msg.roomId == this.channel.name) {
            this.channel.add(msg.userId.toString(), msg.serverId);
            let room: BrnnRoom = this.channel["room"]
            room.onActionUserJoin(msg.userId);
            return { code: 0, msg: "加入房间成功" }
        }
        return { code: -110, msg: "房间不存在" }
    }
}
