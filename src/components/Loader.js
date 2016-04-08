import React from 'react';

const Loader = ({loaded, children}) => loaded ? <div>{children}</div> : <div>loading...</div>;
Loader.propTypes = {
  loaded: React.PropTypes.bool,
  children: React.PropTypes.object
};

export default Loader;
