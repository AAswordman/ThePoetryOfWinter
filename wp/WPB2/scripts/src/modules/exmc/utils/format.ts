import ExGameConfig from '../server/ExGameConfig.js';

export default function format(str: string, ...msg: unknown[]) {
    var formatted = str;
    for (let arg in msg) {
        formatted = formatted.replace("{" + arg + "}", msg[arg]+"");
    }
    return formatted;
}