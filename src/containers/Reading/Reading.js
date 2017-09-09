import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse, {Panel} from 'rc-collapse';
import Loader from 'react-loader';
import ReadingItem from 'containers/Reading/ReadingItem';
import HeadingBar from './HeadingBar';
import 'styles/Collapse.scss';

export default class Reading extends Component {
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func
  };
  render() {
    let renderedReadings;
    if (this.props.data) {
      const readings = this.props.data.getIn([this.props.params.date, 'readings', this.props.params.service]);
      const readingsArray = [];
      readings.map(i => {
        readingsArray.push(...i.toJS());
      });
      renderedReadings = (
        <Collapse accordion={true} defaultActiveKey='0'>
          {readingsArray.map((i, j) => (
            <Panel header={`${i.title} ${i.verse}`} key={j}>
              <ReadingItem {...i} />
            </Panel>
          ))}
        </Collapse>
      );
    }

    return (
      <div>
        <HeadingBar
            date={this.props.params.date}
            service={this.props.params.service}
            />
        <Loader loaded={Boolean(this.props.data)} >
          {renderedReadings}
        </Loader>
      </div>
    );
  }
}
