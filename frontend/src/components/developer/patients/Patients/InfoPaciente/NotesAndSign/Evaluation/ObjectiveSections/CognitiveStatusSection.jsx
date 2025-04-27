// components/ObjectiveSections/CognitiveStatusSection.jsx
import React, { useState } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/ObjectiveSections/CognitiveStatusSection.scss';

const CognitiveStatusSection = ({ data, onChange }) => {
  // Opciones para los dropdowns
  const statusOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Intact', label: 'Intact' },
    { value: 'Impaired', label: 'Impaired' },
    { value: 'Functional', label: 'Functional' }
  ];
  
  const yesNoOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  // Manejar cambios en los checkboxes de orientación
  const handleOrientationChange = (field) => {
    const updatedOrientation = {
      ...data.orientation,
      [field]: !data.orientation?.[field]
    };
    
    onChange({
      ...data,
      orientation: updatedOrientation
    });
  };

  // Manejar cambios en textarea
  const handleTextChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // Manejar cambios en los dropdowns
  const handleSelectChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="cognitive-status-section">
      <h2 className="section-title">Cognitive Status / Comprehension</h2>
      
      <div className="orientation-row">
        <span className="label">ORIENTED:</span>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="orientedPerson" 
              checked={data.orientation?.person || false}
              onChange={() => handleOrientationChange('person')}
            />
            <label htmlFor="orientedPerson">Person</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="orientedPlace" 
              checked={data.orientation?.place || false}
              onChange={() => handleOrientationChange('place')}
            />
            <label htmlFor="orientedPlace">Place</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="orientedTime" 
              checked={data.orientation?.time || false}
              onChange={() => handleOrientationChange('time')}
            />
            <label htmlFor="orientedTime">Time</label>
          </div>
        </div>
      </div>
      
      <div className="reason-row">
        <span className="label">REASON FOR THERAPY:</span>
        <textarea 
          value={data.reasonForTherapy || ''}
          onChange={(e) => handleTextChange('reasonForTherapy', e.target.value)}
          rows={3}
          placeholder="Explain the reason for therapy"
        />
      </div>
      
      <div className="cognitive-grid">
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">SHORT TERM MEMORY:</span>
            <select 
              value={data.shortTermMemory || ''}
              onChange={(e) => handleSelectChange('shortTermMemory', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">PROBLEM SOLVING:</span>
            <select 
              value={data.problemSolving || ''}
              onChange={(e) => handleSelectChange('problemSolving', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">LONG TERM MEMORY:</span>
            <select 
              value={data.longTermMemory || ''}
              onChange={(e) => handleSelectChange('longTermMemory', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">COPING SKILLS:</span>
            <select 
              value={data.copingSkills || ''}
              onChange={(e) => handleSelectChange('copingSkills', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">ATTENTION / CONCENTRATION:</span>
            <select 
              value={data.attention || ''}
              onChange={(e) => handleSelectChange('attention', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">ABLE TO EXPRESS NEEDS:</span>
            <select 
              value={data.expressNeeds || ''}
              onChange={(e) => handleSelectChange('expressNeeds', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">AUDITORY COMPREHENSION:</span>
            <select 
              value={data.auditoryComprehension || ''}
              onChange={(e) => handleSelectChange('auditoryComprehension', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">SAFETY / JUDGEMENT:</span>
            <select 
              value={data.safetyJudgement || ''}
              onChange={(e) => handleSelectChange('safetyJudgement', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">VISUAL COMPREHENSION:</span>
            <select 
              value={data.visualComprehension || ''}
              onChange={(e) => handleSelectChange('visualComprehension', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">INITIATION OF ACTIVITY:</span>
            <select 
              value={data.initiationOfActivity || ''}
              onChange={(e) => handleSelectChange('initiationOfActivity', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">SELF-CONTROL:</span>
            <select 
              value={data.selfControl || ''}
              onChange={(e) => handleSelectChange('selfControl', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">HARD OF HEARING:</span>
            <select 
              value={data.hardOfHearing || ''}
              onChange={(e) => handleSelectChange('hardOfHearing', e.target.value)}
            >
              {yesNoOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">SEQUENCING:</span>
            <select 
              value={data.sequencing || ''}
              onChange={(e) => handleSelectChange('sequencing', e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="additional-info-row">
        <span className="label">ADDITIONAL INFORMATION:</span>
        <textarea 
          value={data.additionalInformation || ''}
          onChange={(e) => handleTextChange('additionalInformation', e.target.value)}
          rows={3}
          placeholder="Add any additional information about cognitive status"
        />
      </div>
    </div>
  );
};

export default CognitiveStatusSection;