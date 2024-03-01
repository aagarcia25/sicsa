import Swal from "sweetalert2";
import { AuditoriaService } from "../services/AuditoriaService";
import { getToken } from "../services/localStorage";

export function base64ToArrayBuffer(data: string) {
  var bString = window.atob(data);
  var bLength = bString.length;
  var bytes = new Uint8Array(bLength);
  for (var i = 0; i < bLength; i++) {
    var ascii = bString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

export function findOficios(explorerRoute: string, explorerRoute2: string) {
  let body = {
    NUMOPERACION: 10,
    FOLIO: explorerRoute,
    TOKEN: JSON.parse(String(getToken())),
  };

  AuditoriaService.FoliosFilesindex(body).then((res) => {
    if (res.RESPONSE.length > 0) {
      console.log(res.RESPONSE.length);

      Swal.fire({
        icon: "info",
        title:
          "¿Se han Encontrado Archivos relacionados a este oficio, Deseas Copiarlos?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 14,
            ORIGEN: explorerRoute,
            DESTINO: explorerRoute2,
            TOKEN: JSON.parse(String(getToken())),
          };

          AuditoriaService.FoliosFilesindex(data).then((res) => {
            if (res.SUCCESS) {
              console.log(res.RESPONSE);
              Swal.fire("Archivos copiados con Exito", "", "info");
            } else {
              Swal.fire("No se Copiaron los Archivos", "", "info");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se Copiaron los Archivos", "", "info");
        }
      });
    } else {
      Swal.fire("No se Contraron Archivos para copiar", "", "info");
    }
  });
}
