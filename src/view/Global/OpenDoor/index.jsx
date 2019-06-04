import React, {Component} from 'react';
import ComponentTitle from "../reusableComponent/ComponentTitle";

class OpenDoor extends Component {
	render() {
		return (
			<div>
				<ComponentTitle>Please open the door</ComponentTitle>
			</div>
		);
	}
}

export default OpenDoor;