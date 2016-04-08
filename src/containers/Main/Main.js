import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import DayPicker from 'react-day-picker';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import dateFormat from 'dateformat';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import Collapse, {Panel} from 'rc-collapse';
import {fetchDate} from 'reducers/modules/main';
import ReadingList from 'containers/Main/ReadingList';
import Nav from './Nav';
import HeadingBar from './HeadingBar';
import Loader from 'components/Loader';
import 'styles/DayPicker.css';
import 'styles/Collapse.scss';
import 'styles/Slides.css';

@connect(state => ({
  state,
  data: state.main.get('data')
}))
export default class Main extends Component {
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func
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
    this.props.dispatch(fetchDate(dateString));
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
    const dayData = this.props.data ? this.props.data.get(this.props.params.date) : null;
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
