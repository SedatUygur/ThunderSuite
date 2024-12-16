# ThunderSuite

ThunderSuite is a front-end framework from scratch

## First step (simple view)

* Create a `./framework` directory

* Create a `./framework/element.js` file

* Add this to the file and check the output of custom template literals:

```javascript
const div = (strings, ...args) => console.log(strings, args);
const firstName = "Sedat";
const lastName = "Uygur";
div`Hello ${firstName} ${lastName} !`;
```

```shell
$ node ./framework/element.js
```

* Reducing to offer a clean string instead of the array

```javascript
const div = (strings, ...args) => {
    let acc = "";
    for(const currentString of strings) {
      const interpolatedString = (args[index] || "");
      acc += currentString + interpolatedString;
    }
    return acc;
};
const firstName = "Sedat";
const lastName = "Uygur";
const template = div`Hello ${firstName} ${lastName} !`;
console.log(template);
```

* Let's refactor and create something more abstracted

```javascript
const createElement = tagName => (strings, ...args) => ({
  type: tagName,
  template: strings.reduce(
    (acc, currentString, index) => acc + currentString + (args[index] || ""),
    ""
  )
});
const div = createElement("div");
const p = createElement("p");
const firstName = "Sedat";
const lastName = "Uygur";
const template = div`Hello ${firstName} ${lastName} !`;
console.log(template);
```

The type is important because we'll need it to add the element to the DOM!

* Let's create a `./framework/index.js`

```javascript
export const init = (selector, component) => {
  const app = document.querySelector(selector);
  const newElement = document.createElement(component.type);
  const newTextContent = document.createTextNode(component.template);
  newElement.append(newTextContent);
  app.append(newElement);
};
```

* remove unnecessary stuff to make the `./framework/element.js` looks like:

```javascript
const createElement = tagName => (strings, ...args) => ({
  type: tagName,
  template: strings.reduce(
    (acc, currentString, index) => acc + currentString + (args[index] || ""),
    ""
  )
});
export const div = createElement("div");
export const p = createElement("p");
```

* put the following in the `./index.js` : it spawns the root component inside a #app selector

```javascript
import { init } from "./framework";
import { div } from "./framework/element";
const firstName = "Sedat";
const lastName = "Uygur";
init("#app", div`Hello ${firstName} ${lastName}`);
init("#app", p`Hello ${firstName} ${lastName}`);
```

Let's create our first component in `./src/user.js`:

```javascript
import { div } from "../framework/element";
const firstName = "Sedat";
const lastName = "Uygur";
export const User = ({ firstName, lastName }) =>
  div`Hello ${firstName} ${lastName}`;
```

And modify `./index.js`:

```javascript
import { init } from "./framework";
import { User } from "./src/user";
const firstName = "Sedat";
const lastName = "Uygur";
init("#app", User({ firstName, lastName }));
```

# Second step (adding Virtual DOM)

Modify the `./framework/element.js` with:

```javascript
import h from "snabbdom/h";
const createElement = tagName => (strings, ...args) => ({
  type: "element",
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
```

And `./framework/index.js` by

```javascript
import * as snabbdom from "snabbdom";
const patch = snabbdom.init([]);
export const init = (selector, component) => {
  const app = document.querySelector(selector);
  patch(app, component.template);
};
```

Before getting further, let's refactor `./framework/element.js` for clarity purpose:

```javascript
import h from "snabbdom/h";
const initialState = {
  template: ""
};
const createReducer = args => (acc, currentString, index) => ({
  ...acc,
  template: acc.template + currentString + (args[index] || "")
});
const createElement = tagName => (strings, ...args) => {
  const { template } = strings.reduce(createReducer(args), initialState);
  return {
    type: "element",
    template: h(tagName, {}, template)
  };
};
export const div = createElement("div");
export const p = createElement("p");
```

Now let's create a `onClick` event handler: create a file in `./framework/event.js`:

```javascript
export const onClick = f => ({
  type: "event",
  click: f
});
```

And modify the `./src/user.js`:

```javascript
import { div } from "../framework/element";
import { onClick } from "../framework/event";
const firstName = "Sedat";
const lastName = "Uygur";
export const User = ({ firstName, lastName }) =>
  div`${onClick(() => alert(firstName))} Hello ${firstName} ${lastName}`;
```

The result displays the full function as a string. Let's make this work, in `./framework/element.js`:

```javascript
import h from "snabbdom/h";
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
  const { template, on } = strings.reduce(createReducer(args), initialState);
  return {
    type: "element",
    template: h(tagName, { on }, template)
  };
};
export const div = createElement("div");
export const p = createElement("p");
```

Now we need to tell snabbdom that we want to use its own internal events system, in `./framework/index.js`, add:

```javascript
import * as snabbdom from "snabbdom";
const patch = snabbdom.init([
  require("snabbdom/modules/eventlisteners").default
]);
export const init = (selector, component) => {
  const app = document.querySelector(selector);
  patch(app, component.template);
};
```