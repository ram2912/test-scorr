import React from "react";
import styles from "@/styles/Home.module.css";
import config from "../../public/config";

const authUrl = config.endpoints.authorizationUrl;

export default function Login() {

    

    const handleHubspotConnect = async (e) => {
        e.preventDefault();
        
      // Replace with your backend route for authentication
      localStorage.setItem('hubspotConnected', 'true');
    window.location.href = authUrl;
      };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "3", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingTop: "90px", paddingBottom:'30px' }}>
          <img src="./White logo - no background.png" alt="Logo" style={{ width: "20%", height: "auto", zIndex: 1 }} />
        </div>
      </div>
      <div style={{ flex: "7", display: "flex", position: "relative", borderRadius: "8px", justifyContent: "center", alignContent: "center" , flexDirection:'row', }}>
        <div style={{ display: 'flex', flexDirection:'column', width: "300px", textAlign: "center", border:'1px solid #9A9A9A', background: '#363636', padding: '10px', borderRadius:'8px', marginTop:'20px' }}>
          <h2 style= {{ fontFamily:'inter, sans-serif'}}>Login</h2>
          <form style={{ display: 'flex', flexDirection:'column',}}>
            <input style={{backgroundColor:'black', border: 'none',padding:'5px', border:'0.5px solid #9A9A9A', borderRadius:'5px',marginTop:'20px', marginBottom:'20px'}} type="text" placeholder="Email" />
            <input style={{backgroundColor:'black', border: 'none',padding:'5px', border:'0.5px solid #9A9A9A', borderRadius:'5px', marginBottom:'20px'}} type="password" placeholder="Password" />
            <button style={{ display:'flex', margin:'auto', padding:'5px', width: '30%', marginBottom:'30px', textAlign:'center',justifyContent: "center", alignContent: "center"}}type="submit">Login</button>
            <div style={{ display:'flex', margin:'auto', padding:'5px', width:'250px', marginBottom:'30px', textAlign:'center',justifyContent: "center", alignContent: "center", borderTop:'1px solid white'}}></div>
            <button onClick={handleHubspotConnect} style={{ display:'flex',cursor: 'pointer',margin:'auto', padding:'7px', width: '60%', marginBottom:'30px', textAlign:'center',justifyContent: "center", alignContent: "center", backgroundColor: '#e06666', border:'none', borderRadius:'5px'}}type="submit" ><img src="./PngItem_1628892.png"  style={{ width: "15%", marginRight: '10px',height: "auto", paddingRight:'10px', zIndex: 1, borderRight:'1px solid white' }}/>Login with Hubspot</button>

          </form>
        </div>
      </div>
    </div>
  );
}