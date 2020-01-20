import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import s from './ReadingItem.scss';

import getReading from '../../redux/actions/getReading';

class ReadingItem extends Component {
    static propTypes = {
        reading: PropTypes.string,
    };

    static defaultProps = {
        isOpened: false,
    };

    constructor(props) {
        super(props);
        const { isOpened, getReading, reading, readings } = this.props;
        this.state = { isOpened, isPerevodSelectOpened: false };
        if (readings && !readings[reading]) getReading(reading, 'default');
    }

    handleHeaderClick = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    };

    handlePerevodItemClick = perevod => () => {
        const { getReading, reading } = this.props;
        getReading(reading, perevod);

        this.setState({
            isPerevodSelectOpened: false,
        });
    };

    handlePerevodMouseOver = () => {
        this.setState({
            isPerevodSelectOpened: true,
        });
    };

    handlePerevodMouseOut = () => {
        this.setState({
            isPerevodSelectOpened: false,
        });
    };

    render() {
        const { isOpened, isPerevodSelectOpened } = this.state;
        const readingLink = this.props.reading;
        const { readings } = this.props;
        let reading = false;
        if (readings && readings[readingLink]) reading = readings[readingLink];
        var arrowStyles = [s.arrow];
        if (isOpened) {
            arrowStyles.push(s.arrowOpened);
        }

        let readingText;
        const getStyle = type => {
            switch (type) {
                case 'regular':
                    return s.regular;
                case 'regularNotOptional':
                    return s.regularNotOptional;
                case 'optional':
                    return s.optional;
                case 'hidden':
                    return s.hidden;
            }
        };

        if (reading !== false && reading.fragments) {
            readingText = [];
            let translationCurrentName;

            const perevodItems = reading.translationList.map((item, i) => {
                if (item.id == reading.translationCurrent) translationCurrentName = item.name;

                return (
                    <button className={s.perevodItem} onClick={this.handlePerevodItemClick(item.id)} key={'pi' + i}>
                        {item.name}
                    </button>
                );
            });

            readingText.push(
                <div
                    className={s.perevod}
                    onMouseOver={this.handlePerevodMouseOver}
                    onMouseLeave={this.handlePerevodMouseOut}
                    key="prvd"
                >
                    <div className={s.perevodSelected}>Перевод {translationCurrentName}</div>
                    <Collapse className={s.perevodSelect} isOpened={isPerevodSelectOpened}>
                        {perevodItems}
                    </Collapse>
                </div>
            );
            reading.fragments.map((fragment, fi) => {
                if (fragment.type != 'hidden') {
                    readingText.push(
                        <div className={[s.fragmentChapter, getStyle(fragment.type)].join(' ')} key={'ch' + fi}>
                            Глава {fragment.chapter}
                        </div>
                    );
                    if (fragment.verses)
                        fragment.verses.map((verse, vk) => {
                            if (verse.type != 'hidden')
                                readingText.push(
                                    <div
                                        className={[s.fragmentVerse, getStyle(verse.type)].join(' ')}
                                        key={'ch' + fi + 'v' + vk}
                                    >
                                        <span className={s.fragmentVerseNo}>{verse.verse}</span>
                                        {verse.text}
                                    </div>
                                );
                        });
                }
            });
        } else {
            readingText = <div className={s.notFound}>Отрывок не найден</div>;
        }

        return (
            <div className={s.wrapper}>
                <div className={s.header} onClick={this.handleHeaderClick}>
                    <i className={arrowStyles.join(' ')}></i>
                    {readingLink}
                </div>

                <Collapse isOpened={isOpened}>
                    <div className={s.content}>
                        <div className={s.contentbox}>{readingText}</div>
                        <button className={s.slideUp} onClick={this.handleHeaderClick}>
                            <i className={[s.arrow, s.arrowUp].join(' ')}></i>свернуть
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
        getReading: bindActionCreators(getReading, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReadingItem));
