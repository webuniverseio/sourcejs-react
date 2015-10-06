'use strict';
var React = require('react/addons');
module.exports = React.createClass({
	propTypes: {
		extraClasses: React.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			extraClasses: 'source_visible'
		};
	},
	render: function render() {
		return (
			<code className={`src-html ${this.props.extraClasses}`}>
				{this.props.children}
			</code>
		);
	}
});