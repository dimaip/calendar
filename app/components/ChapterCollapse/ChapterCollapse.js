import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import s from './ChapterCollapse.scss';

class ChapterCollapse extends Component {
    static propTypes = {
        isOpened: PropTypes.bool,
        header: PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    };

    static defaultProps = {
        isOpened: false,
    };

    constructor(props) {
        super(props);
        this.state = { isOpened: this.props.isOpened };
    }

    handleHeaderClick = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    };

    render() {
        const { isOpened } = this.state;
        const { header, children } = this.props;
        var arrowStyles = [s.arrow];
        if (isOpened) {
            arrowStyles.push(s.arrowOpened);
        }

        return (
            <div className={s.wrapper}>
                <div className={s.header} onClick={this.handleHeaderClick}>
                    <i className={arrowStyles.join(' ')}></i>
                    {header}
                </div>

                <Collapse isOpened={isOpened}>
                    <div className={s.content}>
                        <div className={s.contentbox}>{children}</div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default ChapterCollapse;
