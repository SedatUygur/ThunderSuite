import { initial } from "./framework";
import { User } from "./src/user";

const firstName = "Sedat";
const lastName = "Uygur";

initial("#app", User({ firstName, lastName }));