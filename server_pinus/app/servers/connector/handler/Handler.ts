import { Application, FrontendSession } from 'pinus';
import { DaoAccountInfo } from '../../../dao/controller/DaoUserAccountInfo';
import { DefServerType } from '../../../define/DefServerType';
import { ProtocolConnect } from '../../../protocol/ProtocolConnect';
import { ConnectLogger } from '../logger/ConnectLogger';
import { plainToInstance } from 'class-transformer'
import { ErrorCode } from '../../../protocol/ProtocolErrorCode';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {
        if (app.getServerType() == DefServerType.CONNECTOR) {

        }
    }

    public async OnAuth(msg: any, session: FrontendSession) {
        let req = plainToInstance(ProtocolConnect.Auth.Request, msg)
        if (req == null) {
            let resp = new ProtocolConnect.Auth.Response()
            resp.errCode = ErrorCode.REQ_ARGS_ERR
            return resp
        }

        let res = await this.app.rpc.gate.Remoter.isLogin.route(session)(req.uid, req.token)


        let resp = new ProtocolConnect.Auth.Response()
        resp.errCode = ErrorCode.SUCCEED
        return resp
    }
}


