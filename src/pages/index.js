import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import SetupSB from 'src/Components/setupSB.js';
import HomeSB from '@/Components/homeSB';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import config from '../../public/config';

const authorizationStatusUrl = config.endpoints.authorizationStatusUrl;

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
        console.log('Hubspot Connection',data.status); 
        
        router.push('/login');// "unauthorized"
        
      }
    } catch (error) {
      console.log('Error checking authorization status:', error);
      
      router.push('/login');
    }
  };

  useEffect(() => {
    checkAuthorizationStatus();
  }, []);

  return (
    <>
    <div style={{display: 'flex'}}>

<div style={{ flex: '2', position: 'relative' }}>
  <HomeSB style={{ position: 'absolute', top: 0, left: 0, width: '250px',  }} onPop={() => setShowPopup(true)}/> 
</div>
<div style={{ flex: '8', display: 'flex',position: 'relative',  borderRadius:'8px' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingBottom: '60px' }}>
    <img src="./White logo - no background.png" alt="Logo" style={{ width: '50%', height: 'auto', zIndex: 1 }} />
    </div>
      </div>
      </div>
    </>
  )
}
