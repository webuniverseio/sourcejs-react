import React from 'react';
import PropTypes from 'prop-types';

class SourceCode {

    render() {
        return (
            <code className={`src-html ${this.props.extraClasses}`}>
                {this.props.children}
            </code>
        );
    }
}

SourceCode.displayName = 'SourceCode';

SourceCode.propTypes= {
    children: PropTypes.element.isRequired,
    extraClasses: PropTypes.string
};

SourceCode.defaultProps= {
    extraClasses: 'source_visible'
};

export default SourceCode;