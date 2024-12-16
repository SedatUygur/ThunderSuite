import { init, eventListenersModule } from "snabbdom";

const patch = init([
    eventListenersModule
]);

export const initial = (selector, component) => {
    const app = document.querySelector(selector);
    patch(app, component.template);
};