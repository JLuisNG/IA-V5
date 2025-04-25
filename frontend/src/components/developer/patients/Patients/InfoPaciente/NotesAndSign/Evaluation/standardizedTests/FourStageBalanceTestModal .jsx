// components/standardizedTests/FourStageBalanceTestModal.jsx
import React, { useState } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/FourStageBalanceTestModal.scss';

const FourStageBalanceTestModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    position1Time: initialData?.position1Time || '',
    position2Time: initialData?.position2Time || '',
    position3Time: initialData?.position3Time || '',
    position4Time: initialData?.position4Time || '',
    additionalNotes: initialData?.additionalNotes || '',
    isComplete: initialData?.isComplete || false
  });

  // Manejar cambios en los campos
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    // Marcar como completo y cerrar el modal
    setFormData(prevData => ({
      ...prevData,
      isComplete: true
    }));
    
    // Devolver los datos al componente padre
    onClose({
      ...formData,
      isComplete: true,
      // El puntaje no es relevante para esta prueba
      score: null
    });
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="four-stage-balance-test-modal-overlay">
      <div className="four-stage-balance-test-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-shoe-prints"></i>
            Four Stage Balance Test
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="test-description">
            <div className="description-item">
              <h3>Purpose:</h3>
              <p>To assess static balance</p>
            </div>
            
            <div className="description-item">
              <h3>Equipment:</h3>
              <p>A stopwatch</p>
            </div>
            
            <div className="description-item">
              <h3>Directions:</h3>
              <p>There are four progressively more challenging positions. Patients should not use an assistive device (cane or walker) and keep their eyes open. Describe and demonstrate each position to the patient, and have them assume the correct foot position. When the patient is ready to catch the patient if he/she should lose their balance. If the patient can hold a position for 10 seconds without moving his/her feet or reaching support, go on to the next position. If not, stop the test.</p>
            </div>
            
            <div className="description-item">
              <h3>Instructions to the patient:</h3>
              <p>"I'm going to show you four positions. Try to stand in each position for 10 seconds. You can hold your arms out, or move your body to help keep your balance, but don't move your feet. Hold this position until I tell you to stop."</p>
              <p>For each stage, say "Ready, begin" and begin timing.</p>
              <p>After 10 seconds, say "Stop."</p>
            </div>
          </div>
          
          <div className="test-positions">
            <div className="position-item">
              <div className="position-info">
                <h4>POSITION 1:</h4>
                <p>Stand with feet side by side.</p>
              </div>
              <div className="position-image">
                <img src="/images/positions/position1.png" alt="Position 1" />
              </div>
              <div className="position-time">
                <label>Time:</label>
                <div className="time-input">
                  <input
                    type="text"
                    value={formData.position1Time}
                    onChange={(e) => handleChange('position1Time', e.target.value)}
                    placeholder="0"
                  />
                  <span className="unit">seconds</span>
                </div>
              </div>
            </div>
            
            <div className="position-item">
              <div className="position-info">
                <h4>POSITION 2:</h4>
                <p>Place the instep of one foot so it is touching the big toe of the other foot.</p>
              </div>
              <div className="position-image">
                <img src="/images/positions/position2.png" alt="Position 2" />
              </div>
              <div className="position-time">
                <label>Time:</label>
                <div className="time-input">
                  <input
                    type="text"
                    value={formData.position2Time}
                    onChange={(e) => handleChange('position2Time', e.target.value)}
                    placeholder="0"
                  />
                  <span className="unit">seconds</span>
                </div>
              </div>
            </div>
            
            <div className="position-item">
              <div className="position-info">
                <h4>POSITION 3:</h4>
                <p>Place one foot in front of the other, heel touching toe.</p>
              </div>
              <div className="position-image">
                <img src="/images/positions/position3.png" alt="Position 3" />
              </div>
              <div className="position-time">
                <label>Time:</label>
                <div className="time-input">
                  <input
                    type="text"
                    value={formData.position3Time}
                    onChange={(e) => handleChange('position3Time', e.target.value)}
                    placeholder="0"
                  />
                  <span className="unit">seconds</span>
                </div>
              </div>
            </div>
            
            <div className="position-item">
            <div className="position-info">
                <h4>POSITION 4:</h4>
                <p>Stand on one foot.</p>
              </div>
              <div className="position-image">
                <img src="/images/positions/position4.png" alt="Position 4" />
              </div>
              <div className="position-time">
                <label>Time:</label>
                <div className="time-input">
                  <input
                    type="text"
                    value={formData.position4Time}
                    onChange={(e) => handleChange('position4Time', e.target.value)}
                    placeholder="0"
                  />
                  <span className="unit">seconds</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="additional-notes">
            <h3>Notes and Interpretation:</h3>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              rows={4}
              placeholder="Add notes on patient performance, balance strategies, or any other observations"
            ></textarea>
            
            <div className="interpretation-box">
              <h4>Interpretation Guidelines:</h4>
              <ul>
                <li>Patients should be able to stand in each position for 10 seconds to be considered having normal balance.</li>
                <li>Inability to stand in positions 3 or 4 for at least 10 seconds indicates balance impairment.</li>
                <li>Patients who can hold position 4 for 10 seconds are considered to have excellent balance.</li>
                <li>Patients who cannot maintain position 3 for at least 10 seconds are at increased risk for falls.</li>
              </ul>
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

export default FourStageBalanceTestModal;