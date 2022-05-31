import { Button, Component, find, _decorator } from "cc";
import { E_GameType } from "../define/Enum";
import { HallController as LobbyController } from "./LobbyController";

const { ccclass, property } = _decorator;

@ccclass("LobbyView")
export class LobbyView extends Component {
    private _buttonDouDiZhu: Button
    private _buttonNiuNiu: Button
    private _buttonBaiJiaLe: Button

    public start(){
        this._buttonDouDiZhu = find("Button_DouDiZhu", this.node).getComponent(Button);
        this._buttonNiuNiu = find("Button_NiuNiu", this.node).getComponent(Button);
        this._buttonBaiJiaLe = find("Button_BaiJiaLe", this.node).getComponent(Button);

        this._buttonDouDiZhu.node.on('click', () => this.buttonDouDiZhuClick())
        this._buttonNiuNiu.node.on('click', () => this.buttonNiuNiuClick())
        this._buttonBaiJiaLe.node.on('click', () => this.buttonBaiJiaLeClick())

        LobbyController.GetUserInfo()
    }

    private buttonDouDiZhuClick() {
        console.log("buttonDouDiZhuClick")
    }

    private buttonNiuNiuClick() {
        console.log("buttonNiuNiuClick")
    }

    private buttonBaiJiaLeClick() {
        console.log("buttonBaiJiaLeClick")
    }




}