import React, {Component} from 'react';
import verseParse from 'helpers/verseParse';
import Chapter from './Chapter';

export default class ReadingItem extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    verse: React.PropTypes.string.isRequired
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
      .then(response => this.setState({translations: response}));
  }

  renderTranslationButton(key) {
    const clickHandler = (key) => () => this.setState({activeTranslation: key});
    return <li key={key}><button onClick={clickHandler.bind(this)(key)}>{key}</button></li>;
  }
  render() {
    const {bookKey, segments} = verseParse(this.props.verse);
    const activeTranslation = this.state.activeTranslation ? this.state.activeTranslation : this.state.translations[0];
    console.log(activeTranslation);
    return (
      <div key={this.props.title}>
        <ul>{this.state.translations.map(this.renderTranslationButton.bind(this))}</ul>
        <h2><em>{this.props.title}:</em> {this.props.verse}</h2>
        {activeTranslation && Object.keys(segments).map((i, key) => <Chapter key={key} chapterNumber={Number(i)} translation={activeTranslation} segments={segments[i]} bookKey={bookKey} />)}
      </div>
    );
  }
}
