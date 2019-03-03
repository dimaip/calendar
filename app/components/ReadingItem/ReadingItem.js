import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Collapse} from 'react-collapse';
import s from './ReadingItem.scss';

class ReadingItem extends Component {
    static propTypes = {
        reading: PropTypes.string
    };

    static defaultProps = {
        isOpened: false
    };

    constructor(props) {
        super(props);
        this.state = {isOpened: this.props.isOpened};
    }

    handleHeaderClick = () => {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    render() {
        const {isOpened} = this.state;
        const {reading} = this.props;
        var arrowStyles = [s.arrow];
        if (isOpened) {
            arrowStyles.push(s.arrowOpened);
        }

        return (
            <div className={s.wrapper}>
                <div className={s.header} onClick={this.handleHeaderClick}>
                    <i className={arrowStyles.join(" ")}></i>
                    {reading}
                </div>

                <Collapse isOpened={isOpened}>
                    <div className={s.content}>
                        <div className={s.contentbox}>
                            текст
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}


export default ReadingItem;