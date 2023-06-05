import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function ConversionRatesPage({ conversionRates }) {
    const [selectedColumns, setSelectedColumns] = useState([]);
  
    const handleColumnClick = (column) => {
      setSelectedColumns((prevColumns) => {
        if (prevColumns.includes(column)) {
          // Remove the column if it's already selected
          return prevColumns.filter((prevColumn) => prevColumn !== column);
        } else {
          // Add the column if it's not selected
          return [...prevColumns, column];
        }
      });
    };
  
    const isColumnSelected = (column) => {
      return selectedColumns.includes(column);
    };

    const suggestedColumns = [
        { name: 'Status', data: ['At Risk', 'On Track'] },
        { name: 'Reason', data: ['High Competition', 'Poor Marketing Strategy'] },
        // Add more suggested columns here
      ];
  
    // Rest of the code...
  
    return (
      <div>
        <table className={styles.conversionRatesTable}>
          <thead>
            <tr>
              <th>Source Stage</th>
              <th>Target Stage</th>
              <th>Conversion Rate</th>
              {suggestedColumns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => handleColumnClick(column.name)}
                  style={{
                    cursor: 'pointer',
                    opacity: isColumnSelected(column.name) ? 1 : 0.5,
                    transition: 'opacity 0.3s',
                  }}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conversionRates.map((rate, index) => (
              <tr key={index}>
                <td style={{ width: '150px', fontSize: 'small' }}>{rate.sourceStage.name}</td>
                <td style={{ width: '150px', fontSize: 'small' }}>{rate.targetStage.name}</td>
                <td style={{ width: '80px', fontSize: 'small' }}>{rate.conversionRate}</td>
                {suggestedColumns.map((column, index) => (
                  <td key={index} colSpan={3} style={{ opacity: isColumnSelected(column.name) ? 1 : 0 }}>
                    {isColumnSelected(column.name) &&
                      column.data.map((data, dataIndex) => (
                        <div key={dataIndex}>{data}</div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  










