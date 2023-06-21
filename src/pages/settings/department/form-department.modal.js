import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import React from "react";
import TitleComponent from "../../../components/Page/title";
import FooterComponent from "../../../components/Page/footer";

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };


const DepartmentFormModal = ({openDepartmentModal, onCloseDepartmentModal}) => {

    return (
        <div>
            <Dialog
                maxWidth="md"
                TransitionComponent={TransitionModal}
                open={openDepartmentModal}
                component="form"
            >
                <DialogTitle>
                    <TitleComponent title="New Department" />
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {/* Interview date Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="department-name-id"
                                    label="Department Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                />
                            </Grid>
                            {/* Interview date Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="description-id"
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        handleCancel={onCloseDepartmentModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default DepartmentFormModal;