import React from 'react';
import './Message.css'
import PropTypes from 'prop-types'

function Message(props) {
	return (
		<div className={"Message"}>
			{props.textToShow}
		</div>
	);
}

Message.propTypes = {
	textToShow: PropTypes.string.isRequired
};

export default Message;