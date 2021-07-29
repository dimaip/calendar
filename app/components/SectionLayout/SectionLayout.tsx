import React from 'react';
import SolidSection from 'components/SolidSection/SolidSection';

export const SectionLayout = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
    if (React.Children.count(children) === 0) {
        return null;
    }
    return (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            {children}
        </SolidSection>
    );
};
