import React from 'react';

export const Then = ({ children }) => children;
export const Else = ({ children }) => children;

const If = ({ condition, children }) => {
    if (React.Children.count(children) === 2 && React.Children.toArray(children)[0]?.props?.mdxType === 'Then') {
        if (condition) {
            return <Then>{children[0]}</Then>;
        }
        return <Else>{children[1]}</Else>;
    }
    return <>{condition ? children : null}</>;
};

export default If;
