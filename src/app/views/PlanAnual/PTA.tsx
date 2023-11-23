import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from "react";
import { AuditoriaService } from "../../services/AuditoriaService";
import Progress from "../Progress";
import TitleComponent from "../componentes/TitleComponent";
import { Box, Grid, Typography } from "@mui/material";
import { PlanTrabajoAnualModal } from "./PlanTrabajoAnualModal";
import { getUser } from "../../services/localStorage";
import ButtonsAdd from "../componentes/ButtonsAdd";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";

export const PTA = ({}: // handleFunction,
// obj,
{
  //handleFunction: Function;
  // obj: any;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agregar, setAgregar] = useState<boolean>(true);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [vrows, setVrows] = useState({});
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("");

  const consulta = () => {
    let data = {
      NUMOPERACION: 4,
    };

    let ta: Task[] = [];
    AuditoriaService.planAnualindex(data).then((res) => {
      if (res.SUCCESS) {
        res.RESPONSE.map((item: any) => {
          let tes = {
            start: new Date(item.start),
            end: new Date(item.end),
            name: item.name,
            id: item.id,
            type: item.type,
            anio: item.anio,

            progress: 0,
            isDisabled: false,
            styles: {
              progressColor: "#ffbb54",
              progressSelectedColor: "#ff9e0d",
              fontSize: "8",
            },
            fontSize: "9",
          };
          ta.push(tes);
        });
        setTasks(ta);
        setOpenSlider(false);
      }
    });
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const handleOpenEdit = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setVrows(v);
  };

  const handleClose = () => {
    setOpen(false);
    //setOpenAdjuntos(false);
    consulta();
  };

  useEffect(() => {
    consulta();
  }, []);

  return (
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
      <TitleComponent title={"Plan de Trabajo Anual"} show={false} />

      {open ? (
        <PlanTrabajoAnualModal
          tipo={tipoOperacion}
          handleClose={handleClose}
          datos={vrows}
          //idauditoria={obj.id}
          user={user}
          // anio={vrows}
        />
      ) : (
        ""
      )}
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          {/* <Typography variant="h6">
              {obj.row.NAUDITORIA + " " + obj.row.NombreAudoria}
            </Typography> */}
        </Box>
      </Grid>

      {tasks.length > 0 ? (
        <Gantt
          viewMode={ViewMode.Month}
          tasks={tasks}
          locale={"es"}
          ganttHeight={400}
          columnWidth={60}
          onDoubleClick={handleOpenEdit}
          fontSize={"8"}
          listCellWidth={"300px"}
        />
      ) : (
        <Progress open={openSlider}></Progress>
      )}
    </div>
  );
};
