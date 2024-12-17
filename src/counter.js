import { createComponent } from "../framework";
import { span } from "../framework/element";
import { onClick } from "../framework/event";

const count = 0;

const methods = {
    add: (state) => ({
        ...state,
        count: state.count + 1
    }),
    sub: (state) => ({
        ...state,
        count: state.count - 1
    }),
};
const initialState = { count: count };


const template = ({ count, methods }) =>
    span`${onClick(() =>
        methods.add()
    )}
    Click to add! Count : ${count}`;
    // You can also subtract number by toggling block
    /*span`${onClick(() =>
        methods.sub()
    )}
    Click to subtract! Count : ${count}`;*/

export const Counter = createComponent({ template, methods, initialState });