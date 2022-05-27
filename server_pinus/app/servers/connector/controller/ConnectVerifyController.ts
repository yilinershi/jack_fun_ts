import { Application, ChannelService, FrontendSession, Logger, ping } from "pinus";
import { SingleBase } from "../../../base/SingleBase";
import { DaoUserAccountInfo } from "../../../dao/controller/user/DaoUserAccountInfo";
import { DbAccountInfo } from "../../../dao/model/account/DbAccountInfo";
import { AppProtocol } from "../../../protocol/AppProtocol";
import { ProConnect } from "../../../protocol/ProConnect";
import { ConnectLogger } from "../logger/ConnectLogger";

export default class ConnectVerifyController extends SingleBase {
    private mApp: Application = null;
    private mChannelService: ChannelService = null;

    public static getInstance(): ConnectVerifyController {
        return this.instance(ConnectVerifyController);
    }

    public setApplication(app: Application) {
        this.mApp = app;
        this.mChannelService = app.get('channelService');
    }

    public async onLogin(session: FrontendSession, req: ProConnect.Login.Request): Promise<ProConnect.Login.Response> {
        let dbResult = await DaoUserAccountInfo.login(req.account, req.password);
        if (dbResult.isSucceed == false) {
            return AppProtocol.response(ProConnect.Login.Response, false, dbResult.describe);
        }
        let res = AppProtocol.response(ProConnect.Login.Response, true);
        AppProtocol.copy(res, dbResult.data);
        return AppProtocol.response(ProConnect.Login.Response, true);
    }

    public async onRegister(session: FrontendSession, req: ProConnect.Register.Request): Promise<ProConnect.Register.Response> {
        let data = new DbAccountInfo;
        data.account = req.account;
        data.password = req.password;
        data.nickname = req.nickname;
        data.gender = req.gender;
        data.avatar = req.avatar;


        ConnectLogger.debug("register data ="+JSON.stringify(data))

        let dbResult = await DaoUserAccountInfo.register(data);
        if (dbResult.isSucceed == false) {
            return AppProtocol.response(ProConnect.Register.Response, false, dbResult.describe);
        }
        let res = AppProtocol.response(ProConnect.Register.Response, true);
        AppProtocol.copy(res, dbResult.data);
        return AppProtocol.response(ProConnect.Register.Response, true);
    }
}