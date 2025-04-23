// components/StandardizedTest.jsx
import React, { useState } from 'react';
import '../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/StandardizedTest.scss';

const StandardizedTest = ({ 
  title, 
  isComplete = false, 
  score = null, 
  onOpen, 
  className = ''
}) => {
  return (
    <div className={`standardized-test ${className} ${isComplete ? 'completed' : ''}`}>
      <div className="test-header" onClick={onOpen}>
        <h3>{title}</h3>
        <div className="test-status">
          {score !== null ? (
            <div className="test-score">Score: {score}</div>
          ) : (
            <div className="test-badge incomplete">Incomplete</div>
          )}
          <button className="open-btn">
            <i className="fas fa-external-link-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StandardizedTest;