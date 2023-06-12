import { Button, ButtonGroup, Slide } from "@mui/material";
import React, { forwardRef, useState } from "react";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ConfirmModal from "../Modal/confirm";
import Tooltip from '@mui/material/Tooltip';


const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AsyncTableAction = (props) => {

    const { useActions, onHandleEditEvent, onHandleApproveCandidateEvent } = props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            {/* All button actions */}
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
            >
                {useActions?.approveCandidate &&
                    <Tooltip title="Approve candidate">
                        <Button variant="text" size="small" color="success" onClick={onHandleApproveCandidateEvent}>
                            <HowToRegOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {useActions?.edit &&
                    <Button variant="text" size="small" color="primary" onClick={onHandleEditEvent}>
                        <DriveFileRenameOutlineOutlinedIcon />
                    </Button>
                }
                {useActions?.delete &&
                    <Button variant="text" size="small" color="error" onClick={() => setShowDeleteModal(true)}>
                        <DeleteOutlineOutlinedIcon />
                    </Button>
                }
            </ButtonGroup>


            {/* Confirm delete modal */}
            <ConfirmModal
                TransitionModal={TransitionModal}
                open={showDeleteModal}
                onHandleCloseModal={() => setShowDeleteModal(false)}
            />
        </>

    )
};

export default AsyncTableAction;