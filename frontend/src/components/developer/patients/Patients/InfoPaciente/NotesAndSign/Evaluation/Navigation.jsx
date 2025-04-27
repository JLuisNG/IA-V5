// components/Navigation.jsx
import React from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/Navigation.scss';

const Navigation = ({ currentStep, onStepChange, patientName, visitDate }) => {
  const steps = [
    { id: 'evaluation', label: 'PT Evaluation' },
    { id: 'objective', label: 'Objective' },
    { id: 'assessment', label: 'Assessment' },
    { id: 'plan', label: 'Plan' },
    { id: 'transfers', label: 'Transfers / ADL' },
    { id: 'finale', label: 'Finale' }
  ];
  
  // Formatear la fecha de la visita
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="navigation-container">
      <div className="patient-info">
        <p>
          <span className="label">Patient:</span> 
          <span className="value">{patientName || 'Unknown'}</span>
        </p>
        <p>
          <span className="label">Date:</span> 
          <span className="value">{visitDate ? formatDate(visitDate) : 'Unknown'}</span>
        </p>
      </div>
      
      <div className="steps-navigation">
        <select 
          className="steps-dropdown"
          value={currentStep}
          onChange={(e) => onStepChange(e.target.value)}
        >
          {steps.map(step => (
            <option key={step.id} value={step.id}>
              {step.label}
            </option>
          ))}
        </select>
        
        <div className="steps-tabs">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`step-tab ${currentStep === step.id ? 'active' : ''}`}
              onClick={() => onStepChange(step.id)}
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-label">{step.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;