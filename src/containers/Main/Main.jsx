import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFormat from 'dateformat';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import Collapse, {Panel} from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import {fetchDate} from 'redux/modules/main';
import ReadingList from 'containers/Main/ReadingList';

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
  componentDidMount() {
    this.props.dispatch(fetchDate(this.props.params.date));
  }
  handleDayClick(e, day) {
    const dateString = dateFormat(day, 'yyyy-mm-dd');
    this.props.dispatch(fetchDate(dateString));
    browserHistory.push(`/${dateString}`);
  }
  render() {
    const dayData = this.props.data ? this.props.data.get(this.props.params.date) : null;
    const innerContent = dayData ? (
      <div>
        <h1 dangerouslySetInnerHTML={{__html: dayData.title}} />
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
    ) : (<div>Загрузка...</div>);
    return (
      <div>
        <DayPicker onDayClick={this.handleDayClick.bind(this)} locale='ru' localeUtils={LocaleUtils}/>
        {innerContent}
      </div>
    );
  }
}
