import ExActionAlert from "../../../modules/exmc/server/ui/ExActionAlert.js";
export default class WarningAlertUI {
    constructor(client, body, button) {
        this._uiBody = body;
        this._client = client;
        this._button = button;
    }
    getMessage() {
        return this._uiBody;
    }
    showPage() {
        this._client.setTimeout(() => {
            let ui = new ExActionAlert()
                .title("__pomAlertWarning")
                .body(this._uiBody);
            for (let [str, v] of this._button) {
                ui.button(str, () => {
                    v(this._client, this);
                });
            }
            ui.show(this._client.player);
        }, 0);
    }
}
//# sourceMappingURL=WarningAlertUI.js.map