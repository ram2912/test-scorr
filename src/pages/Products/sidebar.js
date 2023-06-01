import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { FaCog, FaPlus } from 'react-icons/fa';

export default function Sidebar({ onPop, onConversionRatesUpdate }) {
  const [funnelNames, setFunnelNames] = useState([]);
  const [selectedFunnel, setSelectedFunnel] = useState('');

  useEffect(() => {
    fetchFunnels();
  }, []);
  
  async function fetchFunnels() {
    try {
      const response = await fetch('https://backend.scorr-app.eu/funnels');
      const data = await response.json();
      setFunnelNames(data);
    } catch (error) {
      console.error(error);
    }
  }

  

  const handleClick = async (name) => {
    try {
      const response1 = await fetch(`https://backend.scorr-app.eu/pipelines-stages?funnelName=${name}`, {
        credentials: 'include',
      });
      const response = await fetch(`https://backend.scorr-app.eu/conversion-rate`);
      const data = await response.json();
      const conversionRates = data.conversionRates;

      onConversionRatesUpdate(conversionRates);
      setSelectedFunnel(name);
      console.log(conversionRates);

    } catch (error) {
      console.error(error);
    }
  };

  const handleSidebarClick = (event) => {
    event.stopPropagation();
  };

  

  return (
    <div style={{ width: '200px', backgroundColor: '#191919', height: '100vh', paddingTop: '30px', overflow: 'hidden' }} onClick={handleSidebarClick}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingBottom: '60px' }}>
        <img src="./White logo - no background.png" alt="Logo" style={{ width: '50%', height: 'auto', zIndex: 1 }} />
      </div>
      <h2 style={{ fontFamily: 'sans-serif', margin: '0 auto', textAlign: 'center', color: 'white', fontSize: 'Medium', paddingBottom: '20px' }}>Funnels</h2>
      {funnelNames.map((funnel, index) => (
        <button
          key={index}
          onClick={() => handleClick(funnel)}
          className={selectedFunnel === funnel ? styles.selectedButton : ''}
          style={{
            display: 'block',
            margin: '4px auto',
            marginBottom: '10px',
            width: '90%',
            padding: '10px',
            background: selectedFunnel === funnel ? '#636363' : '#212121',
            borderRadius: '5px',
            border: 'none',
            color: selectedFunnel === funnel ? '#fff' : '#fff',
            cursor: 'pointer'
          }} onMouseOver={(e) => {
            if (selectedFunnel !== funnel) {
              e.target.style.backgroundColor = '#313131';
            }
          }} onMouseOut={(e) => {
            if (selectedFunnel !== funnel) {
              e.target.style.backgroundColor = '#212121';
            }
          }}
        >
          {funnel}
        </button>
      ))}
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
      
      <div style={{ width: '200px', textAlign: 'left', position: 'absolute', bottom: '20px' }}>
  <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'center' }}>
    
    <button
      style={{
        width: '80%',
        padding: '5px',
        background: 'transparent',
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 'medium',
      }}
    ><FaCog size={15} color="#fff" style={{marginRight: '7px'}} />
      Setup
    </button>
  </div>
</div>

    
  </div>
);
}



