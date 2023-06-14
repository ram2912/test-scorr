import React, { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css';
import { FaCog, FaPlus } from 'react-icons/fa';

export default function DealScoringSB({ onPop }) {
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
      <h2 style={{ fontWeight: '400',fontFamily: 'inter, sans-serif', margin: '0 auto', textAlign: 'center', color: 'white', fontSize: 'Medium', paddingBottom: '20px' }}>My frameworks</h2>
      
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
          Pipeline management UK
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px' }}>
        <button
          style={{
            width: '30px',
            height: '30px',
            background: '#5A5A5A',
            borderRadius: '50%',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} onClick={onPop} onMouseOver={(e) => e.target.style.backgroundColor = '#424242 '} onMouseOut={(e) => e.target.style.backgroundColor = '#5A5A5A'}
        >
          <FaPlus size={14} />
        </button>
      </div>
  </div>
);
}
