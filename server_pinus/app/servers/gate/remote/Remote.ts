import { Application, RemoterClass, FrontendSession } from 'pinus';
import GateManager from '../service/GateManager';
import { GateToken } from '../service/GateToken';

export default function (app: Application) {
    return new Remote(app);
}

// UserRpc的命名空间自动合并
declare global {
    interface UserRpc {
        gate: {
            // 一次性定义一个类自动合并到UserRpc中
            Remoter: RemoterClass<FrontendSession, Remote>;
        };
    }
}


export class Remote {
    constructor(private app: Application) {

    }

    /**
     *
     * @param uid
     * @param token
     */
    public async isLogin(uid: number, token: string): Promise<boolean> {
        return GateToken.checkToken(uid, token);
    }


}