import { Application, FrontendSession } from 'pinus';
import { DaoAccountInfo } from '../../../dao/controller/DaoUserAccountInfo';
import { DefServerType } from '../../../define/DefServerType';
import { AppProtocol, ErrorCode } from '../../../protocol/AppProtocol';
import { ProtocolConnect } from '../../../protocol/ProtocolConnect';
import { ConnectLogger } from '../logger/ConnectLogger';
import { plainToInstance } from 'class-transformer'

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {
        if (app.getServerType() == DefServerType.CONNECTOR) {
        }
    }

    public async OnRegister(msg: any, session: FrontendSession) {
        try {
            //step1:检查req格式，这里用到了'class-transformer'这个库，用于检测msg是否符合ProtocolConnect.Register.Request这个class结构

            let req = plainToInstance(ProtocolConnect.Register.Request, msg)
            if (req == null) {
                let resp = new ProtocolConnect.Register.Response()
                resp.errCode = ErrorCode.REQ_ARGS_ERR
                return resp
            }

            ConnectLogger.debug("register req=" + JSON.stringify(req))
            //step2:保存数据
            let dbResult = await DaoAccountInfo.register(req.account, req.password);
            if (dbResult.code != ErrorCode.SUCCEED) {
                let resp = new ProtocolConnect.Register.Response()
                resp.errCode = dbResult.code
                return resp;
            }

            //step3:回复resp
            let resp = new ProtocolConnect.Register.Response()
            resp.errCode = ErrorCode.SUCCEED
            resp.account = dbResult.data.account
            resp.avatar = dbResult.data.avatar
            resp.uid = dbResult.data.uid
            resp.gender = dbResult.data.gender
            resp.password = dbResult.data.password
            return resp
        } catch (error) {
            ConnectLogger.error(error);
        }
    }


}


