import AttachmentIcon from "@mui/icons-material/Attachment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { getPermisos, getUser } from "../../../services/localStorage";
import MUIXDataGrid from "../../MUIXDataGrid";
import Progress from "../../Progress";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import ButtonsDeleted from "../../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import ButtonsEdit from "../../componentes/ButtonsEdit";
import ModalForm from "../../componentes/ModalForm";
import { ButtonsImport } from "../../componentes/ButtonsImport";
import { CatalogosServices } from "../../../services/catalogosServices";
import { MigraData, resultmigracion } from "../../../interfaces/Share";
import { AccionesModal } from "./AccionesModal";

import MUIXDataGridGeneral from "../../MUIXDataGridGeneral";
import { IconButton, ToggleButton, Tooltip, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisorDocumentosOficios from "../../componentes/VisorDocumentosOficios";

const Acciones = ({
  handleFunction,
  obj,
  idauditoria,
  Ubicacion,

}: {
  handleFunction: Function;
  obj: any;
  idauditoria: any;
  Ubicacion: any;
}) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [openAccionesModal, setOpenAccionesModal] = useState(false);
  const [openContestacion, setOpenContestacion] = useState(false);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [vrows, setVrows] = useState({});
  const [NoAuditoria, setNoAuditoria] = useState(0);
  const [data, setData] = useState([]);
  const [tipoOperacion, setTipoOperacion] = useState(0);

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [updatedVrows, setupdatedVrows] = useState("");
  const [entregado, setEntregado] = useState(obj?.row?.entregado);


  const handleDeleted = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //setOpenSlider(false);
        let data = {
          NUMOPERACION: 3,
          CHID: v.data.row.id,
          CHUSER: user.Id,
        };

        AuditoriaService.Acciones_index(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            consulta({ NUMOPERACION: 4, P_IDAUDITORIA: idauditoria, P_IDOFICIO: obj.id });
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

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
            NUMOPERACION: 9,
            CHIDs: selectionModel,
            CHUSER: user.Id,
          };

          AuditoriaService.Acciones_index(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registros Eliminados!",
              });
              consulta({ NUMOPERACION: 4, P_IDAUDITORIA: idauditoria, P_IDOFICIO: obj.id });
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

  const consulta = (data: any) => {
    AuditoriaService.Acciones_index(data).then((res) => {
      if (res.SUCCESS) {
        // Toast.fire({
        //   icon: "success",
        //   title: "¡Consulta Exitosa!",
        // });
        setData(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleAccion = (v: any) => {
    setTipoOperacion(2);
    setOpenAccionesModal(true);
    setVrows([v.data.row,obj]);
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenContestacion(true);
  };

  const handleVerAdjuntos = (data: any) => {
    console.log("data",data);

    if(data.row.idOficio){
      setupdatedVrows(
      obj.row.anio + "/" + obj.row.NAUDITORIA + "/" + data.row.OficioA + "/" +  data.row.ClaveAccion
    );
    setOpenAdjuntos(true);
    setEntregado(obj.row.entregado)
    }else{
      Toast.fire({
    icon: "info",
    title: "¡Asignar oficio al que pertenece la notificación!",
  });
  setOpenAdjuntos(false);
    }
    
    

  };

  const handleClose = () => {
    setOpenAccionesModal(false);
    setOpenContestacion(false);
    setOpenAdjuntos(false);
    consulta({ NUMOPERACION: 4, P_IDAUDITORIA: idauditoria, P_IDOFICIO: obj.id });
  };

  const handleUpload = (data: any) => {
    setShow(true);
    let file = data?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "migraAcciones");
    CatalogosServices.migraData(formData).then((res) => {
      if (res.SUCCESS) {
        setShow(false);
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        consulta({ NUMOPERACION: 4, P_IDAUDITORIA: idauditoria, P_IDOFICIO: obj.id});
      } else {
        setShow(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpenAccionesModal(true);
    setVrows("");
    setNoAuditoria(obj?.row?.NAUDITORIA);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "NAUDITORIA",
      description: "Número de Auditoría",
      headerName: "No. de Auditoría",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OficioA",
      description: "Oficio al que pertenece",
      headerName: "Oficio al que pertenece",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DescripcionTipoDeAccion",
      description: "Tipo de Resultado",
      headerName: "Tipo de Resultado",
      width: 300,
      //align: "center",
      headerAlign: "center",
    },
    {
      field: "DescripcionEstatusAccion",
      headerName: "Estatus de los Resultados",
      width: 150,
      //align: "center",
      headerAlign: "center",
    },
    {
      field: "ClaveAccion",
      description: "Resultado",
      headerName: "Resultado",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    { field: "idAuditoria", headerName: "idAuditoria", width: 150,align: "center",
      headerAlign: "center", },
    {
      field: "accionSuperviviente",
      description: "Resultado Superveniente",
      headerName: "Resultado Superveniente",
      width: 150,
      //align: "center",
      headerAlign: "center",
    },

    {
      field: "TextoAccion",
      description: "Resultado/Observación",
      headerName: "Resultado/Observación",
      width: 450,
      //align: "center",
      headerAlign: "center",
    },
    { field: "Valor", description: "Valor", headerName: "Valor", width: 120,align: "center",
      headerAlign: "center",
     },
    {
      field: "numeroResultado",
      headerName: "Numero de Resultado",
      description: "Número de Resultado",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    { field: "monto", headerName: "Monto", description: "Monto", width: 150,align: "center",
      headerAlign: "center", },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (v) => {
        return (
          <>
         
              <ButtonsEdit
                handleAccion={handleAccion}
                row={v}
                show={true}
              ></ButtonsEdit>
           
            {eliminar && obj.row.entregado !== 1 ? (
              <ButtonsDeleted
                handleAccion={handleDeleted}
                row={v}
                show={eliminar}
              ></ButtonsDeleted>
            ) : (
              ""
            )}

            <ButtonsDetail
              title={"Ver Adjuntos"}
              handleFunction={handleVerAdjuntos}
              show={true}
              icon={<AttachmentIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 150 },
    {
      field: "UltimaActualizacion",
      headerName: "Última Actualización",
      width: 150,
    },
    {
      field: "creado",
      description: "Creado Por",
      headerName: "Creado Por",
      width: 200,
    },
    {
      field: "modi",
      description: "Modificado Por",
      headerName: "Modificado Por",
      width: 150,
    },
  ];

  useEffect(() => {
    console.log("obj",obj);
    
    permisos.map((item: PERMISO) => {
      if (String(item.menu) === "AUDITOR") {
        if (String(item.ControlInterno) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta({ NUMOPERACION: 4, P_IDAUDITORIA: idauditoria, P_IDOFICIO: obj.id });
  }, []);

  return (
    <div>
      <ModalForm
        title={"Administración de Resultados"}
        handleClose={handleFunction}
      >
        {openAccionesModal ? (
          <AccionesModal
            dt={vrows}
            handleClose={handleClose}
            tipo={tipoOperacion}
            nAuditoria={obj.row.NAUDITORIA}
            idAuditoria={idauditoria}
            idOficio={obj.id}
            />
        ) : (
          ""
        )}

        

        <Progress open={show}></Progress>
        <Typography variant="h6">
              {Ubicacion}
            </Typography>
        {agregar && obj.row.entregado !== 1 ? (
          <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        ) : (
          ""
        )}
        {agregar && obj.row.entregado !== 1 ? (
          <ButtonsImport handleOpen={handleUpload} agregar={agregar} />
        ) : (
          ""
        )}
        {eliminar && obj.row.entregado !== 1 ? (
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
        <MUIXDataGridGeneral
          columns={columns}
          rows={data}
          setRowSelected={setSelectionModel}
          multiselect={true}
        />
        {openAdjuntos ? (
          <VisorDocumentosOficios
            handleFunction={handleClose}
            obj={updatedVrows}
            tipo={8}
            Entregado={entregado}
          />
        ) : (
          ""
        )}
      </ModalForm>
    </div>
  );
};

export default Acciones;
