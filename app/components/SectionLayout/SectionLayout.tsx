import React from 'react';
import SolidSection from 'components/SolidSection/SolidSection';

export const SectionLayout = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
    if (React.Children.count(children) === 0) {
        return null;
    }
    return (
        <SolidSection marginTop={24} marginBottom={24} paddingBottom={24} marginHorizontal={-12}>
            <div style={{ marginTop: -4 }}>{children}</div>
        </SolidSection>
    );
};
