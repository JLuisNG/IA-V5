// components/standardizedTests/FunctionalReachModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/FunctionalReachModal.scss';

const FunctionalReachModal = ({ isOpen, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    trialAttempt: initialData?.trialAttempt || '',
    firstMeasurement: initialData?.firstMeasurement || '',
    secondMeasurement: initialData?.secondMeasurement || '',
    averageReach: initialData?.averageReach || '',
    notes: initialData?.notes || '',
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

  // Calcular el promedio cuando cambian las mediciones
  useEffect(() => {
    if (formData.firstMeasurement && formData.secondMeasurement) {
      const firstVal = parseFloat(formData.firstMeasurement) || 0;
      const secondVal = parseFloat(formData.secondMeasurement) || 0;
      const average = ((firstVal + secondVal) / 2).toFixed(1);
      
      setFormData(prevData => ({
        ...prevData,
        averageReach: average
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        averageReach: ''
      }));
    }
  }, [formData.firstMeasurement, formData.secondMeasurement]);

  // Validar formulario
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstMeasurement) {
      errors.firstMeasurement = true;
    }
    
    if (!formData.secondMeasurement) {
      errors.secondMeasurement = true;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Determinar el nivel de riesgo basado en el promedio
  const getRiskLevel = () => {
    const avg = parseFloat(formData.averageReach);
    
    if (isNaN(avg)) return null;
    
    if (avg >= 10) return 'low';
    if (avg >= 6) return 'moderate';
    return 'high';
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onClose({
        ...formData,
        isComplete: true,
        score: formData.averageReach // Usamos el promedio como puntuación
      });
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="functional-reach-modal-overlay">
      <div className="functional-reach-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-ruler-horizontal"></i>
            Functional Reach
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
            <p>The Functional Reach Test measures the maximum distance a person can reach forward while standing in a fixed position. Patient stands next to a wall with arm raised to 90 degrees and reaches forward as far as possible without losing balance.</p>
          </div>
          
          <div className="test-form">
            <div className="measurements-grid">
              <div className={`measurement-item ${validationErrors.trialAttempt ? 'has-error' : ''}`}>
                <label>TRIAL ATTEMPT:</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    value={formData.trialAttempt}
                    onChange={(e) => handleChange('trialAttempt', e.target.value)}
                    placeholder="0"
                    step="0.1"
                    min="0"
                  />
                  <span className="unit">inches</span>
                </div>
              </div>
              
              <div className={`measurement-item ${validationErrors.firstMeasurement ? 'has-error' : ''}`}>
                <label>FIRST MEASUREMENT:</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    value={formData.firstMeasurement}
                    onChange={(e) => handleChange('firstMeasurement', e.target.value)}
                    placeholder="0"
                    step="0.1"
                    min="0"
                    className={validationErrors.firstMeasurement ? 'error' : ''}
                  />
                  <span className="unit">inches</span>
                </div>
                {validationErrors.firstMeasurement && (
                  <div className="error-message">Required</div>
                )}
              </div>
              
              <div className={`measurement-item ${validationErrors.secondMeasurement ? 'has-error' : ''}`}>
                <label>SECOND MEASUREMENT:</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    value={formData.secondMeasurement}
                    onChange={(e) => handleChange('secondMeasurement', e.target.value)}
                    placeholder="0"
                    step="0.1"
                    min="0"
                    className={validationErrors.secondMeasurement ? 'error' : ''}
                  />
                  <span className="unit">inches</span>
                </div>
                {validationErrors.secondMeasurement && (
                  <div className="error-message">Required</div>
                )}
              </div>
            </div>
            
            <div className="average-result">
              <div className="average-card">
                <div className="average-header">
                  <h3>Average Functional Reach</h3>
                  <span className={`average-value ${getRiskLevel() ? `risk-${getRiskLevel()}` : ''}`}>
                    {formData.averageReach ? `${formData.averageReach} inches` : '-'}
                  </span>
                </div>
                
                <div className="notes-section">
                  <label>Notes:</label>
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Enter any additional notes or observations"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="risk-interpretation">
            <h3>Risk Interpretation</h3>
            <div className="interpretation-card">
              <div className="risk-levels">
                <div className={`risk-level ${getRiskLevel() === 'high' ? 'active' : ''}`}>
                  <div className="risk-indicator high"></div>
                  <div className="risk-text">
                    <strong>&lt; 6 inches</strong>
                    <span>High Risk of Falls</span>
                  </div>
                </div>
                <div className={`risk-level ${getRiskLevel() === 'moderate' ? 'active' : ''}`}>
                  <div className="risk-indicator moderate"></div>
                  <div className="risk-text">
                    <strong>6 - 10 inches</strong>
                    <span>Moderate Risk of Falls</span>
                  </div>
                </div>
                <div className={`risk-level ${getRiskLevel() === 'low' ? 'active' : ''}`}>
                  <div className="risk-indicator low"></div>
                  <div className="risk-text">
                    <strong>&gt; 10 inches</strong>
                    <span>Low Risk of Falls</span>
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

export default FunctionalReachModal;