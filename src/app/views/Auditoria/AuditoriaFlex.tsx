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
      width: 50,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Auditoria"}
              handleFunction={handleVerAdjuntos}
              show={true}
              icon={<AttachmentIcon />}
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
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "NombreAudoria",
      description: "Nombre",
      headerName: "Nombre",
      width: 300,
    },
    {
      field: "cmoDescripcion",
      description: "Modalidad",
      headerName: "Modalidad",
      width: 200,
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
    <div>
      <div style={{ height: 700, width: "100%", padding: "5%" }}>
        <MUIXDataGrid columns={columns} rows={bancos} />
      </div>
    </div>
  );
};
