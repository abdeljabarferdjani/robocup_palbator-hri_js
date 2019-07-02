import React, {Component} from 'react';
import ConfigWrapper from "../../../controller/ConfigWrapper";
import Icon from "../reusableComponent/Icon";

import './Logo.css'

const {images} = ConfigWrapper.get() || [];

class Logo extends Component {
	render() {
		const logos = [];
		
		images.forEach(logo => {
			logos.push(<Icon image={logo['pathOnTablet']}
			                 description={logo['obj']}/>);
		});
		
		
		return (
			<div className={"Logo"}>
				{logos.map(x => x)}
			</div>
		);
	}
}

export default Logo;