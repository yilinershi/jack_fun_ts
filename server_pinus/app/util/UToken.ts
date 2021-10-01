import * as crypto from "crypto"



export default class UToken {
    private key: string = "37725295ea78b626";                           // Buffer.from('37725295ea78b626', 'utf8');
    private iv: string = "efcf77768be478cb";                            // Buffer.from('efcf77768be478cb', 'utf8');
    private codePackageA: { account: string, timeOut: number };
    private codePackageB: { account: string, timeOut: number };

    constructor(account: string) {
        this.codePackageA = {
            account: account,
            timeOut: new Date().getTime() + 1000 * 60 * 60
        }
    }

    /**
     * 验证token是否正确
     * @returns 
     */
    public get isValid() {
        return this.codePackageA.account == this.codePackageB.account;
    }

    /**
     * 难token是否过期
     * @returns 
     */
    public get isOutOfDate() {
        if (this.codePackageA.account != this.codePackageB.account) {
            return false
        }
        let now = new Date().getTime()
        return (now > this.codePackageB.timeOut);
    }

    /**
     * 加密，加密包为账号与过期时间的jsonstring组合codePackageA
     * @returns 
     */
    public encode(): string {
        let src = JSON.stringify(this.codePackageA)
        let token: string = "";
        const cipher = crypto.createCipheriv("aes-128-cbc", this.key, this.iv);
        token += cipher.update(src, "utf8", "hex");
        token += cipher.final("hex");
        return token;
    }

    /**
     * 解密，将token解密为codePackageB
     * @returns 
     */
    public decode(sign: string) {
        let src = "";
        const cipher = crypto.createDecipheriv("aes-128-cbc", this.key, this.iv);
        src += cipher.update(sign, "hex", "utf8");
        src += cipher.final("utf8");
        let obj = JSON.parse(src)
        this.codePackageB = {
            account: obj.account,
            timeOut: obj.timeOut
        }
        return this
    }
}

