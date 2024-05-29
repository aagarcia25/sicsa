import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    const parentElement = toast.parentElement;

    if (parentElement) {
      parentElement.style.zIndex = '1000';  // Aplica zIndex si el parentElement no es null
    }
    toast.style.position = 'relative';  // Agrega esta línea
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export function alertaError(titulo = "Movimiento fallido") {
    Toast.fire({
      icon: "error",
      title: titulo,
      iconColor: "#af8c55",
      color: "#af8c55",
    });
  }
  
  export function alertaInfo(titulo: string) {
  
    return Toast.fire({
      icon: "info",
      title: titulo,
      iconColor: "#af8c55",
      color: "#af8c55",
    });
}