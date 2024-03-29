import PomClient from "../PomClient.js";
import ExActionAlert from "../../../modules/exmc/server/ui/ExActionAlert.js";
import { to } from "../../../modules/exmc/server/ExErrorQueue.js";
import ExGameConfig from "../../../modules/exmc/server/ExGameConfig.js";
import ExGameClient from '../../../modules/exmc/server/ExGameClient.js';
import ExInterworkingPool from '../../../modules/exmc/interface/ExInterworkingPool.js';


export default class WarningAlertUI<T extends ExGameClient> {

    private _uiBody: string;
    private _client: T;
    private _button: [string, (client: T, ui: WarningAlertUI<T>) => void][];

    constructor(client: T, body: string, button: [string, ((client: T, ui: WarningAlertUI<T>) => void)][]) {
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