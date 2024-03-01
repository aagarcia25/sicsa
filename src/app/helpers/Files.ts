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
  var response = false;
  let data = {
    NUMOPERACION: 10,
    ORIGEN: explorerRoute,
    DESTINO: explorerRoute2,
    TOKEN: JSON.parse(String(getToken())),
  };

  AuditoriaService.FoliosFilesindex(data).then((res) => {
    if (res.SUCCESS) {
      response = true;
    } else {
      response = false;
    }
  });
  return response;
}
