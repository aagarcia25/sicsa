import { Card, Grid } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { BarChart } from "@mui/x-charts";
import {
  TreeItem,
  TreeItemProps,
  treeItemClasses,
} from "@mui/x-tree-view/TreeItem";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { animated, useSpring } from "@react-spring/web";
import * as React from "react";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import { CatalogosServices } from "../../services/catalogosServices";
import { AuditoriaFlex } from "../Auditoria/AuditoriaFlex";
import TitleComponent from "../componentes/TitleComponent";
import Item from "antd/es/list/Item";

export const Dash = () => {
  const [dataset, setdataset] = React.useState(null);
  function MinusSquare(props: SvgIconProps) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  }

  function PlusSquare(props: SvgIconProps) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  }

  function CloseSquare(props: SvgIconProps) {
    return (
      <SvgIcon
        className="close"
        fontSize="inherit"
        style={{ width: 14, height: 14 }}
        {...props}
      >
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
      </SvgIcon>
    );
  }

  function TransitionComponent(props: TransitionProps) {
    const style = useSpring({
      to: {
        opacity: props.in ? 1 : 0,
        transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
      },
    });

    return (
      <animated.div style={style}>
        <Collapse {...props} />
      </animated.div>
    );
  }

  // eslint-disable-next-line react/display-name
  const CustomTreeItem = React.forwardRef(
    (props: TreeItemProps, ref: React.Ref<HTMLLIElement>) => (
      <TreeItem
        {...props}
        TransitionComponent={TransitionComponent}
        ref={ref}
      />
    )
  );

  const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({

    [`& .${treeItemClasses.iconContainer}`]: {

      "& .close": {

        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {

      marginLeft: 15,
      paddingLeft: 18,
    },
  }));

  const [ListAnio, setListAnio] = React.useState<SelectValues[]>([]);

  const loadFilter = (operacion: number, id?: string) => {
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 1) {
        setListAnio(res.RESPONSE);
        console.log("res", res.RESPONSE);
        console.log("map", ListAnio.map);
        console.log("item", Item);
        console.log("daata", data);
        // if(data ==="tdata")
        // { 
        //   console.log("Hay algo");

        // }
        // else{ console.log("No hay nada");
        // }

      }
    });
  };

  const loadGrafica = (nivel: number, id: string) => {
    const data = { nivel: nivel, P_ID: id };
    CatalogosServices.graficas(data).then((res) => {
      setdataset(res.RESPONSE);
    });
  };

  React.useEffect(() => {
    loadGrafica(0, "");
    loadFilter(1);
    console.log("item.label", Item);

  }, []);

  return (
    <div>

      <Grid container spacing={1} padding={0}>
        <div style={{ height: 600, width: "100%", padding: "1%" }}>
          <TitleComponent
            title={"Sistema de Control y Seguimiento de Auditoría (SICSA)"}
            show={false}
          />

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
            alignItems="flex-start"
          >
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
              alignItems="flex-start"
            >




              <Grid item xs={12} sm={6} md={7} lg={7}>
                <TreeView
                  aria-label="customized"
                  defaultExpanded={["1"]}
                  defaultCollapseIcon={<MinusSquare />}
                  defaultExpandIcon={<PlusSquare />}
                  defaultEndIcon={<CloseSquare />}
                  sx={{ overflowX: "hidden" }}
                >
                  <StyledTreeItem
                    nodeId="1"
                    label="Auditorías Secretaría de Finanzas y Tesorería General del Estado"
                  >
                    <StyledTreeItem
                      nodeId="df988d71-3d7b-11ee-aedd-3cd92b4d9bf4"
                      label="Federal"
                    >
                      <StyledTreeItem
                        nodeId="437435f5-2c35-11ee-aea6-3cd92b4d9bf4"
                        label="Auditoría Superior de la Federación (ASF)"
                      >
                        Cuenta Pública

                        {ListAnio.map((item, index) => {
                          console.log("Item", item);
                          return (<StyledTreeItem
                            key={index}
                            nodeId={`7-${index}`} // Unique nodeId for each item
                            label={item.label}
                          >
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
                              sx={{ padding: "10%" }}
                            >
                              {/* <Grid
                              container
                              item
                              spacing={1}
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              
                            > */}
                            {item.label ? (<AuditoriaFlex
                                anio={item.value}
                                tipo={"df988d71-3d7b-11ee-aedd-3cd92b4d9bf4"}
                                ente={"437435f5-2c35-11ee-aea6-3cd92b4d9bf4"}
                              ></AuditoriaFlex>):("")}
                              
                              {/* </Grid> */}
                            </Grid>
                          </StyledTreeItem>)

                        }




                        )}
                      </StyledTreeItem>

                      <StyledTreeItem
                        nodeId="16cf5f89-4202-11ee-a8c9-3cd92b4d9bf4"
                        label="Secretaría de la Función Pública (SFP)"
                      >
                        Cuenta Pública
                        {ListAnio.map((item, index) => (
                          <StyledTreeItem
                            key={index}
                            nodeId={`8-${index}`} // Unique nodeId for each item
                            label={item.label}
                          >
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
                              sx={{ padding: "10%" }}
                            >
                              {/* <Grid
                              container
                              item
                              spacing={1}
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                            > */}
                              <AuditoriaFlex
                                anio={item.value}
                                tipo={"df988d71-3d7b-11ee-aedd-3cd92b4d9bf4"}
                                ente={"16cf5f89-4202-11ee-a8c9-3cd92b4d9bf4"}
                              ></AuditoriaFlex>
                            </Grid>
                          </StyledTreeItem>
                        ))}
                      </StyledTreeItem>
                      <StyledTreeItem
                        nodeId="9"
                        label="Órgano Interno de Control (OIC)"
                      >
                        Cuenta Pública
                        {ListAnio.map((item, index) => (
                          <StyledTreeItem
                            key={index}
                            nodeId={`9-${index}`} // Unique nodeId for each item
                            label={item.label}
                          ></StyledTreeItem>
                        ))}
                      </StyledTreeItem>
                      <StyledTreeItem
                        nodeId="540eefdc-4202-11ee-a8c9-3cd92b4d9bf4"
                        label="Contraloría y Transparencia Gubernamental (CTG)"
                      >
                        Cuenta Pública
                        {ListAnio.map((item, index) => (
                          <StyledTreeItem
                            key={index}
                            nodeId={`10-${index}`} // Unique nodeId for each item
                            label={item.label}
                          >
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
                              sx={{ padding: "10%" }}
                            >
                              {/* <Grid
                              container
                              item
                              spacing={1}
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                            > */}
                              <AuditoriaFlex
                                anio={item.value}
                                tipo={"df988d71-3d7b-11ee-aedd-3cd92b4d9bf4"}
                                ente={"540eefdc-4202-11ee-a8c9-3cd92b4d9bf4"}
                              ></AuditoriaFlex>
                            </Grid>
                          </StyledTreeItem>
                        ))}
                      </StyledTreeItem>
                    </StyledTreeItem>

                    <StyledTreeItem
                      nodeId="e64df55b-3d7b-11ee-aedd-3cd92b4d9bf4"
                      label="Estatal"
                    >
                      <StyledTreeItem
                        nodeId="11"
                        label="Auditoría Superior del Estado de Nuevo León (ASENL)"
                      >
                        Cuenta Pública
                        {ListAnio.map((item, index) => (
                          <StyledTreeItem
                            key={index}
                            nodeId={`11-${index}`} // Unique nodeId for each item
                            label={item.label}
                          ></StyledTreeItem>
                        ))}
                      </StyledTreeItem>
                      <StyledTreeItem
                        nodeId="12"
                        label="Requerimiento de Auditorías Contraloría y Transparencia Gubernamental (CTG)"
                      >
                        Cuenta Pública
                        {ListAnio.map((item, index) => (
                          <StyledTreeItem
                            key={index}
                            nodeId={`12-${index}`} // Unique nodeId for each item
                            label={item.label}
                          ></StyledTreeItem>
                        ))}
                      </StyledTreeItem>
                    </StyledTreeItem>
                  </StyledTreeItem>
                </TreeView>
              </Grid>


              <Grid item xs={12} sm={6} md={5} lg={5} sx={{ display: "flex", alignItems: "flex-center" }}>
                {dataset ? (
                  <Card sx={{ position: "fixed", zIndex: 999, }}>
                    <BarChart
                      width={450}
                      height={300}
                      dataset={dataset}
                      xAxis={[{ scaleType: "band", dataKey: "Clasificacion" }]}
                      series={[
                        { dataKey: "En Proceso", label: "En Proceso", },
                        { dataKey: "Concluida", label: "Concluida" },
                      ]}
                    />
                  </Card>
                ) : (
                  ""
                )}
              </Grid>





            </Grid>






          </Grid>
        </div>
      </Grid>
    </div>
  );
};
