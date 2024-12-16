import { div } from "../framework/element";

const firstName = "Sedat";
const lastName = "Uygur";

export const User = ({ firstName, lastName }) => div`Hello ${firstName} ${lastName}`;