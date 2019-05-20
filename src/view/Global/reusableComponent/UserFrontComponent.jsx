import React from "react";
import PropTypes from "prop-types";

class UserFrontComponent extends React.PureComponent {
	
	static propTypes = {
		textToShow: PropTypes.string.isRequired,
		choice: PropTypes.arrayOf(PropTypes.string),
		component: PropTypes.any.isRequired
	};
	
	render() {
		return React.createElement(this.props.component, {
			textToShow: this.props.textToShow,
			choice: this.props.choice
		});
	}
}


export default UserFrontComponent;