import React, {Component, PropTypes} from 'react';
import {routeActions} from 'react-router-redux';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFormat from 'dateformat';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import Collapse, {Panel} from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import {fetchDate} from 'redux/modules/main';
import ReadingList from 'containers/Main/ReadingList';

export default class Main extends Component {
  static propTypes = {
    data: PropTypes.object,
    dateString: PropTypes.string,
    dispatch: PropTypes.func
  };
  componentDidMount() {
    this.props.dispatch(fetchDate(this.props.dateString));
  }
  handleDayClick(e, day) {
    const dateString = dateFormat(day, 'yyyy-mm-dd');
    this.props.dispatch(routeActions.push(`/${dateString}`));
    this.props.dispatch(fetchDate(dateString));
  }
  render() {
    const innerContent = this.props.data ? (
      <div>
        <h1 dangerouslySetInnerHTML={{__html: this.props.data.title}} />
        <Collapse accordion={true} defaultActiveKey='1'>
          <Panel header='Чтения' key='1'>
            <ReadingList readings={this.props.data.readings} />
          </Panel>
          <Panel header='Святые' key='2'>
            <div dangerouslySetInnerHTML={{__html: this.props.data.saints}} />
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
