import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

export default function ConversionRatesPage () {
  const [conversionRates, setConversionRates] = useState([]);

  useEffect(() => {
    fetchConversionRates();
  }, []);

  async function fetchConversionRates() {
    try {
      const response = await fetch('https://backend.scorr-app.eu/conversion-rate');
      const data = await response.json();
      setConversionRates(data.conversionRates);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2 style = {{ fontFamily: 'sans-serif', margin: '0 auto'}}>Conversion Rates</h2>
      <table className ={ styles.conversionRatesTable}>
        <thead>
          <tr>
            <th>Source Stage</th>
            <th>Target Stage</th>
            <th>Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          {conversionRates.map((rate, index) => (
            <tr key={index}>
              <td style={{width: '150px', fontSize:'small'}}>{rate.sourceStage.name}</td>
              <td style={{width: '150px', fontSize:'small'}}>{rate.targetStage.name}</td>
              <td style={{width: '80px', fontSize:'small'}}>{rate.conversionRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


