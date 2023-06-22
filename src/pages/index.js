import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import SetupSB from 'src/Components/setupSB.js';
import HomeSB from '@/Components/homeSB';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import config from '../../public/config';
import { FaCog, FaPlus } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';


const authorizationStatusUrl = config.endpoints.authorizationStatusUrl;

const inter = Inter({ subsets: ['latin'] })

const ActiveToolButton = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        textAlign: 'left',
        paddingBottom: '30px',
        border: `0.5px solid ${isHovered ? '#bcbcbc' : '#5b5b5b'}`,
        borderRadius: '5px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        marginBottom: '20px',
        transition: 'transform 0.2s, border-color, box-shadow 0.2s',
        transform: isHovered ? 'translateY(-5px)' : 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const checkAuthorizationStatus = async () => {
    try {
      const response = await fetch(authorizationStatusUrl, {
        credentials: 'include'
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Hubspot Connection', data.status);

      } else {
        console.log('Hubspot Connection', data.status);

        //router.push('/login');// "unauthorized"

      }
    } catch (error) {
      console.log('Error checking authorization status:', error);

      //router.push('/login');
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    checkAuthorizationStatus();
  }, []);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ position: 'relative' }}>
          <HomeSB style={{ position: 'absolute', top: 0, left: 0, width: '250px' }} onPop={() => setShowPopup(true)} />
        </div>
        <div style={{ flex: '8', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: '8px' }}>
          <div style={{ flex: '15%', display: 'flex', textAlign: 'left', borderBottom: '0.5px solid #9A9A9A', background: '#363636' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '30px', paddingBottom: '30px' }}>
              <h2 style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', color: 'white', paddingLeft: '60px', fontSize: '30px' }}>My Organisation</h2>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '30px', paddingBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '60px' }}>
                <Link href="Dealscoring"><button style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', backgroundColor: '#3d85c6', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '3px', fontSize: '15px', cursor: 'pointer' }} onMouseOver={(e) => {
    
    e.target.style.backgroundColor = '#3677b2';
  
}} onMouseOut={(e) => {
  e.target.style.backgroundColor = '#3d85c6';
  }}><FaPlus style={{ marginRight: '20px', backgroundColor:'transparent' }} />Build New Tool</button></Link>
              </div>
            </div>
          </div>
          <div style={{ flex: '85%', display: 'flex', flexDirection: 'column', textAlign: 'left', paddingTop: '30px', paddingLeft: '60px', paddingRight: '60px', fontSize: '20px' }}>
            <h2 style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', color: 'white', marginBottom: '30px', fontSize: '25px' }}>Active Tools</h2>
            <ActiveToolButton>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', textAlign: 'left', justifyContent: 'flex-start', paddingRight: '60px' }}>
                  <h2 style={{ fontFamily: 'inter, sans-serif', textAlign: 'left', justifyContent: 'flex-start', fontWeight: '300', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', paddingTop: '12px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '3px', fontSize: '18px' }}>Pipeline Management UK</h2>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <h3 style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bcbcbc', paddingTop: '4px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '3px', fontSize: '12px' }}><FaUser style={{ marginRight: '6px', color: '#bcbcbc', fontSize: '9px' }} />Shriram Pawar</h3>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '60px' }}>
                  <h2 style={{ fontFamily: 'inter, sans-serif', textAlign: 'left', justifyContent: 'flex-end', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'green', borderRadius: '3px', fontSize: '18px' }}><FaPause style={{ marginRight: '15px', color: '#bcbcbc' }} /></h2>
                  <h2 style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', textAlign: 'left', justifyContent: 'flex-end', backgroundColor: 'green', border: 'none', borderRadius: '5px', paddingLeft: '15px', paddingRight: '15px', paddingTop: '5px', paddingBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '3px', fontSize: '18px' }}>Active</h2>
                </div>
              </div>
            </ActiveToolButton>
            <ActiveToolButton>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', textAlign: 'left', justifyContent: 'flex-start', paddingRight: '60px' }}>
                  <h2 style={{ fontFamily: 'inter, sans-serif', textAlign: 'left', justifyContent: 'flex-start', fontWeight: '300', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', paddingTop: '12px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '3px', fontSize: '18px' }}>Revenue Forecasting DACH</h2>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <h3 style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bcbcbc', paddingTop: '4px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '3px', fontSize: '12px' }}><FaUser style={{ marginRight: '6px', color: '#bcbcbc', fontSize: '9px' }} />Roman Murov</h3>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '60px' }}>
                  <h2 style={{ fontFamily: 'inter, sans-serif', textAlign: 'left', justifyContent: 'flex-end', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'green', borderRadius: '3px', fontSize: '18px' }}><FaPause style={{ marginRight: '15px', color: '#bcbcbc' }} /></h2>
                  <h2 style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', textAlign: 'left', justifyContent: 'flex-end', backgroundColor: 'green', border: 'none', borderRadius: '5px', paddingLeft: '15px', paddingRight: '15px', paddingTop: '5px', paddingBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '3px', fontSize: '18px' }}>Active</h2>
                </div>
              </div>
            </ActiveToolButton>
            <ActiveToolButton>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', textAlign: 'left', justifyContent: 'flex-start', paddingRight: '60px' }}>
                  <h2 style={{ fontFamily: 'inter, sans-serif', textAlign: 'left', justifyContent: 'flex-start', fontWeight: '300', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', paddingTop: '12px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '3px', fontSize: '18px' }}>Funnel CVR Analytics UK</h2>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <h3 style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bcbcbc', paddingTop: '4px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '3px', fontSize: '12px' }}><FaUser style={{ marginRight: '6px', color: '#bcbcbc', fontSize: '9px' }} />Shriram Pawar</h3>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '60px' }}>
                  <h2 style={{ fontFamily: 'inter, sans-serif', textAlign: 'left', justifyContent: 'flex-end', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'green', borderRadius: '3px', fontSize: '18px' }}><FaPause style={{ marginRight: '15px', color: '#bcbcbc' }} /></h2>
                  <h2 style={{ fontFamily: 'inter, sans-serif', fontWeight: '300', textAlign: 'left', justifyContent: 'flex-end', backgroundColor: 'green', border: 'none', borderRadius: '5px', paddingLeft: '15px', paddingRight: '15px', paddingTop: '5px', paddingBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '3px', fontSize: '18px' }}>Active</h2>
                </div>
              </div>
            </ActiveToolButton>
          </div>
        </div>
      </div>
    </>
  )
}
