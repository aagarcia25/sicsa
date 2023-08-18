import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from "react";
import { AuditoriaService } from "../../services/AuditoriaService";
import Progress from "../Progress";
import TitleComponent from "../componentes/TitleComponent";

export const PTA = () => {
  const [openSlider, setOpenSlider] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

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
        console.log(ta[0]);
        setTasks(ta);
        setOpenSlider(false);
      }
    });
  };

  useEffect(() => {
    consulta();
  }, []);

  return (
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
      <TitleComponent title={"Plan de Trabajo Anual"} show={false} />
      {tasks.length > 0 ? (
        <Gantt
          viewMode={ViewMode.Month}
          tasks={tasks}
          locale={"es"}
          ganttHeight={400}
          columnWidth={60}
          fontSize={"8"}
          listCellWidth={"300px"}
        />
      ) : (
        <Progress open={openSlider}></Progress>
      )}
    </div>
  );
};
