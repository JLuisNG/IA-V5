// components/standardizedTests/TimedUpAndGoModal.jsx
import React, { useState } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/TimedUpAndGoModal.scss';

const TimedUpAndGoModal = ({ isOpen, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    time: initialData?.time || '',
    description: initialData?.description || '',
    isComplete: initialData?.isComplete || false
  });

  // Estado para validación
  const [validationErrors, setValidationErrors] = useState({});

  // Manejar cambios en los campos
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));

    // Limpiar error de validación si existe
    if (validationErrors[field]) {
      setValidationErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validar formulario
  const validateForm = () => {
    const errors = {};
    
    if (!formData.time) {
      errors.time = true;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onClose({
        ...formData,
        isComplete: true,
        score: formData.time // Usamos el tiempo como puntuación
      });
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="timed-up-and-go-modal-overlay">
      <div className="timed-up-and-go-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-stopwatch"></i>
            Timed Up And Go
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="test-instructions">
            <p>Measure (in seconds), the time it takes for the patient to stand up from a standard arm chair, walk a distance of 10 feet, turn, walk back to the chair and sit down again.</p>
          </div>
          
          <div className="test-form">
            <div className="form-row">
              <div className={`form-group ${validationErrors.time ? 'has-error' : ''}`}>
                <label>TIME AND BRIEF DESCRIPTION:</label>
                <div className="time-description">
                  <input 
                    type="number" 
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    placeholder="0"
                    step="0.1"
                    min="0"
                    className={validationErrors.time ? 'error' : ''}
                  />
                  <span className="unit">sec</span>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter description and observations"
                    rows={4}
                  />
                </div>
                {validationErrors.time && (
                  <div className="error-message">Time is required</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="risk-interpretation">
            <h3>Risk Interpretation</h3>
            <div className="interpretation-card">
              <div className="risk-levels">
                <div className={`risk-level ${parseFloat(formData.time) < 10 ? 'active' : ''}`}>
                  <div className="risk-indicator low"></div>
                  <div className="risk-text">
                    <strong>&lt; 10 seconds</strong>
                    <span>Normal - Low Fall Risk</span>
                  </div>
                </div>
                <div className={`risk-level ${parseFloat(formData.time) >= 10 && parseFloat(formData.time) <= 20 ? 'active' : ''}`}>
                  <div className="risk-indicator moderate"></div>
                  <div className="risk-text">
                    <strong>10 - 20 seconds</strong>
                    <span>Good mobility, can go out alone - Moderate Fall Risk</span>
                  </div>
                </div>
                <div className={`risk-level ${parseFloat(formData.time) > 20 && parseFloat(formData.time) <= 30 ? 'active' : ''}`}>
                  <div className="risk-indicator high"></div>
                  <div className="risk-text">
                    <strong>20 - 30 seconds</strong>
                    <span>Problems, cannot go outside alone - High Fall Risk</span>
                  </div>
                </div>
                <div className={`risk-level ${parseFloat(formData.time) > 30 ? 'active' : ''}`}>
                  <div className="risk-indicator severe"></div>
                  <div className="risk-text">
                    <strong>&gt; 30 seconds</strong>
                    <span>Dependent in most ADLs - Severe Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={() => onClose()}>
            CANCEL
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimedUpAndGoModal;