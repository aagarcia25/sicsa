import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
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

export const Dash = () => {
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
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }));

  const [ListAnio, setListAnio] = React.useState<SelectValues[]>([]);

  const loadFilter = (operacion: number, id?: string) => {
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 1) {
        setListAnio(res.RESPONSE);
      }
    });
  };

  React.useEffect(() => {
    loadFilter(1);
  }, []);

  return (
    <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 900 }}>
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
          <StyledTreeItem nodeId="2" label="Federal">
            <StyledTreeItem
              nodeId="7"
              label="Auditoría Superior de la Federación (ASF)"
            >
              Cuenta Pública
              {ListAnio.map((item, index) => (
                <StyledTreeItem
                  key={index}
                  nodeId={`7-${index}`} // Unique nodeId for each item
                  label={item.label}
                ></StyledTreeItem>
              ))}
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="8"
              label="Secretaría de la Función Pública (SFP)"
            >
              Cuenta Pública
              {ListAnio.map((item, index) => (
                <StyledTreeItem
                  key={index}
                  nodeId={`8-${index}`} // Unique nodeId for each item
                  label={item.label}
                ></StyledTreeItem>
              ))}
            </StyledTreeItem>
            <StyledTreeItem nodeId="9" label="Órgano Interno de Control (OIC)">
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
              nodeId="10"
              label="Contraloría y Transparencia Gubernamental (CTG)"
            >
              Cuenta Pública
              {ListAnio.map((item, index) => (
                <StyledTreeItem
                  key={index}
                  nodeId={`10-${index}`} // Unique nodeId for each item
                  label={item.label}
                ></StyledTreeItem>
              ))}
            </StyledTreeItem>
          </StyledTreeItem>

          <StyledTreeItem nodeId="3" label="Estatal">
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
    </Box>
  );
};
