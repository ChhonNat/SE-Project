import { Button, ButtonGroup, IconButton, Slide } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConfirmModal from "../Modal/confirm-delete";
import Tooltip from '@mui/material/Tooltip';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AsyncTableAction = (props) => {

    const {
        useActions,
        row,
        onHandleEditEvent,
        onHandleViewEvent,
        onHandleViewFileEvent,
        onHandleViewSecFileEvent,
        onHandleMoreEvent,
    } = props;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showMoreOptionAnchor, setShowMoreOptionAnchor] = useState(false);
    const openMoreOption = Boolean(showMoreOptionAnchor);

    const checkButtonAction = (condition) => {

        if (typeof condition === 'boolean')
            return condition;

        const trueCondition = [];

        if (condition && condition.length) {
            condition.forEach((ele, index) => {
                const { values, field } = condition[index];
                trueCondition.push(values.includes(row[field]));
            });
        }

        if (!trueCondition?.length)
            return false;

        if (trueCondition?.includes(false))
            return false;

        return true
    };

    const enableMoreOption = (buttons) => {
        if (!buttons || !buttons?.length)
            return false;

        if (buttons?.length)
            return !buttons?.every((button) => button?.hidden);
    }

    return (
        <>
            {/* All button actions */}
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
            >

                {useActions?.view &&
                    <Tooltip title="View record">
                        <Button variant="text" size="small" color="primary"
                            onClick={onHandleViewEvent}>
                            <VisibilityIcon />
                        </Button>
                    </Tooltip>
                }

                {useActions?.viewFile &&
                    <Tooltip title="View Evaluate Form">
                        <Button variant="text" size="small" color="inherit"
                            onClick={onHandleViewFileEvent}>
                            <FileOpenIcon />
                        </Button>
                    </Tooltip>
                }

                {useActions?.viewSecFile &&
                    <Tooltip title="View Reference Form">
                        <Button variant="text" size="small" color="info"
                            onClick={onHandleViewSecFileEvent}>
                            <FileOpenIcon />
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

                {/* Show button to delete the candidate */}
                {useActions?.delete &&
                    <Tooltip title="Delete record">
                        <Button variant="text" size="small" color="info"
                            onClick={() => setShowDeleteModal(true)}>
                            <DeleteOutlineOutlinedIcon />
                        </Button>
                    </Tooltip>
                }

                {/* More options */}
                {/* {
                    enableMoreOption(useActions?.moreOption?.buttons) ?
                        <> */}
                <IconButton
                    aria-label="more-option"
                    size="medium"
                    aria-controls={openMoreOption ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMoreOption ? 'true' : undefined}
                    onClick={(e) => setShowMoreOptionAnchor(e?.currentTarget)}
                    disabled={enableMoreOption(useActions?.moreOption?.buttons) ? false : true}
                >
                    <MoreVertOutlinedIcon />
                </IconButton>
                <Menu
                    id="menu"
                    anchorEl={showMoreOptionAnchor}
                    open={openMoreOption}
                    onClose={() => setShowMoreOptionAnchor(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        useActions?.moreOption?.buttons.map((button, index) => (
                            !button?.hidden &&
                            <MenuItem
                                key={index}
                                onClick={() => onHandleMoreEvent(button?.eventName || '')}
                                disabled={!checkButtonAction(button?.enable)}
                            >
                                {button?.icon && <>{button?.icon}</>}
                                <label style={{ fontSize: 13, marginLeft: 5, cursor: 'pointer' }}>
                                    {button?.name}
                                </label>
                            </MenuItem>
                        ))
                    }

                </Menu>

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