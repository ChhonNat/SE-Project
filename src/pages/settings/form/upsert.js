import React, { forwardRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, Grid, Dialog, DialogTitle, DialogContent, Slide, DialogActions } from "@mui/material";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import _useHttp from "../../../hooks/_http";
import { HTTP_METHODS } from "../../../constants/http_method";
import Swal from "sweetalert2";
import { ALERT_TIMER } from "../../../constants/app_config";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertForm = (props) => {

    const { openModal, onCloseModal, handleEventSuccessed, title, model, editData, keyPosts, postUrl, putUrl, dataType } = props;
    const { register, handleSubmit, reset, setValue } = useForm({ resolver: zodResolver(model) });
    const { data, loading, error, message, sendRequest } = _useHttp();

    useEffect(() => {
        
        console.log(editData);

        if (editData?.id) {

            for(let key in editData){
                setValue(key, editData[key])
            }
        } 
        else {
            setValue('name', null);
            setValue('description', null);
            setValue('status', 'Active');
        }

    }, [openModal])

    const onError = (data) => console.log(data);

    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {
            
            if (keyPosts.includes(key)) {
                postData[key] = data[key];
            }
        });

        await sendRequest(!editData?.id ? postUrl : `${putUrl}${editData?.id}${dataType}`, !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
    }

    useEffect(() => {

        if (!loading) {

            Swal.fire({
                title: !error ? 'Success' : 'Error',
                text: message,
                icon: !error ? 'success' : 'error',
                confirmButtonText: 'OK',
                timer: ALERT_TIMER
            });

            onCloseModal();
            reset();

            if (!error)
                handleEventSuccessed();

        }

    }, [data, error, loading, message])

    return (

        <>
            <Dialog
                maxWidth="sm"
                TransitionComponent={TransitionModal}
                open={openModal}
                component="form"
                onSubmit={handleSubmit(submit, onError)}
            >
                <DialogTitle>
                    <TitleComponent title={title} />
                </DialogTitle>
                <DialogContent dividers>

                    <Box sx={{ width: '100%' }}>

                        {/* Input Fields */}
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    {...register('name')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    {...register('description')}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {/* Footer Page */}
                    <FooterComponent
                        saveButtunType="submit"
                        actions={{ cancel: true, submit: true }}
                        handleCancel={onCloseModal}
                    />
                </DialogActions>

            </Dialog >
        </>
    )
};

export default UpsertForm;