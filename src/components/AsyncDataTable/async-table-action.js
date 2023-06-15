import { Button, ButtonGroup, Slide } from "@mui/material";
import React, { forwardRef, useState } from "react";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
import ConfirmModal from "../Modal/confirm-delete";
import Tooltip from '@mui/material/Tooltip';


const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AsyncTableAction = (props) => {

    const { useActions, onHandleEditEvent, onHandleApproveCandidateEvent, onHandleReviewCandidateEvent } = props;
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
                    <Tooltip title="Invite to interview">
                        <Button variant="text" size="small" color="success"
                            onClick={onHandleApproveCandidateEvent}>
                            <HowToRegOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {useActions?.reviewCandidate &&
                    <Tooltip title="Review candidate">
                        <Button variant="text" size="small" color="primary"
                            onClick={onHandleReviewCandidateEvent}
                        >
                            <VisibilityIcon />
                        </Button>
                    </Tooltip>
                }

                {
                    useActions?.passedInterview &&
                    <Tooltip title="Make accessment">
                        <Button variant="text" size="small" color="success"
                            // onClick={onHandleReviewCandidateEvent}
                        >
                            <DoneOutlineSharpIcon />
                        </Button>
                    </Tooltip>
                }

                {useActions?.edit &&
                    <Tooltip title="Edit record">
                        <Button variant="text" size="small" color="inherit"
                            onClick={onHandleEditEvent}>
                            <DriveFileRenameOutlineOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {useActions?.delete &&
                    <Tooltip title="Delete record">
                        <Button variant="text" size="small" color="error"
                            onClick={() => setShowDeleteModal(true)}>
                            <DeleteOutlineOutlinedIcon />
                        </Button>
                    </Tooltip>
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