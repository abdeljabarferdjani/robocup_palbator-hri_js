import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./MainPagePalbator.css"
import "../reusableComponent/People/People.css";
import ComponentTitle from "../reusableComponent/ComponentTitle";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import { viewAction } from '../../../redux/actions/ViewAction';

class Test_View_For_Menu extends Component {
	static propTypes = {};
	
	componentDidMount() {
		this.props.viewOk();
	}
	
	render() {
		return (
			<div className={"MainPagePalbator"}>
				<ComponentTitle>Welcome to Palbator's HRI !</ComponentTitle>
				<img className={"Palbator"}
                        src="img/images/lyontech.png"
                        alt="palbator"/>
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
				data: "TABLET_ON"
			})
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Test_View_For_Menu);