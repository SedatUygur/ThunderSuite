# ThunderSuite

ThunderSuite is a front-end framework from scratch

## First step

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