import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transmit from 'react-transmit';
import {fromJS} from 'immutable';
import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';
import DayPicker from 'react-day-picker';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import dateFormat from 'dateformat';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import Collapse, {Panel} from 'rc-collapse';
import ReadingList from 'containers/Main/ReadingList';
import Nav from './Nav';
import HeadingBar from './HeadingBar';
import Loader from 'components/Loader';
import 'styles/DayPicker.css';
import 'styles/Collapse.scss';
import 'styles/Slides.css';

class Main extends Component {
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object
  };
  constructor() {
    super();
    this.state = {
      calendarShown: false,
      direction: 'mount'
    };
  }
  componentWillReceiveProps(newProps) {
    // Compare dates and set the slide direction for animation
    if (newProps.params.date !== this.props.params.date) {
      const direction = new Date(newProps.params.date).getTime() > new Date(this.props.params.date).getTime() ?
        'right' : 'left';
      this.setState({direction});
    }
  }
  handleDayClick(e, day) {
    const dateString = dateFormat(day, 'yyyy-mm-dd');
    browserHistory.push(`/${dateString}`);
    this.setState({
      calendarShown: false
    });
  }
  handleToggleClick() {
    this.setState({
      calendarShown: !this.state.calendarShown
    });
  }
  render() {
    const dayData = this.props.data;
    const innerContent = dayData && (
      <Loader loaded={Boolean(dayData)} >
        <div>
          {(dayData.get('title') || dayData.get('fast'))
            && <HeadingBar title={dayData.get('title')} subTitle={dayData.get('fast')} />}
          <Collapse accordion={true} defaultActiveKey='1'>
            <Panel header='Чтения' key='1'>
              <ReadingList readings={dayData.get('readings')} date={this.props.params.date} />
            </Panel>
            <Panel header='Святые' key='2'>
              <div dangerouslySetInnerHTML={{__html: dayData.get('saints')}} />
            </Panel>
            <Panel header='Проповедь' key='3'>
              Проповедь
            </Panel>
            <Panel header='Тропари' key='4'>
              Тропари
            </Panel>
          </Collapse>
        </div>
      </Loader>
    );
    return (
      <div>
        <Nav
            date={this.props.params.date}
            handleToggleClick={this.handleToggleClick.bind(this)}
            />
        {this.state.calendarShown && <DayPicker onDayClick={this.handleDayClick.bind(this)} locale='ru' localeUtils={LocaleUtils} />}
        <div className='slide-wrap'>
          <ReactCSSTransitionGroup
              className='slide-transition-group'
              transitionName={`slide-${this.state.direction}`}
              transitionEnterTimeout={400}
              transitionLeaveTimeout={400}
              >
            <div className='slide' key={this.props.params.date}>
              {innerContent}
            </div>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Transmit.createContainer(Main, {
  initialVariables: {
    date: '2015-01-01'
  },
  fragments: {
    data({date}) {
      //console.log('this.props',this.props);
      if (!date) {
        throw new Error('Date query param is required in main');
      }
      return fetch(`http://localhost:3000/api/${date}`)
        .then(response => response.json())
        .then(response => {
          const readings = response.readings;
          for (const serviceType in readings) {
            if (readings.hasOwnProperty(serviceType)) {
              for (const readingType in readings[serviceType]) {
                if (readings[serviceType].hasOwnProperty(readingType)) {
                  readings[serviceType][readingType] = readings[serviceType][readingType].match(/<a.*?>.+?<\/a>/ig).map(i => {
                    return {
                      verse: i.replace(/<a.*?>/, '').replace('</a>', ''),
                      title: readingType
                    };
                  });
                }
              }
            }
          }
          response.readings = readings;
          return response;
        })
        .then(response => {
          return fromJS(response);
        })
        .catch(e => console.log('catch',e));
    }
  }
});
