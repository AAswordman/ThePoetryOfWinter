import ExSystem from "../../utils/ExSystem.js";
export function eventDecoratorFactory(manager, target) {
    for (let i of ExSystem.keys(target)) {
        const v = Reflect.getMetadata("eventName", target, i);
        if (v) {
            const condition = Reflect.getMetadata("eventCondition", target, i);
            if (condition) {
                manager.register(v, (e) => {
                    if (condition(target, e)) {
                        target[i].call(target, e);
                    }
                });
            }
            else {
                manager.register(v, target[i].bind(target));
            }
        }
    }
}
export function registerEvent(eventName, condition) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("eventName", eventName, target, propertyName);
        Reflect.defineMetadata("eventCondition", condition, target, propertyName);
    };
}
//# sourceMappingURL=EventDecoratorFactory.js.map