import { Button, Component, director, EditBox, find, loader, Scene, SceneAsset, _decorator } from "cc";
import PinusUtil from "../util/PinusUtil";
import { LoginController } from "./LoginController";
import { Session } from "./LoginModel";

const { ccclass, property } = _decorator;

@ccclass("LoginView")
export class LoginView extends Component {

    private _editBoxAccount: EditBox
    private _editBoxPassword: EditBox
    private _buttonRegister: Button
    private _buttonLogin: Button


    public onLoad() {
        this._editBoxAccount = find("EditBox_Account", this.node).getComponent(EditBox);
        this._editBoxPassword = find("EditBox_Password", this.node).getComponent(EditBox);
        this._buttonRegister = find("Button_Register", this.node).getComponent(Button);
        this._buttonLogin = find("Button_Login", this.node).getComponent(Button);
        LoginController.Init(() => {
            console.log("pinus init success!")
        })
    }

    public start() {
        if (localStorage.getItem("account") != null) {
            this._editBoxAccount.string = localStorage.getItem("account")
        }
        if (localStorage.getItem("password") != null) {
            this._editBoxPassword.string = localStorage.getItem("password")
        }
    }

    public onEnable() {
        this._buttonLogin.node.on('click', () => { this.buttonLoginClick() })
        this._buttonRegister.node.on('click', () => this.buttonRegisterClick())
    }

    public onDisable() {
    }

    private buttonLoginClick() {
        LoginController.reqLogin(this._editBoxAccount.string, this._editBoxPassword.string, () => {
            localStorage.setItem("account", Session.Account)
            localStorage.setItem("password", Session.Password)

            director.loadScene("hall", (err, scene) => {
                if (err != null) {
                    return
                }
                director.runScene(scene)
            })
        })
    }

    private buttonRegisterClick() {
        LoginController.reqRegister(this._editBoxAccount.string, this._editBoxPassword.string, () => {
            localStorage.setItem("account", Session.Account)
            localStorage.setItem("password", Session.Password)
        })
    }

}