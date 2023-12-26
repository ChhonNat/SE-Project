import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
    CircularProgress,
    TextField,
    createTheme
} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from "react";
import { HTTP_METHODS } from "../../constants/http_method";
import _useHttp from "../../hooks/_http";
import LabelRequire from '../Label/require';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const CheckboxesTags = (props) => {
    const {
        id,
        label,
        limitTags,
        size,
        callToApi,
        httpMethod,
        reqBody,
        bindField,
        handleOnChange,
        value,
        err,
        isRequire,
        customDatas
    } = props;

    const { data, loading, error, message, sendRequest } = _useHttp();
    const [options, setOptions] = useState([]);
    const [selectOptions, setSelectOptions] = useState(value ? value : []);

    /**
 * When callToApi has value request data to display in auto complete
 */
    useEffect(() => {
        if (callToApi) {
            const fetchData = async () => {
                await sendRequest(
                    callToApi,
                    httpMethod ? HTTP_METHODS[httpMethod] : HTTP_METHODS.get,
                    reqBody
                );
            };
            fetchData();
        }
    }, [callToApi, reqBody, value]);

    useEffect(() => {
        if (!loading) {
            if (data?.hasOwnProperty("records")) {
                const { records } = data;
                records?.length ? setOptions(records) : setOptions([]);
            } else {
                data?.length ? setOptions(data) : setOptions([]);
            }
        }
    }, [loading, data, error, message]);

    /**
 * Custom them
 */
    const customTheme = createTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "red",
                        },
                    },
                },
            },
        },
    });
    return (
        <Autocomplete
            multiple
            id={id + `multi-auto-complete`}
            sx={{ width: "100%" }}
            size={size ? size : "medium"}
            limitTags={limitTags ? limitTags : 2}
            loading={callToApi ? loading : false}
            defaultValue={selectOptions?.length ? selectOptions : []}
            // value={selectOptions}
            onChange={handleOnChange}
            getOptionLabel={(option) => (bindField ? option[bindField] : option)}
            options={
                callToApi && !loading
                    ? options?.length
                        ? options
                        : []
                    : customDatas?.length
                        ? customDatas
                        : []
            }
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option[bindField]}
                </li>
            )}
            // renderInput={(params) => (
            //     <TextField {...params} label="Checkboxes" placeholder="Favorites" />
            // )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={
                        isRequire ? (
                            <LabelRequire
                                label={label}
                                color={err && !selectOptions?.length ? "red" : ""}
                            />
                        ) : (
                            label
                        )
                    }
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                <>
                                    {callToApi ? (
                                        loading
                                    ) : false ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            </>
                        ),
                    }}
                    helperText={
                        err &&
                        !selectOptions?.length && (
                            <span
                                style={{
                                    color: err && !selectOptions?.length ? "#d32f2f" : "",
                                }}
                            >
                                {err}
                            </span>
                        )
                    }
                    placeholder="Add"
                />
            )}
        />
    );
}


export default CheckboxesTags;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];