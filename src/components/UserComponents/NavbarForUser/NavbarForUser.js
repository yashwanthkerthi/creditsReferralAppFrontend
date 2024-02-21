import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AppDrawerForUser from "../AppDrawerForUser/AppDrawerForUser";

export default function NavbarForUser() {
  const navigate = useNavigate();

  const logout = async (req, res) => {
    Cookies.remove("userJwtToken");
    // Cookies.remove("userId");
    navigate("/user/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{ position: "sticky", top: 0 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "aliceblue", padding: "10px" }}
      >
        <Toolbar variant="dense" style={{display:"flex",justifyContent:"space-between"}} >
          <AppDrawerForUser />
          <Typography
            style={{ color: "black", fontFamily: "monospace" }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Credits Referral POC
          </Typography>
          <Typography
            style={{ marginLeft: "800px", cursor: "pointer" }}
            onClick={logout}
            variant="h6"
            color="black"
            component="div"
          >
            Logout
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
