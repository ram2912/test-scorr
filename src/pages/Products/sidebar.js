import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { FaCog, FaPlus } from 'react-icons/fa';
import config from 'public/config.js';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';
import { AiOutlineFunnelPlot } from 'react-icons/ai';

const funnelUrl = config.endpoints.funnelUrl;
const conversionRateUrl = config.endpoints.conversionRateUrl;
const pipelineStagesUrl = config.endpoints.pipelineStagesUrl;
const pipelineNameUrl = config.endpoints.pipelinesUrl;

console.log(funnelUrl);
console.log(conversionRateUrl);
console.log(pipelineStagesUrl);


export default function Sidebar({ onPop, onConversionRatesUpdate, onFunnelSelection }) {
  const [funnelNames, setFunnelNames] = useState([]);
  const [selectedFunnel, setSelectedFunnel] = useState('');

  

  useEffect(() => {
    fetchFunnels();
  }, []);
  
  async function fetchFunnels() {
    try {
      const response = await fetch(funnelUrl);
      const data = await response.json();
      setFunnelNames(data);
    } catch (error) {
      console.error(error);
    }
  }

  

  const handleClick = async (name) => {
    try {
      const response1 = await fetch(`${pipelineStagesUrl}?funnelName=${name}`, {
        credentials: 'include',
      });

      const response2 = await fetch(`${pipelineNameUrl}?funnelName=${name}`, {
        credentials: 'include',
        });
      
      const data2 = await response2.json();
      const leadPipeline = data2.lead_pipeline_name;
      const bdrPipeline = data2.bdr_pipeline_name;
      const salesPipeline = data2.sales_pipeline_name;

      console.log(leadPipeline);
      console.log(bdrPipeline);
      console.log(salesPipeline);

      const response = await fetch(conversionRateUrl);
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
      <Link href="/"><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingBottom: '60px' }}>
        <img src="./White logo - no background.png" alt="Logo" style={{ width: '50%', height: 'auto', zIndex: 1 }} />
      </div></Link>
      <h2 style={{  margin: 'auto',marginBottom: '10px',marginLeft:'15px', marginRight:'15px', borderBottom: '1px solid #5b5b5b', fontWeight: '400',fontFamily: 'inter, sans-serif', textAlign: 'center', color: 'white', fontSize: 'large', paddingBottom: '10px' }}>My Funnels</h2>
      {funnelNames.map((funnel, index) => (
        <button
          key={index}
          onClick={() => handleClick(funnel)}
          className={selectedFunnel === funnel ? styles.selectedButton : ''}
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
    fontFamily: 'IndustrialSans, sans-serif',
            background: selectedFunnel === funnel ? '#363636' : 'transparent ',
            borderRadius: '5px',
            
            color: selectedFunnel === funnel ? '#fff' : '#fff',
            cursor: 'pointer',
            fontFamily: 'IndustrialSans, sans-serif'
          }} onMouseOver={(e) => {
            if (selectedFunnel !== funnel) {
              e.target.style.backgroundColor = '#222226';
            }
          }} onMouseOut={(e) => {
            if (selectedFunnel !== funnel) {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          <AiOutlineFunnelPlot size={12} color="#fff" style={{marginRight: '15px'}} />
          {funnel}
        </button>
      ))}
      <div  style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px' }}>
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
          }}  onClick={onPop} onMouseOver={(e) => e.target.style.backgroundColor = '#424242 '} onMouseOut={(e) => e.target.style.backgroundColor = '#5A5A5A'}
        >
          <FaPlus size={14} style={{backgroundColor:'#5A5A5A'}} />
        </button>
      </div>
      
      <div style={{display:'flex', flexDirection: 'column',margin:'auto', paddingTop:'20px',borderTop:'1px solid #5b5b5b',width:'250px',justifyContent:'center', alignContent:'center', position: 'absolute', bottom: '20px' }}>
  <div style={{ display: 'flex', alignItems: 'center', alignText:'center', justifyContent: 'center', flexDirection:'column' }}>
    
  
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



