import { ErrorCode } from "./ProtocolErrorCode";

export namespace ProtocolLobby {
    export namespace ChangeNickName {
        export const Router = 'lobby.Handler.OnChangeNickName';
        export class Request {
            public uid: number;
            public nick: string;
        }

        export class Response {
            public errCode: ErrorCode;
        }
    }

    export namespace GetUserInfo {
        export const Router = 'lobby.Handler.OnGetUserInfo';
        export class Request {

        }

        export class Response {
            public errCode: ErrorCode;
            public nickname: string;
            public gender: number;
            public avatar: string;
            public gold: number
        }
    }
}