import * as actionTypes from "./types";

export function increaseCount() {
    return {
        type: actionTypes.INCREASE_COUNT
    };
}

export function countIncreased(currentValue) {
    return {
        type: actionTypes.COUNT_INCREASED,
        currentValue
    };
}