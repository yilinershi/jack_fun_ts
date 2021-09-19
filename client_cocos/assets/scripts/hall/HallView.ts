import { Button, Component, find, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass("HallView")
export class HallView extends Component {
    private _buttonDouDiZhu: Button
    private _buttonNiuNiu: Button


    public onLoad() {
        this._buttonDouDiZhu = find("Button_DouDiZhu", this.node).getComponent(Button);
        this._buttonNiuNiu = find("Button_NiuNiu", this.node).getComponent(Button);
    }

    public onEnable() {
        this._buttonDouDiZhu.node.on('click', () => { this.buttonDouDiZhuClick() })
        this._buttonNiuNiu.node.on('click', () => this.buttonNiuNiuClick())
    }

    private buttonDouDiZhuClick() {

    }

    private buttonNiuNiuClick() {

    }
}