import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function CRMFilter() {
  const [object, setObject] = useState('leads');
  const [pipeline, setPipeline] = useState('');
  const [fields, setFields] = useState('');
  const [creationDate, setCreationDate] = useState('');

  const saveFilters = () => {
    // Perform API call or save the filters in your backend

    console.log('Object:', object);
    console.log('Pipeline:', pipeline);
    console.log('Fields:', fields);
    console.log('Creation Date:', creationDate);

    // Add your API call or save logic here
  };

  return (
    <div className={styles.container1}>
      <h2 style={{fontWeight: '300', paddingBottom:'10px'}}>CRM: Salesforce </h2>
      <div className={styles.formGroup}>
      <label className={styles.label} htmlFor="funnel-name">Object:</label>
        <select
        className={styles.inputField}
          id="object"
          value={object}
          onChange={(e) => setObject(e.target.value)}
        >
          <option value="leads">Leads</option>
          <option value="accounts">Accounts</option>
          <option value="deals">Deals</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="pipeline">Filter:</label>
        <input
        className={styles.inputField2}
          type="text"
          id="pipeline"
          placeholder='Eg. Only leads with status "Open"'
          value={pipeline}
          onChange={(e) => setPipeline(e.target.value)}
        />
      </div>
     
    </div>
  );
};

