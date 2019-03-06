import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import {Collapse} from 'react-collapse';
import s from './ReadingItem.scss';

import getReading from '../../redux/actions/getReading';


class ReadingItem extends Component {
    static propTypes = {
        reading: PropTypes.string
    };

    static defaultProps = {
        isOpened: false
    };

    constructor(props) {
        super(props);
        const {isOpened, getReading, reading, readings} = this.props;
        this.state = {isOpened: this.props.isOpened};
        if (readings && !readings[reading])
            getReading(reading);
    }

    handleHeaderClick = () => {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    render() {
        const {isOpened} = this.state;
        const readingLink = this.props.reading;
        const {readings} = this.props;
        let reading = false;
        if (readings && readings[readingLink])
            reading = readings[readingLink];
        var arrowStyles = [s.arrow];
        if (isOpened) {
            arrowStyles.push(s.arrowOpened);
        }

        let readingText;
        const getStyle = type => {
            switch (type) {
                case "regular":
                    return s.regular;
                case "regularNotOptional":
                    return s.regularNotOptional;
                case "optional":
                    return s.optional;
                case "hidden":
                    return s.hidden;
            }
        }

        if (reading !== false && reading.fragments) {
            readingText = [];
            reading.fragments.map((fragment, fi) => {
                if (fragment.type != 'hidden') {
                    readingText.push((
                        <div className={[s.fragmentChapter, getStyle(fragment.type)].join(" ")} key={'ch'+fi}>
                            Глава {fragment.chapter}</div>));
                    if (fragment.verses)
                        fragment.verses.map((verse, vk) => {
                            if (verse.type != 'hidden')
                                readingText.push(<div className={[s.fragmentVerse, getStyle(verse.type)].join(" ")}
                                                      key={'ch'+fi+'v'+vk}><span
                                    className={s.fragmentVerseNo}>{verse.verse}</span>{verse.text}</div>);
                        });
                }
            });
        } else {
            readingText = <div className={s.notFound}>Отрывок не найден</div>;
        }

        return (
            <div className={s.wrapper}>
                <div className={s.header} onClick={this.handleHeaderClick}>
                    <i className={arrowStyles.join(" ")}></i>
                    {readingLink}
                </div>

                <Collapse isOpened={isOpened}>
                    <div className={s.content}>
                        <div className={s.contentbox}>
                            {readingText}
                        </div>
                        <button className={s.slideUp} onClick={this.handleHeaderClick}><i
                            className={[s.arrow, s.arrowUp].join(" ")}></i>свернуть
                        </button>
                    </div>
                </Collapse>
            </div>
        );
    }
}

const mapStateToProps = state => state.readings;


function mapDispatchToProps(dispatch) {
    return {
        getReading: bindActionCreators(getReading, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReadingItem))

