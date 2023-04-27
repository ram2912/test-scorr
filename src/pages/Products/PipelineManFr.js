import React, { useState } from 'react';
import Link from 'next/link';
import { questions } from 'src/pages/Dealscoring.js';
import { setCurrentQuestion } from 'src/pages/Dealscoring.js';

export default function DealScoringTable({ onClose, onSave }) {
  
  const [scores, setScores] = useState({
    'Activity': {
      'Number of Meetings Scheduled': 10,
      'Number of Demos Scheduled': 10,
      'Number of Proposals Sent': 5,
      'Number of Contracts Signed': 5,
    },
    'Communication': {
      'Frequency of Communication with Prospect': 30,
      'Response Time to Prospect': 20,
      'Quality of Communication with Prospect': 5,
    },
    'Progress': {
      'Progress towards Reaching Agreement': 10,
      'Quality of Progress Made': 10,
      'Alignment with Prospect’s Needs': 5,
      'Buy-In from Prospect': 50,
    },
  });

  const [isVisible, setIsVisible] = useState(true);

  function handleScoreChange(category, criteria, value) {
    setScores(prevScores => {
      const categoryCopy = { ...prevScores[category] };
      categoryCopy[criteria] = value;
      return { ...prevScores, [category]: categoryCopy };
    });
  }
  

  return (
<table style={{ fontFamily: 'Helvetica, sans-serif', fontSize: '1rem', backgroundColor: '#0B0C11', borderCollapse: 'collapse', width: '100%', color: '#C4BFBD', marginTop: '2rem', position: 'relative' }}>
  <thead>
    <tr>
      <th style={{ backgroundColor: '#333', color: 'white', textAlign: 'left', padding: '8px', border: '0.5px solid #E0E0E0', borderRadius: '5px 0 0 0' }}>Categories</th>
      <th style={{ backgroundColor: '#333', color: 'white', textAlign: 'left', padding: '8px', border: '0.5px solid #E0E0E0' }}>Scoring Criteria</th>
      <th style={{ backgroundColor: '#333', color: 'white', textAlign: 'left', padding: '8px', border: '0.5px solid #E0E0E0', borderRadius: '0 5px 0 0' }}>Scores</th>
    </tr>
  </thead>
  <tbody>
    {scores &&
      Object.entries(scores).map(([category, criteriaScores]) => (
        <>
          <tr key={`${category}-header`}>
            <td style={{ backgroundColor: '#0B0C11', textAlign: 'left', padding: '8px', border: '0.5px solid #E0E0E0', borderTop: 'none', fontWeight: 'bold', borderRadius: '5px 0 0 0' }} rowSpan={Object.keys(criteriaScores).length + 1}>{category}</td>
            
          </tr>
          {Object.entries(criteriaScores).map(([criteria, score]) => (
            <tr key={`${category}-${criteria}`}>
              <td style={{ backgroundColor: '#17181E', textAlign: 'left', padding: '8px', border: '0.5px solid #E0E0E0' }}>{criteria}</td>
              <td style={{ backgroundColor: '#0B0C11', textAlign: 'left', padding: '8px', border: '0.5px solid #E0E0E0', borderRadius: '0 5px 0 0' }}>
                <input
                  type="number"
                  value={score}
                  onChange={e => handleScoreChange(category, criteria, e.target.value)}
                  style={{ width: '100%', fontSize: '1rem', color: '#C4BFBD', backgroundColor: 'transparent', border: 'none', textAlign: 'left' }}
                />
              </td>
            </tr>
          ))}
        </>
      ))}
  </tbody>
  <tfoot>
  <tr style={{ textAlign: 'right' }}>
    <td colSpan="3">
      <button style={{ backgroundColor: '#126122', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '1rem', marginRight: '1rem', transition: 'background-color 0.2s ease-in-out' }} onClick={onSave} onMouseDown={(e) => { e.target.style.backgroundColor = '#555' }} onMouseUp={(e) => { e.target.style.backgroundColor = '#126122' }}>Save</button>
      <button style={{ backgroundColor: '#126122', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '1rem', transition: 'background-color 0.2s ease-in-out' }} onClick={onClose} onMouseDown={(e) => { e.target.style.backgroundColor = '#555' }} onMouseUp={(e) => { e.target.style.backgroundColor = '#126122' }}>Cancel</button>
    </td>
  </tr>
</tfoot>
</table>
      );
      

}


