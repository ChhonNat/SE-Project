import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
    Box, Checkbox, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    Slide, TextField
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AsyncAutoComplete from "../../components/AutoComplete/auto-complete";
import LabelRequire from "../../components/Label/require";
import ViewFileModal from "../../components/Modal/view-file.modal";
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
    const [viewFileName, setViewFileName] = useState("");
    const [openFileModal, setOpenFileModal] = useState(false);

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
        resolver: zodResolver(docEntry?.id ? DocEntryModel.Update : DocEntryModel.Create)
    });

    const watchDocEntry = watch();
    const formatKeys = ["issuedDate", "issueNum", "files", "documentCode", "documentNameEn", "documentNameKh"];


    // require file
    const [isFile, setIsFile] = useState(false);

    // handle select year
    const currentYear = new Date().getFullYear();
    const earliestYear = 1970;
    const years = Array.from(
        { length: currentYear - earliestYear + 1 },
        (_, index) => currentYear - index
    );

    // handle edit merge api autocomplete
    const handleApi = (id, key) => {
        return "?" + key + "=" + id;
    };

    // handle checkbox
    const handleChange = (e) => {
        setValue('isSecret', e.target.checked ? 1 : 0);
    };

    // handle change datepicker
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = dayjs(date).format('YYYY/MM/DD');
        setValue('issuedDate', formattedDate);
    };

    // handle list files
    const [lstDocEntryFiles, setLstDocEntryFiles] = useState([]);
    const [showList, setShowList] = useState(false);
    const [tmpFileRm, setTmpFileRm] = useState([]);

    const getAllFile = async (id) => {
        try {
            const reqAllDocEntryFile = await docEntryService.getAllDocEntryFile(id);
            const { data } = reqAllDocEntryFile;
            const { success } = data;

            if (success) {
                setLstDocEntryFiles(data?.data || []);
            } else {
                setLstDocEntryFiles([]);
            }
        } catch (error) {
            setLstDocEntryFiles([]);
            console.log(error);
        }
    };

    const handleRemoveFileUI = useCallback((id, item) => {
        setTmpFileRm(prev => [...prev, item]);
        setLstDocEntryFiles(prev => prev.toSpliced(id, 1));
    }, []);

    const FireNav = styled(List)({
        "& .MuiListItemButton-root": {
            paddingLeft: 24,
            paddingRight: 24
        },
        "& .MuiListItemIcon-root": {
            minWidth: 0,
            marginRight: 16
        },
        "& .MuiSvgIcon-root": {
            fontSize: 20
        }
    });

    useEffect(() => {

        reset();
        clearErrors();

        if (docEntry?.id && open) {
            getAllFile(docEntry?.id);
            Object.keys(docEntry).forEach((key) => {
                if (key === formatKeys[0]) {
                    const issueDate = ConverterService.convertUnixDateToMUI(docEntry[key]);
                    setSelectedDate(dayjs(issueDate));
                    setValue(key, issueDate);
                } else if (key === formatKeys[1]) {
                    setValue("issueNum", String(docEntry[key]));
                } else if (key === formatKeys[3]) {
                    setValue("docCode", docEntry[key]);
                } else if (key === formatKeys[4]) {
                    setValue("docNameEn", docEntry[key]);
                } else if (key === formatKeys[5]) {
                    setValue("docNameKh", docEntry[key]);
                    // } else if (key === "year") {
                    //     setValue(key, parseInt(docEntry[key]));
                } else {
                    setValue(key, docEntry[key]);
                }
            });
        };
    }, [open]);

    // handle submit new
    let isNewSubmit = "";
    const handleSubmitNew = (type) => {
        isNewSubmit = type;
    }

    const onError = (data) => {
        console.log("Error data submit: ", data);
        if (!watchDocEntry?.files?.length && !docEntry.id) {
            setIsFile(true);
            setError("files", { message: "File is required!" });
        }
    };

    const submit = async (data) => {

        const submitData = new FormData();

        if (!docEntry?.id) {
            if (!data?.files?.length)
                setError("files", { message: "File is required!" });
        } else {
            if (tmpFileRm?.length) {
                data.fileName = tmpFileRm.map((ele) => ele.fileName).join(',');
            }
            if (!lstDocEntryFiles?.length && !data?.files?.length) {
                console.log("list file: ", lstDocEntryFiles.length + " value: ", lstDocEntryFiles)
                setIsFile(true);
                setError("files", { message: "File is required!" });
                return;
            }
            submitData.append("documentId", docEntry?.id);
        }

        Object.keys(data).forEach((key) => {
            if (!docEntry?.id) {
                if (KEY_POST.docEntry.includes(key)) {
                    if (formatKeys.includes(key)) {
                        if (formatKeys[0] === key)
                            submitData.append(key, ConverterService.convertDateToAPI2(data[key]));
                        if (formatKeys[1] === key)
                            submitData.append(key, parseInt(data[key] ? data[key] : 0));
                        if (formatKeys[2] === key)
                            for (let i = 0; i < data?.files.length; i++) {
                                submitData.append("files", data?.files[i]);
                            }
                        if (formatKeys[6] === key)
                            submitData.append(key, parseInt(data[key] ? data[key] : 0));
                    } else {
                        submitData.append(key, data[key]);
                    }
                }
            } else {
                if (formatKeys.includes(key)) {
                    if (formatKeys[0] === key)
                        submitData.append(key, ConverterService.convertDateToAPI2(data[key]));
                    if (formatKeys[1] === key)
                        submitData.append(key, parseInt(data[key] ? data[key] : 0));
                    if (formatKeys[2] === key && data?.files?.length)
                        for (let i = 0; i < data?.files.length; i++) {
                            submitData.append("files", data?.files[i]);
                        }
                    if (key === "year")
                        submitData.append(key, parseInt(data[key] ? data[key] : 0));
                } else {
                    submitData.append(key, data[key]);
                }
            }
        });

        try {
            let submitDocEntry;

            if (docEntry?.id) {
                submitDocEntry = await docEntryService.updateDocEntry(submitData, "multipart/form-data");
            }
            else {
                submitDocEntry = await docEntryService.createDocEntry(submitData, "multipart/form-data");
            }

            const { data } = submitDocEntry;
            const { message, success } = data;


            Swal.fire({
                title: success ? "Success" : "Warning",
                text: message,
                icon: success ? "success" : "warning",
                confirmButtonText: "OK",
                size: 200,
            });

            handleEventSucceed();
            if (isNewSubmit.toLowerCase() !== "newSubmit".toLowerCase()) {
                handleCloseModal();
            } else {
                setSelectedDate(null);
                reset();
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
                                label={<LabelRequire label="Name (EN)" />}
                                sx={{ width: "100%" }}
                                {...register("docNameEn")}
                                size="small"
                                error={errors?.docNameEn ? true : false}
                                helperText={errors?.docNameEn?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Name (KH)"}
                                sx={{ width: "100%" }}
                                size="small"
                                {...register("docNameKh")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={<LabelRequire label="Numbering" />}
                                sx={{ width: "100%" }}
                                {...register("docCode")}
                                size="small"
                                error={errors?.docCode ? true : false}
                                helperText={errors?.docCode?.message}
                                inputProps={{ maxLength: 15 }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                type="file"
                                size="small"
                                inputProps={{
                                    multiple: true,
                                    accept: "application/pdf, image/jpeg, image/png, images/jpg"
                                }}
                                InputLabelProps={shrinkOpt}
                                {...register("files")}
                                // onChange={(e) => setValue("files", [...e?.target?.files])}
                                required={docEntry.id ? false : isFile}
                                error={isFile && !watchDocEntry?.files?.length ? true : false}
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

                        {docEntry?.id &&
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", pd: 0 }}>
                                    <Paper elevation={0} sx={{ width: "100%" }}>
                                        <FireNav component="nav" disablePadding>
                                            <Box
                                                sx={{
                                                    bgcolor: showList ? "rgba(71, 98, 130, 0.3)" : "",
                                                    mb: 0,
                                                }}
                                            >
                                                <ListItemButton
                                                    alignItems="flex-start"
                                                    onClick={() => setShowList(!showList)}
                                                    sx={{
                                                        px: 3,
                                                        pt: 2.5,
                                                        pb: showList ? 0 : 2.5,
                                                        // "&:hover, &:focus": { "& svg": { opacity: showList ? 1 : 0 } },
                                                        "& svg": { opacity: 1 }
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary="Files"
                                                        primaryTypographyProps={{
                                                            fontSize: 15,
                                                            fontWeight: "medium",
                                                            lineHeight: "20px",
                                                            mb: "2px"
                                                        }}
                                                        secondary={lstDocEntryFiles.length ? lstDocEntryFiles.map((file) => file.fileName).join(', ') : "Empty file"}
                                                        secondaryTypographyProps={{
                                                            noWrap: true,
                                                            fontSize: 12,
                                                            lineHeight: "16px",
                                                            color: showList ? "rgba(0,0,0,0)" : ""
                                                        }}
                                                        sx={{ my: 0, width: "100%" }}
                                                    />
                                                    <KeyboardArrowDown
                                                        sx={{
                                                            mr: -1,
                                                            opacity: 0,
                                                            transform: showList ? "rotate(-180deg)" : "rotate(0)",
                                                            transition: "0.2s"
                                                        }}
                                                    />
                                                </ListItemButton>
                                                {showList &&
                                                    <List sx={{ width: '100%', maxHeight: "180px", overflowY: 'auto', bgcolor: 'background.paper' }}>
                                                        {lstDocEntryFiles.map((file, index) => {
                                                            return (
                                                                <ListItem
                                                                    key={index}
                                                                    secondaryAction={
                                                                        <IconButton edge="end" aria-label="comments" sx={{ marginRight: '10px' }} onClick={() => handleRemoveFileUI(index, file)}>
                                                                            <DeleteIcon color="error" />
                                                                        </IconButton>
                                                                    }
                                                                    disablePadding
                                                                >
                                                                    <ListItemButton
                                                                        role={undefined}
                                                                        onClick={() => {
                                                                            setViewFileName(file?.fileName);
                                                                            setOpenFileModal(true);
                                                                        }}
                                                                        dense>
                                                                        <ListItemIcon>
                                                                            <InsertDriveFileIcon />
                                                                        </ListItemIcon>
                                                                        <ListItemText id={index} sx={{ fontSize: "16px", color: "blue", textDecoration: "undefined" }} primary={file?.fileName} />
                                                                    </ListItemButton>
                                                                </ListItem>
                                                            );
                                                        })}
                                                    </List>
                                                }
                                            </Box>
                                        </FireNav>
                                    </Paper>
                                </Box>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        required
                                        label={<LabelRequire label="Issue Date" />}
                                        sx={{ width: "100%" }}
                                        InputLabelProps={shrinkOpt}
                                        views={['year', 'month', 'day']}
                                        format="LL"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                error: selectedDate === null && errors?.issuedDate ? true : false,
                                                helperText: errors?.issuedDate ? "issue date is required!" : ""
                                            },
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <SelectComponent
                                id={"year-id"}
                                label={"Year"}
                                isRequire={true}
                                size={"small"}
                                customDatas={years}
                                value={watchDocEntry?.year || ""}
                                handleOnChange={(e) => setValue("year", String(e?.target?.value))}
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
                                label={<LabelRequire label="Source Departments" />}
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
                                label={<LabelRequire label="Types Of Document" />}
                                size="small"
                                callToApi={API_URL.lookup.listGDoc.get}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("typeOfDocId", value?.id);
                                    setValue("mainCateId", 0);
                                    setValue("subCateId", 0);
                                    setValue("subSubCateId", 0);
                                }}
                                value={watchDocEntry?.typeOfDocId || null}
                                err={errors?.typeOfDocId?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="mainCateId"
                                label={"Main Categories"}
                                size="small"
                                callToApi={watchDocEntry.typeOfDocId ? API_URL.lookup.listMCate.get + handleApi(watchDocEntry?.typeOfDocId, "groupDocId") : null}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("mainCateId", value?.id);
                                    setValue("subCateId", 0);
                                    setValue("subSubCateId", 0);
                                }}
                                helperText="(Optional)"
                                value={watchDocEntry?.mainCateId || null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="subMainCateId"
                                label={"Sub Categories"}
                                size="small"
                                callToApi={watchDocEntry.mainCateId ? API_URL.lookup.subCate.get + handleApi(watchDocEntry?.mainCateId, "mainCateId") : null}
                                bindField={"nameEn"}
                                handleOnChange={(e, value) => {
                                    setValue("subCateId", value?.id);
                                    setValue("subSubCateId", 0);
                                }}
                                helperText="(Optional)"
                                value={watchDocEntry?.subCateId || null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AsyncAutoComplete
                                id="childSubMainCateId"
                                label={"Sub Sub Categories"}
                                size="small"
                                callToApi={watchDocEntry.subCateId ? API_URL.lookup.childSubCate.get + handleApi(watchDocEntry?.mainCateId, "subCateId") : null}
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
                                label={<LabelRequire label="Number of Page" />}
                                sx={{ width: "100%" }}
                                {...register("numOfPage")}
                                size="small"
                                error={errors?.numOfPage ? true : false}
                                helperText={errors?.numOfPage?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Arch File Number"}
                                sx={{ width: "100%" }}
                                {...register("chronoNum")}
                                size="small"
                            // error={errors?.chronoNum ? true : false}
                            // helperText={errors?.chronoNum?.message}
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
                                label={"Approved by"}
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
                    saveNewButtonType={!docEntry.id && "newSubmit"}
                    saveButtonLabel={docEntry?.id ? "Update" : "Save"}
                    saveNewButtonLabel={docEntry?.id ? "" : "Save & New"}
                    actions={{ cancel: true, submit: true, submitNew: docEntry?.id ? false : true }}
                    handleCancel={handleCloseModal}
                    // handleSaveNew = {handleSubmit(submit, onError)}
                    handleSaveNew={handleSubmitNew}
                />
            </DialogActions>

            {/* View file entry modal */}
            {
                openFileModal &&
                <ViewFileModal
                    openModal={openFileModal}
                    onCloseModal={() => setOpenFileModal(false)}
                    fileName={viewFileName}
                />
            }
        </Dialog>
    );
};

export default UpsertDocEntryForm;
