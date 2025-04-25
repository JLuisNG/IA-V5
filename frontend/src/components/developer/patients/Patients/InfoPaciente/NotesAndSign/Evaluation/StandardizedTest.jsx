// components/StandardizedTest.jsx
import React from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/StandardizedTest.scss';

const StandardizedTest = ({ 
  title, 
  isComplete = false, 
  score = null, 
  onOpen, 
  className = ''
}) => {
  return (
    <div className={`standardized-test ${className} ${isComplete ? 'completed' : ''}`} onClick={onOpen}>
      <div className="test-header">
        <h3>{title}</h3>
        <div className="test-status">
          {score !== null ? (
            <div className="test-score">Score: {score}</div>
          ) : (
            <div className={`test-badge ${isComplete ? 'complete' : 'incomplete'}`}>
              {isComplete ? 'Complete' : 'Incomplete'}
            </div>
          )}
          <button className="open-btn" onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}>
            <i className="fas fa-external-link-alt"></i>
          </button>
        </div>
      </div>
      
      {isComplete && score !== null && (
        <div className="test-details">
          <div className="test-score-bar">
            <div 
              className="score-indicator" 
              style={{ 
                width: `${Math.min(100, (score / 100) * 100)}%`,
                backgroundColor: score < 50 ? '#ef4444' : score < 75 ? '#f59e0b' : '#10b981'
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandardizedTest;