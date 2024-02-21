import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Notification from "../../../components/Notification/Notification";
// import IntegrationNotistack from "../../../components/SnackBar/SnackBar";

export default function AdminRegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate()


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const postData = { firstName, lastName, email, password };
      const response = await axios.post(
        "http://localhost:8000/adminsignup",
        postData
      );
      // Cookies.set("adminJwtToken",response.data.jwtToken)
      if(response.status===200){
        setNotify({message:response.data.message,type:"success",isOpen:true})
      }
      setTimeout(() => {
        navigate("/")
      }, 1500);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("error occurred ", error);
      setNotify({message:"Enter Valid Details or user exists ",type:"error",isOpen:true})
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
        <h2>Register Admin</h2>
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          id="outlined-basic"
          label="firstName"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          id="outlined-basic"
          label="lastName"
          variant="outlined"
        />
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
          Register
        </Button>
        <Link to="/" >Already have an account / signup </Link>
        <Notification notify={notify} setNotify={setNotify} />

      </Box>
    </>
  );
}
