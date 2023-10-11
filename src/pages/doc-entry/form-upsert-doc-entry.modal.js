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
import { DATA_STATUS } from "../../constants/data_status";
import { HTTP_STATUS } from "../../constants/http_status";
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
    const formatKeys = ["issuedDate", "roles", "issueNum"];

    useEffect(() => {

        reset();
        clearErrors();

        if (docEntry?.id && open) {
            Object.keys(docEntry).forEach((key) => {
                if (KEY_POST.docEntry.includes(key)) {
                    if (formatKeys.includes(key)) {
                        key === 'department' ? setValue('departmentId', docEntry[key]?.id) : setValue(key, ConverterService.convertUnixDateToMUI(docEntry[key]));
                    } else {
                        setValue(key, docEntry[key]);
                    }
                }
            });
        } else {
            setValue('isScret',0);
        }
    }, [open]);

    const onError = (data) => {
        console.log(data);
        if (docEntry?.id) {
            if (watchDocEntry?.password || watchDocEntry?.confirmPassword) {
                if (watchDocEntry?.password !== watchDocEntry?.confirmPassword)
                    setError("confirmPassword", {
                        message: "Confirm password doesn't match!",
                    });
            }
        }

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
        setValue('isScret',e.target.checked ? 1 : 0);
    };

    const submit = async (data) => {

        if (docEntry?.id) {
            if (watchDocEntry?.password || watchDocEntry?.confirmPassword) {
                if (watchDocEntry?.password !== watchDocEntry?.confirmPassword) {
                    setError("confirmPassword", {
                        message: "Confirm password doesn't match!",
                    });
                    return false;
                }
            }
        }

        const submitData = {};

        Object.keys(data).forEach((key) => {
            if (KEY_POST.docEntry.includes(key) && !docEntry?.id) {
                if (formatKeys.includes(key)) {
                    if (formatKeys[0] === key) {
                        submitData[key] = ConverterService.convertDateToAPI2(data[key]);
                    }

                    if (formatKeys[2] === key) {
                        submitData[key] = parseInt(data[key] ? data[key] : 0);
                    }
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

                    if (formatKeys[2] === key) {
                        submitData[key] = parseInt(data[key] ? data[key] : 0);
                    }
                } else {
                    submitData[key] = data[key];
                }
            }
        });

        try {
            let submitDocEntry;

            if (docEntry?.id)
                submitDocEntry = await docEntryService.updateDocEntry(docEntry?.id, submitData, "multipart/form-data");
            else submitDocEntry = await docEntryService.createDocEntry(submitData, "multipart/form-data");

            const { status, data } = submitDocEntry;
            const { message } = data;

            if (status === HTTP_STATUS.success) {
                if (data?.status === DATA_STATUS.success) handleEventSucceed();

                /**
                 * Alert after request responses
                 */
                Swal.fire({
                    title: data?.success ? "Success" : "Error",
                    text: message,
                    icon: data?.success ? "success" : "error",
                    confirmButtonText: "OK",
                    size: 200,
                });

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
                <TitleComponent title={docEntry?.id ? "Edit document" : "Add new document"} />
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
                                label={<LabelRequire label="Numbering" />}
                                sx={{ width: "100%" }}
                                {...register("docCode")}
                                size="small"
                                error={errors?.docCode ? true : false}
                                helperText={errors?.docCode?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={<LabelRequire label="Document Name (EN)" />}
                                sx={{ width: "100%" }}
                                {...register("docNameEn")}
                                size="small"
                                error={errors?.docNameEn ? true : false}
                                helperText={errors?.docNameEn?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Document Name (KH)"}
                                sx={{ width: "100%" }}
                                size="small"
                                helperText="(Optional)"
                                {...register("docNameKh")}
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
                            <SelectComponent
                                id={"year-id"}
                                label={"year"}
                                isRequire={true}
                                size={"small"}
                                customDatas={years}
                                value={watchDocEntry?.year || ""}
                                handleOnChange={(e) => setValue("year", e?.target?.value)}
                                err={errors?.year?.message}
                            />
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
                            <TextField
                                type="number"
                                label={"Issue number"}
                                sx={{ width: "100%" }}
                                size="small"
                                {...register("issueNum")}
                                helperText="(Optional)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={<LabelRequire label="Number of page" />}
                                sx={{ width: "100%" }}
                                {...register("numOfPage")}
                                size="small"
                                error={errors?.numOfPage ? true : false}
                                helperText={errors?.numOfPage?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Approved by"}
                                sx={{ width: "100%" }}
                                size="small"
                                helperText="(Optional)"
                                {...register("approvedBy")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="docTypeId"
                                label={<LabelRequire label="Type of document" />}
                                size="small"
                                callToApi={API_URL.lookup.listGDoc.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("docType", value?.id);
                                }}
                                value={watchDocEntry?.docType || null}
                                err={errors?.docType?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="mainCateId"
                                label={<LabelRequire label="Main category" />}
                                size="small"
                                callToApi={API_URL.lookup.listMCate.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("mainCate", value?.id);
                                }}
                                value={watchDocEntry?.mainCate || null}
                                err={errors?.mainCate?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="subMainCateId"
                                label={"Sub category"}
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
                                label={"Child Sub category"}
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

                        <Grid item xs={6}>
                            <TextField
                                type="file"
                                size="small"
                                // label={
                                //     <LabelRequire
                                //         label={
                                //             candidate?.id && modalType !== isClonedocEntryInfo
                                //                 ? "Update File"
                                //                 : "Upload File"
                                //         }
                                //     />
                                // }
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

                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} checked={watchDocEntry?.isScret ? true : false} />}
                                    label={"Is confidential"}
                                    sx={{ width: "100%" }}
                                    size="small"
                                />
                            </FormGroup>
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
                                label={"Remark"}
                                sx={{ width: "100%" }}
                                size="small"
                                {...register("remark")}
                                helperText="(Optional)"
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
