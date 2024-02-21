import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavbarForAdmin from "../../../components/AdminComponents/NavbarForAdmin/NavbarForAdmin";
import Cookies from "js-cookie";
import Notification from "../../../components/Notification/Notification";

export default function AddUsersForm() {

  const [email, setEmail] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

    const headers = {
      "Authorization":`Bearer ${Cookies.get("adminJwtToken")}`,
      'Content-Type': 'application/json',
    }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const postData = {email};
      const response = await axios.post(
        "http://localhost:8000/addUserDetails",
        postData,
        {headers}
      );
      if(response.status===200){
        setNotify({message:response.data.message,type:"success",isOpen:true})
      }
      setEmail("");
    } catch (error) {
      console.log("error occurred ", error);
      setNotify({message:"User already exists",type:"error",isOpen:true})
    }
  };

  return (
    <>
    <NavbarForAdmin/>
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
        <h2>Add Users</h2>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <Button type="submit" style={{ width: "120px" }} variant="contained">
          Add User
        </Button>
        <Notification notify={notify} setNotify={setNotify} />
      </Box>
    </>
  );
}
