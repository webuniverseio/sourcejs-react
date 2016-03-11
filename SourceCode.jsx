'use strict';
var React = require('react');
module.exports = React.createClass({
	displayName: 'SourceCode',
	propTypes: {
		children: React.PropTypes.element.isRequired,
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