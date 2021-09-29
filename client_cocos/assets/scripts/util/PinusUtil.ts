
const pinus: any = (window as any).pinus;

const isLog: boolean = true

export default class PinusUtil {
    public static init(host: string, port: number, callback?: Function) {
        pinus.init({ host: host, port: port, log: true, user: {} },
            (data: any) => {
                if (data) {
                    console.log(data)
                }
                if (callback) {
                    callback(data)
                }
            });
    }

    public static request(route: string, reqData: any, callback: Function) {
        if (isLog) {
            console.log("[---------------req---------------]\n[route]=" + route + "\n[data]=" + JSON.stringify(reqData));
        }
        pinus.request(route, reqData, (respData: any) => {
            if (isLog) {
                console.log("[---------------resp---------------]\n[route]=" + route + "\n[data]=" + JSON.stringify(respData));
            }
            if (callback) {
                callback(respData);
            }
        });
    }

    public static on(route: string, callBack: Function) {
        pinus.on(route, (data: any) => {
            if (isLog) {
                console.log("[route]=" + route + "\n[data]=" + JSON.stringify(data));
            }
            callBack(data)
        });
    }

    public static notify(route: string, msg: any) {
        pinus.notify(route, msg)
    }

    public static disconnect() {
        pinus.disconnect()
    }
}