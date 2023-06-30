import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import _useHttp from '../../hooks/_http';
import { HTTP_METHODS } from '../../constants/http_method';
import LabelRequire from '../Label/require';
import { ThemeProvider, createTheme } from '@mui/material';

const AsyncAutoComplete = (props) => {

  const {
    id,
    label,
    isRequire,
    value,
    handleOnChange,
    size,
    callToApi,
    bindField,
    customDatas,
    err,
    returnValueAs
  } = props;

  const { data, loading, error, sendRequest } = _useHttp();
  const [open, setOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(null);

  /** 
   * When callToApi has value request data to display in auto complete
  */
  useEffect(() => {

    if (callToApi) {

      const fetchData = async () => {
        await sendRequest(callToApi, HTTP_METHODS.get);
      }

      fetchData();
    }
  }, [callToApi])


  /**
   * Listen if data or customDatas or callToApi change? change select value
   */
  useEffect(() => {

    if (callToApi) {
      setSelectValue(!data?.length ? {} : data.find((ele) => ele?.id === value));
    } else {
      setSelectValue(!customDatas?.length ? {} : customDatas.find((ele) => ele?.id === value));
    }

  }, [data, customDatas, callToApi, value])


  /**
   * Check option value select value is the same return select value equal to option
   */
  const checkOptionEqToVal = (option, value) => {

    if (option & value)
      return bindField ? option[bindField] === value[bindField] : option === option
    else
      return {}
  }

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
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: "red"
            },
          }
        }
      }
    }
  })


  return (
    <ThemeProvider theme={ err && !value ? customTheme : {}}>
      <Autocomplete
        id={id ? id : "async-auto-complete"}
        fullWidth
        size={size ? size : "small"}
        open={open}
        onOpen={() => { setOpen(true); }}
        onClose={() => { setOpen(false); }}
        loading={loading}
        options={callToApi ? (data?.length ? data : []) : (customDatas?.length ? customDatas : [])}
        isOptionEqualToValue={(option, value) => checkOptionEqToVal(option, value)}
        getOptionLabel={(option) => bindField ? option[bindField] : option}
        onChange={handleOnChange}
        value={selectValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label={isRequire ? <LabelRequire label={label} color={err && !value ? 'red' : ''} /> : label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {callToApi ? loading : false ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            helperText={<span style={{color: err && !value ? '#d32f2f' : ''}}>{err}</span>}
          />
        )}
      />
    </ThemeProvider>
  );
}

export default AsyncAutoComplete;