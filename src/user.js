import { div } from "../framework/element";
import { onClick } from "../framework/event";

const firstName = "Sedat";
const lastName = "Uygur";

export const User = ({ firstName, lastName }) => div`${onClick(() => alert(firstName))} Hello ${firstName} ${lastName}`;