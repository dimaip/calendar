import React from 'react';
import PropTypes from 'prop-types';

// In order to work with old legacy context API, it can't use hooks
export class HeighetUpdater extends React.Component {
    componentDidMount() {
        this.context?.swipeableViews?.slideUpdateHeight();
    }
    componentDidUpdate() {
        this.context?.swipeableViews?.slideUpdateHeight();
    }
    render() {
        return this.props.children;
    }
}
HeighetUpdater.contextTypes = {
    swipeableViews: PropTypes.shape({
        slideUpdateHeight: PropTypes.func,
    }),
};
