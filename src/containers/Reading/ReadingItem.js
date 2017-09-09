import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import verseParse from 'helpers/verseParse';
import translations from 'constants/translations';
import Chapter from './Chapter';
import 'styles/Dropdown.css';
import s from './ReadingItem.scss';

export default class ReadingItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    verse: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      translations: [],
      activeTranslation: null
    };
  }

  componentDidMount() {
    const {bookKey} = verseParse(this.props.verse);
    fetch(`http://localhost:3000/translations/${bookKey}/`)
      .then(response => response.json())
      .then(response => this.setState(
        {
          translations: response,
          activeTranslation: response[0]
        }
      ));
  }

  render() {
    const clickHandler = ({value}) => this.setState({activeTranslation: value});
    const {bookKey, segments} = verseParse(this.props.verse);
    const activeTranslation = this.state.activeTranslation && translations[this.state.activeTranslation].title;
    const options = this.state.translations.map(i => (
      {
        value: i,
        label: translations[i].title
      }
    ));
    return (
      <div>
        <div className={s.root}>
          <div className={s.translationLabel}>Перевод: </div>
          <Dropdown options={options} onChange={clickHandler} value={activeTranslation} />
        </div>
        {this.state.activeTranslation && Object.keys(segments).map((i, key) => <Chapter key={key} chapterNumber={Number(i)} translation={this.state.activeTranslation} segments={segments[i]} bookKey={bookKey} />)}
      </div>
    );
  }
}
