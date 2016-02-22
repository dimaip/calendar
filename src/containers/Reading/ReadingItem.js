import React from 'react';

const ReadingItem = ({title, verse, text}) => {
  return (
    <div>
      <h2>{verse} <em>{title}</em></h2>
      <div>{text}</div>
    </div>
  );
};
ReadingItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  verse: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
};
export default ReadingItem;
