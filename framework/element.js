const div = (strings, ...args) => {
    let acc = "";
    for(const [index, currentString] of strings.entries()) {
      const interpolatedString = (args[index] || "");
      acc += currentString + interpolatedString;
    }
    return acc;
};

const firstName = "Sedat";
const lastName = "Uygur";

const template = div`Hello ${firstName} ${lastName} !`;

console.log(template);