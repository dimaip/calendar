import React, { ReactNode } from 'react';
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export const Dialog = ({
    children,
    onClose,
    actions,
    title,
}: {
    children: ReactNode;
    onClose: () => void;
    actions?: ReactNode;
    title?: ReactNode;
}) => (
    <MuiDialog onClose={onClose} open>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
);
