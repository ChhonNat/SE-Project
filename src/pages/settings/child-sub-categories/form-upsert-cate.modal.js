import Box from "@mui/material/Box";
import React, { forwardRef, useEffect } from "react";
import Swal from "sweetalert2";
import LabelRequire from "../../../components/Label/require";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";

import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slide, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";
import { API_URL } from "../../../constants/api_url";
import { DATA_STATUS } from "../../../constants/data_status";
import { HTTP_STATUS } from "../../../constants/http_status";
import { KEY_POST } from "../../../constants/key_post";
import { categoryModel } from "../../../models/cate-model";
import { childSuCategoryService } from "../../../services/child-sub-category.service";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertCateFormModel = (props) => {

    const { openModal, onCloseModal, handleEventSucceed, title, editData } = props;

    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors }
        = useForm({
            resolver: zodResolver(editData?.id ? categoryModel.Update : categoryModel.Create)
        });

    const watchData = watch();
    const { errors } = formState;

    useEffect(() => {

        reset();
        clearErrors();

        if (editData?.id && openModal) {

            for (let key in editData) {
                if (key === 'ordering') {
                    const valueAsString = editData[key].toString();
                    setValue(key, valueAsString);
                }

                else {
                    setValue(key, editData[key]);
                }
            }
        }

    }, [openModal])

    const onError = (data) => console.log(data);

    // console.log("Key values: " + data)
    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {
            if (KEY_POST.category.includes(key)) {
                postData[key] = data[key];
            }
        });

        try {

            let submitMCate;

            if (editData?.id)
                submitMCate = await childSuCategoryService.update(editData?.id, postData);
            else
                submitMCate = await childSuCategoryService.create(postData);

            const { data, status } = submitMCate;

            if (status === HTTP_STATUS.success) {

                if (status === DATA_STATUS.success)
                    handleEventSucceed();

                /**
                 * Alert after request responses
                 */
                Swal.fire({
                    title: status === DATA_STATUS.success ? "Success" : "Error",
                    text: data?.message,
                    icon: status === DATA_STATUS.success ? "success" : "error",
                    confirmButtonText: "OK",
                    size: 200,
                });

                handleCloseModal();
            }

        } catch (error) {
            console.log('post error', error);
        }
    }

    const handleCloseModal = () => {
        reset();
        clearErrors();
        onCloseModal();
    }

    return (

        <>
            <Dialog
                maxWidth="sm"
                TransitionComponent={TransitionModal}
                open={openModal}
                component="form"
                onSubmit={handleSubmit(submit, onError)}
                onClose={onCloseModal}
            >
                <DialogTitle>
                    <TitleComponent title={title} />
                    {
                        onCloseModal ? (
                            <IconButton
                                aria-label="close"
                                onClick={onCloseModal}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <Close />
                            </IconButton>
                        ) :
                            null
                    }
                </DialogTitle>
                <DialogContent dividers>

                    <Box sx={{ width: '100%' }}>

                        {/* Input Fields */}
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {/* select models */}
                            <Grid item xs={12}>
                                <AsyncAutoComplete
                                    id="category-id"
                                    label="Sub Categories"
                                    size="small"
                                    callToApi={API_URL.lookup.subCate.get}
                                    bindField={"nameEn"}
                                    handleOnChange={(e, value) => {
                                        setValue("subCateId", value?.id);
                                    }}
                                    value={watchData?.subCateId || null}
                                    isRequire={true}
                                    err={errors?.subCateId?.message}
                                />
                            </Grid>

                            {/* English name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="en-name"
                                    label={<LabelRequire label="Name (EN)" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    error={errors?.nameEn ? true : false}
                                    helperText={errors?.nameEn?.message}
                                    {...register('nameEn')}
                                />
                            </Grid>

                            {/* Khmer name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="kh-name"
                                    label={<LabelRequire label="Name (KH)" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    error={errors?.nameKh ? true : false}
                                    helperText={errors?.nameKh?.message}
                                    {...register('nameKh')}
                                />
                            </Grid>

                            {/*Short name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="number"
                                    id="short-name"
                                    label={<LabelRequire label="Ordering" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    error={errors?.ordering ? true : false}
                                    helperText={errors?.ordering?.message}
                                    {...register('ordering')}
                                />
                            </Grid>

                            {/* Status */}
                            {/* {editData?.id &&
                                <Grid item xs={12}>
                                    <SelectComponent
                                        id="status-id"
                                        label={'Status'}
                                        size={'small'}
                                        customDatas={[STATUS.RECORD.ACTIVE, STATUS.RECORD.INACTIVE]}
                                        value={watchData?.status || ""}
                                        handleOnChange={(e) => setValue('status', e?.target?.value)}
                                    />
                                </Grid>
                            } */}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {/* Footer Page */}
                    <FooterComponent
                        saveButtonType="submit"
                        saveButtonLabel={editData?.id ? "Update" : "Save"}
                        actions={{ cancel: true, submit: true }}
                        handleCancel={handleCloseModal}
                    />
                </DialogActions>

            </Dialog >
        </>
    )
};

export default UpsertCateFormModel;