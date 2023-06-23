import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import LabelRequire from '../Label/require';
import { FormHelperText } from '@mui/material';

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

    const { id, label, size, isRequire, customDatas, bindField, handleEventChange, err } = props;

    const theme = useTheme();
    const [values, setValues] = React.useState([]);

    const handleChange = (event) => {

        const { target: { value } } = event;
        let formatValue = typeof value === 'string' ? value.split(',') : value;
        setValues(formatValue);

        handleEventChange(formatValue);
    };

    return (

        <div>
            <FormControl fullWidth size={size ? size : "sm"} error={err}>

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
                        </MenuItem>
                    ))}
                </Select>

                <FormHelperText>{err}</FormHelperText>
            </FormControl>
        </div>
    );
}

export default MultiSelectComponent;