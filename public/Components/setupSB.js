import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { FaCog, FaPlus } from 'react-icons/fa';

export default function SetupSB({ onPop }) {
  const [funnelNames, setFunnelNames] = useState([]);
  const [selectedFunnel, setSelectedFunnel] = useState('');
  

  useEffect(() => {
    fetchFunnels();
  }, []);
  
  async function fetchFunnels() {
    try {
      const response = await fetch('https://testback.scorr-app.eu/funnels');
      const data = await response.json();
      setFunnelNames(data);
    } catch (error) {
      console.error(error);
    }
  }

  

  const handleClick = async (name) => {
    try {
      const response1 = await fetch(`https://testback.scorr-app.eu/pipelines-stages?funnelName=${name}`, {
        credentials: 'include',
      });
      const response = await fetch(`https://testback.scorr-app.eu/conversion-rate`);
      const data = await response.json();
      const conversionRates = data.conversionRates;

      onConversionRatesUpdate(conversionRates);
      setSelectedFunnel(name);
      onFunnelSelection(name);
      console.log(conversionRates);

    } catch (error) {
      console.error(error);
    }
  };

  const handleSidebarClick = (event) => {
    event.stopPropagation();
  };

  

  return (
    <div style={{ width: '250px', backgroundColor: '#010102', height: '100vh', paddingTop: '30px', overflow: 'hidden', boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }} onClick={handleSidebarClick}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingBottom: '60px' }}>
        <img src="./White logo - no background.png" alt="Logo" style={{ width: '50%', height: 'auto', zIndex: 1 }} />
      </div>
      <h2 style={{ fontWeight: '400',fontFamily: 'inter, sans-serif', margin: '0 auto', textAlign: 'center', color: 'white', fontSize: 'Medium', paddingBottom: '20px' }}>Settings</h2>
      
        <button

          style={{
            display: 'block',
            margin: '4px auto',
            marginBottom: '10px',
            width: '95%',
            padding: '10px',
            background:  '#101010 ',
            borderRadius: '5px',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: '300',
  fontFamily: 'inter, sans-serif',
          }} 
        >
          Tool Connections
        </button>
      
      
      <div style={{ width: '200px', textAlign: 'left', position: 'absolute', bottom: '50px' }}>
  <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'center' }}>
    
    <button
      style={{
        width: '80%',
        marginLeft: '15%',
        padding: '10px',
        background: '#3D3D3D',
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 'medium',
        fontFamily: 'IndustrialSans, sans-serif'
      }}
    ><FaPlus size={20} color="#fff" style={{marginRight: '10px'}} />
      Create new project
    </button>
  </div>
</div>

    
  </div>
);
}
