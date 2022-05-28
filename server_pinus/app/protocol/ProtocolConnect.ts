import { ErrorCode } from "./ProtocolErrorCode";

export namespace ProtocolConnect {
    export namespace Login {
        export const Router = 'connector.Handler.OnLogin';
        export class Request {
            public account: string;
            public password: string;
        }
        export class Response {
            public account: string;
            public password: string;
            public nickname: string;
            public gender: number;
            public avatar: string;
        }
    }

    export namespace Register {
        export const Router = 'connector.Handler.OnRegister';
        export class Request {
            public account: string;
            public password: string;
        }
        export class Response {
            public errCode: ErrorCode = ErrorCode.FAIL;
            public uid: number;
            public account: string;
            public password: string;
            public nickname: string;
            public gender: number;
            public avatar: string;
        }
    }
}