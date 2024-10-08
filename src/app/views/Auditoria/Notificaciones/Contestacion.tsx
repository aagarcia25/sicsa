import React, { useEffect, useState } from "react";
import TitleComponent from "../../componentes/TitleComponent";
import ModalForm from "../../componentes/ModalForm";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import MUIXDataGrid from "../../MUIXDataGrid";
import Progress from "../../Progress";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { GridColDef } from "@mui/x-data-grid";
import ButtonsDeleted from "../../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import ButtonsEdit from "../../componentes/ButtonsEdit";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { Toast } from "../../../helpers/Toast";
import Swal from "sweetalert2";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import AttachmentIcon from "@mui/icons-material/Attachment";

import { ContestacionModal } from "./ContestacionModal";
import { IconButton, ToggleButton, Tooltip, Typography } from "@mui/material";
import MUIXDataGridGeneral from "../../MUIXDataGridGeneral";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisorDocumentosOficios from "../../componentes/VisorDocumentosOficios";

export const Contestacion = ({
  handleFunction,
  obj,
  Entregado,
  Ubicacion,
}: {
  handleFunction: Function;
  obj: any;
  Entregado: any;
  Ubicacion: any;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [open, setOpen] = useState(false);
  const [openModalDetalle, setOpenModalDetalle] = useState(false);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [updatedVrows, setupdatedVrows] = useState("");
  const [entregado, setEntregado] = useState({});

  const handleVerAdjuntos = (data: any) => {
    console.log("data",data);
    
    setupdatedVrows(
      obj.row.anio +
        "/" +
        obj.row.NAUDITORIA +
        "/" +
        obj.row.OficioA +
        "/" +
        obj.row.Oficio +
        "/" +
        data.row.Oficio
    );
    setOpenAdjuntos(true);
    setEntregado(Entregado);
  };

  const consulta = (data: any) => {
    AuditoriaService.Contestacionindex(data).then((res) => {
      if (res.SUCCESS) {
        setData(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

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
        //setOpenSlider(false);
        let data = {
          NUMOPERACION: 3,
          CHID: v.data.row.id,
          CHUSER: user.Id,
        };

        AuditoriaService.Contestacionindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            //consulta({ NUMOPERACION: 4 });
            consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
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

          AuditoriaService.Contestacionindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registros Eliminados!",
              });
              consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
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

  const handleClose = () => {
    setOpen(false);
    setOpenAdjuntos(false);
    setOpenModal(false);
    consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
    setVrows({})
  };

  const handleEdit = (data: any) => {
    setOpenModal(true);
    setTipoOperacion(2);
    setVrows(data.data);
    setEntregado(Entregado);
  };

  const handleOpen = () => {
    setupdatedVrows(
      obj.row.anio + "/" + obj.row.NAUDITORIA + "/" + obj.row.Oficio + "/"
    );
    setOpenModal(true);
    setTipoOperacion(1);
    setVrows({});
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
      field: "Oficio",
      description: "Oficio",
      headerName: "Oficio",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "unidad",
      description: "Unidad Responsable",
      headerName: "Unidad Responsable",
      width: 300,
      //align: "center",
      headerAlign: "center",
    },
    {
      field: "secretaria",
      description: "Secretaría",
      headerName: "Secretaría",
      width: 300,
      //align: "center",
      headerAlign: "center",
    },
    {
      field: "SIGAOficio",
      description: "Folio SIGA",
      headerName: "Folio SIGA",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "FOficio",
      description: "Fecha de Oficio",
      headerName: "Fecha de Oficio",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "FRecibido",
      description: "Fecha de Recibido",
      headerName: "Fecha de Recibido",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "FVencimiento",
      description: "Fecha de Vencimiento",
      headerName: "Fecha de Vencimiento",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Prorroga",
      description: "Fecha de Prorroga",
      headerName: "Fecha de Prorroga",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      align: "center",
      headerAlign: "center",
      width: 200,
      renderCell: (v) => {
        return (
          <>
            <ButtonsEdit
              handleAccion={handleEdit}
              row={v}
              show={true}
            ></ButtonsEdit>

            {eliminar && Entregado !== 1 ? (
              <ButtonsDeleted
                handleAccion={handleAccion}
                row={v}
                show={eliminar}
              ></ButtonsDeleted>
            ) : (
              ""
            )}

            <ButtonsDetail
              title={"Ver adjuntos"}
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
      width: 150,
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
    console.log("Entregado",Entregado);
    

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
    consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
  }, []);

  return (
    <div>
      <ModalForm
        title={"Contestación a Notificación"}
        handleClose={handleFunction}
      >
        <Progress open={openSlider}></Progress>
        <Typography variant="h6">
          {Ubicacion}
        </Typography>
        {agregar && Entregado !== 1 ? (
          <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        ) : (
          ""
        )}
        {eliminar && Entregado !== 1 ? (
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
          tipo={5}
          Entregado={entregado}
        />
      ) : (
        ""
      )}
      </ModalForm>
      {openModal ? (
        <ContestacionModal
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
          user={user}
          idNotificacion={obj.id}
          destino={updatedVrows}
          Entregado={entregado}
        />
      ) : (
        ""
      )}

      {/* {openAdjuntos ? (
        <VisorDocumentosOficios
          handleFunction={handleClose}
          obj={updatedVrows}
          tipo={5}
          Entregado={entregado}
        />
      ) : (
        ""
      )} */}
    </div>
  );
};

export default ContestacionModal;
