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
      Swal.fire({
        icon: "info",
        title:
          "¿Se han Encontrado Archivos relacionados a este oficio, Deseas Copiarlos? ",
        text: "Este proceso puede Tardar un poco , se le mostrara un mensaje cuando este terminado, Favor de No Recargar la Página",
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

export function verifidOficios(explorerRoute: string, explorerRoute2: string) {
  let data = {
    NUMOPERACION: 15,
    ORIGEN: explorerRoute,
    DESTINO: explorerRoute2,
    TOKEN: JSON.parse(String(getToken())),
  };

  AuditoriaService.FoliosFilesindex(data).then((res) => {
    if (res.SUCCESS) {
      Swal.fire("Archivos copiados con Exito", "", "info");
    } else {
      Swal.fire("No se Copiaron los Archivos", "", "info");
    }
  });
}
