import React, {Component} from 'react';

class ComponentTitle extends Component {
	render() {
		return (
			<h2 className={"ComponentTitle"}>{this.props.children}</h2>
		);
	}
}

export default ComponentTitle;