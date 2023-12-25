import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { createTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { HTTP_METHODS } from "../../constants/http_method";
import _useHttp from "../../hooks/_http";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CheckBoxAutoComplete = (props) => {

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
        updateValue,
        err,
        isRequire,
        customDatas
    } = props;
    const { data, loading, error, message, sendRequest } = _useHttp();
    const [options, setOptions] = useState([]);
    const [selectOptions, setSelectOptions] = useState(updateValue ? updateValue : []);
    // console.log("result data: ", options[0]?.name);
    const fixedOptions = [options[0]];
    const [value, setValue] = useState(updateValue ? updateValue : []);

    // console.log("lazy: ", loading, " Value: ", value);

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

    const [fix , setFix] = useState(true);
    useEffect(() => {
        if (!loading) {
            if (data?.hasOwnProperty("records")) {
                const { records } = data;
                records?.length ? setOptions(records) : setOptions([]);
            } else {
                data?.length ? setOptions(data) : setOptions([]);
            }
        }

        // if(options.length > 1 && fix){
        //     console.log("runtime>>");
        //     setValue(options)
        //     setFix(false);
        // }
    }, [loading, data, error, message]);

    // useEffect(() => {
    //     if (fix) {
    //         console.log(data);
    //         setValue(data);
    //         setFix(false);
    //     }
    // }, [data])
    console.log("vlaue: ", value);

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
            id="checkboxes-tags-demo"
            value={value}
            onChange={(event, newValue) => {
                setValue([
                    // ...fixedOptions,
                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                ]);
            }}
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name}
            loading={loading}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <>

                    <TextField
                        {...params}
                        label="Checkboxes"
                        placeholder="Favorites"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                </>
            )}
        />
    );
}

export default CheckBoxAutoComplete;
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
        title: "The Lord of the Rings: The Return of the King",
        year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
    },
    {
        title: "Star Wars: Episode V - The Empire Strikes Back",
        year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
        title: "The Lord of the Rings: The Two Towers",
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    {
        title: "Star Wars: Episode IV - A New Hope",
        year: 1977,
    },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
];
