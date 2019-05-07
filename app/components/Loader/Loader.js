import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({loaded, children}) => loaded ? <div>{children}</div> : <div>loading...</div>;
Loader.propTypes = {
  loaded: PropTypes.bool,
  children: PropTypes.object
};

export default Loader;
