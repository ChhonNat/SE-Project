import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import {
    Box, Checkbox, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Slide, TextField
} from "@mui/material";
import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AsyncAutoComplete from "../../components/AutoComplete/auto-complete";
import LabelRequire from "../../components/Label/require";
import FooterComponent from "../../components/Page/footer";
import TitleComponent from "../../components/Page/title";
import SelectComponent from "../../components/Selector/select";
import { API_URL } from "../../constants/api_url";
import { KEY_POST } from "../../constants/key_post";
import { DocEntryModel } from "../../models/doc-entry.model";
import { docEntryService } from "../../services/doc-entry.service";
import { ConverterService } from "../../utils/converter";


const shrinkOpt = { shrink: true };

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertDocEntryForm = (props) => {
    const { open, onCloseModal, handleEventSucceed, docEntry } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
        setValue,
        watch,
        setError,
    } = useForm({
        resolver: zodResolver(docEntry?.id ? DocEntryModel.Update : DocEntryModel.Create),
    });

    const watchDocEntry = watch();
    const formatKeys = ["issuedDate", "issueNum"];

    useEffect(() => {

        reset();
        clearErrors();

        if (docEntry?.id && open) {
            Object.keys(docEntry).forEach((key) => {
                if (KEY_POST.docEntry.includes(key)) {
                    if (key === formatKeys[0]) {
                        const appliedDate = ConverterService.convertUnixDateToMUI(docEntry[key]);
                        setValue(key, appliedDate);
                    } else {
                        setValue(key, docEntry[key]);
                    }
                }
            });
        } else {
            setValue('isSecret', 0);
        }
    }, [open]);

    const onError = (data) => {
        console.log(data);
        if (!watchDocEntry?.roles?.length)
            setError("roles", { message: "Role is required!" });
    };

    // handle select year
    const currentYear = new Date().getFullYear();
    const earliestYear = 1970;
    const years = Array.from(
        { length: currentYear - earliestYear + 1 },
        (_, index) => currentYear - index
    );

    // handle checkbox
    const handleChange = (e) => {
        setValue('isSecret', e.target.checked ? 1 : 0);
    };

    const submit = async (data) => {
        const submitData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.docEntry.includes(key) && !docEntry?.id) {
                if (formatKeys.includes(key)) {
                    if (formatKeys[0] === key) {
                        submitData[key] = ConverterService.convertDateToAPI2(data[key]);
                    }

                    if (formatKeys[1] === key) {
                        submitData[key] = parseInt(data[key] ? data[key] : 0);
                    }
                } else if (key === 'documentCode') {
                    submitData['docCode'] = data[key];
                } else if (key === 'documentNameEn') {
                    submitData['docNameEn'] = data[key];
                } else if (key === 'documentNameKh') {
                    submitData['docNameKh'] = data[key];
                } else if (key === 'isSecret') {
                    submitData['isScret'] = data[key];
                } else {
                    submitData[key] = data[key];
                }
            } else {
                if (formatKeys.includes(key)) {

                    if (formatKeys[0] === key) {
                        submitData[key] = ConverterService.convertDateToAPI2(data[key]);
                    }

                    if (formatKeys[1] === key) {

                        const oldRoles = [...docEntry?.roles];
                        const mapRole = {};

                        if (oldRoles?.length) {
                            oldRoles.forEach((ele) => {
                                if (!ele?.id) {
                                    mapRole = {};
                                }

                                mapRole[ele?.id] = ele;
                            });
                        }

                        if (typeof data[key] === "string") data[key] = oldRoles;

                        data[key] = data[key].map((ele) => {
                            const isObject = typeof ele === "object";
                            return isObject
                                ? { id: ele?.id, recId: ele?.recId }
                                : {
                                    id: mapRole[ele] ? mapRole[ele]?.id : ele,
                                    recId: mapRole[ele] ? mapRole[ele]?.recId : 0,
                                };
                        });

                        submitData[key] = data[key];
                    }

                    if (formatKeys[1] === key) {
                        submitData[key] = parseInt(data[key] ? data[key] : 0);
                    }
                } else if (key === 'documentCode') {
                    submitData['docCode'] = data[key];
                } else if (key === 'documentNameEn') {
                    submitData['docNameEn'] = data[key];
                } else if (key === 'documentNameKh') {
                    submitData['docNameKh'] = data[key];
                } else if (key === 'isSecret') {
                    submitData['isScret'] = data[key];
                } else {
                    submitData[key] = data[key];
                }
            }
        });
