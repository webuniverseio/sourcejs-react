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
			<div className={`source_example ${this.props.extraClasses}`}>
				{this.props.children}
			</div>
		);
	}
});