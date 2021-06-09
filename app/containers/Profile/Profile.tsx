import React from 'react';
import { useApi } from 'hooks/useApi';

const Profile = (): JSX.Element => {
    const { data, error } = useApi<{ success: boolean }>('http://localhost:3001/profile/subscriptionInfo');
    console.log(error, data);
    return <div>{JSON.stringify(data)}</div>;
};

export default Profile;
