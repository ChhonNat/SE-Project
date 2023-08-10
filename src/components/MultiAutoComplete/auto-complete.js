import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import _useHttp from "../../hooks/_http";
import LabelRequire from "../Label/require";
import { HTTP_METHODS } from "../../constants/http_method";
import {
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const AsyncMultiAutoComplete = (props) => {
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
    control,
    customDatas,
  } = props;

  const { data, loading, error, message, sendRequest } = _useHttp();
  const [options, setOptions] = useState([]);

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

  useEffect(() => {
    console.log("value", value);
  }, [value]);

  return (
    <ThemeProvider theme={err && !value ? customTheme : {}}>
      <Autocomplete
        id={id + `multi-auto-complete`}
        multiple
        sx={{ width: "100%" }}
        size={size ? size : "medium"}
        limitTags={limitTags ? limitTags : 2}
        loading={callToApi ? loading : false}
        getOptionDisabled={(option) => {
          if (
            value?.length &&
            value.some((val) => val === option?.id || val?.id === option?.id)
          ) {
            return true;
          }
          return false;
        }}
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
              !value && (
                <span style={{ color: err && !value ? "#d32f2f" : "" }}>
                  {err}
                </span>
              )
            }
            placeholder="Add"
          />
        )}
        defaultValue={value ? value : []}
        options={options ? options : []}
        getOptionLabel={(option) => (bindField ? option[bindField] : option)}
        onChange={handleOnChange}
      />
    </ThemeProvider>
  );
};

export default AsyncMultiAutoComplete;
