import { Button, Component, find, game, Label, SystemEvent, _decorator } from "cc";
import { E_GameType } from "../define/Enum";
import EventBus from "../define/EventBus";
import { Session } from "../login/LoginModel";
import { ChangeUserInfoView } from "./ChangeUserInfoView";
import { LobbyController as LobbyController } from "./LobbyController";

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
    private changeUserInfo: ChangeUserInfoView

    //生命周期函数
    public onLoad() {
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

        this.changeUserInfo = find("ChangeUserInfo", this.node).addComponent(ChangeUserInfoView);
        this.changeUserInfo.node.active = false
    }

    //生命周期函数
    public onEnable() {
        EventBus.eventTarget.addEventListener("LobbyView.refreshNickName", () => this.refreshNickName())
        EventBus.eventTarget.addEventListener("LobbyView.refreshUserInfo", () => this.refreshUserInfo())
    }

    //生命周期函数
    public start() {
        LobbyController.Start();
    }

    //生命周期函数
    public onDisable() {
        EventBus.eventTarget.removeEventListener("LobbyView.refreshNickName", () => this.refreshNickName())
        EventBus.eventTarget.removeEventListener("LobbyView.refreshUserInfo", () => this.refreshUserInfo())
    }

    private buttonDouDiZhuClick() {

    }

    private buttonNiuNiuClick() {

    }

    private buttonBaiJiaLeClick() {

    }

    private async buttonChangeNickNameClick() {
        this.changeUserInfo.node.active = true
    }

    private async refreshUserInfo() {

        console.log("refreshUserInfo")

        this.refreshNickName();
        this.refreshId();
        this.refreshGold();

        //todo refreshAvatar()  refreshGender()
    }

    public refreshNickName() {
        this._labelNickName.string = '呢称:' + Session.userInfo.nickName
    }

    public refreshGold() {
        this._labelGold.string = '金币:' + Session.userInfo.gold
    }

    public refreshId() {
        this._labelId.string = 'Id:' + Session.userInfo.uid
    }
}