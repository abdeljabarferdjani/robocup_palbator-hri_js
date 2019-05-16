import React, {Component} from 'react';
import AskName from "../../../Global/AskName";
import AskAge from "./AskAge";
import AskDrink from "../../../Global/AskDrink";
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
	return {
		askInformationsCompleted : () => {
			dispatch({
				type: comAction.setStepCompleted.type,
				step : null
			})
		}
	}
};
class AskInformations extends Component {
	
	
	
	constructor(props) {
		super(props);
		this.state = {
			informationsGot : {
				name : false,
				drink : false,
				age : false,
				
			}
		}
	}
	
	
	render() {
		let comp;

		if(!this.state.informationsGot.name) {
			comp = <AskName confirm={false}/>;
		}
		else {
			if(!this.state.informationsGot.age) {
				comp = <AskAge confirm={true}/>
			}
			
			else {
				if(!this.state.informationsGot.drink) {
					comp = <AskDrink confirm={true}/>
				}
				else {
					this.props.askInformationsCompleted();
				}
			}
		}
		
		return (
			<div>
				{comp}
			</div>
		);
	}
}

export default connect(mapDispatchToProps)(AskInformations);