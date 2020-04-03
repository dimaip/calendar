import React from 'react';
import SelectBox from 'components/SelectBox/SelectBox';

const ServiceSelector = ({ service, services, onChange }) => {
    return <SelectBox items={services.map(i => ({ label: i, value: i }))} value={service} onChange={onChange} />;
};
export default ServiceSelector;
