import React, {Component, PropTypes} from 'react';

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.object
  };
  render() {
    return (
      <div>
        <header>Преображенское братство</header>
        {this.props.children}
        <footer>c.psmb.ru</footer>
      </div>
    );
  }
}
