import React, { useContext } from 'react';
import { css } from '@emotion/css';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';
import Button from 'components/Button/Button';
import ShareIcon from 'components/ShareIcon/ShareIcon';
import { useNavigate } from 'react-router-dom';

const ShareLogin = ({ className }: { className?: string }) => {
    const { toggleOpen } = useContext(DotsMenuContext);
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => {
                toggleOpen();
                alert('Войдите в аккаунт, чтобы иметь возможность поделиться чинопоследованием');
                void navigate('/profile', { replace: true });
            }}
            className={`${className} ${css`
                padding: 6px 6px !important;
                width: 100%;
                text-align: left;
            `}`}
        >
            <ShareIcon />{' '}
            <span
                className={css`
                    font-size: 13px;
                `}
            >
                Поделиться
            </span>
        </Button>
    );
};
export default ShareLogin;
