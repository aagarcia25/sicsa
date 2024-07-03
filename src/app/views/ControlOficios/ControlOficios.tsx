import AttachmentIcon from "@mui/icons-material/Attachment";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ClearIcon from "@mui/icons-material/Clear";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import SendIcon from "@mui/icons-material/Send";
import UsbIcon from "@mui/icons-material/Usb";
import UsbOffIcon from "@mui/icons-material/UsbOff";
import {
  Button,
  Grid,
  IconButton,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { formatFecha } from "../../helpers/FormatDate";
import { Toast } from "../../helpers/Toast";
import SelectValues from "../../interfaces/Share";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { AuditoriaService } from "../../services/AuditoriaService";
import { getPermisos, getToken, getUser } from "../../services/localStorage";
import { ShareService } from "../../services/ShareService";
import ButtonsAdd from "../componentes/ButtonsAdd";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../componentes/ButtonsDetail";
import ButtonsEdit from "../componentes/ButtonsEdit";
import { TooltipPersonalizado } from "../componentes/CustomizedTooltips";
import SelectFrag from "../componentes/SelectFrag";
import TitleComponent from "../componentes/TitleComponent";
import { ControlOficiosModal } from "./ControlOficiosModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CatalogosServices } from "../../services/catalogosServices";
import { ButtonsImport } from "../componentes/ButtonsImport";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import VisorDocumentosOficios from "../componentes/VisorDocumentosOficios";
import DescriptionIcon from "@mui/icons-material/Description";
import Goficio from "./Goficio";
export const ControlOficios = () => {
  const [openOficio, setopenOficio] = useState(false);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [bancos, setBancos] = useState([]);
  const [anio, setanio] = useState("");
  const [ListAnio, setListAnio] = useState<SelectValues[]>([]);

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const [showfilter, setshowfilter] = useState<boolean>(false);

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);
  const [bs, setBs] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [countFiles, setCountFiles] = useState<any[]>([]);
  const [data, setData] = useState([]);
  const handleAccion = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 3,
          CHID: v.data.id,
          CHUSER: user.Id,
        };

        AuditoriaService.Foliosindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            consulta({ NUMOPERACION: 4 });
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const CancelarFolio = (v: any) => {
    if (v.row.Cancelado == "CANCELADO") {
      Swal.fire({
        icon: "info",
        title: "¿Deseas activar este Oficio?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 6,
            CHID: v.row.id,
            CHUSER: user.Id,
          };

          AuditoriaService.Foliosindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Oficio Cancelado!",
              });
              consulta({ NUMOPERACION: 4 });
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "¿Estás seguro de cancelar este Oficio?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 6,
            CHID: v.row.id,
            CHUSER: user.Id,
          };

          AuditoriaService.Foliosindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Oficio Cancelado!",
              });
              consulta({ NUMOPERACION: 4 });
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    }
  };
  const generarBS = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Desear generar un BS de este Oficio?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 7,
          Oficio: v.row.Oficio,
          CHUSER: user.Id,
        };

        AuditoriaService.Foliosindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Oficio Cancelado!",
            });
            consulta({ NUMOPERACION: 4 });
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const agregarfolio = (data: any) => {
    // Retornar la promesa directamente
    return AuditoriaService.Foliosindex(data)
      .then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Agregado!",
          });
        } else {
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        }
        // Retornar el resultado de la promesa
        return res;
      })
      .catch((error) => {
        // Manejar errores de la promesa, si es necesario
        console.error("Error al agregar el folio:", error);
        throw error; // Esto puede ser opcional, dependiendo de cómo manejas los errores
      });
  };

  const registrardatos = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenSlider(true);
    let encontrados: any[] = [];
    let counfiles = event?.target?.files?.length;
    let peticiones: any[] = [];

    let succesFiles: any[] = [];
    let failFiles: any[] = [];

    //Recorremos los registros de la busqueda
    for (let i = 0; i < Number(counfiles); i++) {
      let file = event?.target?.files?.[i] || "";
      let namefile = event?.target?.files?.[i].name || "";
      encontrados.push({ Archivo: file, NOMBRE: namefile });
    }

    encontrados.map((item: any) => {
      const formData = new FormData();
      formData.append("file", item.Archivo, item.NOMBRE);
      let p = axios.post(
        "https://tesoreria-virtual-servicios.nl.gob.mx/US/ETL/extraer-informacion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      peticiones.push(p);
    });

    try {
      axios.all(peticiones).then((resposeArr) => {
        resposeArr.map((item, index) => {
          let currentFile = encontrados[index].Archivo;
          if (item.data.SUCCESS) {
            succesFiles.push({
              Archivo: currentFile,
              Name: currentFile.name,
              Asunto: item.data.RESPONSE[0].Asunto,
              fecha: item.data.RESPONSE[0].Fecha,
              Oficio: item.data.RESPONSE[0].Oficio,
            });

            const formData = new FormData();
            formData.append("NUMOPERACION", "5");
            formData.append("CHUSER", user.Id);
            formData.append("Archivo", currentFile, currentFile.name);
            formData.append("Name", currentFile.name);
            formData.append("Asunto", item.data.RESPONSE[0].Asunto);
            formData.append("dia", item.data.RESPONSE[0].Fecha.dia);
            formData.append("mes", item.data.RESPONSE[0].Fecha.mes);
            formData.append("anio", item.data.RESPONSE[0].Fecha.anio);
            formData.append(
              "Oficio",
              item.data.RESPONSE[0].Oficio.replace(" ", "").replace("/", "-")
            );

            agregarfolio(formData)
              .then((resultado) => {
                // Manejar el resultado
                AdjuntaFile(resultado.RESPONSE, currentFile, currentFile.name);
              })
              .catch((error) => {
                // Manejar el error
                console.error(error);
              });
          } else {
            failFiles.push({
              Archivo: currentFile.name,
            });
          }
        });
      });
    } catch (error) {
      setOpenSlider(false);
      console.error("Error al realizar las peticiones:", error);
    } finally {
      setOpenSlider(false);
      consulta({ NUMOPERACION: 4 });
    }
  };

  const AdjuntaFile = (data: any, Archivo: any, NOMBRE: any) => {
    let peticiones: any[] = [];
    const formData = new FormData();
    formData.append("NUMOPERACION", "1");
    formData.append("ID", data.id);
    formData.append("FOLIO", data.Oficio);
    formData.append("CHUSER", user.Id);
    formData.append("TOKEN", JSON.parse(String(getToken())));
    formData.append("FILE", Archivo, NOMBRE);
    let p = axios.post(
      process.env.REACT_APP_APPLICATION_BASE_URL + "FoliosFilesindex",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    peticiones.push(p);

    axios.all(peticiones).then((resposeArr) => {
      /* resposeArr.map((item) => {
          if (item.data.SUCCESS) {
            count++;
          } else {
            count--;
          }
        });*/
    });
  };

  const CargaDocumentos = (event: React.ChangeEvent<HTMLInputElement>) => {
    let encontrados: any[] = [];
    let noencontrados: any[] = [];
    let fueradesstatus: any[] = [];
    let rows = bancos;

    if (rows.length == 0) {
      Swal.fire(
        "Favor de realizar la búsqueda de Registros, primero",
        "",
        "info"
      );
    } else {
      let counfiles = event?.target?.files?.length;
      //Recorremos los registros de la busqueda

      rows.map((item: any, index) => {
        for (let i = 0; i < Number(counfiles); i++) {
          let file = event?.target?.files?.[i] || "";
          let namefile = event?.target?.files?.[i].name || "";

          if (namefile.includes(item.Oficio)) {
            rows = rows.filter((items) => !item);
            encontrados.push({ Archivo: file, Registro: item });
          } else {
            noencontrados.push(item.Oficio);
          }
        }
      });

      let a2 = noencontrados.filter((elemento, index) => {
        return noencontrados.indexOf(elemento) == index;
      });

      let a1 = encontrados.filter((elemento, index) => {
        return encontrados.indexOf(elemento) == index;
      });
      let html = "";
      if (a1.length == 0) {
        Swal.fire(
          "¡Error!",
          "Sin coincidencia con algun número de Oficio",
          "warning"
        );
      } else {
        html =
          "Archivos Encontrados <b>" + a1.length + " de  " + counfiles + "</b>";
        html = html + "<br>";
        html = html + "¿Desea procesarlos?";
        let count = 0;
        Swal.fire({
          icon: "info",
          title: "Infomación",
          footer: "Esta operación puede demorar un poco",
          html: html,
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            setOpenSlider(true);
            let peticiones: any[] = [];
            encontrados.map((item: any) => {
              const formData = new FormData();
              formData.append("NUMOPERACION", "1");
              formData.append("ID", item.Registro.id);
              formData.append(
                "FOLIO",
                item.Registro.Anio + "/" + item.Registro.Oficio
              );
              formData.append("CHUSER", user.Id);
              formData.append("TOKEN", JSON.parse(String(getToken())));
              formData.append("FILE", item.Archivo);

              let p = axios.post(
                process.env.REACT_APP_APPLICATION_BASE_URL + "FoliosFilesindex",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
              );
              peticiones.push(p);
            });

            axios.all(peticiones).then((resposeArr) => {
              resposeArr.map((item) => {
                if (item.data.SUCCESS) {
                  count++;
                } else {
                  count--;
                }
              });

              Swal.fire({
                icon: "success",
                title: "Información",
                text: "registros procesados " + count,
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  consulta({ NUMOPERACION: 4 });
                }
              });
            });
          } else {
            Swal.fire("¡Error!", "Operación Cancelada", "error");
          }
        });
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "Anio",
      headerName: "Anio",
      width: 150,
    },

    { field: "Oficio", headerName: "Oficio", width: 150 },
    { field: "Cancelado", headerName: "Cancelado", width: 100 },
    { field: "Nauditoria", headerName: "N° de Auditoría", width: 200 },
    { field: "dfTitular", headerName: "Destinatario", width: 250 },
    { field: "dfCargo", headerName: "Puesto", width: 250 },
    { field: "Asunto", headerName: "Asunto", width: 300 },
    { field: "Tema", headerName: "Tema", width: 450 },

    { field: "cpNombre", headerName: "Solicitante", width: 250 },

    {
      field: "Fecha",
      headerName: "Fecha",
      width: 100,
      renderCell: (v) => {
        if (v.row.Fecha) {
          return formatFecha(v.row.Fecha);
        }
      },
    },
    {
      field: "FechaEntrega",
      headerName: "Fecha de Entregado",
      width: 150,
      renderCell: (v) => {
        if (v.row.FechaEntrega) {
          return formatFecha(v.row.FechaEntrega);
        }
      },
    },
    {
      field: "FechaRecibido",
      headerName: "Fecha de Recibido",
      width: 200,
      renderCell: (v) => {
        if (v.row.FechaRecibido) {
          return formatFecha(v.row.FechaRecibido);
        }
      },
    },
    { field: "Observaciones", headerName: "Observaciones", width: 350 },
    {
      field: "magneticos",
      headerName: "Medios Magnéticos",
      width: 100,
      renderCell: (v) => {
        return (
          <>
            {v.row.magneticos == 1 ? (
              <Tooltip title={"Contiene medios magnéticos"}>
                <UsbIcon />
              </Tooltip>
            ) : (
              <Tooltip title={"No contiene medios magnéticos"}>
                <UsbOffIcon />
              </Tooltip>
            )}
          </>
        );
      },
    },

    {
      field: "acciones",
      disableExport: true,
      headerName: eliminar || editar ? "Acciones" : "",
      description: eliminar || editar ? "Campo de Acciones" : "",
      sortable: false,
      width: eliminar || editar ? 200 : 0,

      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Generar Oficio enn WORD"}
              handleFunction={handleOficio}
              show={true}
              icon={<DescriptionIcon />}
              row={v}
            ></ButtonsDetail>
            <ButtonsDetail
              title={"Documentos del Oficio"}
              handleFunction={handleVer}
              show={true}
              icon={<AttachmentIcon />}
              row={v}
            ></ButtonsDetail>
            {/* {countFiles.length > 0
              ? countFiles.find((obj) => obj.id == v.row.id)?.data
              : "Validando"} */}
            {editar ? (
              <ButtonsEdit
                handleAccion={handleEdit}
                row={v}
                show={true}
              ></ButtonsEdit>
            ) : (
              ""
            )}
            {eliminar ? (
              <ButtonsDeleted
                handleAccion={handleAccion}
                row={v}
                show={true}
              ></ButtonsDeleted>
            ) : (
              ""
            )}
            {cancelar ? (
              <ButtonsDetail
                title={
                  v.row.Cancelado == "CANCELADO"
                    ? "Activar Folio"
                    : "Cancelar Folio"
                }
                handleFunction={CancelarFolio}
                show={true}
                icon={
                  v.row.Cancelado == "CANCELADO" ? (
                    <FileOpenIcon />
                  ) : (
                    <ClearIcon />
                  )
                }
                row={v}
              ></ButtonsDetail>
            ) : (
              ""
            )}
            {bs ? (
              <ButtonsDetail
                title={"Generar BS"}
                handleFunction={generarBS}
                show={true}
                icon={<InsertPageBreakIcon />}
                row={v}
              ></ButtonsDetail>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpenAdjuntos(false);
    setOpen(false);
    setopenOficio(false);
    consulta({ Anio: anio, NUMOPERACION: 4 });
  };

  const handleVer = (v: any) => {
    setVrows(v);
    setOpenAdjuntos(true);
  };

  const handleOficio = (v: any) => {
    setVrows(v);
    setopenOficio(true);
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setVrows("");
  };

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setOpen(true);
    setVrows(v);
  };

  const handleFilterChange1 = (v: string) => {
    setanio(v);
    consulta({ Anio: v, NUMOPERACION: 4 });
  };
  const clearFilter = () => {
    setanio("");
    consulta({ NUMOPERACION: 4 });
  };

  const consulta = (data: any) => {
    setOpenSlider(true);
    AuditoriaService.Foliosindex(data).then((res) => {
      if (res.SUCCESS) {
        setBancos(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const loadFilter = (operacion: number, id?: string) => {
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 5) {
        //  setCatInforme(res.RESPONSE);
      } else if (operacion === 1) {
        setListAnio(res.RESPONSE);
      }
    });
  };

  const handleUpload = (data: any) => {
    setShow(true);
    let file = data?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "migraoficios");
    CatalogosServices.migraData(formData).then((res) => {
      if (res.SUCCESS) {
        setShow(false);
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        consulta({ NUMOPERACION: 4 });
      } else {
        setShow(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  // const consultaArchivos = (Ruta: string): Promise<any> => {
  //   return new Promise((resolve, reject) => {
  //     setOpenSlider(true);

  //     let data = {
  //       NUMOPERACION: 16,
  //       TOKEN: JSON.parse(String(getToken())),
  //       RUTA: Ruta,
  //     };

  //     AuditoriaService.FoliosFilesindex(data)
  //       .then((res) => {
  //         setOpenSlider(false);
  //         if (res.SUCCESS) {
  //           const response = res.RESPONSE;
  //           const fileCount = Array.isArray(response) ? response.length : 0;
  //           response.fileCount = fileCount;
  //           setData(response);
  //           console.log("res.RESPONSE", response);
  //           resolve(response);
  //         } else {
  //           Swal.fire("¡Error!", res.STRMESSAGE, "error");
  //           reject(new Error(res.STRMESSAGE));
  //         }
  //       })
  //       .catch((error) => {
  //         setOpenSlider(false);
  //         reject(error);
  //       });
  //   });
  // };

  // const delay = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  // const procesarRutasConLimite = async (
  //   rutas: { id: string; ruta: string }[],
  //   concurrencyLimit: number,
  //   delayMs: number
  // ): Promise<any[]> => {
  //   const resultados: any[] = [];
  //   const cola = [...rutas];

  //   const ejecutar = async (ruta: { id: string; ruta: string }) => {
  //     try {
  //       const resultado = await consultaArchivos(ruta.ruta);
  //       console.log("resultado", resultado.length);

  //       resultados.push({
  //         ruta: ruta.ruta,
  //         data: resultado.length,
  //         id: ruta.id,
  //       });
  //     } catch (error: any) {
  //       if (error.message === "429") {
  //         await delay(delayMs);
  //         await ejecutar(ruta);
  //       } else {
  //         resultados.push({
  //           ruta: ruta.ruta,
  //           data: "Validando...",
  //           id: ruta.id,
  //         });
  //       }
  //     }
  //   };

  //   const ejecutarConLimite = async () => {
  //     const procesos: Promise<void>[] = [];

  //     for (let i = 0; i < concurrencyLimit; i++) {
  //       const ruta = cola.shift();
  //       if (ruta) {
  //         procesos.push(ejecutar(ruta));
  //       }
  //     }

  //     while (cola.length > 0) {
  //       await Promise.any(procesos);
  //       const ruta = cola.shift();
  //       if (ruta) {
  //         procesos.push(ejecutar(ruta));
  //       }
  //     }
  //     await Promise.all(procesos);
  //   };

  //   await ejecutarConLimite();
  //   return resultados;
  // };

  // const iniciar = async (auxRutas: { id: string; ruta: string }[]) => {
  //   const concurrencyLimit = 10; // Ajusta este valor según las capacidades de tu servidor
  //   const delayMs = 8000; // Ajusta este valor según las capacidades de tu servidor

  //   const resultados = await procesarRutasConLimite(
  //     auxRutas,
  //     concurrencyLimit,
  //     delayMs
  //   );
  //   console.log("resultados", resultados);
  //   setCountFiles(resultados);
  // };

  // useEffect(() => {
  //   let auxRutas: { id: string; ruta: string }[] = [];
  //   bancos.map((item: any) => {
  //     let Ruta = "";
  //     if (item?.anio) {
  //       Ruta = Ruta + item.anio;
  //     }
  //     if (item?.Oficio) {
  //       Ruta = Ruta + "/" + item.Oficio;
  //     }

  //     auxRutas.push({ id: item.id, ruta: Ruta });
  //   });

  //   iniciar(auxRutas);
  // }, [bancos]);

  useEffect(() => {
    loadFilter(1);

    permisos.map((item: PERMISO) => {
      if (String(item.menu) === "CFOLIOS") {
        if (String(item.ControlInterno) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) === "EDIT") {
          setEditar(true);
        }
        if (String(item.ControlInterno) === "CANCEL") {
          setCancelar(true);
        }
        if (String(item.ControlInterno) === "BS") {
          setBs(true);
        }
      }
    });
  }, []);

  const noSelection = () => {
    if (selectionModel.length >= 1) {
      Swal.fire({
        icon: "info",
        title: "Se eliminarán los registros seleccionados",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 8,
            CHIDs: selectionModel,
            CHUSER: user.Id,
          };

          AuditoriaService.Foliosindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registros Eliminados!",
              });
              consulta({ Anio: anio, NUMOPERACION: 4 });
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    } else {
      Swal.fire({
        title: "Favor de Seleccionar Registros",
        icon: "warning",
      });
    }
  };

  const [selectionModel, setSelectionModel] = useState<any[]>([]);

  useEffect(() => {}, [selectionModel]);

  return (
    <Grid container spacing={1} padding={0}>
      <div style={{ height: 600, width: "100%", padding: "1%" }}>
        {open ? (
          <ControlOficiosModal
            tipo={tipoOperacion}
            handleClose={handleClose}
            dt={vrows}
          />
        ) : (
          ""
        )}
        <TitleComponent title={"Control de Oficios"} show={openSlider} />
        <Grid
          container
          item
          spacing={1}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "1%" }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Año:</Typography>
            <SelectFrag
              value={anio}
              options={ListAnio}
              onInputChange={handleFilterChange1}
              placeholder={"Seleccione.."}
              disabled={false}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <Tooltip title="Buscar">
              <Button
                onClick={() => {
                  consulta({ Anio: anio, NUMOPERACION: 4 });
                }}
                variant="contained"
                color="secondary"
                endIcon={<SendIcon sx={{ color: "white" }} />}
              >
                <Typography sx={{ color: "white" }}> Buscar </Typography>
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Tooltip title="Limpiar Filtros">
              <Button
                onClick={clearFilter}
                variant="contained"
                color="secondary"
                endIcon={<CleaningServicesIcon sx={{ color: "white" }} />}
              >
                <Typography sx={{ color: "white" }}>Limpiar Filtros</Typography>
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
        </Grid>
        {agregar ? <ButtonsAdd handleOpen={handleOpen} agregar={true} /> : ""}
        {agregar ? (
          <TooltipPersonalizado
            title={
              <React.Fragment>
                <Typography color="inherit">Cargar Oficios</Typography>
                {"Permite la carga de oficios de forma masiva"}
              </React.Fragment>
            }
          >
            <ToggleButton value="check" className="guardar" size="small">
              <IconButton
                color="inherit"
                aria-label="upload documento"
                component="label"
                size="small"
              >
                <input
                  multiple
                  hidden
                  accept=".pdf"
                  type="file"
                  value=""
                  onChange={(v) => registrardatos(v)}
                />
                <FileUploadIcon />
              </IconButton>
            </ToggleButton>
          </TooltipPersonalizado>
        ) : (
          ""
        )}
        {agregar ? (
          <TooltipPersonalizado
            title={
              <React.Fragment>
                <Typography color="inherit">
                  Relacionar Documentos a los Oficios
                </Typography>
              </React.Fragment>
            }
          >
            <ToggleButton value="check" className="guardar" size="small">
              <IconButton
                color="inherit"
                aria-label="upload documento"
                component="label"
                size="small"
              >
                <input
                  multiple
                  hidden
                  accept=".pdf"
                  type="file"
                  value=""
                  onChange={(v) => CargaDocumentos(v)}
                />
                <FilePresentIcon />
              </IconButton>
            </ToggleButton>
          </TooltipPersonalizado>
        ) : (
          ""
        )}
        {eliminar ? (
          <Tooltip title={"Eliminar Registros Seleccionados"}>
            <ToggleButton
              value="check"
              className="guardar"
              size="small"
              onChange={() => noSelection()}
            >
              <IconButton color="inherit" component="label" size="small">
                <DeleteForeverIcon />
              </IconButton>
            </ToggleButton>
          </Tooltip>
        ) : (
          ""
        )}
        {agregar ? (
          <ButtonsImport handleOpen={handleUpload} agregar={agregar} />
        ) : (
          ""
        )}
        <MUIXDataGridGeneral
          columns={columns}
          rows={bancos}
          setRowSelected={setSelectionModel}
          multiselect={true}
        />
        {openAdjuntos ? (
          <VisorDocumentosOficios
            handleFunction={handleClose}
            obj={vrows}
            tipo={1}
          />
        ) : (
          ""
        )}
        {openOficio ? (
          <Goficio
            open={openOficio}
            handleFunction={handleClose}
            obj={vrows}
          ></Goficio>
        ) : (
          ""
        )}
      </div>
    </Grid>
  );
};
