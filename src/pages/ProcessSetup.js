import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import ProcessTable from './Products/ProcessTable';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaArrowLeft, FaPlus } from 'react-icons/fa';


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
      fetch('https://backend.scorr-app.eu/contacts', {
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data);
        });
    }, []);
  

    const handleHubspotConnect = async () => {
      const authUrl = 'https://backend.scorr-app.eu';;
    // Replace with your backend route for authentication
    localStorage.setItem('hubspotConnected', 'true');
  window.location.href = authUrl;
  setTimeout(() => {setHubspotConnected(true);
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
    <div>
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Helvetica, sans-serif',
          backgroundColor: '#0B0C11',
          marginTop: '6rem',
          padding: '2rem',
        }}
      >
         <h1 className={styles.centerTable}>Step 1: Connect your tools</h1>
      
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.salesforce}>
            {salesforceConnected ? (
              <FaCheck className={styles.connected} />
            ) : (
              <FaCheck className={styles.disconnected} />
            )}
          </div>
          <h3
            style={{
              marginLeft: '5px',
              marginTop: '0px',
              marginBottom: '0px',
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
                onClick={handleSalesforceConnect}
                style={{
                  backgroundColor: 'grey',
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
              marginLeft: '5px',
              marginTop: '0px',
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
                  backgroundColor: 'grey',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
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
              marginLeft: '5px',
              marginTop: '0px',
              marginBottom: '0px',
              marginRight: '120px',
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
                  backgroundColor: 'grey',
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
                backgroundColor: 'grey',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 15px',
                fontFamily: 'Helvetica, sans-serif',
                cursor: 'pointer',
                fontSize: '0.9rem',
                marginRight:'17.5rem'
            }}
          >
           <FaPlus className={styles.disonnected} />  Add 
          </button>
          
        </div>
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
                marginTop:'2rem'
            }} onMouseOver={(e) => e.target.style.backgroundColor = '#1C416F'} onMouseOut={(e) => e.target.style.backgroundColor = '#255690'}
          >
            Preview Process
          </button>
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

<div>
        <h4></h4>
        {properties.length > 0 ? (
  properties.map((property) => (
    <p key={property.name}>
      Property name: {property.name}
            </p>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>



      <div
        style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '10px' }}
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

  
