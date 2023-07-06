import * as React from "react";
import { useEffect, useState, createContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import { Container, Avatar } from "@mui/material";
import palette from "../../../styles/theme/palette";
import TopSection from "./topsection";
import ProfileCard from "./profilecard";

const drawerWidth = 270;
const drawerHeight = 75;

export default function Nav({ children }, props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [drawerHeight, setHeight] = React.useState("80px");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: drawerHeight,
          position: "flex",
          alignContent: "center",
          justifyContent: "center",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "rgba(249, 250, 251, 0.8)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: palette.grey[600],
            }}
          >
            <MenuIcon />
          </IconButton>
          <TopSection />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {/* <Logo /> */}
          <ProfileCard />
          {/* <NavSection onClose={handleDrawerToggle} /> */}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {" "}
          <Box sx={{ px: 2.5, pt: 2, display: "inline-flex" }}>
            <Avatar
              alt="logo"
              variant="square"
              src="/nav-logo.png"
              sx={{ width: 60, height: 60 }}
            />
          </Box>
          <ProfileCard />
          {/* <NavSection data={config} /> */}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box sx={{ ml: { sm: `${drawerWidth}px` }, width: "100%" }}>
          <Container maxWidth="xl" sx={{ p: { sm: 0, xs: 0 } }}>
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
