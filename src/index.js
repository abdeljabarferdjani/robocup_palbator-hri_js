import 'core-js';
import 'core-js/es/set'
import 'core-js/es/map'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Debug from "./view/Debug/Debug";
import QiWrapper from "./model/QiWrapper";
// import ALMemoryBridge from "./controller/ALMemoryBridge";
import ConfigWrapper from "./controller/ConfigWrapper";
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import {Provider} from "react-redux";
// import getStore from "./redux/store";

async function initApp() {
	const qi = await QiWrapper.createInstance();
	await ConfigWrapper.setConfigFromALMemory();
	
	const ALMemoryBridge = require("./controller/ALMemoryBridge").default;
	
	ALMemoryBridge.initBridge(qi);
	
	
	
	const App = require("./App").default;
	const Provider = require("react-redux").Provider;
	const getStore = require("./redux/Store").default;
	const Debug = require("./view/Debug/Debug").default;


//
//
	ReactDOM.render(<Provider store={getStore()}>
		<App/>
		<Debug/>
	</Provider>, document.getElementById('root'));
	
	
}

initApp().catch(e => {
	console.error("An error occured in DetailDrinks.js", e);
}).then(() => {
	console.log("App Loaded")
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
