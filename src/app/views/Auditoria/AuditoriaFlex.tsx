import AttachmentIcon from "@mui/icons-material/Attachment";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { AuditoriaService } from "../../services/AuditoriaService";
import { ShareService } from "../../services/ShareService";
import { getPermisos, getUser } from "../../services/localStorage";
import MUIXDataGrid from "../MUIXDataGrid";
import { ButtonsDetail } from "../componentes/ButtonsDetail";
import { AuditoriaModal } from "./AuditoriaModal";
import { Toast } from "../../helpers/Toast";
import LinkIcon from "@mui/icons-material/Link";

export const AuditoriaFlex = ({
  anio,
  tipo,
  ente,
}: {
  anio: string;
  tipo: string;
  ente: string;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [modo, setModo] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [bancos, setBancos] = useState([]);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [showfilter, setshowfilter] = useState<boolean>(false);

  const [modalidad, setmodalidad] = useState("");

  const handleVerAdjuntos = (data: any) => {
    setVrows(data);
    setOpenAdjuntos(true);
  };
  const handleClose = () => {
    setOpen(false);
    consulta();
  };
  const handleAccion = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setVrows(v);
  };
  const MostrarLink = (data: any) => {
    window.open(
      "https://informe.asf.gob.mx/Documentos/Auditorias/" +
        data.row.anio +
        "_" +
        data.row.NAUDITORIA +
        "_a.pdf",
      "_blank"
    );
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "ciid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "ctaid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "cefid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "cgfid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "csid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Auditoria"}
              handleFunction={handleAccion}
              show={true}
              icon={<AttachmentIcon />}
              row={v}
            ></ButtonsDetail>
            <ButtonsDetail
              title={"Auditoría individual"}
              handleFunction={MostrarLink}
              show={true}
              icon={<LinkIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },

    {
      field: "NAUDITORIA",
      description: "Número de Auditoría",
      headerName: "No. de Auditoría",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "NombreAudoria",
      description: "Nombre",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "cmoDescripcion",
      description: "Modalidad",
      headerName: "Modalidad",
      width: 250,
    },
  ];

  const consulta = () => {
    let data = {
      NUMOPERACION: 4,
      // FolioSIGA: FolioSIGA === "false" ? "" : FolioSIGA,
      // NAUDITORIA: NAUDITORIA === "false" ? "" : NAUDITORIA,
      // idEstatus: idEstatus === "false" ? "" : idEstatus,
      // idmunicipio: municipio === "false" ? "" : municipio,
      // idInicioauditoria: idInicioauditoria === "false" ? "" : idInicioauditoria,
      anio: anio,
      tipo: tipo,
      ente: ente,
      // idModalidad: modalidad === "false" ? "" : modalidad,
    };
    AuditoriaService.Auditoriaindex(data).then((res) => {
      if (res.SUCCESS) {
        setBancos(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "AUDITOR") {
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta();
  }, []);

  return (
    <>
      {bancos.length !== 0 ? (
        <div>
          <div style={{ height: 600, width: "100%", padding: "5%" }}>
            {open ? (
              <AuditoriaModal
                tipo={tipoOperacion}
                handleClose={handleClose}
                dt={vrows}
              />
            ) : (
              ""
            )}
            <MUIXDataGrid columns={columns} rows={bancos} />
          </div>
        </div>
      ) : (
        "Sin registros"
      )}
    </>
  );
};
