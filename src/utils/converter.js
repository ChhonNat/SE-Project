/**
 * Service to convert from unix date to display in mui text field
 */
const convertUnixDateToMUI = (date) => {
    const newDate = new Date(date);
    return newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (newDate.getDate() + 0)).slice(-2);
};

/**
 * Service to convert date before request to API
 */
const convertDateToAPI = (date) => {

    const newDate = new Date(date);
    return ('0' + (newDate.getMonth() + 1)).slice(-2) + '/' + ('0' + (newDate.getDate() + 0)).slice(-2) + '/' + newDate.getFullYear();
};

const convertDateToAPI2 = (date) => {

    const newDate = new Date(date);
    return  newDate.getFullYear() + '/' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '/' + ('0' + (newDate.getDate() + 0)).slice(-2);;
};

/**
 * Service to convert application candidate code
 */
const convertApplicationCode = (lastCode) => {

    if(!lastCode)
    return null;


    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const date = ('0' + (newDate.getDate() + 0)).slice(-2);

    return 'CV-' + year + month + date + lastCode;

};

//pad number
const padToNDigits = (n, value) => {
    return String(value).padStart(n, '0');
}

export const ConverterService = {
    convertUnixDateToMUI,
    convertDateToAPI,
    convertDateToAPI2,
    convertApplicationCode,
    padToNDigits
};