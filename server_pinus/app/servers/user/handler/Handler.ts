import { Application, FrontendSession } from "pinus";

export default function (app: Application) {
    return new Handler(app);
}

class Handler {
    constructor(private app: Application) {
        this.app = app;
    }


    /**
     *  用户修改昵称
     * @param msg 
     * @param session 
     */
    public async ChangeNickname(msg: { nickName: string }, session: FrontendSession) {


    }
}