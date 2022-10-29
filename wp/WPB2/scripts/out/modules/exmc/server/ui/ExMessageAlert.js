import { MessageFormData } from "@minecraft/server-ui";
import ExErrorQueue from "../ExErrorQueue.js";
export default class ExMessageAlert {
    constructor() {
        this._alert = new MessageFormData();
        this.buttonEvent = [() => { }, () => { }];
    }
    body(bodyText) {
        this._alert.body(bodyText);
        return this;
    }
    button1(text, fun) {
        this._alert.button1(text);
        this.buttonEvent[1] = (fun);
        return this;
    }
    button2(text, fun) {
        this._alert.button2(text);
        this.buttonEvent[0] = (fun);
        return this;
    }
    show(player) {
        this._alert.show(player).then(e => {
            if (e.canceled || !e.selection)
                return;
            this.buttonEvent[e.selection]();
        }).catch(e => ExErrorQueue.throwError(e));
        ;
        return this;
    }
    title(titleText) {
        this._alert.title(titleText);
        return this;
    }
}
//# sourceMappingURL=ExMessageAlert.js.map