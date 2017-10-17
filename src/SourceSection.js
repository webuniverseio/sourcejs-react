import React from 'react';
import PropTypes from 'prop-types';

class SourceSection {
    render() {
        return (
			<section className={`source_section ${this.props.extraClasses}`}>
                {this.props.children}
			</section>
        );
    }
}

SourceSection.displayName = 'SourceSection';

SourceSection.propTypes = {
    children: PropTypes.element.isRequired,
    extraClasses: PropTypes.string
};

SourceSection.defaultProps = {
    extraClasses: ''
};

export default SourceExample;