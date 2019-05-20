import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from "reactstrap/es/Button";


class ChangeViews extends Component {
	
	static propTypes = {
		viewList : PropTypes.arrayOf(PropTypes.string).isRequired,
		changeView : PropTypes.func.isRequired
	};
	
	
	
	render() {
		
		let buttons = [];
		
		this.props.viewList.forEach(view => {
			buttons.push(<Button color={"warning"} onClick={() => this.props.changeView(view)}>{view}</Button>)
		});
		
		
		
		return (
			<>
				<h3>Change Views</h3>
				{buttons}
			</>
		);
	}
}

export default ChangeViews;