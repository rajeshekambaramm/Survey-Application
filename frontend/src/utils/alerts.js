import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const successToast = (message) =>
    toast.success(message);

export const errorToast = (message) =>
    toast.error(message);

export const warningToast = (message) =>
    toast.warning(message);

export const confirmDelete = async () => {

    const result = await Swal.fire({

        title: "Delete Survey?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#dc3545",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Delete"

    });

    return result.isConfirmed;

};