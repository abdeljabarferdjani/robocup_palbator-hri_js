import React, {Component} from 'react';
import PropTypes from "prop-types";

class AskAge extends Component {
	
	
	static propTypes = {
		confirm : PropTypes.bool.isRequired
	};
	
	static defaultProps = {
		confirm : true
	};
	render() {
		return (
			<div>
				Votre age ?
			</div>
		);
	}
}

export default AskAge;