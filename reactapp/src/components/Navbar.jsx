import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="secondary" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          {/* Turftime brand text (keeps brand name) */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            Turftime
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.8)", ml: 1 }}
          >
          </Typography>
        </Box>

        <Box>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ textTransform: "none", mr: 1 }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/add"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Add Booking
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
