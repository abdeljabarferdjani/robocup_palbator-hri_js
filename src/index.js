import 'core-js';
import 'core-js/es/set'
import 'core-js/es/map'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QiWrapper from "./model/QiWrapper";
import ConfigWrapper from "./controller/ConfigWrapper";


async function initApp() {
	const qi = await QiWrapper.createInstance();
	console.log(qi);
	await ConfigWrapper.setConfigFromALMemory();
	
	const ALMemoryBridge = require("./controller/ALMemoryBridge").default;
	
	ALMemoryBridge.initBridge(qi);
	
	const App = require("./App").default;
	const Provider = require("react-redux").Provider;
	const getStore = require("./redux/Store").default;
	const Debug = require("./view/Debug/Debug").default;
	
	ReactDOM.render(<Provider store={getStore()}>
		<App/>
		<Debug/>
	</Provider>, document.getElementById('root'));
	
	
}

initApp().then(() => {
	console.log("App Loaded")
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
