import { Application, RemoterClass, FrontendSession } from 'pinus';

export default function (app: Application) {
    return new ConnectRemoter(app);
}

// UserRpc的命名空间自动合并
declare global {
    interface UserRpc {
        connector: {
            // 一次性定义一个类自动合并到UserRpc中
            connectorRemoter: RemoterClass<FrontendSession, ConnectRemoter>;
        };
    }
}


export class ConnectRemoter {
    constructor(private app: Application) {
        this.app = app
    }


   
}