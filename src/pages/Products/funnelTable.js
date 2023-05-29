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

  const data = {
    leadPipeline: {
      id: pipelineIds[0],
      name: leadPipeline,
    },
    bdrPipeline: {
      id: pipelineIds[1],
      name: bdrPipeline,
    },
    salesPipeline: {
      id: pipelineIds[2],
      name: salesPipeline,
    },
  };

    console.log(data);
  
    try {
      const response = await fetch('https://backend.scorr-app.eu/store-pipelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data), // Convert the data to JSON format
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
