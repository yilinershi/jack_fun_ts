import { ProRequest, ProResponse } from "./AppProtocol";

export namespace ProConnect {
    export namespace Login {
        export const RPC_REQUEST_ID = 'connector.ConnectHandler.onLogin';
        export class Request extends ProRequest {
            public account: string;
            public password: string;
            public initialization() {
                this.account = '';
                this.password = '';
            }
        }
        export class Response extends ProResponse {
            public account: string;
            public password: string;
            public nickname: string;
            public gender: number;
            public avatar: string;
            public initialization() {
                this.account = '';
                this.password = '';
                this.nickname = '';
                this.gender = 0;
                this.avatar = '';
            }
        }
    }

    export namespace Register {
        export const RPC_REQUEST_ID = 'connector.ConnectHandler.onRegister';
        export class Request extends ProRequest {
            public account: string;
            public password: string;
            public nickname: string;
            public gender: number;
            public avatar: string;
            public initialization() {
                this.account = '';
                this.password = '';
                this.nickname = '';
                this.gender = 0;
                this.avatar = '';
            }
        }
        export class Response extends ProResponse {
            public uid: number;
            public permission: number;
            public account: string;
            public password: string;
            public nickname: string;
            public gender: number;
            public avatar: string;
            public initialization() {
                this.uid = 0;
                this.permission = 0;
                this.account = '';
                this.password = '';
                this.nickname = '';
                this.gender = 0;
                this.avatar = '';
            }
        }
    }
}