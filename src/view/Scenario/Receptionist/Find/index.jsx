import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./Find.css"
import "../../../Global/reusableComponent/People/People.css";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import People from "../../../Global/reusableComponent/People/People";
import { viewAction } from '../../../../redux/actions/ViewAction';

class Find extends Component {
	static propTypes = {};
	
	componentDidMount() {
		this.props.viewOk();
	}
	
	render() {
		return (
			<div className={"Find"}>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
				<div><img className={"Chair"}
                        src={this.props.pathOnTablet}
                        alt={this.props.what}/>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Find);