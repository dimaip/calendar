import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Main from 'containers/Main/Main';

const dateSelector = state => {
  return state.routing.location.pathname.replace('/', '');
};
const selector = state => {
  const dateString = dateSelector(state);
  return state.main.getIn(['data', dateString]);
};

@connect(
  state => ({
    state,
    data: selector(state),
    dateString: dateSelector(state)
  })
)
export default class Root extends Component {
  static propTypes = {
    data: PropTypes.object,
    dateString: PropTypes.string,
    dispatch: PropTypes.func
  };
  render() {
    return (
      <div>
        <header>Преображенское братство</header>
        <Main data={this.props.data} dateString={this.props.dateString} dispatch={this.props.dispatch} />
        <footer>c.psmb.ru</footer>
      </div>
    );
  }
}
