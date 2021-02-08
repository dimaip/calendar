import React from 'react';

const Html = ({ html = '', className = '' }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} className={className} />
);
export default Html;
