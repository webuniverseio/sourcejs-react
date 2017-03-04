var React = require('react');
module.exports = React.createClass({
    displayName: 'error.js',
    propTypes: {
        stack: React.PropTypes.string.isRequired
    },
    render: function () {
        return React.createElement(
	        'div',
	        {style: {color: 'red'}},
	        React.createElement('h1', null, 'Error: '),
	        React.createElement('p', {dangerouslySetInnerHTML: {
	            __html: this.props.stack.replace(/\n/g, '<br>')
	        }})
        );
    }
});