import React, {Component} from 'react';
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import { viewAction } from '../../../../redux/actions/ViewAction';

class SeatGuest extends Component {
	static propTypes = {};
	
	componentDidMount() {
		this.props.viewOk();
	}
	
	render() {
		return (
			<div>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {}
};
const mapDispatchToProps = (dispatch) => {
	return {
		viewOk: () => {
			dispatch({
				type: viewAction.getIndexCurrentAction.type
			});
			dispatch({
				type: comAction.dataJs.type,
				data: {status: 200}
			})
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatGuest);