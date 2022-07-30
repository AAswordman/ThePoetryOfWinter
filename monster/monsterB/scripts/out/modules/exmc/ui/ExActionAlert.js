import { ActionFormData } from "mojang-minecraft-ui";
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
            this.buttonEvent[e.selection]();
        });
        return this;
    }
    title(titleText) {
        this._alert.title(titleText);
        return this;
    }
}
//# sourceMappingURL=ExActionAlert.js.map