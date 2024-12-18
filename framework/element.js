import { h } from "snabbdom";
import { withoutNulls } from './utils/arrays'

const initialState = {
  template: "",
  on: {}
};

const createReducer = args => (acc, currentString, index) => {
  const currentArg = args[index];
  if (currentArg && currentArg.type === "event") {
    return { ...acc, on: { click: currentArg.click } };
  }
  return {
    ...acc,
    template: acc.template + currentString + (args[index] || "")
  };
};

const createElement = tagName => (strings, ...args) => {
  const { template, on } = strings && Array.isArray(strings) && strings.reduce(createReducer(args), initialState);
  return {
    type: "element",
    children: mapTextNodes(withoutNulls(strings)),
    tag: tagName,
    template: h(tagName, { on }, template)
  };
};

export const button = createElement("button");
export const div = createElement("div");
export const p = createElement("p");
export const span = createElement("span");

const mapTextNodes = children => {
  return children && children.map((child) =>
      typeof child === 'string' ? p(child) : child
  )
}