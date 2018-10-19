import React from "react";
import { AppContainerUtils } from "fractal-component";
import * as actionTypes from "./actions/types";
import * as actions from "./actions/index";
import jss from "jss";
import styles from "./styles";
import saga from "./sagas";

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.componentManager = AppContainerUtils.registerComponent(this, {
            namespace: "io.github.t83714/Counter",
            saga,
            reducer: function(state, action) {
                switch (action.type) {
                    case actionTypes.INCREASE_COUNT: {
                        return { ...state, count: state.count + 1 };
                    }
                    default:
                        return state;
                }
            },
            /**
             * Register actions for action serialisation / deserialisation.
             * It's much easier to use Symbol as action type to make sure no action type collision among different component.
             * ( Considering we now use actions as primary way for inter-component communication, it's quite important in a multicaset action environment)
             */
            actionTypes,
            // --- specify accepted types of external multicast actions
            // --- By default, component will not accept any incoming multicast action.
            // --- No limit to actions that are sent out
            allowedIncomingMulticastActionTypes: [actionTypes.INCREASE_COUNT],
            namespaceInitCallback: componentManager => {
                const styleSheet = jss
                    .createStyleSheet(styles, {
                        generateClassName: componentManager.createClassNameGenerator()
                    })
                    .attach();
                return { styleSheet };
            },
            namespaceDestroyCallback: ({ styleSheet }) => {
                styleSheet.detach();
            }
        });
    }

    render() {
        const { styleSheet } = this.componentManager.getNamespaceData();
        const { classes } = styleSheet;
        return (
            <div className={classes.table}>
                <div className={classes.cell}>Counter</div>
                <div
                    className={`${classes.cell} ${
                        classes["counter-container"]
                    }`}
                >
                    <span>{this.state.count}</span>
                </div>
            </div>
        );
    }
}

export default Counter;

//--- actions component may send out
const exposedActionTypes = {
    COUNT_INCREASED: actionTypes.COUNT_INCREASED,
};
//--- action component will accept
const exposedActions = {
    increaseCount: actions.increaseCount
};

/**
 * expose actions for component users
 */
export { exposedActionTypes as actionTypes, exposedActions as actions };
