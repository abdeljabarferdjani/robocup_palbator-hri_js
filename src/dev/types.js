import PropTypes from "prop-types";


const personPropTypes = PropTypes.shape({
	name: PropTypes.string.isRequired,
	drinkId: PropTypes.number.isRequired
});


const UserComponentPropTypes = {
	textToShow: PropTypes.string.isRequired,
	imagePath: PropTypes.string,
	choices: PropTypes.arrayOf(PropTypes.string),
	people: PropTypes.shape({
		who: personPropTypes.isRequired,
		to: personPropTypes.isRequired
	}),
	location: PropTypes.string,
	time: PropTypes.number
	
};

export {
	UserComponentPropTypes
}