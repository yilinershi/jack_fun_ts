import { Application, RemoterClass, FrontendSession } from 'pinus';


export default function (app: Application) {
    return new Remote(app);
}

// UserRpc的命名空间自动合并
declare global {
    interface UserRpc {
        lobby: {
            // 一次性定义一个类自动合并到UserRpc中
            lobbyRemoter: RemoterClass<FrontendSession, Remote>;
        };
    }
}


export class Remote {
    constructor(private app: Application) {
        this.app = app
    }

    /**
     *
     * @param uid
     * @param token
     */
    public async isLogin(uid: number, token: string): Promise<boolean> {
        return true
    }


}