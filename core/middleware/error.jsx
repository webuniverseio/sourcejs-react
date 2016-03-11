var React = require('react');
module.exports = React.createClass({
    displayName: 'error.jsx',
    propTypes: {
        stack: React.PropTypes.string.isRequired
    },
    render: function () {
        return (
            <div style={{color: 'red'}}>
                <h1>Error: </h1>
                <p dangerouslySetInnerHTML={{__html: this.props.stack.replace(/\n/g, '<br>')}}></p>
            </div>
        );
    }
});