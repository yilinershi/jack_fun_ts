import { RequestBase, ResponseBase } from "./AppProtocol";

export namespace ProtocolConnect {
    export namespace Login {
        export const Router = 'connector.Handler.OnLogin';
        export class Request extends RequestBase {
            public account: string;
            public password: string;
        }
        export class Response extends ResponseBase {
            public account: string;
            public password: string;
            public nickname: string;
            public gender: number;
            public avatar: string;
        }
    }

    export namespace Register {
        export const Router = 'connector.Handler.OnRegister';
        export class Request extends RequestBase {
            public account: string;
            public password: string;
        }
        export class Response extends ResponseBase {
            public uid: number;
            public account: string;
            public password: string;
            public nickname: string;
            public gender: number;
            public avatar: string;
        }
    }
}