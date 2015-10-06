'use strict';
var React = require('react/addons');
module.exports = React.createClass({
	propTypes: {
		extraClasses: React.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			extraClasses: ''
		};
	},
	render: function render() {
		return (
			<section className={`source_section ${this.props.extraClasses}`}>
				{this.props.children}
			</section>
		);
	}
});