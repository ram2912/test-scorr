import React, { useState, useEffect } from 'react';

const PipelineForm = ({ onClose }) => {
  const [leadPipeline, setLeadPipeline] = useState('');
  const [bdrPipeline, setBdrPipeline] = useState('');
  const [salesPipeline, setSalesPipeline] = useState('');
  const [pipelines, setPipelines] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [funnelName, setFunnelName] = useState('');

  


  useEffect(() => {
    fetchPipelines();
  }, []);

  const fetchPipelines = async () => {
    try {
      const response = await fetch('https://testback.scorr-app.eu/pipelines2', {
        credentials: 'include',
      });
      const data = await response.json(); // Parse the response body as JSON
  
      const pipelineData = data.results.map((pipeline) => ({
        id: pipeline.id,
        name: pipeline.label,
      }));
  
      setPipelines(pipelineData);
      console.log(pipelineData);
    } catch (error) {
      console.error('Error fetching pipelines:', error);
    }
  };

  const handleLeadPipelineChange = (event) => {
    setLeadPipeline(event.target.value);
  };

  const handleBdrPipelineChange = (event) => {
    setBdrPipeline(event.target.value);
  };

  const handleSalesPipelineChange = (event) => {
    setSalesPipeline(event.target.value);
  };

  

  

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('leadPipeline:', leadPipeline);
    console.log('bdrPipeline:', bdrPipeline);
    console.log('salesPipeline:', salesPipeline);


  const pipelineIds = pipelines
  .filter((pipeline) => [leadPipeline, bdrPipeline, salesPipeline].includes(pipeline.name))
  .map((pipeline) => pipeline.id);

  console.log(pipelineIds);

  const data = {
    funnelName: funnelName,
    leadPipeline: {
      id: pipelineIds[1],
      name: leadPipeline,
    },
    bdrPipeline: {
      id: pipelineIds[2],
      name: bdrPipeline,
    },
    salesPipeline: {
      id: pipelineIds[0],
      name: salesPipeline,
    },
  };

    console.log(data);
  
    try {
      const response = await fetch('https://testback.scorr-app.eu/store-pipelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data), // Convert the data to JSON format
      });
  
      if (response.ok) {
        setSuccessMessage('Pipelines stored in the database successfully!');
        console.log('Pipelines stored in the database successfully!');
      } else {
        console.error('Error storing pipelines:', response.status);
      }
    } catch (error) {
      console.error('Error storing pipelines:', error);
    }
  
    // Reset the form
    setLeadPipeline('');
    setBdrPipeline('');
    setSalesPipeline('');
  };

  return (
    <div style={{ width: '500px', margin: '0 auto', padding: '20px', marginLeft:'20px',
    backgroundColor: '#1C1C1C',
    borderRadius: '10px',
    
    height: '450px' }}>
    
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{marginBottom: '15px'}}>
    <label style = {{display: 'block', fontFamily: 'sans-serif', color: '#E0E0E0 ', paddingBottom: '1rem', marginTop: '1rem'}} htmlFor="funnel-name">Funnel Name:  </label>
  <input style ={{display: 'block', width: '100%', padding: '8px',border: 'none', borderRadius: '4px'}}
    type="text"
    id="funnel-name"
    placeholder='Enter Funnel Name'
    value={funnelName}
    onChange={(event) => setFunnelName(event.target.value)}
  />
</div>
      <div style={{marginBottom: '15px'}}>
        <label style = {{display: 'block', fontFamily: 'sans-serif', color: '#E0E0E0', paddingBottom: '1rem'}}>Lead Pipeline:</label>
        <select style ={{display: 'block', width: '100%', padding: '8px',border: 'none', borderRadius: '4px'}} id="lead-pipeline" value={leadPipeline} onChange={handleLeadPipelineChange}>
  <option value="">Select Lead Pipeline</option>
  {pipelines.map((pipeline) => (
    <option key={pipeline.id} value={pipeline.name}>{pipeline.name}</option>
  ))}
</select>
      </div>

      <div style={{marginBottom: '15px'}}>
        <label style = {{display: 'block', fontFamily: 'sans-serif', color: '#E0E0E0', paddingBottom: '1rem'}} htmlFor="bdr-pipeline">BDR Pipeline:</label>
        <select style ={{ width: '100%', padding: '8px', border: 'none', borderRadius: '4px'}} id="bdr-pipeline" value={bdrPipeline} onChange={handleBdrPipelineChange}>
  <option value="">Select BDR Pipeline</option>
  {pipelines.map((pipeline) => (
    <option key={pipeline.id} value={pipeline.name}>{pipeline.name}</option>
  ))}
</select>
      </div>

      <div style={{marginBottom: '15px'}}>
        <label style = {{display: 'block', fontFamily: 'sans-serif', color: '#E0E0E0', paddingBottom: '1rem'}} htmlFor="sales-pipeline">Sales Pipeline:</label>
        <select style ={{ width: '100%', padding: '8px',border: 'none', borderRadius: '4px'}} id="sales-pipeline" value={salesPipeline} onChange={handleSalesPipelineChange}>
  <option value="">Select Sales Pipeline</option>
  {pipelines.map((pipeline) => (
    <option key={pipeline.id} value={pipeline.name}>{pipeline.name}</option>
  ))}
</select>
      </div>

      {successMessage && <p style={{ fontFamily: 'sans-serif', marginTop: '10px', color:'green'}}>{successMessage}</p>}

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
      <button style={{backgroundColor: '#4caf50', color:'white', padding: '5px', borderRadius: '5px', border: 'none'}}type="submit">Submit</button>
      <button style={{backgroundColor: 'grey', color:'white', padding: '5px', borderRadius: '5px', border: 'none'}}type="button" onClick={onClose} >Close</button>
        </div>
    </form>
    </div>
  );
};

export default PipelineForm;
