import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navigator from "./Navigator";
import Header from "./Header";
import { ReactNode } from "react";
import { Grid } from "@mui/material";
import { USUARIORESPONSE } from "../interfaces/UserInfo";

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#b08c55",
      dark: "#000003",
    },
    secondary: {
      light: "#15212F",
      main: "#15212F",
      dark: "#15212F",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#rgb(255,255,255,0.15)",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: "standard",
          backgroundColor: "#ffffff",
          minWidth: "auto",
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
  },
};

interface Props {
  children?: ReactNode;
  user: USUARIORESPONSE;
  imgData: string;
  imgTipo: string;
}

const drawerWidth = 230;

export default function Inicio({ children, user, imgData, imgTipo }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid className="ContainerInicio">
        <CssBaseline />
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        />
        <Grid sx={{ flexDirection: "column", width: "100%" }}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            name={
              user?.Nombre +
              " " +
              user?.ApellidoPaterno +
              " " +
              user?.ApellidoMaterno
            }
            id={1}
            imgData={imgData}
            imgTipo={imgTipo}
          />
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
