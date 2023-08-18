import Swal from "sweetalert2";

 export const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    color: 'rgb(175, 140, 85)',
    iconColor: 'rgb(175, 140, 85)',
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },

 });
