import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import _useHttp from '../../hooks/_http';
import { HTTP_METHODS } from '../../constants/http_method';
import { Box } from '@mui/material';
import { Controller } from 'react-hook-form';

const AsyncMultiAutoComplete = (props) => {

    const {
        id,
        label,
        limitTags,
        size,
        customDatas,
        callToApi,
        httpMethod,
        reqBody,
        bindField,
        handleOnChange,
        value,
        err,
        control
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
                await sendRequest(callToApi, httpMethod ? HTTP_METHODS[httpMethod] : HTTP_METHODS.get, reqBody);
            }

            fetchData();
        }
    }, [callToApi])

    useEffect(() => {
        if (!loading) {

            if (data.hasOwnProperty('records')) {
                const { records } = data;
                records?.length ? setOptions(records) : setOptions([]);
            } else {

                data?.length ? setOptions(data) : setOptions([]);
            }

        }
    }, [loading, data, error, message]);


    return (
        // <Controller
        //     control={control}
        //     name="type"
        //     rules={{
        //         required: 'Veuillez choisir une réponse'
        //     }}
        //     render={({ field: { onChange, value } }) => (
                <Autocomplete
                    id={id + `multi-auto-complete`}
                    multiple
                    sx={{ width: '100%' }}
                    size={size ? size : 'medium'}
                    limitTags={limitTags ? limitTags : 2}
                    loading={callToApi ? loading : false}
                    renderOption={(props, option) => (
                        <Box component="li"
                            {...props}
                            key={option?.id}
                        >
                            {option[bindField] || ''}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder="Add"
                        />
                    )}
                    defaultValue={value ? value : []}
                    options={options ? options : []}
                    getOptionLabel={(option) => bindField ? option[bindField] : option}
                    onChange={handleOnChange}
                />
            // )}
        // />
    );
};

export default AsyncMultiAutoComplete;