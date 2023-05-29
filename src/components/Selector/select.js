import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import _useHttp from "../../hooks/_http";
import { HTTP_METHODS } from "../../constants/http_method";
import FormHelperText from '@mui/material/FormHelperText';

/**
 * Select Component
 * ID: to defined label and select sync each other
 * LABEL: to display in select
 * VALUE: which will be active in select
 * HANDLE: EVENT when event make change
 * SIZE: size of the Select component
 * CALL_TO_API: which is the endpoint will call to request the data to display in select
 */
const SelectComponent = (props) => {

    const {
        id,
        label,
        value,
        handleOnChange,
        size,
        callToApi,
        dataStorage,
        customDatas,
        err,
        returnValueAs
    } = props;

    /**
     * use custom redux http
     */
    const { data, loading, error, sendRequest } = _useHttp();

    useEffect(() => {

        /**
         * CASE: has callToApi value from any component allow to fetch those datas
         * CASE: has customeDatas from any component display those datas
         */

        if (callToApi) {

            const fetchData = async () => {
                await sendRequest(callToApi, HTTP_METHODS.get);
            }

            fetchData();
        }

    }, [callToApi]);


    return (
        <FormControl fullWidth size={size} error={err}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                id={id}
                labelId={id + 'label'}
                label={label}
                defaultValue={""}
                value={value || ""}
                onChange={handleOnChange}
            >
                {   
                    callToApi && data?.length ? 
                    data.map((ele, index) => {
                        return <MenuItem value={returnValueAs ? returnValueAs : ele.id} key={index} >
                            {ele?.name ? ele?.name : ele?.last_name + " " + ele?.first_name}
                        </MenuItem>;
                    }) : customDatas?.length && customDatas.map((ele, index) => {
                        return <MenuItem value={returnValueAs ? returnValueAs : ele.id} key={index} >
                            {ele?.name ? ele?.name : ele?.last_name + " " + ele?.first_name}
                        </MenuItem>;
                    })
                }
            </Select>
            <FormHelperText>{err}</FormHelperText>
        </FormControl>
    )
};

export default SelectComponent;