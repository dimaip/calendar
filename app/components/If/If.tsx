import React from 'react';

export const Then = ({ children }) => <>{children}</>;
export const Else = ({ children }) => <>{children}</>;

const If = ({ condition, children }) => {
    const childrenArray = React.Children.toArray(children)
    const thenEl = childrenArray.find(el => el?.type?.name === 'Then')
    const elseEl = childrenArray.find(el => el?.type?.name === 'Else')


    if (thenEl || elseEl) {
        if (condition) {
            return <Then>{thenEl}</Then>;
        }
        return <Else>{elseEl}</Else>;
    }
    return <>{condition ? children : null}</>;
};

export default If;
