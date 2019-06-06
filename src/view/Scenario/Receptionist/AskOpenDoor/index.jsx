import React, {Component} from 'react';
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";



const mapDispatchToProps = (dispatch) => {
	return {
		handleClick : () => {
			dispatch({
				type : comAction.dataJs.type,
				data : {}
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
				<ComponentTitle>{this.props.textToShow.title}</ComponentTitle>
				<p className="description">{this.props.textToShow.description}</p>
				<button className={"btn btn-ok"} onClick={this.props.handleClick}>I opened the door</button>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AskOpenDoor);