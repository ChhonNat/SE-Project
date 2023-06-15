/**
 * Service to convert from unix date to display in mui text field
 */
const convertUnixDateToMUI = (date) => {

    const newDate = new Date(date);
    return newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '-' + newDate.getDate();
};

/**
 * Service to convert date before request to API
 */
const convertDateToAPI = (date) => {

    const newDate = new Date(date);
    return ('0' + (newDate.getMonth() + 1)).slice(-2) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
};

export const ConverterService = {
    convertUnixDateToMUI,
    convertDateToAPI
};