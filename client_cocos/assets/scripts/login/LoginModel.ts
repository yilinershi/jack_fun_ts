

export class LoginModel {
    public Account: string
    public Password: string
    public Token: string

}

//给LoignModel起个别名，session表示连接
export let Session = new LoginModel()