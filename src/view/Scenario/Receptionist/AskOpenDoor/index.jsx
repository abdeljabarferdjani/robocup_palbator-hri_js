import React, {Component} from 'react';
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";



const mapDispatchToProps = (dispatch) => {
	return {
		handleClick : () => {
			dispatch({
				type : comAction.dataJs.type,
				data : {x : 1}
			})
		}
	}
};

const mapStateToProps = () => {
	return {
	
	}
}

class AskOpenDoor extends Component {

	

	render() {
		return (
			<div>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
				<button className={"btn btn-ok"} onClick={this.props.handleClick}>I opened the door</button>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AskOpenDoor);