console.log("My-data: ", submitData)
        try {
            let submitDocEntry;

            if (docEntry?.id){
                submitDocEntry = await docEntryService.updateDocEntry(docEntry?.id, submitData, "multipart/form-data");
            }
            else{
                submitDocEntry = await docEntryService.createDocEntry(submitData, "multipart/form-data");
            }

            const { data } = submitDocEntry;
            const { message, success } = data;

            if (success) {
                Swal.fire({
                    title: data?.success ? "Success" : "Error",
                    text: message,
                    icon: data?.success ? "success" : "error",
                    confirmButtonText: "OK",
                    size: 200,
                });
                handleEventSucceed();
                handleCloseModal();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        reset();
        clearErrors();
        onCloseModal();
    };

    return (
        <Dialog
            maxWidth="sm"
            TransitionComponent={TransitionModal}
            open={open}
            component="form"
            onSubmit={handleSubmit(submit, onError)}
            onClose={onCloseModal}
        >
            <DialogTitle>
                <TitleComponent title={docEntry?.id ? "Edit Document" : "Add New Document"} />
                {onCloseModal ? (
                    <IconButton
                        aria-label="close"
                        onClick={onCloseModal}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ width: "100%" }}>
                    <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={12}>
                            <TextField
                                label={<LabelRequire label="Name" />}
                                sx={{ width: "100%" }}
                                {...register("documentNameEn")}
                                size="small"
                                error={errors?.documentNameEn ? true : false}
                                helperText={errors?.documentNameEn?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Name(Kh)"}
                                sx={{ width: "100%" }}
                                size="small"
                                {...register("documentNameKh")}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label={<LabelRequire label="Numbering" />}
                                sx={{ width: "100%" }}
                                {...register("documentCode")}
                                size="small"
                                error={errors?.documentCode ? true : false}
                                helperText={errors?.documentCode?.message}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                type="file"
                                size="small"
                                inputProps={{
                                    multiple: true,
                                    accept: "application/pdf, image/jpeg, image/png"
                                }}
                                InputLabelProps={shrinkOpt}
                                onChange={(e) => setValue("files", e?.target?.files[0])}
                                error={errors?.files ? true : false}
                                helperText={errors?.files?.message}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ display: "flex", justifyContent: "end" }}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} checked={watchDocEntry?.isSecret ? true : false} />}
                                    label={"Is Confidential"}
                                    sx={{ width: "100%" }}
                                    size="small"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                label={<LabelRequire label="Issue Date" />}
                                sx={{ width: "100%" }}
                                InputLabelProps={shrinkOpt}
                                {...register("issuedDate")}
                                size="small"
                                error={errors?.issuedDate ? true : false}
                                helperText={errors?.issuedDate?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectComponent
                                id={"year-id"}
                                label={"Year"}
                                isRequire={true}
                                size={"small"}
                                customDatas={years}
                                value={watchDocEntry?.year || ""}
                                handleOnChange={(e) => setValue("year", e?.target?.value)}
                                err={errors?.year?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="campusId"
                                label={<LabelRequire label="Campus" />}
                                size="small"
                                callToApi={API_URL.lookup.campus.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("campusId", value?.id);
                                }}
                                value={watchDocEntry?.campusId || null}
                                err={errors?.campusId?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="sourceDocId"
                                label={<LabelRequire label="Source Department" />}
                                size="small"
                                callToApi={API_URL.lookup.department.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("deptId", value?.id);
                                }}
                                value={watchDocEntry?.deptId || null}
                                err={errors?.deptId?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="docTypeId"
                                label={<LabelRequire label="Type Of Document" />}
                                size="small"
                                callToApi={API_URL.lookup.listGDoc.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("typeOfDocId", value?.id);
                                }}
                                value={watchDocEntry?.typeOfDocId || null}
                                err={errors?.typeOfDocId?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="mainCateId"
                                label={<LabelRequire label="Main Category" />}
                                size="small"
                                callToApi={API_URL.lookup.listMCate.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("mainCateId", value?.id);
                                }}
                                value={watchDocEntry?.mainCateId || null}
                                err={errors?.mainCateId?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="subMainCateId"
                                label={"Sub-Category"}
                                size="small"
                                callToApi={API_URL.lookup.subCate.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("subCateId", value?.id);
                                }}
                                helperText="(Optional)"
                                value={watchDocEntry?.subCateId || null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="childSubMainCateId"
                                label={"Child Sub-Category"}
                                size="small"
                                callToApi={API_URL.lookup.childSubCate.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("subSubCateId", value?.id);
                                }}
                                helperText="(Optional)"
                                value={watchDocEntry?.subSubCateId || null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={<LabelRequire label="Number Of Page" />}
                                sx={{ width: "100%" }}
                                {...register("numOfPage")}
                                size="small"
                                error={errors?.numOfPage ? true : false}
                                helperText={errors?.numOfPage?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={<LabelRequire label="Chrono No." />}
                                sx={{ width: "100%" }}
                                {...register("chronoNum")}
                                size="small"
                                error={errors?.chronoNum ? true : false}
                                helperText={errors?.chronoNum?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                label={"Issue Number"}
                                sx={{ width: "100%" }}
                                size="small"
                                {...register("issueNum")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Approved By"}
                                sx={{ width: "100%" }}
                                size="small"
                                {...register("approvedBy")}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label={"Remark"}
                                sx={{ width: "100%" }}
                                size="small"
                                {...register("remark")}
                            />
                        </Grid>

                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <FooterComponent
                    saveButtonType="submit"
                    saveButtonLabel={docEntry?.id ? "Update" : "Save"}
                    actions={{ cancel: true, submit: true }}
                    handleCancel={handleCloseModal}
                />
            </DialogActions>
        </Dialog>
    );
};

export default UpsertDocEntryForm;
