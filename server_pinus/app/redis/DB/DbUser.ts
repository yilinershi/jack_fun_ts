import { E_Sex } from "../../internal/define/Enum"


export class DbUser{
    public uid: number
    public gold: number
    public avator: string
    public nickName: string
    public sex: E_Sex
}