import { Box, ThemeProvider, createTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { HTTP_METHODS } from "../../constants/http_method";
import _useHttp from "../../hooks/_http";
import LabelRequire from "../Label/require";

const AsyncAutoComplete = (props) => {
  const {
    id,
    label,
    isRequire,
    value,
    handleOnChange,
    size,
    callToApi,
    httpMethod,
    reqBody,
    bindField,
    customDatas,
    err,
    returnValueAs,
    disabled,
  } = props;

  const { data, loading, error, message, sendRequest } = _useHttp();
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectValue, setSelectValue] = useState({});

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
  }, [callToApi, reqBody]);

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
   * Listen if data or customDatas or callToApi change? change select value
   */
  useEffect(() => {
    if (callToApi) {
      if (data?.hasOwnProperty("records")) {
        const { records } = data;
        setSelectValue(
          !records?.length ? {} : records.find((ele) => ele?.id === value)
        );
      } else {
        setSelectValue(
          !data?.length ? {} : data.find((ele) => ele?.id === value)
        );
      }
    } else {
      setSelectValue(
        !customDatas?.length ? {} : customDatas.find((ele) => ele?.id === value)
      );
    }
  }, [data, customDatas, callToApi, value]);

  /**
   * Check option value select value is the same return select value equal to option
   */
  const checkOptionEqToVal = (option, value) => {
    let searchResult = "";

    if (option && value)
      searchResult = bindField
        ? option[bindField] === value[bindField]
        : option === option;

    return searchResult;
  };

  /**
   * Custom them
   */
  const customTheme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            // "&:hover .MuiOutlinedInput-notchedOutline": {
            //   borderColor: "red"
            // },
            // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            //   borderColor: "red"
            // },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={err && !value ? customTheme : {}}>
      <Autocomplete
        id={id ? id : "async-auto-complete"}
        size={size ? size : "medium"}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={callToApi ? loading : false}
        options={
          callToApi
            ? options?.length
              ? options
              : []
            : customDatas?.length
            ? customDatas
            : []
        }
        isOptionEqualToValue={(option, value) =>
          checkOptionEqToVal(option, value)
        }
        getOptionLabel={(option) => option[bindField] || ""}
        onChange={handleOnChange}
        value={selectValue}
        disabled={disabled}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option?.id}>
            {option[bindField] || ""}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              isRequire ? (
                <LabelRequire
                  label={label}
                  color={err && !value ? "red" : ""}
                />
              ) : (
                label
              )
            }
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {callToApi ? (
                    loading
                  ) : false ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            helperText={
              err &&
              !value && (
                <span style={{ color: err && !value ? "#d32f2f" : "" }}>
                  {err}
                </span>
              )
            }
          />
        )}
      />
    </ThemeProvider>
  );
};

export default AsyncAutoComplete;