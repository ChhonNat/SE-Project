import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import _useHttp from "../../hooks/_http";
import { HTTP_METHODS } from "../../constants/http_method";
import FormHelperText from '@mui/material/FormHelperText';
import LabelRequire from "../Label/require";

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
        isRequire,
        value,
        handleOnChange,
        size,
        callToApi,
        dataStorage,
        customDatas,
        bindField,
        err,
        returnValueAs,
        placeHolder
    } = props;

    /**
     * use custom redux http
     */
    const { data, loading, error, message, sendRequest } = _useHttp();
    const [datas, setDatas] = useState([]);

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

    useEffect(() => {

        if (!loading) {
            error ? setDatas([]) : setDatas(data ? data : [])
        }
    }, [loading, data, error, message])

    return (
        <FormControl
            fullWidth
            size={size ? size : 'medium'}
            error={ err ? (value ? false : true) : false }
        >
            <InputLabel id={id}>{!isRequire ? label : <LabelRequire label={label} />}</InputLabel>
            <Select
                id={id}
                labelId={id + 'label'}
                label={label}
                defaultValue={'select'}
                value={value ? value : 'select'}
                onChange={handleOnChange}
            >

                <MenuItem disabled value="select">
                    {placeHolder ? placeHolder : 'Select'}
                </MenuItem>

                {/* data return as:
                    - id
                    - if custom field beside id use returnValueAs e.g returnValueAs="name"
                    - if string array return ele mean return string in array
                */}
                {
                    callToApi ? (
                        datas?.length ? datas.map((ele, index) => {
                            return <MenuItem value={returnValueAs ? returnValueAs : ele?.id || ele} key={index} >
                                {
                                    bindField ?
                                        ele[bindField] :
                                        ele || ele?.name || ele?.fullName ? ele?.name || ele?.fullName || ele : ele?.last_name + " " + ele?.first_name
                                }
                            </MenuItem>;
                        }) : <div></div>
                    ) : (
                        customDatas?.length ? customDatas.map((ele, index) => {
                            return <MenuItem value={returnValueAs ? returnValueAs : ele?.id || ele} key={index} >
                                {
                                    bindField ?
                                        ele[bindField] :
                                        ele || ele?.name || ele?.fullName ? ele?.name || ele?.fullName || ele : ele?.last_name + " " + ele?.first_name
                                }
                            </MenuItem>;
                        }) : <div></div>
                    )
                }
            </Select>
            {
                !value && <FormHelperText>{err}</FormHelperText>
            }
        </FormControl>
    )
};

export default SelectComponent;