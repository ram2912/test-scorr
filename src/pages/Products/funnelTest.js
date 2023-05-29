import React, { useState, useEffect } from 'react';

export default function PipelineFormTest ({ onClose, onSubmit }) {
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
      const response = await fetch('https://backend.scorr-app.eu/pipelines2', {
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

  

  

  
    


  return (
    <form>
    <div>
  <label htmlFor="funnel-name">Funnel Name:</label>
  <input
    type="text"
    id="funnel-name"
    value={funnelName}
    onChange={(event)  => setFunnelName(event.target.value)}
  />
</div>
<button style={{ backgroundColor: '#126122', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '1rem', marginRight: '1rem', transition: 'background-color 0.2s ease-in-out' }} onClick={onSubmit} onMouseDown={(e) => { e.target.style.backgroundColor = '#555' }} onMouseUp={(e) => { e.target.style.backgroundColor = '#126122' }}>Submit</button>
<button style={{ backgroundColor: '#126122', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '1rem', transition: 'background-color 0.2s ease-in-out' }} onClick={onClose} onMouseDown={(e) => { e.target.style.backgroundColor = '#555' }} onMouseUp={(e) => { e.target.style.backgroundColor = '#126122' }}>Cancel</button>
   
</form>
);
};

 