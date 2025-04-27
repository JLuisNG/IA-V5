// components/standardizedTests/FourStageBalanceTestModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/FourStageBalanceTestModal.scss';

const FourStageBalanceTestModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    sideByStandTime: initialData?.sideByStandTime || '',
    semiTandemTime: initialData?.semiTandemTime || '',
    tandemTime: initialData?.tandemTime || '',
    oneLegtandTime: initialData?.oneLegtandTime || '',
    stageCompleted: initialData?.stageCompleted || 0,
    additionalNotes: initialData?.additionalNotes || '',
    fallRisk: initialData?.fallRisk || '',
    isComplete: initialData?.isComplete || false
  });

  // Estado para la validación
  const [validationErrors, setValidationErrors] = useState({});

  // Estado para posición activa en la animación
  const [activePosition, setActivePosition] = useState(1);

  // Estado para el cronómetro
  const [timerRunning, setTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerStage, setTimerStage] = useState(null);

  // Calcular el nivel de riesgo de caída
  useEffect(() => {
    let risk = '';
    const stage = formData.stageCompleted;

    if (stage === 0) {
      risk = 'Not determined';
    } else if (stage === 1) {
      risk = 'High fall risk';
    } else if (stage === 2) {
      risk = 'Moderate fall risk';
    } else if (stage === 3) {
      risk = 'Moderate fall risk';
    } else if (stage === 4) {
      risk = 'Low fall risk';
    }

    setFormData(prev => ({ ...prev, fallRisk: risk }));
  }, [formData.stageCompleted]);

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

    // Actualizar la etapa completada basada en los tiempos
    if (field.includes('Time')) {
      updateCompletedStage();
    }
  };

  // Actualizar la etapa completada basada en los tiempos ingresados
  const updateCompletedStage = () => {
    let stageCompleted = 0;

    if (formData.sideByStandTime && parseFloat(formData.sideByStandTime) >= 10) {
      stageCompleted = 1;
      
      if (formData.semiTandemTime && parseFloat(formData.semiTandemTime) >= 10) {
        stageCompleted = 2;
        
        if (formData.tandemTime && parseFloat(formData.tandemTime) >= 10) {
          stageCompleted = 3;
          
          if (formData.oneLegtandTime && parseFloat(formData.oneLegtandTime) >= 10) {
            stageCompleted = 4;
          }
        }
      }
    }

    setFormData(prevData => ({
      ...prevData,
      stageCompleted
    }));
  };

  // Iniciar el cronómetro para una etapa específica
  const startTimer = (stage) => {
    if (timerRunning) {
      stopTimer();
      return;
    }

    setTimerStage(stage);
    setTimerRunning(true);
    setTimer(0);
  };

  // Detener el cronómetro y guardar el resultado
  const stopTimer = () => {
    setTimerRunning(false);
    
    if (timerStage) {
      const fieldMap = {
        1: 'sideByStandTime',
        2: 'semiTandemTime',
        3: 'tandemTime',
        4: 'oneLegtandTime'
      };
      
      handleChange(fieldMap[timerStage], (timer / 10).toFixed(1));
    }
    
    setTimerStage(null);
  };

  // Actualizar el cronómetro cada 100ms
  useEffect(() => {
    let interval = null;
    
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 100);
    } else if (!timerRunning && timer !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  // Formatear tiempo para mostrar
  const formatTime = (time) => {
    const seconds = Math.floor(time / 10);
    const tenths = time % 10;
    return `${seconds}.${tenths}`;
  };

  // Validar el formulario
  const validateForm = () => {
    const errors = {};
    
    // Verificar que al menos la primera etapa tenga un tiempo
    if (!formData.sideByStandTime) {
      errors.sideByStandTime = true;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onClose({
        ...formData,
        isComplete: true,
        score: formData.stageCompleted
      });
    }
  };

  // Cambiar la posición activa en la animación
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePosition(prev => (prev % 4) + 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="four-stage-modal-overlay">
      <div className="four-stage-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-balance-scale"></i>
            Four Stage Balance Test
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="test-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="info-text">
                <p>The Four Stage Balance Test assesses static balance by testing the patient's ability to maintain four increasingly difficult stances. Each position should be held for 10 seconds to be considered successful.</p>
              </div>
            </div>
          </div>
          
          <div className="balance-visualization">
            <div className="stages-animation">
              <div className={`stage-container ${activePosition === 1 ? 'active' : ''}`}>
                <div className="stage-label">1. Side-by-Side Stand</div>
                <div className="stage-figure side-by-side"></div>
              </div>
              
              <div className={`stage-container ${activePosition === 2 ? 'active' : ''}`}>
                <div className="stage-label">2. Semi-Tandem Stand</div>
                <div className="stage-figure semi-tandem"></div>
              </div>
              
              <div className={`stage-container ${activePosition === 3 ? 'active' : ''}`}>
                <div className="stage-label">3. Tandem Stand</div>
                <div className="stage-figure tandem"></div>
              </div>
              
              <div className={`stage-container ${activePosition === 4 ? 'active' : ''}`}>
                <div className="stage-label">4. One Leg Stand</div>
                <div className="stage-figure one-leg"></div>
              </div>
            </div>
          </div>
          
          {timerRunning && (
            <div className="timer-display">
              <div className="timer-value">{formatTime(timer)} sec</div>
              <button className="stop-timer" onClick={stopTimer}>
                <i className="fas fa-stop"></i> Stop
              </button>
            </div>
          )}
          
          <div className="balance-stages">
            <div className="stage-item">
              <div className="stage-header">
                <h3>1. Side-by-Side Stand</h3>
                <div className="stage-actions">
                  <input 
                    type="number" 
                    className={validationErrors.sideByStandTime ? 'error' : ''}
                    value={formData.sideByStandTime}
                    onChange={(e) => handleChange('sideByStandTime', e.target.value)}
                    placeholder="Time (sec)"
                    step="0.1"
                    min="0"
                    max="60"
                  />
                  <span className="unit">sec</span>
                  
                  <button 
                    className="timer-btn"
                    onClick={() => startTimer(4)}
                    disabled={timerRunning && timerStage !== 4}
                  >
                    {timerRunning && timerStage === 4 ? 'Stop' : 'Start Timer'}
                  </button>
                </div>
              </div>
              <div className="stage-instructions">
                <p>Patient stands on one leg (either right or left). Eyes open.</p>
              </div>
            </div>
          </div>
          
          <div className="additional-notes">
            <h3>Additional Notes</h3>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              placeholder="Add observations, assistance needed, environmental factors, etc."
              rows={4}
            />
          </div>
          
          <div className="test-results">
            <div className={`result-card ${formData.fallRisk.toLowerCase().includes('high') ? 'high-risk' : 
                                          formData.fallRisk.toLowerCase().includes('moderate') ? 'moderate-risk' : 
                                          formData.fallRisk.toLowerCase().includes('low') ? 'low-risk' : ''}`}>
              <div className="result-header">
                <h3>Test Results</h3>
                <div className="stage-badge">Stage {formData.stageCompleted} Completed</div>
              </div>
              
              <div className="result-content">
                <div className="risk-assessment">
                  <div className="risk-label">Fall Risk Assessment:</div>
                  <div className="risk-value">{formData.fallRisk || 'Not determined'}</div>
                </div>
                
                <div className="interpretation">
                  <h4>Interpretation</h4>
                  <div className="risk-levels">
                    <div className={`risk-level ${formData.stageCompleted === 0 ? 'active' : ''}`}>
                      <div className="risk-indicator not-determined"></div>
                      <div className="risk-text">
                        <strong>Stage 0:</strong> Unable to complete any position for 10 seconds
                      </div>
                    </div>
                    <div className={`risk-level ${formData.stageCompleted === 1 ? 'active' : ''}`}>
                      <div className="risk-indicator high"></div>
                      <div className="risk-text">
                        <strong>Stage 1:</strong> Completed side-by-side stand only (High Fall Risk)
                      </div>
                    </div>
                    <div className={`risk-level ${formData.stageCompleted === 2 ? 'active' : ''}`}>
                      <div className="risk-indicator moderate"></div>
                      <div className="risk-text">
                        <strong>Stage 2:</strong> Completed semi-tandem stand (Moderate Fall Risk)
                      </div>
                    </div>
                    <div className={`risk-level ${formData.stageCompleted === 3 ? 'active' : ''}`}>
                      <div className="risk-indicator moderate"></div>
                      <div className="risk-text">
                        <strong>Stage 3:</strong> Completed tandem stand (Moderate Fall Risk)
                      </div>
                    </div>
                    <div className={`risk-level ${formData.stageCompleted === 4 ? 'active' : ''}`}>
                      <div className="risk-indicator low"></div>
                      <div className="risk-text">
                        <strong>Stage 4:</strong> Completed one leg stand (Low Fall Risk)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={() => onClose()}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FourStageBalanceTestModal;