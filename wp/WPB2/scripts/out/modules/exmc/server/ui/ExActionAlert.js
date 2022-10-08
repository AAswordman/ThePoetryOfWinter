import { ActionFormData } from "mojang-minecraft-ui";
import ExErrorStack from '../ExErrorStack.js';
export default class ExActionAlert {
    constructor() {
        this._alert = new ActionFormData();
        this.buttonEvent = [];
    }
    body(bodyText) {
        this._alert.body(bodyText);
        return this;
    }
    button(text, fun, iconPath = undefined) {
        this._alert.button(text, iconPath);
        this.buttonEvent.push(fun);
        return this;
    }
    show(player) {
        this._alert.show(player).then(e => {
            if (e.isCanceled)
                return;
            this.buttonEvent[e.selection]();
        }).catch(e => ExErrorStack.throwError(e));
        return this;
    }
    title(titleText) {
        this._alert.title(titleText);
        return this;
    }
}
//# sourceMappingURL=ExActionAlert.js.map