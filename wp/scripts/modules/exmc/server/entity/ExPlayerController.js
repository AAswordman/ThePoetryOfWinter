import ExPlayer from './ExPlayer.js';
import ExEntityController from "./ExEntityController.js";
import "../../../reflect-metadata/Reflect.js";
export default class ExPlayerController extends ExEntityController {
    constructor(e, server) {
        super(e, server);
        this.init(server);
    }
    init(server) {
        this.exEntity = ExPlayer.getInstance(this.entity);
    }
    get entity() {
        return this.entity;
    }
    set entity(e) {
        this.entity = e;
    }
    get exEntity() {
        return this.exEntity;
    }
    set exEntity(e) {
        this.exEntity = e;
    }
}
//# sourceMappingURL=ExPlayerController.js.map