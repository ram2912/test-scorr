import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

export default function Sidebar() {
  const [funnelNames, setFunnelNames] = useState([]);
  const [conversionRates, setConversionRates] = useState([]);
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
      setConversionRates(data.conversionRates);
      setSelectedFunnel(name);
      console.log(conversionRates);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: '200px', backgroundColor: '#191919', height: '100vh', paddingTop: '80px' }}>
      {/* Sidebar content */}
      {funnelNames.map((funnel, index) => (
        <button
          key={index}
          onClick={() => handleClick(funnel)}
          className={selectedFunnel === funnel ? styles.selectedButton : ''}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {funnel}
        </button>
      ))}
    </div>
  );
}


