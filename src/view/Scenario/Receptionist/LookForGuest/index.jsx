import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import './LookForGuest.css';
import {comAction} from "../../../../redux/actions/CommunicationAction";
import { viewAction } from '../../../../redux/actions/ViewAction';
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";

function mapStateToProps(state) {
	return {};
}

class LookForGuest extends Component {
	
	static propTypes = {
		textToShow: PropTypes.string.isRequired,
	};

	
	componentDidMount() {
		this.props.viewOk();
		//this.viewOk();
	}
	
	render() {
		
		return (
			<div className={"LookForGuest"}>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
			</div>
		);
	}
/*
	viewOk() {
		this.props.store.dispatch({
			type: viewAction.getIndexCurrentAction.type
		});
		this.props.store.dispatch({
			type: comAction.dataJs.type,
			data: {status: 200}
		})
	}
*/

}

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

export default connect(mapStateToProps, mapDispatchToProps)(LookForGuest);
