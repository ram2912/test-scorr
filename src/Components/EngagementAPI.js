import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function EngagementAPI() {
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
      <h2 style={{fontWeight: '300', paddingBottom:'10px'}}>Engagement: Gong </h2>
      <div className={styles.formGroup}>
      <label className={styles.label} htmlFor="funnel-name">Record type</label>
        <select
        className={styles.inputField}
          id="object"
          value={object}
          onChange={(e) => setObject(e.target.value)}
        >
          <option value="leads">Call recordings</option>
          <option value="accounts">Emails</option>
          <option value="deals">Transcriptions</option>
          <option value="deals">Notes</option>
            <option value="deals">Summaries</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="pipeline">Object Association</label>
        <input
        className={styles.inputField}
          type="text"
          id="pipeline"
          placeholder='Direct, Custom, or None'
          value={pipeline}
          onChange={(e) => setPipeline(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="fields">Filters:</label>
        <input
        className={styles.inputField}
          type="text"
          id="fields"
          placeholder='Eg. Only calls with duration of 5 minutes or more...'
          value={fields}
          onChange={(e) => setFields(e.target.value)}
        />
      </div>
     
    </div>
  );
};