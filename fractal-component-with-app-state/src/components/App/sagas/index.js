import {
    actionTypes as ToggleButtonActionTypes
} from "../../ToggleButton";
import { actionTypes as randomGifActionTypes } from "../../RandomGif";
import { 
    actions as CounterActions,
    actionTypes as CounterActionTypes 
} from "../../Counter";

function* mainSaga(effects) {
    yield effects.takeEvery(
        ToggleButtonActionTypes.TOGGLED_OFF,
        function*() {
            console.log('off');
            this.isToggledOn = false;
        }.bind(this)
    );
    yield effects.takeEvery(
        ToggleButtonActionTypes.TOGGLED_ON,
        function*() {
            console.log('on');
            this.isToggledOn = true;
        }.bind(this)
    );
    yield effects.takeEvery(
        CounterActionTypes.COUNT_INCREASED,
        function*(action) {
            console.log(action);
            this.count = action.currentValue;
        }.bind(this)
    );
    yield effects.takeEvery(
        randomGifActionTypes.NEW_GIF,
        function*() {
            console.log('putting');
            yield effects.put(CounterActions.increaseCount(), "../../Counter/*");
            if (this.count > 10 && this.isToggledOn) {
                yield effects.put(CounterActions.increaseCount(), "../../Counter/*");
            }
        }.bind(this)
    );
}

export default mainSaga;