import React from 'react';

const Html = ({ html = '', className = '' }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} className={className} />;
};
export default Html;
