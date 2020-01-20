import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import DayPicker from '../DayPicker/DayPicker.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import dateFormat from 'dateformat';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import { isEmpty, pathOr } from 'ramda';
import ChapterCollapse from '../ChapterCollapse/ChapterCollapse.js';
import ReadingList from '../ReadingList/ReadingList.js';
import Nav from '../Nav/Nav.js';
import HeadingBar from '../HeadingBar/HeadingBar.js';
import Loader from '../Loader/Loader.js';

import '../../styles/Slides.css';

import getDay from '../../redux/actions/getDay';

class Main extends Component {
    static propTypes = {
        params: PropTypes.object,
    };

    constructor() {
        super();
        this.state = {
            calendarShown: false,
            direction: 'mount',
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.days !== this.props.days) {
            const day = pathOr(null, ['days', this.getDate(newProps)], newProps);
            if (isEmpty(this.state.day) && day) {
                this.setState({ day });
            }
        }
    }

    componentDidMount() {
        if (isEmpty(this.props.day)) {
            this.props.getDay(this.getDate(this.props));
        }
    }

    getDate(props) {
        return props.match.params.date || dateFormat(new Date(), 'yyyy-mm-dd');
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
            direction,
        });
    };

    handleToggleClick = () => {
        this.setState({
            calendarShown: !this.state.calendarShown,
        });
    };

    handleClickShift = direction => () => {
        const date = this.getDate(this.props);
        switch (direction) {
            case 'left':
                this.setNewDate(dateFormat(moment(date).subtract(1, 'days'), 'yyyy-mm-dd'));
                break;
            case 'right':
                this.setNewDate(dateFormat(moment(date).add(1, 'days'), 'yyyy-mm-dd'));
                break;
        }
        this.setState({ direction });
    };

    render() {
        let { day } = this.props;
        const date = this.getDate(this.props);

        const innerContent = (
            <Loader loaded={!isEmpty(day)}>
                <div>
                    {(day.title || day.fast) && <HeadingBar title={day.title} subTitle={day.fast} />}
                    <ReadingList readings={day.readings || {}} date={date} />
                    <div dangerouslySetInnerHTML={{ __html: day.saints }} />
                </div>
            </Loader>
        );
        return (
            <div>
                <Nav date={date} handleToggleClick={this.handleToggleClick} handleClickShift={this.handleClickShift} />
                {this.state.calendarShown && (
                    <DayPicker onDayClick={this.handleDayClick} locale="ru" localeUtils={LocaleUtils} />
                )}
                <div className="slide-wrap">
                    <ReactCSSTransitionGroup
                        className="slide-transition-group"
                        transitionName={`slide-${this.state.direction}`}
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}
                    >
                        <div className="slide" key={date}>
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
        getDay: bindActionCreators(getDay, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
