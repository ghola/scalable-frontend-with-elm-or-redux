import * as actionTypes from "../actions/types";
import * as actions from "../actions";

const mainSaga = function*(effects) {
    yield effects.takeEvery(actionTypes.INCREASE_COUNT, 
        function*() {
            /**
             * throw exposed action out of box
             * It's guaranteed all reducers are run before saga.
             * Therefore, if you get state in a saga via `select` effect,
             * it'll always be applied state.
             */
            const { count } = yield effects.select();
            yield effects.put(actions.countIncreased(count), "../../../*");
        }
    );
};
export default mainSaga;
