
/**
 * Фабрика компонентов
*/

export class ComponentFactory {
    create = (component,options) => {
        return new component(options || {});
    }
}