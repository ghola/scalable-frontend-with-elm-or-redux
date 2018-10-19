import * as actionTypes from "./types";

export function click() {
    return {
        type: actionTypes.CLICK
    };
}

export function toggledOn() {
    return {
        type: actionTypes.TOGGLED_ON
    };
}

export function toggledOff() {
    return {
        type: actionTypes.TOGGLED_OFF
    };
}