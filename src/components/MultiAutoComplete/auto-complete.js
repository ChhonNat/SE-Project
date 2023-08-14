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
    customDatas,
    isSubmit
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

  return (
    <ThemeProvider theme={isSubmit && err && !value?.length ? customTheme : {}}>
      <Autocomplete
        id={id + `multi-auto-complete`}
        multiple
        sx={{ width: "100%" }}
        size={size ? size : "medium"}
        limitTags={limitTags ? limitTags : 2}
        loading={callToApi ? loading : false}
        options={
          callToApi && !loading
            ? options?.length
              ? options
              : []
            : customDatas?.length
            ? customDatas
            : []
        }
        defaultValue={value ? value : []}
        onChange={handleOnChange}
        getOptionLabel={(option) => (bindField ? option[bindField] : option)}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
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
      />
    </ThemeProvider>
  );
};

export default AsyncMultiAutoComplete;
