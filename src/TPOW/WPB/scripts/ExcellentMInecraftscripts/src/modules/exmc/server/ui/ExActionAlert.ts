import { ActionFormData } from "@minecraft/server-ui";
import { Player } from '@minecraft/server';
import ExErrorQueue from '../ExErrorQueue.js';


export default class ExActionAlert {
  _alert = new ActionFormData();
  buttonEvent: (() => void)[] = [];
  constructor() {

  }
  body(bodyText: string) {
    this._alert.body(bodyText);
    return this;
  }
  button(text: string, fun: () => void = () => {}, iconPath?:string) {
    this._alert.button(text, iconPath);
    this.buttonEvent.push(fun);
    return this;
  }
  show(player: Player) {
    this._alert.show(player).then(e => {
      if(e.canceled || e.selection === undefined) return;
      this.buttonEvent[e.selection]();
    }).catch(e => ExErrorQueue.throwError(e));
    return this;
  }
  title(titleText: string) {
    this._alert.title(titleText);
    return this;
  }
}
