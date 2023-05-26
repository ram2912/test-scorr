import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const ProcessTable = () => {
    const [discovery, setDiscovery] = useState([
        ['Object', 'OPP', 'OPP', 'OPP', 'OPP'],
        ['Fields', 'Mandatory fields: 3', 'Mandatory fields: 5', 'Mandatory fields: 4', 'Mandatory fields: 0'],
        ['Stage description', '- Sales process pain points: time, budget, automation, communication.\n    Current software usage and integrations\n   Unique business needs and software implementation goals', '- Demonstrating product features and benefits\n Highlighting the softwares usability and flexibility.', '- Current pricing models and pain points with current pricing strategy\n Competitors pricing strategies and industry benchmarks\n Any potential obstacles or concerns regarding implementing new pricing strategy', 'Deal won and closed'],
      ]);
      
      const handleCellChange = (rowIndex, columnIndex, event) => {
        const updatedData = [...discovery];
        updatedData[rowIndex][columnIndex] = event.target.value;
        setDiscovery(updatedData);
      };
      const renderCell = (cell, rowIndex, columnIndex) => {
        if (typeof cell === 'string' && cell.startsWith('-')) {
          const bullets = cell.split('\n');
          return (
            <ul>
              {bullets.map((bullet, i) => (
                <li key={i}>{bullet.replace(/^-/, '')}</li>
              ))}
            </ul>
          );
        }
        return (
          <input
            type="text"
            value={cell}
            onChange={(event) => handleCellChange(rowIndex, columnIndex, event)}
          />
        );
      };
  
  const renderTable = (section, data) => {
    return (
        <div>
      <table className={`${styles.table} table-class`} style={{ background: '#222', color: '#eee' }}>
        <thead>
          <tr>
            <th style={{  }}>Stage</th>
            <th style={{ }}>Discovery</th>
            <th style={{  }}>Demo</th>
            <th style={{  }}>Pricing</th>
            <th style={{  }}>Closed Won</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{renderCell(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
        
      </table>
      

    </div>
    );
  };

  return (
    <div style={{ background: '#111', padding: '20px', fontFamily: 'monospace' }}>
      <h1 className={styles.centerTable}> Step 2: Confirm sales process</h1>
      <h1 className={styles.centerDes} style={{ color: '#C4C5C7' }}> SCORR : Revenue Intelligence SaaS</h1>
      <div className={styles.tableContainer} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>{renderTable('discovery', discovery)}</div>
      </div>
    </div>
  );
};

export default ProcessTable;

