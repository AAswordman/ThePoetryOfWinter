import { ActionFormData } from "mojang-minecraft-ui";
import { Player } from 'mojang-minecraft';
import ExErrorStack from '../ExErrorStack.js';


export default class ExActionAlert {
  _alert = new ActionFormData();
  buttonEvent: (() => void)[] = [];
  constructor() {

  }
  body(bodyText: string) {
    this._alert.body(bodyText);
    return this;
  }
  button(text: string, fun: () => void, iconPath = undefined) {
    this._alert.button(text, iconPath);
    this.buttonEvent.push(fun);
    return this;
  }
  show(player: Player) {
    this._alert.show(player).then(e => {
      if(e.isCanceled) return;
      this.buttonEvent[e.selection]();
    }).catch(e => ExErrorStack.throwError(e));
    return this;
  }
  title(titleText: string) {
    this._alert.title(titleText);
    return this;
  }
}
