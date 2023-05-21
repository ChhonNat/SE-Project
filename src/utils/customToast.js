import { toast } from "react-toastify";

const toastType = {
    success: "success",
    error: "error",
    warning: "warning",
};

const onLoading = (message) => toast.loading(message);

const success = (id, message) => toast.update(id, {
        render: message,
        type: toastType.success,
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true
});

const error = (id, message) => toast.update(id, {
    render: message,
    type: toastType.error,
    isLoading: false,
    autoClose: 1000,
    closeOnClick: true
});


const warning = (id, message) => toast.update(id, {
    render: message,
    type: toastType.warning,
    isLoading: false,
    autoClose: 1000,
    closeOnClick: true
});


export const customToast = {
    success,
    error,
    warning,
    onLoading
}