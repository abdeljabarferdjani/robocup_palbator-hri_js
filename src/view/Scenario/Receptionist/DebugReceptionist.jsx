import React, {Component} from 'react';
import ConfigWrapper from "../../../controller/ConfigWrapper";
import PropTypes from "prop-types";

const {views} = ConfigWrapper.get();

class DebugReceptionist extends Component {
	
	static propTypes = {
		changeView: PropTypes.func.isRequired
	};
	
	render() {
		return (
			<div>
			
			</div>
		);
	}
}

export default DebugReceptionist;