import React, { useState } from 'react';
import Link from 'next/link';
import { questions } from 'src/pages/Dealscoring.js';
import { setCurrentQuestion } from 'src/pages/Dealscoring.js';
import styles from '@/styles/Home.module.css';
import CRMFilter from '../../Components/CrmAPI';
import EngagementAPI from '../../Components/EngagementAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Table from 'src/Components/ScoringSetup.js';


export default function DealScoringTable({ onClose, onSave }) {
  
  const data = [
    { factor: 'Deal Size', classifications: ['Small', 'Medium', 'Large'], weight: '0.40' },
    { factor: 'Market Segment', classifications: ['Non-enterprise', 'Enterprise'], weight: '0.30' },
    { factor: 'Product Fit', classifications: ['Low', 'Medium', 'High'], weight: '0.20' },
    { factor: 'Client Engagement', classifications: ['Low', 'Moderate', 'High'], weight: '0.10' },
  ];

  const [resources, setResources] = useState(true);
  const [criteria, setCriteria] = useState(false);
  const [API, setAPI] = useState(false);
  const [test, setTest] = useState([]);
  const [nextTool, setNextTool] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  function handleScoreChange(category, criteria, value) {
    setScores(prevScores => {
      const categoryCopy = { ...prevScores[category] };
      categoryCopy[criteria] = value;
      return { ...prevScores, [category]: categoryCopy };
    });
  }

  function handleResource() {
    setAPI(true);
  }

  function handleNextTool() {
    setNextTool(true);
  }

  function handleSetup() {
    setTimeout(() => {
    setAPI(false);
    setNextTool(false);
    setResources(false);
  }, 2000);
  setCriteria(true);
  }

  
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', overflow:'auto', }}>
      <div style = {{ backgroundColor: '#1F2020', paddingBottom: '30px',paddingTop:'10px'}}>
        <h1 style={{ fontWeight: '400', fontFamily: 'inter, sans-serif', margin: '0 auto', textAlign: 'center', color: 'white', fontSize: 'x-large', padding: '20px' }}>Scoring Framework</h1>
        <div className={styles.milestoneAnimation}>
  <div className={styles.line}></div>
  <div className={styles.step}></div>
  <div className={styles.step}> </div>
  <div className={styles.step}></div>
</div>
<div style ={{ flex: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
<div style ={{ flex: '1', flexDirection: 'row', justifyContent: 'space-between'}}>
  <h1 style={{ fontWeight: '300',fontFamily: 'inter, sans-serif', margin: '0 auto', textAlign: 'center', color: 'white', fontSize: 'small'}}>Add resource</h1>
        </div>
        <div style ={{ flex: '1', flexDirection: 'row', justifyContent: 'space-between'}}>
  <h1 style={{ fontWeight: '300',fontFamily: 'inter, sans-serif', margin: '0 auto', textAlign: 'center', color: 'white', fontSize: 'small' }}>Set up scoring</h1>
        </div>
        <div style ={{ flex: '1', flexDirection: 'row', justifyContent: 'space-between', }}>
  <h1 style={{ fontWeight: '300',fontFamily: 'inter, sans-serif', margin: '0 auto', textAlign: 'center', color: 'white', fontSize: 'small'}}>Test</h1>
        </div>
        </div>
        </div>
        
        <div style = {{ flex: '50%', position: 'relative',  marginBottom:'5%',  backgroundColor: '#0B0C11'}}>
        
        {criteria && (
  <>
<Table data={data} />
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', marginBottom:'3rem' }}>
              <button style={{ fontSize:'Large', backgroundColor: '#126122', color: 'white', padding: '10px 18px', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s ease-in-out' }} onClick={onClose} >
                Generate scoring model
              </button>
            </div>
</>
)}

{resources && (
  <>
  <div style={{ display: 'flex', flexDirection: 'column', paddingLeft:'5%', paddingRight:'5%'}}>
  <div style={{ flex: '5%', position: 'relative', width: '90%', backgroundColor: '#0B0C11', overflow: 'hidden' }}>
    <h1 style={{ fontWeight: '300',fontFamily: 'inter, sans-serif', margin: '0 auto', textAlign: 'left', color: 'white', fontSize: 'Medium', paddingTop: '50px' }}>Connected</h1> 
    </div>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
  <button style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '5px', border: '1px solid gray', padding: '10px', margin: '0 10px', background: 'none', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.borderColor = '#266C95'} onMouseOut={(e) => e.target.style.borderColor = 'grey'} onClick={e => handleResource()}>
    <img src="./salesforce-logo.png" alt="Logo" style={{ width: '50%', height: 'auto', zIndex: 1 }} />
  </button>
  <button style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '5px', border: '1px solid gray', padding: '10px', margin: '0 10px', background: 'none', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.borderColor = '#266C95'} onMouseOut={(e) => e.target.style.borderColor = 'grey'} onClick={e => handleNextTool()}>
    <img src="./bigquery.png" alt="Logo" style={{ width: '40%', height: 'auto', zIndex: 1 }} />
  </button>
  <button style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '5px', border: '1px solid gray', padding: '10px', margin: '0 10px', background: 'none', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.borderColor = '#266C95'} onMouseOut={(e) => e.target.style.borderColor = 'grey'}>
    <img src="./hubspot-logo.png" alt="Logo" style={{ width: '50%', height: 'auto', zIndex: 1 }} />
  </button>
  <button style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '5px', border: '1px solid gray', padding: '10px', margin: '0 10px', background: 'none', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.borderColor = '#266C95'} onMouseOut={(e) => e.target.style.borderColor = 'grey'}>
    <img src="./Google_Sheets_logo_(2014-2020).svg.png" alt="Logo" style={{ width: '25%', height: 'auto', zIndex: 1 }} />
  </button>
</div>


  </div>
  </div>
  {API && (
    <>
  <div style = {{ flex: '30%', display: 'flex', height: '90%', flexDirection: 'column', position: 'relative', marginTop: '5%', width: '100%', backgroundColor: '#0B0C11', paddingLeft:'5%', paddingRight:'5%'}}>
   <div style = {{flex:'1',alignContent:'center',justifyContent:'center',position: 'relative', width: '100%', height: '100vh', backgroundColor: '#0B0C11', overflowY: 'auto',  }}>
    <h1 style={{ flex: '10%', fontWeight: '300',fontFamily: 'inter, sans-serif', margin: '0 auto', textAlign: 'left', color: 'white', fontSize: 'Medium', paddingTop: '5px', paddingBottom: '40px' }}>Resource setup</h1>
    
    <div style={{ paddingLeft: '200px',paddingRight: '200px',marginTop:'1rem',flex: '60%', display: 'flex' }}>
    <div style={{flex: '1', position: 'relative', width: '50%', height: '100%', backgroundColor: '#0B0C11', overflow: 'hidden'}}>
      <div style={{ borderRadius: '5px', border: '1px solid gray', padding: '20px',  background: 'none',}} >
        <CRMFilter />
      </div>
      </div>
      </div>
      {nextTool && (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ flex: '10%', position: 'relative', justifyContent:'center', alignContent: 'center', textAlign:'center' }}>
        <FontAwesomeIcon icon={faArrowDown} style={{ marginmarginRight: '10px',height: '30px',padding: '5px'}} />
        </div>
      <div style={{ paddingLeft: '200px',paddingRight: '200px',flex: '60%', display: 'flex', justifyContent:'center' }}>
    <div style={{ flex: '1', position: 'relative', width: '100%', height: '100%', backgroundColor: '#0B0C11', overflow: 'hidden'}}>
      <div style={{ borderRadius: '5px', border: '1px solid gray', padding: '20px',  background: 'none', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.borderColor = '#266C95'} onMouseOut={(e) => e.target.style.borderColor = 'grey'}>
      <EngagementAPI />
      </div>
      </div>
      </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
              <button style={{ fontSize:'Large', backgroundColor: '#126122', color: 'white', padding: '10px 18px', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s ease-in-out' }} onClick={e => handleSetup()} >
                Generate AI framework
              </button>
            </div>
      </>
      )}
      </div>
      </div>
</>
)}

  </>
)}
  </div>
  



</div>
      );
      

}


