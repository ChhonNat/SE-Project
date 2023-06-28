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
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AsyncTableAction = (props) => {

    const { useActions,
        onHandleEditEvent,
        onHandleApproveCandidateEvent,
        onHandleReviewCandidateEvent,
        onHandleAssessmentCandidateEvent,
        onHandleEditResult,
        onHandleEditStatus
    } = props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            {/* All button actions */}
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
            >

                {/* Show button approve candidate when the candidate passed the shortlist */}
                {useActions?.approveCandidate &&
                    <Tooltip title="Invite to interview">
                        <Button variant="text" size="small" color="success"
                            onClick={onHandleApproveCandidateEvent}>
                            <HowToRegOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {/* Show button review candidate info to decide about the CV result */}
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
                    <Tooltip title="Make assessment">
                        <Button variant="text" size="small" color="success"
                            onClick={onHandleAssessmentCandidateEvent}
                        >
                            <HowToRegOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {/* Show button edit the candidate */}
                {useActions?.edit &&
                    <Tooltip title="Edit record">
                        <Button variant="text" size="small" color="inherit"
                            onClick={onHandleEditEvent}>
                            <DriveFileRenameOutlineOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {/* Show button edit result */}
                {useActions?.editResult &&
                    <Tooltip title="Edit shortlist result">
                        <Button variant="text" size="small" color="info"
                            onClick={onHandleEditResult}>
                            <CheckBoxOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {/* Show button edit status */}
                {useActions?.editStatus &&
                    <Tooltip title="Edit status">
                        <Button variant="text" size="small" color="secondary"
                            onClick={onHandleEditStatus}>
                            <CheckCircleOutlineOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {/* Show button to delete the candidate */}
                {useActions?.delete &&
                    <Tooltip title="Delete record">
                        <Button variant="text" size="small" color="error"
                            onClick={() => setShowDeleteModal(true)}>
                            <DeleteOutlineOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

            </ButtonGroup>


            {/* Confirm delete modal when click on delete button */}
            <ConfirmModal
                TransitionModal={TransitionModal}
                open={showDeleteModal}
                onHandleCloseModal={() => setShowDeleteModal(false)}
            />


        </>

    )
};

export default AsyncTableAction;