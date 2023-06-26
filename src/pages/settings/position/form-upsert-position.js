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
    const [listDepartments, setListDepartments] = useState([]);
    const [isSubmitForm, setIsSubmitForm] = useState(false);

    const formatKeys = ['businessDivisions'];

    useEffect(() => {

        if (editData?.id) {

            for (let key in editData) {
                setValue(key, editData[key])
            }
        } else {
            setValue('name', '');
            setValue('description', '');
            setValue('businessDivisions',);
            setValue('departmentId',);
            setValue('status', 'Active');
            clearErrors();
        }

        /**Fetch lookup data businesss and department  */
        fetchData(API_URL.lookup.business.get, setListBusinessDivisions);
        fetchData(API_URL.lookup.department.get, setListDepartments);

    }, [openModal])

    const onError = (data) => {
        setIsSubmitForm(true);
        console.log(data);
    }


    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.position.includes(key) && !editData?.id) {

                postData[key] = data[key];

            } else {

                if (formatKeys.includes(key)) {

                    const oldBusinessDivisions = [...editData?.businessDivisions];
                    const mapBusinessDivision = {};

                    if (oldBusinessDivisions?.length) {

                        oldBusinessDivisions.forEach((ele) => {

                            if (!ele?.id) {
                                mapBusinessDivision = {}
                            }

                            mapBusinessDivision[ele?.id] = ele;

                        })
                    }

                    data[key] = data[key].map((ele) => {

                        const isObject = typeof ele === 'object';
                        return isObject ?
                            { id: ele?.id, recId: ele?.recId } :
                            { id: mapBusinessDivision[ele] ? mapBusinessDivision[ele]?.id : ele, recId: mapBusinessDivision[ele] ? mapBusinessDivision[ele]?.recId : 0 }
                    })

                }

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

            onCloseModal();
            reset();

            if (!error)
                handleEventSuccessed();

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
                                    {...register('name')}
                                    error={errors?.name}
                                    helperText={errors?.name?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MultiSelectComponent
                                    id="business-division-id"
                                    label="Business Division"
                                    isRequire={true}
                                    isSubmit={isSubmitForm}
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessDivisions || []}
                                    bindField="name"
                                    handleEventChange={(e) => setValue('businessDivisions', e)}
                                    err={errors?.businessDivisions?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="department-id"
                                    label="Department"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listDepartments}
                                    value={watchData?.departmentId || ""}
                                    handleOnChange={(e) => setValue('departmentId', e?.target?.value)}
                                    err={errors?.departmentId?.message}
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
                        saveButtonLabel={editData?.id ? "Confirm" : "Save"}
                        actions={{ cancel: true, submit: true }}
                        handleCancel={onCloseModal}
                    />
                </DialogActions>

            </Dialog >
        </>
    )
};

export default UpsertPositionForm;