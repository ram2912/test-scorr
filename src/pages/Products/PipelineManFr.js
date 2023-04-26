import React, { useState } from 'react';
import Link from 'next/link';

export default function DealScoringTable() {
  const [scores, setScores] = useState({
    'Activity': {
      'Number of Meetings Scheduled': 0,
      'Number of Demos Scheduled': 0,
      'Number of Proposals Sent': 0,
      'Number of Contracts Signed': 0,
    },
    'Communication': {
      'Frequency of Communication with Prospect': 0,
      'Response Time to Prospect': 0,
      'Quality of Communication with Prospect': 0,
    },
    'Progress': {
      'Progress towards Reaching Agreement': 0,
      'Quality of Progress Made': 0,
      'Alignment with Prospect’s Needs': 0,
      'Buy-In from Prospect': 0,
    },
  });

  function handleScoreChange(category, criteria, value) {
    setScores(prevScores => {
      const categoryCopy = { ...prevScores[category] };
      categoryCopy[criteria] = value;
      return { ...prevScores, [category]: categoryCopy };
    });
  }

  return (
        <table style={{ fontFamily: 'sans-serif', backgroundColor: '#f0f0f0', borderCollapse: 'collapse', width: '100%',color: 'Black' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#333', color: 'white', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Categories</th>
              <th style={{ backgroundColor: '#333', color: 'white', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Scoring Criteria</th>
              <th style={{ backgroundColor: '#333', color: 'white', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Scores</th>
            </tr>
          </thead>
          <tbody>
            {scores &&
              Object.entries(scores).map(([category, criteriaScores]) => (
                <>
                  <tr key={`${category}-header`}>
                    <td style={{ backgroundColor: '#f2f2f2', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }} rowSpan={Object.keys(criteriaScores).length + 1}>{category}</td>
                    <td style={{ backgroundColor: '#f2f2f2', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }} colSpan={2}>Activity</td>
                  </tr>
                  {Object.entries(criteriaScores).map(([criteria, score]) => (
                    <tr key={`${category}-${criteria}`}>
                      <td style={{ backgroundColor: '#f2f2f2', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>{criteria}</td>
                      <td style={{ backgroundColor: '#f2f2f2', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>
                        <input
                          type="number"
                          value={score}
                          onChange={e => handleScoreChange(category, criteria, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ))}
          </tbody>
        </table>
      );
      

}


