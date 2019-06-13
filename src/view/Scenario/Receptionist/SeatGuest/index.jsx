import React, {Component} from 'react';
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";

class SeatGuest extends Component {
	static propTypes = {
	
	};
	
	render() {
		return (
			<div>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
			</div>
		);
	}
}

export default SeatGuest;