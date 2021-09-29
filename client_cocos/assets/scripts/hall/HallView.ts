import { Button, Component, find, _decorator } from "cc";
import { E_GameType } from "../define/Enum";
import { HallController } from "./HallController";

const { ccclass, property } = _decorator;

@ccclass("HallView")
export class HallView extends Component {
    private _buttonDouDiZhu: Button
    private _buttonNiuNiu: Button
    private _buttonBaiJiaLe: Button


    public onLoad() {
        console.log("HallView onLoad")
        this._buttonDouDiZhu = find("Button_DouDiZhu", this.node).getComponent(Button);
        this._buttonNiuNiu = find("Button_NiuNiu", this.node).getComponent(Button);
        this._buttonBaiJiaLe = find("Button_BaiJiaLe", this.node).getComponent(Button);
    }

    public onEnable() {
        this._buttonDouDiZhu.node.on('click', () => { this.buttonDouDiZhuClick() })
        this._buttonNiuNiu.node.on('click', () => this.buttonNiuNiuClick())
        this._buttonBaiJiaLe.node.on('click', () => this.buttonBaiJiaLeClick())
    }

    private buttonDouDiZhuClick() {
        console.log("buttonDouDiZhuClick")
    }

    private buttonNiuNiuClick() {
        console.log("buttonNiuNiuClick")
        HallController.JoinRoom(E_GameType.Brnn, "brnn_1")
    }

    private buttonBaiJiaLeClick() {
        console.log("buttonBaiJiaLeClick")
    }
}