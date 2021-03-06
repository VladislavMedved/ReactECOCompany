import React from 'react';
import ReactDOM from 'react-dom';
import { getSnapshot } from "mobx-state-tree";
import { Provider } from "mobx-react";
import { connectReduxDevtools } from "mst-middlewares";
import makeInspectable from "mobx-devtools-mst";

import './index.css';
import * as serviceWorker from './serviceWorker';

import { appStore } from "./stores/appStore";
import { App } from './components/App';


console.log(getSnapshot(appStore));

makeInspectable(appStore);
connectReduxDevtools(require("remotedev"), appStore);

ReactDOM.render(
    <Provider store={appStore}>
        <App/>
    </Provider>, document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
