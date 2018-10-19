import React from "react";
//-- import fractal-component lib from src entry point
import { AppContainerUtils, ActionForwarder } from "fractal-component";
import RandomGif, { actionTypes as randomGifActionTypes } from "../RandomGif";
import RandomGifPair, { actionTypes as randomGifPairActionTypes } from "../RandomGifPair";
import RandomGifPairPair, { actionTypes as randomGifPairPairActionTypes } from "../RandomGifPairPair";
import Counter, { actionTypes as counterActionTypes } from "../Counter";
import ToggleButton, { actionTypes as toggleActionTypes }  from "../ToggleButton";
import jss from "jss";
import styles from "./styles";
import saga from "./sagas";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.componentManager = AppContainerUtils.registerComponent(this, {
            namespace: "App",
            saga,
            reducer: function(state) {
                return state;
            },
            // --- specify accepted types of external multicast actions
            // --- By default, component will not accept any incoming multicast action.
            // --- No limit to actions that are sent out
            allowedIncomingMulticastActionTypes: [
                counterActionTypes.COUNT_INCREASED, 
                randomGifActionTypes.NEW_GIF, 
                randomGifPairActionTypes.NEW_GIF, 
                randomGifPairPairActionTypes.NEW_GIF, 
                toggleActionTypes.TOGGLED_ON, 
                toggleActionTypes.TOGGLED_OFF
            ],
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
            <div>
                <div className={classes.table}>
                    <div className={classes.cell}>
                        {/*
                            RandomGif / RandomGifPair / RandomGifPairPair support apiKey property as well
                            You can supply your giphy API key as component property
                        */}
                        <RandomGif namespacePrefix="exampleApp/RandomGif" />
                        {/*Forward `NEW_GIF` actions to the App namespace*/}
                        <ActionForwarder
                            namespacePrefix="exampleApp/RandomGif"
                            pattern={randomGifActionTypes.NEW_GIF}
                            relativeDispatchPath="../App/*"
                            transformer={randomGifActionTypes.NEW_GIF}
                        />
                    </div>
                    <div className={classes.cell}>
                        <Counter namespacePrefix="exampleApp/Counter" />
                        {/*Forward `COUNT_INCREASED` actions to the App namespace*/}
                        <ActionForwarder
                            namespacePrefix="exampleApp/Counter"
                            pattern={counterActionTypes.COUNT_INCREASED}
                            relativeDispatchPath="../App/*"
                            transformer={counterActionTypes.COUNT_INCREASED}
                        />
                    </div>
                </div>
                <div className={classes.table}>
                    <div className={classes.cell}>
                        <RandomGifPair namespacePrefix="exampleApp/RandomGifPair" />
                        {/*Forward `NEW_GIF` actions to the App namespace*/}
                        <ActionForwarder
                            namespacePrefix="exampleApp/RandomGifPair"
                            pattern={randomGifPairActionTypes.NEW_GIF}
                            relativeDispatchPath="../App/*"
                            transformer={randomGifPairActionTypes.NEW_GIF}
                        />
                    </div>
                    <div className={classes.cell}>
                        <ToggleButton namespacePrefix="exampleApp/ToggleButton" />
                        {/*Forward `TOGGLED_ON` actions to the App namespace*/}
                        <ActionForwarder
                            namespacePrefix="exampleApp/ToggleButton"
                            pattern={toggleActionTypes.TOGGLED_ON}
                            relativeDispatchPath="../App/*"
                            transformer={toggleActionTypes.TOGGLED_ON}
                        />
                        {/*Forward `TOGGLED_OFF` actions to the App namespace*/}
                        <ActionForwarder
                            namespacePrefix="exampleApp/ToggleButton"
                            pattern={toggleActionTypes.TOGGLED_OFF}
                            relativeDispatchPath="../App/*"
                            transformer={toggleActionTypes.TOGGLED_OFF}
                        />
                    </div>
                </div>
                <div>
                    <RandomGifPairPair namespacePrefix="exampleApp/RandomGifPairPair" />
                    {/*Forward `NEW_GIF` actions to the App namespace*/}
                    <ActionForwarder
                        namespacePrefix="exampleApp/RandomGifPairPair"
                        pattern={randomGifPairPairActionTypes.NEW_GIF}
                        relativeDispatchPath="../App/*"
                        transformer={randomGifPairPairActionTypes.NEW_GIF}
                    />
                </div>
            </div>
        );
    }
}

export default App;
