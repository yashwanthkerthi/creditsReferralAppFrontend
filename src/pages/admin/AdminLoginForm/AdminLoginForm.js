import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate,Link } from "react-router-dom";
import Cookies from "js-cookie";
import Notification from "../../../components/Notification/Notification";

export default function AdminLoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const postData = {email, password };
      const response = await axios.post(
        "http://localhost:8000/adminsignin",
        postData
      );
      // console.log(response.data.message);
      // Cookies.set("adminId",response.data.id)
      if(response.status===200){
        setNotify({message:response.data.message,type:"success",isOpen:true})
      }
      // <Notification notify={notify} setNotify={setNotify} />
      Cookies.set("adminJwtToken",response.data.jwtToken)
      setTimeout(() => {
        navigate("/admin/dashboard")
      }, 1500);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("error occurred ", error);
        setNotify({message:"Enter Valid Details",type:"error",isOpen:true})
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "center",
          marginTop: "25px",
        }}
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <h2>Login Admin</h2>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button type="submit" style={{ width: "120px" }} variant="contained">
          Login
        </Button>
        <Link to="/admin/register" >Already have an account / signup</Link>
        

        <Notification notify={notify} setNotify={setNotify} />
      </Box>
    </>
  );
}
