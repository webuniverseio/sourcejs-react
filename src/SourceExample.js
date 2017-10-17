import React from 'react';
import PropTypes from 'prop-types';


class SourceExample {
    render() {
        return (
			<div className={`source_example ${this.props.extraClasses}`}>
                {this.props.children}
			</div>
        );
    }
}

SourceExample.displayName = 'SourceExample';

SourceExample.propTypes = {
    children: PropTypes.element.isRequired,
    extraClasses: PropTypes.string
};

SourceExample.defaultProps = {
    extraClasses: ''
};

export default SourceExample;