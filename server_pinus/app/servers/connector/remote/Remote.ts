import { Application, FrontendSession, RemoterClass } from "pinus";


declare global {
    interface UserRpc { connector: { Remote: RemoterClass<FrontendSession, Remote>; } }
}

export default (app: Application) => { return new Remote(app) }

class Remote {
    constructor(private app: Application) {

    }
}