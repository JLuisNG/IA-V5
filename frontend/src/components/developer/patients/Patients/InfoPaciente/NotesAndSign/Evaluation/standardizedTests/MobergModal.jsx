// components/standardizedTests/MobergModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/MobergModal.scss';

const MobergModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    leftHand: initialData?.leftHand || '',
    rightHand: initialData?.rightHand || '',
    leftHandObscured: initialData?.leftHandObscured || '',
    rightHandObscured: initialData?.rightHandObscured || '',
    additionalNotes: initialData?.additionalNotes || '',
    isComplete: initialData?.isComplete || false
  });
  
  // Estado para validación
  const [validationErrors, setValidationErrors] = useState({});

  // Manejar cambios en los campos del formulario
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

  // Validar el formulario
  const validateForm = () => {
    const errors = {};
    
    // Al menos una mano debe ser evaluada
    if (!formData.leftHand && !formData.rightHand && 
        !formData.leftHandObscured && !formData.rightHandObscured) {
      errors.hands = true;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para calcular el resultado global
  const calculateResult = () => {
    // Para este test, podemos retornar el mejor tiempo (el más bajo) entre ambas manos
    // o podemos simplemente retornar todos los tiempos para análisis posterior
    const times = [];
    
    if (formData.leftHand) times.push(parseFloat(formData.leftHand));
    if (formData.rightHand) times.push(parseFloat(formData.rightHand));
    if (formData.leftHandObscured) times.push(parseFloat(formData.leftHandObscured));
    if (formData.rightHandObscured) times.push(parseFloat(formData.rightHandObscured));
    
    // Para el score, podemos usar la diferencia entre manos visible/obscured
    // o el mejor tiempo global
    const bestTime = times.length > 0 ? Math.min(...times) : null;
    
    return {
      bestTime,
      difference: {
        left: formData.leftHand && formData.leftHandObscured ? 
          Math.abs(parseFloat(formData.leftHandObscured) - parseFloat(formData.leftHand)) : null,
        right: formData.rightHand && formData.rightHandObscured ? 
          Math.abs(parseFloat(formData.rightHandObscured) - parseFloat(formData.rightHand)) : null
      },
      score: bestTime // Usamos el mejor tiempo como score general
    };
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      const result = calculateResult();
      
      onClose({
        ...formData,
        result,
        isComplete: true,
        score: result.bestTime ? result.bestTime.toFixed(2) : 'N/A'
      });
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="moberg-modal-overlay">
      <div className="moberg-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-hand-paper"></i>
            Moberg Hand Function Test
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="assessment-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="info-text">
                <p>The Moberg pickup test measures fine motor coordination and tactile gnosis. The test is performed with eyes open (unobscured) and with eyes closed (obscured). Record the time in seconds it takes for the patient to pick up small objects.</p>
              </div>
            </div>
          </div>
          
          {validationErrors.hands && (
            <div className="validation-error">
              <i className="fas fa-exclamation-triangle"></i>
              <span>At least one hand measurement must be recorded.</span>
            </div>
          )}
          
          <div className="test-grid">
            <div className="test-section unobscured-section">
              <h3>Unobscured Vision</h3>
              
              <div className="hand-measurements">
                <div className="measurement-item">
                  <label htmlFor="leftHand">LEFT HAND:</label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="leftHand"
                      step="0.1"
                      min="0"
                      value={formData.leftHand}
                      onChange={(e) => handleChange('leftHand', e.target.value)}
                      placeholder="0"
                    />
                    <span className="unit">seconds</span>
                  </div>
                </div>
                
                <div className="measurement-item">
                  <label htmlFor="rightHand">RIGHT HAND:</label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="rightHand"
                      step="0.1"
                      min="0"
                      value={formData.rightHand}
                      onChange={(e) => handleChange('rightHand', e.target.value)}
                      placeholder="0"
                    />
                    <span className="unit">seconds</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="test-section obscured-section">
              <h3>Obscured Vision</h3>
              
              <div className="hand-measurements">
                <div className="measurement-item">
                  <label htmlFor="leftHandObscured">LEFT HAND (OBSCURED):</label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="leftHandObscured"
                      step="0.1"
                      min="0"
                      value={formData.leftHandObscured}
                      onChange={(e) => handleChange('leftHandObscured', e.target.value)}
                      placeholder="0"
                    />
                    <span className="unit">seconds</span>
                  </div>
                </div>
                
                <div className="measurement-item">
                  <label htmlFor="rightHandObscured">RIGHT HAND (OBSCURED):</label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="rightHandObscured"
                      step="0.1"
                      min="0"
                      value={formData.rightHandObscured}
                      onChange={(e) => handleChange('rightHandObscured', e.target.value)}
                      placeholder="0"
                    />
                    <span className="unit">seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="result-summary">
            {(formData.leftHand || formData.rightHand || formData.leftHandObscured || formData.rightHandObscured) && (
              <div className="result-data">
                <h3>Result Analysis</h3>
                
                <div className="result-grid">
                  {formData.leftHand && formData.leftHandObscured && (
                    <div className="result-item">
                      <div className="result-label">Left Hand Difference:</div>
                      <div className="result-value">
                        {Math.abs(parseFloat(formData.leftHandObscured) - parseFloat(formData.leftHand)).toFixed(2)} sec
                      </div>
                    </div>
                  )}
                  
                  {formData.rightHand && formData.rightHandObscured && (
                    <div className="result-item">
                      <div className="result-label">Right Hand Difference:</div>
                      <div className="result-value">
                        {Math.abs(parseFloat(formData.rightHandObscured) - parseFloat(formData.rightHand)).toFixed(2)} sec
                      </div>
                    </div>
                  )}
                  
                  {formData.leftHand && formData.rightHand && (
                    <div className="result-item">
                      <div className="result-label">Unobscured Dominance:</div>
                      <div className="result-value">
                        {parseFloat(formData.leftHand) < parseFloat(formData.rightHand) ? 
                          'Left Hand Faster' : 
                          parseFloat(formData.rightHand) < parseFloat(formData.leftHand) ? 
                            'Right Hand Faster' : 'Equal Performance'}
                      </div>
                    </div>
                  )}
                  
                  {formData.leftHandObscured && formData.rightHandObscured && (
                    <div className="result-item">
                      <div className="result-label">Obscured Dominance:</div>
                      <div className="result-value">
                        {parseFloat(formData.leftHandObscured) < parseFloat(formData.rightHandObscured) ? 
                          'Left Hand Faster' : 
                          parseFloat(formData.rightHandObscured) < parseFloat(formData.leftHandObscured) ? 
                            'Right Hand Faster' : 'Equal Performance'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="additional-notes">
            <h3>Additional Notes</h3>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              placeholder="Enter any additional observations or notes"
              rows={4}
            />
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

export default MobergModal;