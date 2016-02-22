import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchDate} from 'redux/modules/main';
import ReadingItem from 'containers/Reading/ReadingItem';
import 'rc-collapse/assets/index.css';

@connect(state => ({
  state,
  data: state.main.get('data')
}))
export default class Reading extends Component {
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func
  };
  componentDidMount() {
    this.props.dispatch(fetchDate(this.props.params.date));
  }
  render() {
    let renderedReadings;
    if (this.props.data) {
      const readings = this.props.data.getIn([this.props.params.date, 'readings', this.props.params.service]);
      const readingsArray = [];
      readings.map(i => {
        readingsArray.push(...i.toJS());
      });
      renderedReadings = readingsArray.map(i => <ReadingItem key={i.verse} {...i} />);
    } else {
      renderedReadings = 'Загрузка...';
    }
    return (
      <div>
        <div><Link to={`/${this.props.params.date}`}>Назад</Link></div>
        {renderedReadings}
      </div>
    );
  }
}
