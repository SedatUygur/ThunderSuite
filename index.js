import { init } from "./framework";
import { User } from "./src/user";

const firstName = "Sedat";
const lastName = "Uygur";

init("#app", User({ firstName, lastName }));