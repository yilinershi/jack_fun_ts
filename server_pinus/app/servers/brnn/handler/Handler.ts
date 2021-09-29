import { Application } from "pinus";
import { BrnnRoom } from "../../../internal/brnnRoom/BrnnRoom";

export default (app: Application) => { return new Handler(app); }

 class Handler {
    constructor(private app: Application) {
       
    }


}