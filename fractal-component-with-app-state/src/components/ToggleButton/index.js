import React from "react";
import { AppContainerUtils, utils } from "fractal-component";
import * as actionTypes from "./actions/types";
import * as actions from "./actions/index";
import jss from "jss";
import styles from "./styles";
import saga from "./sagas";

const { is } = utils;

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
        this.componentManager = AppContainerUtils.registerComponent(this, {
            namespace: "io.github.t83714/ToggleButton",
            saga,
            reducer: function(state, action) {
                switch (action.type) {
                    case actionTypes.CLICK:
                        return { ...state, isActive: !state.isActive };
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
            // --- Commented out the following line as Toggle button doesn't need to process any actions (ActionForwarder below will do the job).
            // --- allowedIncomingMulticastActionTypes: "*",
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
                <div className={classes.cell}>ToggleButton</div>
                <div
                    className={`${classes.cell} ${classes["button-container"]}`}
                >
                    <button
                        className={
                            this.state.isActive
                                ? classes["active"]
                                : classes["inactive"]
                        }
                        onClick={() => {
                            this.componentManager.dispatch(actions.click());
                        }}
                    >
                        {this.state.isActive ? "ACTIVE" : "INACTIVE"}
                    </button>
                </div>
            </div>
        );
    }
}

export default ToggleButton;

//--- actions component may send out
const exposedActionTypes = {
    TOGGLED_ON: actionTypes.TOGGLED_ON,
    TOGGLED_OFF: actionTypes.TOGGLED_OFF,
};

/**
 * expose actions for component users
 */
export { exposedActionTypes as actionTypes };
