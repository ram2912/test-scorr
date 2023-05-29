import React, { useState, useEffect } from 'react';

const PipelineForm = () => {
  const [leadPipeline, setLeadPipeline] = useState('');
  const [bdrPipeline, setBdrPipeline] = useState('');
  const [salesPipeline, setSalesPipeline] = useState('');
  const [pipelines, setPipelines] = useState([]);

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

  // Find the pipeline objects based on their names
  const leadPipelineObj = pipelines.find((pipeline) => pipeline.name === leadPipeline);
  const bdrPipelineObj = pipelines.find((pipeline) => pipeline.name === bdrPipeline);
  const salesPipelineObj = pipelines.find((pipeline) => pipeline.name === salesPipeline);

  if (!leadPipelineObj || !bdrPipelineObj || !salesPipelineObj) {
    console.error('Invalid pipeline name(s).');
    return;
  }

  const data = {
    leadPipeline: {
      id: leadPipelineObj.id,
      name: leadPipeline,
    },
    bdrPipeline: {
      id: bdrPipelineObj.id,
      name: bdrPipeline,
    },
    salesPipeline: {
      id: salesPipelineObj.id,
      name: salesPipeline,
    },
  };

  try {
    const response = await fetch('https://backend.scorr-app.eu/store-pipelines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (response.ok) {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="lead-pipeline">Lead Pipeline:</label>
        <select id="lead-pipeline" value={leadPipeline} onChange={handleLeadPipelineChange}>
          <option value="">Select Lead Pipeline</option>
          {pipelines.map((pipeline) => (
            <option key={pipeline.id} value={pipeline.id}>
            {pipeline.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bdr-pipeline">BDR Pipeline:</label>
        <select id="bdr-pipeline" value={bdrPipeline} onChange={handleBdrPipelineChange}>
          <option value="">Select BDR Pipeline</option>
          {pipelines.map((pipeline) => (
            <option key={pipeline.id} value={pipeline.id}>
            {pipeline.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sales-pipeline">Sales Pipeline:</label>
        <select id="sales-pipeline" value={salesPipeline} onChange={handleSalesPipelineChange}>
          <option value="">Select Sales Pipeline</option>
          {pipelines.map((pipeline) => (
            <option key={pipeline.id} value={pipeline.id}>
            {pipeline.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PipelineForm;
