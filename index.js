import { initial } from "./framework";
//import { User } from "./src/user";
import { Counter } from "./src/counter";

/*const firstName = "Sedat";
const lastName = "Uygur";*/
const count = 0;

//initial("#app", User({ firstName, lastName }));
initial("#app", Counter({count}));