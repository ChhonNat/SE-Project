import React, { forwardRef, useCallback, useEffect, useState } from "react";
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
import SelectComponent from "../../../components/Selector/select";
import { STATUS } from "../../../constants/status";
import MultiSelectComponent from "../../../components/MultiSelector/select";
import { globalService } from "../../../services/global.service";
import { HTTP_STATUS } from "../../../constants/http_status";
import { API_URL } from "../../../constants/api_url";
import { KEY_POST } from "../../../constants/key_post";
import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertPositionForm = (props) => {


    const { openModal, onCloseModal, handleEventSuccessed, title, model, editData, keyPosts, postUrl, putUrl, dataType } = props;
    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors } = useForm({ resolver: zodResolver(model) });
    const { data, loading, error, message, sendRequest } = _useHttp();
    const watchData = watch();
    const { errors } = formState;

    const [listBusinessDivisions, setListBusinessDivisions] = useState([]);
    const [listPositionLevels, setListPositionLevels] = useState([]);

    useEffect(() => {

        if (openModal) {
            if (editData?.id) {

                for (let key in editData) {
                    setValue(key, editData[key])
                }
            }

            /**Fetch lookup data businesss and department  */
            fetchData(API_URL.lookup.businessUnit.get, setListBusinessDivisions);
            fetchData(API_URL.lookup.positionLevel.get, setListPositionLevels);

        }
    }, [openModal])

    const onError = (data) => {
        // setIsSubmitForm(true);
        console.log(data);
    }


    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.position.includes(key) && !editData?.id) {

                postData[key] = data[key];

            } else {

                postData[key] = data[key];
            }
        });


        await sendRequest(!editData?.id ? API_URL.position.create : API_URL?.position?.edit + editData?.id, !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
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

            if (!error)
                handleEventSuccessed();

            handleCloseModal();
        }

    }, [data, error, loading, message])

    const fetchData = useCallback(async (asyncUrl, setData) => {
        try {

            const reqData = await globalService.getData(asyncUrl);
            const { status, data } = reqData;
            const { success } = data;

            if (status === HTTP_STATUS.success) {
                success ? setData(data?.data) : setData([]);
            }

        } catch (error) {
            console.log(error);
        }
    }, [])

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
                                    label={<span>Name <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    {...register('nameEn')}
                                    error={errors?.nameEn ? true : false}
                                    helperText={errors?.nameEn?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="name"
                                    label={<span>Name(KH) <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    {...register('nameKh')}
                                    error={errors?.nameKh ? true : false}
                                    helperText={errors?.nameKh?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>

                                <SelectComponent
                                    id="business-unit-id"
                                    label="Primary Business"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessUnitId || ""}
                                    bindField="nameEn"
                                    handleOnChange={(e) => {
                                        setValue('businessUnitId', e?.target?.value)
                                        setValue('departmentId', null)
                                    }}
                                    err={errors?.businessUnitId?.message}
                                />

                                {/* <MultiSelectComponent
                                    id="business-unit-id"
                                    label="Primary Business"
                                    isRequire={true}
                                    isSubmit={isSubmitForm}
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessDivisions || []}
                                    bindField="nameEn"
                                    handleEventChange={(e) => setValue('businessDivisions', e)}
                                    err={errors?.businessDivisions?.message}
                                /> */}

                            </Grid>
                            <Grid item xs={12}>
                                <AsyncAutoComplete
                                    id="department-id"
                                    label="Department"
                                    size="large"
                                    callToApi={API_URL.lookup.departmentById.get + watchData?.businessUnitId}
                                    bindField={'nameEn'}
                                    handleOnChange={(e, value) => {
                                        setValue('departmentId', value?.id ? value?.id : value);
                                    }}
                                    value={watchData?.departmentId || null}
                                    isRequire={true}
                                    err={errors?.departmentId?.message}
                                />

                            </Grid>

                            <Grid item xs={12}>
                                <SelectComponent
                                    id="position-level-id"
                                    label="Position Level"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listPositionLevels}
                                    value={watchData?.positionLevelId || ""}
                                    bindField="nameEn"
                                    handleOnChange={(e) => {
                                        setValue('positionLevelId', e?.target?.value)
                                    }}
                                    err={errors?.positionLevelId?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    {...register('description')}
                                />
                            </Grid>

                            {editData?.id &&
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
                            }
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {/* Footer Page */}
                    <FooterComponent
                        saveButtunType="submit"
                        saveButtonLabel={editData?.id ? "Update" : "Save"}
                        actions={{ cancel: true, submit: true }}
                        handleCancel={handleCloseModal}
                    />
                </DialogActions>

            </Dialog >
        </>
    )
};

export default UpsertPositionForm;