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
      const response = await fetch('https://scorr-redeploy.herokuapp.com/contacts', {
        credentials: 'include',
      });
      const data = await response.json();
      const pipelineNames = data.map((pipeline) => pipeline.pipelineName);
      setPipelines(pipelineNames);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Do something with the selected pipelines (e.g., make an API request)
    console.log('Selected Pipelines:', {
      leadPipeline,
      bdrPipeline,
      salesPipeline,
    });

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
          {pipelines.map((pipeline, index) => (
            <option key={index} value={pipeline}>
              {pipeline}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bdr-pipeline">BDR Pipeline:</label>
        <select id="bdr-pipeline" value={bdrPipeline} onChange={handleBdrPipelineChange}>
          <option value="">Select BDR Pipeline</option>
          {pipelines.map((pipeline, index) => (
            <option key={index} value={pipeline}>
              {pipeline}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sales-pipeline">Sales Pipeline:</label>
        <select id="sales-pipeline" value={salesPipeline} onChange={handleSalesPipelineChange}>
          <option value="">Select Sales Pipeline</option>
          {pipelines.map((pipeline, index) => (
            <option key={index} value={pipeline}>
              {pipeline}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PipelineForm;
