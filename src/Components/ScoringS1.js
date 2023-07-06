import React from "react";
import { useState } from "react";
import TablePreview from "./TablePreview";
import { FaMagic } from 'react-icons/fa';
import { FiGitMerge } from 'react-icons/fi'
import BasicButton from "./button";
import TextButtons from "./buttonSec";
import Grid from '@mui/material/Grid';
import CustomizedInputBase from "./chatInput";
import { Divider, Typography } from "antd";

export default function ScoringTable1() {

    const [csvUrl, setCsvUrl] = useState(null);




    useEffect(() => {
        fetchDeals();
      }, []);
    
      const fetchDeals = async () => {
        try {
          const response = await fetch('https://testback.scorr-app.eu/extract/all-deals', {
            credentials: 'include',
          });
          const data = await response.json(); // Parse the response body as JSON
      
       
          setCsvUrl(data);
          console.log('data saved')
        } catch (error) {
          console.error('Error fetching pipelines:', error);
        }
      };


  return (
    <Grid container direction="column" style={{ flex: "9", backgroundColor: 'transparent', position: "relative", boxSizing: "border-box" }}>
      <Grid item style={{ display: 'flex', position: "relative", marginLeft: '30px', marginRight: '30px', paddingTop: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" style={{ color: 'white', marginTop: '20px', marginRight: '10px' }}>Hubspot: Deals</Typography>
          <Divider type="vertical" style={{ height: '30px', backgroundColor: 'grey', marginRight: '20px', marginTop:'20px' }} />
          <Typography variant="h6" style={{ color: 'white', marginTop: '20px' }}>7044 records</Typography>
        </div>
      </Grid>
      <Divider style={{ backgroundColor: 'grey', marginRight: '30px' }} />
      <Grid item container style={{ marginLeft: '30px', paddingBottom: '5px', marginRight: '30px' }}>
        <Grid item>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingTop:'8px', paddingRight: '40px' }}>
            <BasicButton text="Clean" />
          </div>
        </Grid>
        <Grid item>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingBottom: '15px', paddingRight: '20px' }}>
            <CustomizedInputBase />
          </div>
        </Grid>
      </Grid>
      <Grid item style={{ borderTop: '0.5px solid grey', background: 'transparent' }}>
        <TablePreview csvUrl={csvUrl} />
      </Grid>
    </Grid>
  )
}
