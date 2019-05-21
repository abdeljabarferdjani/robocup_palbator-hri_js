import React, {Component} from 'react';
import './Confirm.css'
import AutoValidationButton from "../reusableComponent/Button/AutoValidationButton";
import {SpeakableButton} from "../reusableComponent/Button/SpeakableButton";
class Confirm extends Component {
	render() {
		
		
		const textToShow = this.props.textToShow || "Are you sure that you want X?";
		
		
		return (
			<div>
				<h2 className="viewTitle">{textToShow}</h2>
				<div className={"choice"}>
					<SpeakableButton  color={"no"}>No</SpeakableButton>
					<AutoValidationButton color={"ok"}>Yes</AutoValidationButton>
				</div>
			</div>
		);
	}
}

export default Confirm;