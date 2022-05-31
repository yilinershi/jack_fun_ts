import { Button, Component, find, Label, _decorator } from "cc";
import { E_GameType } from "../define/Enum";
import { Session } from "../login/LoginModel";
import { HallController as LobbyController } from "./LobbyController";

const { ccclass, property } = _decorator;

@ccclass("LobbyView")
export class LobbyView extends Component {
    private _buttonDouDiZhu: Button
    private _buttonNiuNiu: Button
    private _buttonBaiJiaLe: Button

    private _labelNickName: Label
    private _labelId: Label
    private _labelGold: Label
    private _buttonChange: Button


    public start() {
        this._buttonDouDiZhu = find("GameList/Button_DouDiZhu", this.node).getComponent(Button);
        this._buttonNiuNiu = find("GameList/Button_NiuNiu", this.node).getComponent(Button);
        this._buttonBaiJiaLe = find("GameList/Button_BaiJiaLe", this.node).getComponent(Button);
        this._buttonChange = find("UserInfo/ButtonChange", this.node).getComponent(Button);
        this._labelNickName = find("UserInfo/NickName", this.node).getComponent(Label);
        this._labelId = find("UserInfo/Id", this.node).getComponent(Label);
        this._labelGold = find("UserInfo/Gold", this.node).getComponent(Label);

        this._buttonDouDiZhu.node.on('click', () => this.buttonDouDiZhuClick())
        this._buttonNiuNiu.node.on('click', () => this.buttonNiuNiuClick())
        this._buttonBaiJiaLe.node.on('click', () => this.buttonBaiJiaLeClick())
        this._buttonChange.node.on('click', () => this.buttonChangeNickNameClick())

        this.refreshUserInfo()
    }

    private buttonDouDiZhuClick() {

    }

    private buttonNiuNiuClick() {

    }

    private buttonBaiJiaLeClick() {

    }

    private async buttonChangeNickNameClick() {
        await LobbyController.ChangeNickName("this is new nickname")
        this.refreshNickName();
    }

    private async refreshUserInfo() {
        await LobbyController.GetUserInfo()
        this._labelId.string = 'Id:' + Session.userInfo.uid
        this._labelGold.string = '金币:' + Session.userInfo.gold
    }

    private refreshNickName() {
        this._labelNickName.string = '呢称:' + Session.userInfo.nickName
    }

}