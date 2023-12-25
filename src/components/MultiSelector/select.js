import CancelIcon from '@mui/icons-material/Cancel';
import { FormHelperText, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { HTTP_METHODS } from '../../constants/http_method';
import _useHttp from '../../hooks/_http';
import LabelRequire from '../Label/require';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }
    }
};


function getStyles(name, values, theme) {
    return {
        fontWeight:
            values.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultiSelectComponent = (props) => {

    /**
     * id: specific select id
     * label: label for select
     * size: custom select size
     * isRequire: set require for select
     * customData: list of option display in select 
     * value: option value to display in select
     * bindField: which field name use to display in select
     * isSubmit: listen when submit it require or optional
     * handleEventChange: when select change return value back
     * err: status of error if use as require
     */
    const { id, label, size, isRequire, customDatas, bindField, isSubmit, handleEventChange, err, callToApi } = props;
    const { value } = props || [];

    const { data, loading, error, message, sendRequest } = _useHttp();
    const [datas, setDatas] = useState([]);

    const theme = useTheme();

    const [values, setValues] = useState([]);

    useEffect(() => {

        if (callToApi) {

            const fetchData = async () => {
                await sendRequest(callToApi, HTTP_METHODS.get);
            }

            fetchData();
        }
    }, [callToApi]);


    useEffect(() => {
        
        setDatas(callToApi ? data : customDatas)
    }, [customDatas, data]);


    /**
     * listen if value change re-set new value
     */
    useEffect(() => {
        /**
        * Convert value to display in select e.g edit value
        */
        const convertValue = value && value.length ? value.map(function (ele) {
            return ele.id || ele;
        }) : [];
        setValues(convertValue);

    }, [value]);


    /**
     * Event select change
     * return value back
     */
    const handleChange = (event) => {

        const { target: { value } } = event;
        let formatValue = typeof value === 'string' ? value.split(',') : value;
        setValues(formatValue);
        handleEventChange(formatValue);
    };
    return (

        <div>
            <FormControl
                fullWidth
                size={size ? size : "medium"}
                error={isSubmit && isRequire && !value?.length ? true : false}>

                <InputLabel id={id}>
                    {isRequire ? <LabelRequire label={label} /> : label}
                </InputLabel>

                <Select
                    labelId={id}
                    id={id}
                    label={label}
                    multiple
                    value={values}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id={id} label={label} />
                    }
                    renderValue={(selected) => (

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value, index) => (
                                <Chip
                                    key={index}
                                    label={datas?.length && bindField ? datas.find((ele) => ele.id === value)[bindField] : value}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {datas?.length && datas.map((ele, index) => (
                        <MenuItem
                            key={index}
                            value={ele?.id || ele[bindField] || ele}
                            style={getStyles(ele?.id || ele[bindField] || ele, values, theme)}
                        >
                            {ele?.name || ele[bindField] || ele}
                            {values.includes(ele?.id || ele) && <IconButton sx={{ marginLeft: 2 }}><CancelIcon color='error' /></IconButton>}
                        </MenuItem>
                    ))}
                </Select>
                {
                    !values?.length && <FormHelperText>{err}</FormHelperText>
                }
            </FormControl>
        </div>
    );
}

export default MultiSelectComponent;