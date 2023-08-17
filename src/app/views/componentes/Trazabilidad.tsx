import React, { useEffect, useState } from "react";
import Progress from "../Progress";
import ModalForm from "./ModalForm";
import { AuditoriaService } from "../../services/AuditoriaService";
import { ItrazabilidadFile } from "../../interfaces/Share";
import { Typography } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

const Trazabilidad = ({
  handleFunction,
  obj,
}: {
  handleFunction: Function;
  obj: any;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [data, setdata] = useState<ItrazabilidadFile[]>([]);

  const consulta = () => {
    let data = {
      NUMOPERACION: 7,
      P_IDFILE: obj.id,
    };
    AuditoriaService.Filesindex(data).then((res) => {
      if (res.SUCCESS) {
        const obj: ItrazabilidadFile[] = res.RESPONSE;
        setdata(obj);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
      }
    });
  };

  useEffect(() => {
    consulta();
  }, [obj]);

  return (
    <div>
      <ModalForm
        title={"Trazabilidad de la Operación"}
        handleClose={handleFunction}
      >
        <Progress open={openSlider}></Progress>

        <Timeline position="alternate">
          {data.map((it) => {
            return (
              <TimelineItem key={Math.random()}>
                <TimelineOppositeContent key={Math.random()}>
                  <Typography variant="body2" component="span">
                    {it.FechaCreacion}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator key={Math.random()}>
                  <TimelineDot sx={{ bgcolor: "rgb(175, 140, 85)" }} />
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ py: "12px", px: 2 }} key={Math.random()}>
                  <Typography variant="h6" component="span">
                    {it.Nombre}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="span">
                    {it.estatus}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </ModalForm>
    </div>
  );
};

export default Trazabilidad;
