import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import ProcessTable from './Products/ProcessTable';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaArrowLeft, FaPlus } from 'react-icons/fa';
import SetupSB from '../Components/setupSB';
import config from 'public/config.js'

const authorizationUrl = config.endpoints.authorizationUrl;
const authorizationStatusUrl = config.endpoints.authorizationStatusUrl;

export default function ProcessSetup() {
  const [salesforceConnected, setSalesforceConnected] = useState(false);
  const [hubspotConnected, setHubspotConnected] = useState(false);
    const [snowflakeConnected, setSnowflakeConnected] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [properties, setProperties] = useState([]);
    const [backendData, setBackendData] = useState([]);



    
    useEffect(() => {
      fetch('https://backend.scorr-app.eu/pipelines2', {
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data);
        });

        checkAuthorizationStatus();
    }, []);

    const checkAuthorizationStatus = async () => {
      try {
        const response = await fetch(authorizationStatusUrl, {
          credentials: 'include'
        });
        const data = await response.json();
    
        if (response.ok) {
          console.log(data.status);
          setHubspotConnected(true); // "authorized"
        } else {
          console.log(data.status); 
          setHubspotConnected(false);// "unauthorized"
        }
      } catch (error) {
        console.log('Error checking authorization status:', error);
        setHubspotConnected(false);
      }
    };
    
  

    const handleHubspotConnect = async () => {
      const authUrl = authorizationUrl;
    // Replace with your backend route for authentication
    localStorage.setItem('hubspotConnected', 'true');
  window.location.href = authUrl;
  setTimeout(() => {checkAuthorizationStatus();
  }, 2000);
    };
  
    function handleSalesforceConnect() {
      setTimeout(() => {
        setSalesforceConnected(true); 
        setIsLoading(false); // hide the loading animation as soon as the iframe is visible
      }, 2000);
    }

  function handleSalesforceDisconnect() {
    setSalesforceConnected(false);
  }

  

  function handleHubspotDisconnect() {
    localStorage.removeItem('hubspotConnected');
    setHubspotConnected(false);
  }
  function handleSnowflakeConnect() {
    setTimeout(() => {
      setSnowflakeConnected(true); 
      setIsLoading(false); // hide the loading animation as soon as the iframe is visible
    }, 1000);
  }

  function handleSnowflakeDisconnect() {
    setSnowflakeConnected(false);
  }
  function handleGenerateProcess() {
    setIsLoading(true); // show the loading animation when Generate Process is clicked
    setTimeout(() => {
      setShowIframe(true); // show the iframe after 2 seconds
      setIsLoading(false); // hide the loading animation as soon as the iframe is visible
    }, 2000);
  }

  return (
    <div style={{display: 'flex'}}>

<div style={{ flex: '2', position: 'relative' }}>
  <SetupSB style={{ position: 'absolute', top: 0, left: 0, width: '250px',  }} onPop={() => setShowPopup(true)}/> 
</div>
      
      <div
        style={{
          flex: '8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          fontWeight: '300',
  fontFamily: 'inter, sans-serif',
          backgroundColor: '#161616',
          borderRadius: '10px',
          marginTop: '5rem',
          padding: '2rem',
          border: '1px solid #3B3B3B',
          marginLeft: '5%',
          marginRight: '10%',
          height: '40%',
        }}
      >
         <h1 className={styles.centerTable}>Connect Your Tools</h1>
         <h1 className={styles.centerTable1}>Connect your Customer data sources for Lead, BDR and Sales </h1>
      
        <div style={{ display: 'flex', alignItems: 'center', borderTop:'1px solid #767676', paddingTop:'30px' }}>
          <div className={styles.salesforce}>
            {salesforceConnected ? (
              <FaCheck className={styles.connected} />
            ) : (
              <FaCheck className={styles.disconnected} />
            )}
          </div>
          <h3
            style={{
              flex: '1',
              marginLeft: '5px',
              marginTop: '0px',
              marginBottom: '0px',
              fontWeight: '300',
  fontFamily: 'inter, sans-serif',
              marginRight: '120px',
              fontSize: '1.5rem',
              letterSpacing: '0.5px',
            }}
          >
            Salesforce
          </h3>
          <div style={{ marginLeft: '20px' }}>
            {salesforceConnected ? (
              <button
                onClick={handleSalesforceDisconnect}
                style={{
                  flex: '1',
                  backgroundColor: 'green',
                  fontWeight: '300',
  fontFamily: 'inter, sans-serif',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontFamily: 'Helvetica, sans-serif',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Connected
              </button>
            ) : (
              <button
                onClick={handleSalesforceConnect}
                style={{
                  flex: '1',
                  backgroundColor: '#393939',
                  fontWeight: '300',
  fontFamily: 'inter, sans-serif',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontFamily: 'Helvetica, sans-serif',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Connect
              </button>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop:'2rem'  }}>
          <div className={styles.salesforce}>
            {hubspotConnected ? (
              <FaCheck className={styles.connected} />
            ) : (
              <FaCheck className={styles.disconnected} />
            )}
          </div>
          <h3
            style={{
              flex: '1',
              marginLeft: '5px',
              marginTop: '0px',
              fontWeight: '300',
  fontFamily: 'inter, sans-serif',
              marginBottom: '0px',
              marginRight: '120px',
              fontSize: '1.5rem',
              letterSpacing: '0.5px',
            }}
          >
            Hubspot
          </h3>
          <div style={{ marginLeft: '20px' }}>
            {hubspotConnected ? (
              <button
                onClick={handleHubspotDisconnect}
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  fontWeight: '300',
  fontFamily: 'inter, sans-serif',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontFamily: 'Helvetica, sans-serif',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginLeft:'1.5rem'
                }}
              >
                Connected
              </button>
            ) : (
              <button
                onClick={handleHubspotConnect}
                style={{
                  backgroundColor: '#393939',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontWeight: '300',
  fontFamily: 'inter, sans-serif',
                  fontFamily: 'Helvetica, sans-serif',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginLeft:'1.5rem'
                }}
              >
                Connect
              </button>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop:'2rem'  }}>
          <div className={styles.salesforce}>
            {snowflakeConnected ? (
              <FaCheck className={styles.connected} />
            ) : (
              <FaCheck className={styles.disconnected} />
            )}
          </div>
          <h3
            style={{
              flex: '1',
              marginLeft: '5px',
              marginTop: '0px',
              marginBottom: '0px',
              marginRight: '120px',
              fontWeight: '300',
  fontFamily: 'inter, sans-serif',
              fontSize: '1.5rem',
              letterSpacing: '0.5px'
            }}
          >
           Snowflake
          </h3>
          <div style={{ marginLeft: '20px' }}>
            {snowflakeConnected ? (
              <button
                onClick={handleSnowflakeDisconnect}
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontFamily: 'Helvetica, sans-serif',
                  cursor: 'pointer',
                  fontSize: '1rem',
                
                }}
              >
                Connected
              </button>
            ) : (
              <button
                onClick={handleSnowflakeConnect}
                style={{
                  backgroundColor: '#393939',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontFamily: 'Helvetica, sans-serif',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Connect
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop:'2rem'  }}>
          <div className={styles.salesforce}>
          </div>
          <button
            style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid #3B3B3B',
                borderRadius: '5px',
                padding: '5px 15px',
                fontFamily: 'Helvetica, sans-serif',
                cursor: 'pointer',
                fontSize: '0.9rem',
                marginRight:'17.5rem'
            }}
          >
           <FaPlus className={styles.disonnected} />
          </button>
          
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <button
    onClick={handleGenerateProcess}
    style={{
      backgroundColor: '#255690',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      fontFamily: 'Helvetica, sans-serif',
      cursor: 'pointer',
      fontSize: '1rem',
      marginTop: '2rem',
      width: '10%',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#1C416F')}
    onMouseOut={(e) => (e.target.style.backgroundColor = '#255690')}
  >
    Save
  </button>
</div>

          {isLoading && (
        <div className ={styles.loadingAnimationTable}>
          <div className={styles.loadingDots}>
            <span className={styles.loadingDot}></span>
            <span className={styles.loadingDot}></span>
            <span className={styles.loadingDot}></span>
          </div>
        </div>
      )}
      </div>
      
      {showIframe && (
        <> 

    <iframe
      src="/Products/ProcessTable" // replace with your desired URL
      style={{
        width: '100%',
        height: '500px',
        marginTop: '2rem',
        border: 'none',
      }}
    ><ProcessTable />
     </iframe>
 


  <div style={{ display: 'flex', justifyContent: 'center'}}>
  <Link href="/Dealscoring"><button
    style={{
      backgroundColor: '#255690',
      borderWidth: '1px',
      borderColor: 'white',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      fontFamily: 'Helvetica, sans-serif',
      cursor: 'pointer',
      fontSize: '1rem',
      marginBottom: '2rem',
      marginTop: '1rem',
    }} onMouseOver={(e) => e.target.style.backgroundColor = '#1C416F'} onMouseOut={(e) => e.target.style.backgroundColor = '#255690'}
  >
    Confirm and start building
  </button></Link>
</div>
</>

)}




      <div
        style={{ position: 'absolute', top: '1rem', left: '15rem', padding: '10px' }}
      >
        <Link href="/" passHref>
          <span
            style={{
              marginTop: '2rem',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'sans-serif',
            }}
          >
            <FaArrowLeft size={16} style={{ marginRight: '8px' }} />
            Back to home
          </span>
        </Link>
      </div>
    </div>
    );
    }

  
