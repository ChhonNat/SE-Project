import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

const ConfirmModal = (props) => {

    const { open, onHandleCloseModal, TransitionModal } = props;
    
    return (
        <Dialog
            open={open}
            TransitionComponent={TransitionModal}
            keepMounted
            onClose={onHandleCloseModal}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="lg"
        >
            <DialogTitle>{"Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this candidate?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onHandleCloseModal}
                    variant="outlined"
                    color="error"
                >
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                >
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmModal;