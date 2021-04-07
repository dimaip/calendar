import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useRecoilState } from 'recoil';
import pendingUpdateState from 'state/pendingUpdateState';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

export default function UpdatePrompt(): JSX.Element {
    const [pendingVersion, setPendingVersion] = useRecoilState(pendingUpdateState);
    const theme = useTheme();

    const handleClose = (_event: React.SyntheticEvent | React.MouseEvent, reason?: string): void => {
        if (reason === 'clickaway') {
            return null;
        }

        setPendingVersion(null);
    };

    return (
        <Snackbar
            className={css`
                padding-bottom: env(safe-area-inset-top);
            `}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={Boolean(pendingVersion)}
            onClose={handleClose}
            message="Доступно обновление"
            action={
                <>
                    <Button
                        style={{ color: theme.colours.primary, fontWeight: 'bold', textTransform: 'uppercase' }}
                        size="small"
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Обновить
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    );
}
