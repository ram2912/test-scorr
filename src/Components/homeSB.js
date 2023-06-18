import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { FaCog, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { AiOutlineFunnelPlot } from 'react-icons/ai';



export default function HomeSB({ onPop }) {
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
      
      
      <Link href="/Dealscoring"><button

style={{
    display: 'block',
    margin: '4px auto',
    marginBottom: '10px',
    width: '95%',
    padding: '15px',
    textAlign:'left',
    paddingLeft: '50px',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'IndustrialSans, sans-serif'
  }} onMouseOver={(e) => {
    
      e.target.style.backgroundColor = '#222226';
    
  }} onMouseOut={(e) => {
    e.target.style.backgroundColor = 'transparent';
    }}
        ><FaChartLine size={16} color="#fff" style={{marginRight: '20px'}} />
          Deal Scoring
        </button></Link>
        <Link href="/funnel"><button

style={{
    display: 'block',
    margin: '4px auto',
    marginBottom: '10px',
    width: '95%',
    padding: '15px',
    textAlign:'left',
    paddingLeft: '50px',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'IndustrialSans, sans-serif'
  }} onMouseOver={(e) => {
    
      e.target.style.backgroundColor = '#222226';
    
  }} onMouseOut={(e) => {
    e.target.style.backgroundColor = 'transparent';
    }}
><AiOutlineFunnelPlot size={16} color="#fff" style={{marginRight: '20px'}}/>
Funnel
</button></Link>

      
      <div style={{display:'flex', flexDirection: 'column',margin:'auto', paddingTop:'20px',borderTop:'1px solid #5b5b5b',width:'250px',justifyContent:'center', alignContent:'center', position: 'absolute', bottom: '20px' }}>
  <div style={{ display: 'flex', alignItems: 'center', alignText:'center', justifyContent: 'center', flexDirection:'column' }}>
    
    <button
      style={{
        width: '80%',
        textAlign:'left',
        padding: '10px',
        paddingLeft: '15px',
        marginBottom: '20px',
        background: '#23345a',
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontFamily: 'IndustrialSans, sans-serif',
        fontSize: 'small',
      }}
    onMouseOver={(e) => {
    
        e.target.style.backgroundColor = '#4e5c7a';
      
    }} onMouseOut={(e) => {
      e.target.style.backgroundColor = '#23345a';
      }}
    ><FaSignInAlt size={12} color="#fff" style={{marginRight: '7px'}} />
      Sign-in (Hubspot)
    </button>
    <button
      style={{
        width: '80%',
        textAlign:'left',
        padding: '10px',
        paddingLeft: '15px',
        marginBottom: '10px',
        background: 'transparent',
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 'small',
        fontFamily: 'IndustrialSans, sans-serif'
       }} onMouseOver={(e) => {
    
      e.target.style.backgroundColor = '#222226';
    
  }} onMouseOut={(e) => {
    e.target.style.backgroundColor = 'transparent';
    }}
    ><FaCog size={12} color="#fff" style={{marginRight: '7px'}} />
    <Link href="/ProcessSetup">Settings </Link>
    </button>
  </div>
</div>

    
  </div>
);
}