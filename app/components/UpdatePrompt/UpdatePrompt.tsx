import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useRecoilState } from 'recoil';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

import pendingUpdateState, { updateStatusState } from 'state/pendingUpdateState';
import { applyUpdate, dismissUpdate } from 'checkVersion';

export default function UpdatePrompt(): JSX.Element {
    const [pendingVersion, setPendingVersion] = useRecoilState(pendingUpdateState);
    const [status, setStatus] = useRecoilState(updateStatusState);
    const theme = useTheme();

    useEffect(() => {
        setStatus((current) => (current === 'updating' ? current : 'idle'));
    }, [pendingVersion, setStatus]);

    const handleClose = (_event: React.SyntheticEvent | React.MouseEvent, reason?: string): void => {
        if (reason === 'clickaway' || status === 'updating') {
            return;
        }

        if (pendingVersion) dismissUpdate(pendingVersion);
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
            message={
                status === 'updating'
                    ? 'Обновление…'
                    : status === 'failed'
                      ? 'Не удалось обновить. Проверьте соединение и попробуйте ещё раз.'
                      : 'Доступно обновление'
            }
            action={
                <>
                    <Button
                        style={{ color: theme.colours.primary, fontWeight: 'bold', textTransform: 'uppercase' }}
                        size="small"
                        disabled={status === 'updating'}
                        onClick={() => {
                            if (!pendingVersion || status === 'updating') return;
                            setStatus('updating');
                            void applyUpdate(pendingVersion).catch(() => {
                                setStatus('failed');
                            });
                        }}
                    >
                        {status === 'updating' ? 'Обновление…' : status === 'failed' ? 'Повторить' : 'Обновить'}
                    </Button>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        disabled={status === 'updating'}
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    );
}
