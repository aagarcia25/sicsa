import {  Tooltip } from "antd";
import MUIXDataGridGeneral from "../../MUIXDataGridGeneral";
import ModalForm from "../../componentes/ModalForm";
import { IconButton, ToggleButton, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisorDocumentosOficios from "../../componentes/VisorDocumentosOficios";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import { useEffect, useState } from "react";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import ButtonsEdit from "../../componentes/ButtonsEdit";
import ButtonsDeleted from "../../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { GridColDef } from "@mui/x-data-grid";
import { AuditoriaService } from "../../../services/AuditoriaService";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import { getPermisos, getUser } from "../../../services/localStorage";
import Progress from "../../Progress";
import { OficiosContestacionModal } from "./OficiosContestacionModal";



export const OficiosContestacion = ({
    handleFunction,
    obj,
    Entregado,
  }: {
    handleFunction: Function;
    obj: any;
    Entregado: any;
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
        setupdatedVrows(
          obj.row.anio +
            "/" +
            obj.row.NAUDITORIA +
            "/" +
            obj.row.Oficio +
            "/" +
            data.row.Oficio
        );
        setOpenAdjuntos(true);
        setEntregado(Entregado);
      };

    const consulta = (data: any) => {
        AuditoriaService.OficiosContestacon_index(data).then((res) => {
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
    
            AuditoriaService.OficiosContestacon_index(data).then((res) => {
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
    
              AuditoriaService.OficiosContestacon_index(data).then((res) => {
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
        },
        {
          field: "Oficio",
          description: "Oficio",
          headerName: "Oficio",
          width: 150,
        },
        {
          field: "cuDescripcion",
          description: "Unidad Responsable",
          headerName: "Unidad Responsable",
          width: 300,
        },
        {
          field: "secDescripcion",
          description: "Secretaría",
          headerName: "Secretaría",
          width: 300,
        },
        {
          field: "SIGAOficio",
          description: "Folio SIGA",
          headerName: "Folio SIGA",
          width: 150,
        },
        {
          field: "FOficio",
          description: "Fecha de Oficio",
          headerName: "Fecha de Oficio",
          width: 150,
        },
        {
          field: "FRecibido",
          description: "Fecha de Recibido",
          headerName: "Fecha de Recibido",
          width: 150,
        },
        {
          field: "FVencimiento",
          description: "Fecha de Vencimiento",
          headerName: "Fecha de Vencimiento",
          width: 150,
        },
        {
          field: "Prorroga",
          description: "Fecha de Prorroga",
          headerName: "Fecha de Prorroga",
          width: 150,
        },
        {
          field: "acciones",
          disableExport: true,
          headerName: "Acciones",
          description: "Campo de Acciones",
          sortable: false,
          width: 200,
          renderCell: (v) => {
            return (
              <>
                <ButtonsEdit
                  handleAccion={handleEdit}
                  row={v}
                  show={true}
                ></ButtonsEdit>
    
                {eliminar && Entregado !== "1" ? (
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
            title={"Contestación a Oficios"}
            handleClose={handleFunction}
          >
            <Progress open={openSlider}></Progress>
            <Typography variant="h6">
              {obj.row.Oficio + " - " + obj.row.NAUDITORIA}
            </Typography>
            {agregar && Entregado !== "1" ? (
              <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
            ) : (
              ""
            )}
            {eliminar && Entregado !== "1" ? (
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
              tipo={9}
              Entregado={entregado}
            />
          ) : (
            ""
          )}
          </ModalForm>
          {openModal ? (
            <OficiosContestacionModal
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
              tipo={9}
              Entregado={entregado}
            />
          ) : (
            ""
          )} */}
        </div>
      );
}