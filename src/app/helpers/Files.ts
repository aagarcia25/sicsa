
export function base64ToArrayBuffer(data: string) {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
};

// export function dowloandfile(obj: any){
//     CatalogosServices.obtenerDoc(obj).then((res) => {
//         var bufferArray = base64ToArrayBuffer( String(res.RESPONSE.RESPONSE.FILE) );
//         var blobStore = new Blob([bufferArray], { type: "application/pdf" });
//         var data = window.URL.createObjectURL(blobStore);
//         var link = document.createElement('a');
//         document.body.appendChild(link);
//         link.href = data;
//         link.download = obj.NOMBRE;
//         link.click();
//         window.URL.revokeObjectURL(data);
//         link.remove();
//       });
// }
