import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import LabelRequire from '../Label/require';
import { FormHelperText, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

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
    const { id, label, size, isRequire, customDatas, value, bindField, isSubmit, handleEventChange, err } = props;

    const theme = useTheme();

    /**
     * Convert value to display in select e.g edit value
     */
    const convertValue = !value?.length ? [] : value.map(function (ele) {
        return ele.id || ele;
    });

    const [values, setValues] = useState(convertValue);

    /**
     * listen if value change re-set new value
     */
    useEffect(() => {
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
            <FormControl fullWidth size={size ? size : "sm"} error={isSubmit && isRequire && !value?.length ? true : false}>

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
                                    label={customDatas?.length && bindField ? customDatas.find((ele) => ele.id === value)[bindField] : value}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {customDatas?.length && customDatas.map((ele, index) => (
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