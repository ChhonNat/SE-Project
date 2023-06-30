import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import _useHttp from '../../hooks/_http';
import { HTTP_METHODS } from '../../constants/http_method';

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
  const [selectValue, setSelectValue] = useState([]);

  useEffect(() => {

    if (callToApi) {

      const fetchData = async () => {
        await sendRequest(callToApi, HTTP_METHODS.get);
      }

      fetchData();
    }
  }, [callToApi])

  return (
    <Autocomplete
      fullWidth
      size={size ? size : "small"}
      id={id ? id : "async-auto-complete"}
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      isOptionEqualToValue={(option, value) => bindField ? option[bindField] === value[bindField] : option === option}
      getOptionLabel={(option) => bindField ? option[bindField] : option}
      options={data?.length ? data : []}
      loading={loading}
      onChange={handleOnChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default AsyncAutoComplete;