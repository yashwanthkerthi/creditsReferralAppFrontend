import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";

export default function AppDrawerForUser() {
  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon style={{ color: "black" }}>
                <MenuOutlinedIcon />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
         
        </div>

        {/* <ListItem>
          <ListItemButton onClick={() => navigate("/User/home")}>
            Home
            <ListItemText />
          </ListItemButton>
        </ListItem> */}
        <ListItem>
          <ListItemButton onClick={() => navigate("/user/dashboard")}>
            Dashboard
            <ListItemText />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{ paddingRight: "30px" }}
          >
            <MenuOutlinedIcon style={{ color: "black" }} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
