import { h } from "snabbdom";

const createElement = tagName => (strings, ...args) => ({
    type: tagName,
    template: h(
      tagName,
      {},
      strings.reduce(
        (acc, currentString, index) => acc + currentString + (args[index] || ""),
        ""
      )
    )
});

export const div = createElement("div");
export const p = createElement("p");