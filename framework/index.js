import { init, eventListenersModule } from "snabbdom";

const patch = init([
    eventListenersModule
]);

export const initial = (selector, component) => {
    const app = document.querySelector(selector);
    patch(app, component.template);
};

let state = {};

export const createComponent = ({
  template,
  methods = {},
  initialState = {}
}) => {
  state = initialState;
  const mappedMethods = Object.keys(methods).reduce(
    (acc, key) => ({
      ...acc,
      [key]: (...args) => {
        state = methods[key](state, ...args);
        console.log(state);
        return state;
      }
    }),
    {}
  );
  return props => template({ ...props, ...state, methods: mappedMethods });
};