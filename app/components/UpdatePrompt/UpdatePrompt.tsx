import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';

import pendingUpdateState from 'state/pendingUpdateState';

export default function UpdatePrompt(): JSX.Element {
    const [pendingVersion, setPendingVersion] = useRecoilState(pendingUpdateState);
    const theme = useTheme();

    const handleClose = (_event: Event | React.SyntheticEvent, reason?: SnackbarCloseReason): void => {
        if (reason === 'clickaway') {
            return;
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
