const deepFreeze = (obj) => {
	if(typeof obj !== "string") {
		const keys = Object.keys(obj);
		keys.forEach(key => {
			deepFreeze(obj[key])
		});
	}
	Object.freeze(obj);

};

export {
	deepFreeze
}