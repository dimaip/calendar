import React from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import QuestionMark from 'components/svgs/QuestionMark';
import { useSubscriptionService } from 'stateMachines/subscription';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from 'emotion-theming';

const UserIcon = () => {
    const { user } = useAuth0();
    const theme = useTheme();
    const initials = user ? `${user.given_name[0]}${user.family_name[0]}` : 'a';

    return (
        <div
            className={css`
                padding: 5px;
                font-size: 10px;
                background-color: ${theme.colours.blue};
                color: white;
                border-radius: 50%;
            `}
        >
            {initials}
        </div>
    );
};

const ProfileLink = () => {
    const [_state, send] = useSubscriptionService();
    const { isAuthenticated } = useAuth0();
    return (
        <Button
            onClick={() => {
                send({
                    type: 'PROFILE_CLICK',
                });
            }}
            className={css`
                padding: 8px;
            `}
            title="Данные о подписке"
        >
            {isAuthenticated ? <UserIcon /> : <QuestionMark />}
        </Button>
    );
};
export default ProfileLink;
