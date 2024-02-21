import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../../../components/Notification/Notification";

export default function UserRegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  // const [code,setCode] = useState("")
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate()


  const getReferralCode = async () =>{
    const url = window.location.href;
    // Parse the URL to extract query parameters
    const params = new URLSearchParams(new URL(url).search);
    // Get the value of the 'code' query parameter (referral code)
    setReferralCode(params.get('code'))  ;
  }

  useEffect(() => {
    getReferralCode()
  }, [])
  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const postData = { firstName, lastName, email, password,referralCode };
      // const code = 
      const response = await axios.post(
        "http://localhost:8000/usersignup",
        postData
      );
      if(response.status===200){
        setNotify({message:response.data.message,type:"success",isOpen:true})
      }
      // Cookies.set("userJwtToken",response.data.jwtToken)
      setTimeout(() => {
        navigate("/user/login")
      }, 1500);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
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
          marginTop: "25px",
        }}
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <h2>Register User</h2>
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
          onChange={(e) => setReferralCode(e.target.value)}
          value={referralCode}
          id="outlined-basic"
          label="Referral code"
          variant="outlined"
          disabled
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
        <Link to="/user/login" >Already have an account / signup </Link>
        <Notification notify={notify} setNotify={setNotify} />
      </Box>
    </>
  );
}
