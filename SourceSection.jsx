'use strict';
var React = require('react/addons');
module.exports = React.createClass({
	displayName: 'SourceSection',
	propTypes: {
		children: React.PropTypes.element.isRequired,
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