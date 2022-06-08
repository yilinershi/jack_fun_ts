import { Button, Component, EditBox, find, Toggle, ToggleContainer } from "cc";
import { LobbyController } from "./LobbyController";
import { LobbyView } from "./LobbyView";



export class ChangeUserInfoView extends Component {
    public eventTarget = new EventTarget();


    private _nickNameEditBox: EditBox
    private _avatorEditBox: EditBox
    private _genderToggleGroup: ToggleContainer
    private _btnClose: Button
    private _btnChange: Button



    start() {
        this._nickNameEditBox = find("NickName",this.node).getComponent(EditBox)
        this._avatorEditBox = find("Avatar",this.node).getComponent(EditBox)
        this._genderToggleGroup = find("Gender",this.node).getComponent(ToggleContainer)
        this._btnChange = find("ButtonChange",this.node).getComponent(Button)
        this._btnClose = find("ButtonClose",this.node).getComponent(Button)


        this._btnClose.node.on('click', () => this.buttonCloseClick())
        this._btnChange.node.on('click', () => this.buttonChangeNickNameClick())
    }


    //这里只做了更换nickname, 其它的如更换性别，更换头像，类似，可自行完成
    private async buttonChangeNickNameClick(){
        await LobbyController.ChangeNickName(this._nickNameEditBox.string)
    }

    private async buttonCloseClick(){
        this.node.active=false
    }
}