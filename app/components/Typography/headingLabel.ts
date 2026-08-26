import React from 'react';

export const OMIT_FROM_HEADING_LABEL = Symbol('omitFromHeadingLabel');

interface HeadingLabelComponent {
    [OMIT_FROM_HEADING_LABEL]?: boolean;
}

export const getHeadingLabel = (children: React.ReactNode): string =>
    React.Children.toArray(children)
        .map((child) => {
            if (typeof child === 'string' || typeof child === 'number') {
                return String(child);
            }
            if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
                const component = child.type as HeadingLabelComponent;
                if (component[OMIT_FROM_HEADING_LABEL]) {
                    return '';
                }
                return getHeadingLabel(child.props.children);
            }
            return '';
        })
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
