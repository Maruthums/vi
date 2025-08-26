import * as React from "react";
import {
  Box,
  createTheme,
  Drawer,
  Icon,
  IconButton,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import logo from "../../../assets/vi.png";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Colors } from "../../utils/color";
import MenuIcon from "@mui/icons-material/Menu";

export default function AdminLayout() {
  const [open, setOpen] = React.useState(true);


  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      primary: { main: "#7C3AED" },
      secondary: { main: "#FF8A65" },
      success: { main: "#28a745" },
      warning: { main: "#FFC107" },
      info: { main: "#1AC8ED" },
      background: { default: "#F5EEFF" },
    },
    shape: { borderRadius: 18 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 22,
            boxShadow:
              "0 8px 24px rgba(124,58,237,0.06), 0 2px 6px rgba(0,0,0,0.05)",
          },
        },
      },
    },
  });
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <ThemeProvider theme={theme}>
      {isMobile ? <Drawer variant="temporary" open={open} onClose={handleDrawerToggle}>
        <Sidebar
          open={false}
          isMobile={isMobile}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Drawer> : (
        <Sidebar
          open={open}
          isMobile={isMobile}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
      <Box
        component="main"
        sx={{
          ml: isMobile ? 0 : open ? "220px" : "70px",
          transition: "margin-left 0.3s ease",
          width: isMobile
            ? "100%"
            : `calc(100% - ${open ? "220px" : "70px"})`,
          pt: 3,
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            position: "sticky",
            top: 0,
            backgroundColor: Colors.basics.White,
            zIndex: 1000,
            justifyContent: "space-between",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "160px" }} />
          {isMobile && <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}><MenuIcon /></IconButton>}
         
        </Box>
        <Box sx={{ width: "100%" }}>
          <Outlet context={"true"} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
