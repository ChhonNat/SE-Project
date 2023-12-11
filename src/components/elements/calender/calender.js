import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
const Calendar = (props) => {
    const { bgC } = props;
    console.log(bgC);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                {...bgC}
            />
        </LocalizationProvider>
    );
};

export default Calendar;