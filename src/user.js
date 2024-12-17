import { createComponent } from "../framework";
import { div } from "../framework/element";
import { onClick } from "../framework/event";

const firstName = "Sedat";
const lastName = "Uygur";

const methods = {
  changeName: (state) => ({
    ...state,
    firstName: state.firstName === "Sedat" ? "Sedat Can" : "Sedat"
  })
};
const initialState = { firstName: firstName, lastName: lastName };

const template = ({ firstName, lastName, methods }) =>
  div`${onClick(() =>
    methods.changeName("Sedat Can")
  )} Hello ${firstName} ${lastName}`;

export const User = createComponent({ template, methods, initialState });