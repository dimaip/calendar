import React, {Component} from 'react';

let prevVerse;
const renderVerse = ({verse, content}, key) => {
  let elipsis = '';
  if (Number(prevVerse) + 1 !== Number(verse)) {
    elipsis = <div>...</div>;
  }
  prevVerse = verse;
  return (<div key={`${key}${verse}`}>{elipsis}<em>{verse}:</em> {content}</div>);
};

const findVerse = (chapter, verseNumber) => chapter.find(i => Number(i.verse) === verseNumber);

const filterChapter = (chapter, segments) => {
  const ret = [];
  segments.map(segment => {
    const upperLimit = segment[1] ? segment[1] : 1000;
    for (let i = segment[0]; i <= upperLimit; i++) {
      const verse = findVerse(chapter, i);
      if (verse) {
        ret.push(verse);
      } else {
        i = 1000;
      }
    }
  });
  return ret;
};

export default class Chapter extends Component {
  static propTypes = {
    segments: React.PropTypes.array.isRequired,
    chapterNumber: React.PropTypes.number.isRequired,
    bookKey: React.PropTypes.string.isRequired,
    translation: React.PropTypes.string.isRequired
  };
  constructor() {
    super();
    this.state = {
      chapter: []
    };
  }
  componentDidMount() {
    this.fetch(this.props);
  }
  componentWillReceiveProps(props) {
    this.fetch(props);
  }
  fetch(props) {
    const {segments, chapterNumber, bookKey, translation} = props;
    fetch(`http://localhost:3000/bible/${translation}/${bookKey}/${chapterNumber}.json`)
      .then(response => response.json())
      .then(response => filterChapter(response, segments))
      .then(response => this.setState({chapter: response}));
  }
  render() {
    prevVerse = 0;
    return (
      <div>
        <h3>Глава {this.props.chapterNumber}</h3>
        {this.state.chapter && this.state.chapter.map(renderVerse)}
      </div>
    );
  }
}
