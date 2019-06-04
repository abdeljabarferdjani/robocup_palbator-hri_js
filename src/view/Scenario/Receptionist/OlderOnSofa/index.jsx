import React, {Component} from 'react';
import {UserComponentPropTypes} from "../../../../dev/types";

class OlderOnSofa extends Component {
	
	static propTypes = {
		...UserComponentPropTypes,
	};
	
	render() {
		
		
		return (
			<div>
				Please let X on Sofa, old age is inevitable
			</div>
		)
	}
}

export default OlderOnSofa;