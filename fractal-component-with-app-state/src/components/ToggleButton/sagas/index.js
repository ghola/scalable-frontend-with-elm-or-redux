import * as actionTypes from "../actions/types";
import * as actions from "../actions";

const mainSaga = function*(effects) {
    yield effects.takeEvery(actionTypes.CLICK, 
        function*() {
            /**
             * throw exposed action out of box
             * It's guaranteed all reducers are run before saga.
             * Therefore, if you get state in a saga via `select` effect,
             * it'll always be applied state.
             */
            const { isActive } = yield effects.select();
            if (isActive) {
                yield effects.put(actions.toggledOn(), "../../../*");
            } else {
                yield effects.put(actions.toggledOff(), "../../../*");
            }
        }
    );
};
export default mainSaga;
