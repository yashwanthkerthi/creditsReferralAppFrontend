import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import Navbar from "../../../components/NavbarForCompany";
import Cookies from "js-cookie";
import { useNavigate,Link } from "react-router-dom";
// import Cookies from "cookies"

export default function RegisterCompanyUsers() {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate()

  const handleChange = (event) => {
    setRole(event.target.value);
  };

//   const headers = {
//     "Authorization":`Bearer ${Cookies.get("jwt_token")}`,
//     'Content-Type': 'application/json',
//   }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const postData = { name,email, password, role };
      const response = await axios.post("http://localhost:9000/register-company-user", postData);
    //   const data = response.data;
    //   console.log(postData);
    Cookies.set("jwt_token", response.data?.jwtToken, {
        expires: 30,
        path: "/",
      });
      Cookies.set("role",response?.data?.user?.role)

      navigate(`${role}`)
    // console.log(postData);
    setName("")
    setEmail("")
    setPassword("")
    setRole("")
    } catch (error) {
      console.log("error occurred ", error);
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
        marginTop:"25px"
      }}
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <h2>Register Company User</h2>
      <TextField
        onChange={(e) => setName(e.target.value)}
        value={name}
        id="outlined-basic"
        label="Name"
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

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="md">Md</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Link style={{textDecoration:"none",fontSize:"15px",color:"darkblue"}} to="/">
            Already have an account / Signup account
          </Link>
      <Button type="submit" style={{width:"120px"}} variant="contained">Register</Button>

    </Box>
    </>

  );
}
