
const pinus: any = (window as any).pinus;
export default class PinusUtil {
    public static init(host: string, port: number, callback: Function) {
        pinus.init({ host: host, port: port, log: true }, () => {
            if (callback != undefined) {
                callback()
            }
        });
    }

    public static request(route: string, body: any, callback: Function) {
        pinus.request(route, body, (data: any) => {
            if (callback) {
                callback(data);
            }
        });
    }

    public static on(event: string, callBack: Function) {
        pinus.on(event, callBack);
    }

    public static once(event: string, callBack: Function) {
        pinus.once(event, callBack);
    }

    public static off(event: string, callBack: Function) {
        pinus.off(event, callBack);
    }

}