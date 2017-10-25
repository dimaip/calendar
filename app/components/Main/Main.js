import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import moment from 'moment';
import DayPicker from '../DayPicker/DayPicker.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import dateFormat from 'dateformat';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import Collapse, { Panel } from 'rc-collapse';
import { isEmpty, pathOr } from 'ramda';
import ReadingList from '../ReadingList/ReadingList.js';
import Nav from '../Nav/Nav.js';
import HeadingBar from '../HeadingBar/HeadingBar.js';
import Loader from '../Loader/Loader.js';

import '../../styles/Collapse.global.scss';
import '../../styles/Slides.css';

import getDay from '../../redux/actions/getDay';

class Main extends Component {
    static propTypes = {
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
        if (newProps.days !== this.props.days) {
            const day = pathOr(null, ['days', newProps.date], newProps);
            if (isEmpty(this.state.day) && day) {
                this.setState({ day });
            }
        }
    }

    setNewDate(dateString) {
        this.props.history.push(`/date/${dateString}`);
        this.props.getDay(dateString);
    }

    handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');
        const direction = dateString > this.props.date ? 'right' : 'left';

        this.setNewDate(dateString);
        this.setState({
            calendarShown: false,
            direction
        });
    }

    handleToggleClick = () => {
        this.setState({
            calendarShown: !this.state.calendarShown
        });
    }

    handleClickShift = direction => () => {
        const { date } =this.props;
        switch (direction) {
            case 'left':
                this.setNewDate(dateFormat(moment(date).subtract(1, 'days'), 'yyyy-mm-dd'));
                break;
            case 'right':
                this.setNewDate(dateFormat(moment(date).add(1, 'days'), 'yyyy-mm-dd'));
                break;
        }
        this.setState({ direction });
    }

    render() {
        let { day, date } = this.props;

        const innerContent = (
            <Loader loaded={!isEmpty(day)}>
                <div>
                    {(day.title || day.fast)
                    && <HeadingBar title={day.title} subTitle={day.fast} />}
                    <Collapse accordion={true} defaultActiveKey='1'>
                        <Panel header='Чтения' key='1'>
                            <ReadingList readings={ day.readings || {}} date={date} />
                        </Panel>
                        <Panel header='Святые' key='2'>
                            <div dangerouslySetInnerHTML={{__html: day.saints}} />
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
                    date={date}
                    handleToggleClick={this.handleToggleClick}
                    handleClickShift={this.handleClickShift}
                />
                {this.state.calendarShown &&
                <DayPicker onDayClick={this.handleDayClick} locale='ru' localeUtils={LocaleUtils} />}
                <div className='slide-wrap'>
                    <ReactCSSTransitionGroup
                        className='slide-transition-group'
                        transitionName={`slide-${this.state.direction}`}
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}
                    >
                        <div className='slide' key={date}>
                            {innerContent}
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state.days;

function mapDispatchToProps(dispatch) {
    return {
        getDay: bindActionCreators(getDay, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main))


