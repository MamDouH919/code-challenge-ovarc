import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Paper, Stack } from '@mui/material';
import { styled } from "@mui/material/styles";

const DialogContentStyle = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(2)
}));

const DialogTitleStyle = styled(DialogTitle)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 2),
    "& h2": {
        padding: theme.spacing(1)
    }
}));

export default function CustomDialog({
    open,
    handleClose,
    PaperProps,
    title,
    content,
    buttonAction,
    hideActions = false,
    maxWidth = 'xs'
}) {
    return (
        <React.Fragment>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                PaperProps={PaperProps}
                maxWidth={maxWidth}
            >
                {title && (
                    <Stack sx={{ background: (theme) => theme.palette.primary.main }}>
                        <DialogTitleStyle textTransform={"capitalize"}>
                            {title}
                        </DialogTitleStyle>
                    </Stack>
                )}
                {content && <DialogContentStyle>{content}</DialogContentStyle>}
                {!hideActions && (
                    <DialogActions sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
                        <Stack direction={"row"} spacing={1}>
                            <Button onClick={handleClose} color='primary' variant='outlined'>
                                {"cancel"}
                            </Button>
                            {buttonAction}
                        </Stack>
                    </DialogActions>
                )}
            </Dialog>
        </React.Fragment>
    );
}