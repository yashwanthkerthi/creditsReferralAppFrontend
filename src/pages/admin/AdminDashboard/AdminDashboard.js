import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import NavbarForAdmin from '../../../components/AdminComponents/NavbarForAdmin/NavbarForAdmin'

const AdminDashboard = () => {
  const [userData,setUserData] = useState({})
 
  const headers = {
    "Authorization":`Bearer ${Cookies.get("adminJwtToken")}`,
    'Content-Type': 'application/json',
  }

  const getUserData = async () =>{
    try {
      console.log(Cookies.get("adminJwtToken"));

      const response = await axios.get(`http://localhost:8000/getadmindetails`,{headers})
      console.log(response.data.data);
      const data = response.data
      setUserData(data.data)
    } catch (error) {
      console.log("error",error);
    }
}

useEffect(() => {
  getUserData()
}, [])
  

  return (
    <div>
        <NavbarForAdmin/>
        <div style={{margin:"35px",padding:"15px",backgroundColor:"azure",borderStyle:"solid",borderColor:"black",borderWidth:"0.5px",maxWidth:"70vw"}} >
          <h2>FirstName : {userData.firstName} , LastName : {userData.lastName} </h2>
          <h2>Email : {userData.email}</h2>
          <h2>Role : {userData.role}</h2>
          <h2>Referral Code : {userData.referralCode}</h2>
          <h2>Total Credits : {userData.credits}</h2>
          <h2></h2>
        </div>
    </div>
  )
}

export default AdminDashboard