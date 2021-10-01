
import { Channel, getLogger } from "pinus";
import { StateMachine, tFrom } from "../../util/StateMachine";
var logger = getLogger(__filename)

enum E_States { None, Wait, Send, Bet, Open, Settle }                                   //状态
enum E_Events { None2Wait, Wait2Send, Send2Bet, Bet2Open, Open2Settle, Settle2Wait, }   //状态切换事件
const stateTimeOut = { None: 5, Wait: 10, Send: 15, Bet: 10, Open: 15, Settle: 5 }      //每个状态下的时间

export class BrnnRoom {
    private timer: number = 2
    private fsm: StateMachine<E_States, E_Events>
    private listUser: Array<number>;
    private channel: Channel

    public Start(channel: Channel) {
        this.channel = channel
        const transitions = [
            tFrom(E_States.None, E_Events.None2Wait, E_States.Wait, () => { this.onStateEnter() }),
            tFrom(E_States.Wait, E_Events.Wait2Send, E_States.Send, () => { this.onStateEnter() }),
            tFrom(E_States.Send, E_Events.Send2Bet, E_States.Bet, () => { this.onStateEnter() }),
            tFrom(E_States.Bet, E_Events.Bet2Open, E_States.Open, () => { this.onStateEnter() }),
            tFrom(E_States.Open, E_Events.Open2Settle, E_States.Settle, () => { this.onStateEnter() }),
            tFrom(E_States.Settle, E_Events.Settle2Wait, E_States.Wait, () => { this.onStateEnter() }),
        ];
        //构建一个状态机
        this.fsm = new StateMachine<E_States, E_Events>(E_States.None, transitions)
        //状态机update
        setInterval(() => { this.onStateUpdate() }, 1000)
        this.listUser = new Array<number>();
        this.channel["room"] = this;
    }

    private onStateUpdate() {
        this.timer--;
        let state = this.fsm.getState()
        // logger.info("onStateUpdate, state=" + state + ",timer=" + this.timer)
        switch (state) {
            case E_States.None:
                if (this.timer <= 0 && this.fsm.can(E_Events.None2Wait)) {
                    this.fsm.dispatch(E_Events.None2Wait)
                }
                return;
            case E_States.Wait:
                if (this.timer <= 0 && this.fsm.can(E_Events.Wait2Send)) {
                    this.fsm.dispatch(E_Events.Wait2Send)
                }
                return;
            case E_States.Send:
                if (this.timer <= 0 && this.fsm.can(E_Events.Send2Bet)) {
                    this.fsm.dispatch(E_Events.Send2Bet)
                }
                return;
            case E_States.Bet:
                if (this.timer <= 0 && this.fsm.can(E_Events.Bet2Open)) {
                    this.fsm.dispatch(E_Events.Bet2Open)
                }
                return;
            case E_States.Open:
                if (this.timer <= 0 && this.fsm.can(E_Events.Open2Settle)) {
                    this.fsm.dispatch(E_Events.Open2Settle)
                }
                return;
            case E_States.Settle:
                if (this.timer <= 0 && this.fsm.can(E_Events.Settle2Wait)) {
                    this.fsm.dispatch(E_Events.Settle2Wait)
                }
                return;
        }
    }

    private onStateEnter() {
        let state = this.fsm.getState()
        if (this.channel) {
            logger.info("\n brnn.onStateEnter channel.name=" + this.channel.name+",state="+state)
            this.channel.pushMessage("brnn.onStateEnter", { gameState: state })
        }

        switch (state) {
            case E_States.None:
                this.timer = stateTimeOut.None
                return;
            case E_States.Wait:
                this.timer = stateTimeOut.Wait
                return;
            case E_States.Send:
                this.timer = stateTimeOut.Send
                return;
            case E_States.Bet:
                this.timer = stateTimeOut.Bet
                return;
            case E_States.Open:
                this.timer = stateTimeOut.Open
                return;
            case E_States.Settle:
                this.timer = stateTimeOut.Settle
                return;
        }
    }

    public onActionUserJoin(uid: number) {
        this.listUser.push(uid)
        this.channel.pushMessage("brnn.onActionUserJoin", { uid: uid });
    }
}