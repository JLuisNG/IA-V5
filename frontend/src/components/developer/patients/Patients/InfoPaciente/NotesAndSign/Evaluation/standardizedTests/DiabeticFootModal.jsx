// components/standardizedTests/DiabeticFootModal.jsx
import React, { useState } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/DiabeticFootModal.scss';

const DiabeticFootModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    frequency: initialData?.frequency || '',
    examBy: initialData?.examBy || 'RN/PT',
    integumentFindings: initialData?.integumentFindings || '',
    
    pedalPulsesPresent: {
      right: initialData?.pedalPulsesPresent?.right || false,
      left: initialData?.pedalPulsesPresent?.left || false
    },
    pedalPulsesAbsent: {
      right: initialData?.pedalPulsesAbsent?.right || false,
      left: initialData?.pedalPulsesAbsent?.left || false
    },
    pedalPulsesNotes: initialData?.pedalPulsesNotes || '',
    
    lossOfSenseWarm: {
      right: initialData?.lossOfSenseWarm?.right || false,
      left: initialData?.lossOfSenseWarm?.left || false
    },
    lossOfSenseCold: {
      right: initialData?.lossOfSenseCold?.right || false,
      left: initialData?.lossOfSenseCold?.left || false
    },
    lossOfSenseNotes: initialData?.lossOfSenseNotes || '',
    
    neuropathy: {
      right: initialData?.neuropathy?.right || false,
      left: initialData?.neuropathy?.left || false
    },
    
    ascendingCalf: {
      right: initialData?.ascendingCalf?.right || '',
      left: initialData?.ascendingCalf?.left || ''
    },
    
    legHairPresent: {
      right: initialData?.legHairPresent?.right || false,
      left: initialData?.legHairPresent?.left || false
    },
    legHairAbsent: {
      right: initialData?.legHairAbsent?.right || false,
      left: initialData?.legHairAbsent?.left || false
    },
    
    tingling: {
      right: initialData?.tingling?.right || false,
      left: initialData?.tingling?.left || false
    },
    
    isComplete: initialData?.isComplete || false
  });

  // Opciones para el examinador
  const examinerOptions = [
    'Patient',
    'Caregiver',
    'RN/PT',
    'Other'
  ];

  // Manejar cambios en los campos de texto
  const handleTextChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Manejar cambios en el examinador
  const handleExaminerChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      examBy: value
    }));
  };

  // Manejar cambios en las medidas del músculo de la pantorrilla
  const handleCalfMeasureChange = (side, value) => {
    setFormData(prevData => ({
      ...prevData,
      ascendingCalf: {
        ...prevData.ascendingCalf,
        [side]: value
      }
    }));
  };

  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (category, side) => {
    setFormData(prevData => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [side]: !prevData[category][side]
      }
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    onClose({
      ...formData,
      isComplete: true
    });
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="diabetic-foot-modal-overlay">
      <div className="diabetic-foot-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-shoe-prints"></i>
            Diabetic Foot Exam
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="exam-header">
            <div className="frequency-group">
              <label>FREQUENCY OF DIABETIC FOOT EXAM:</label>
              <input
                type="text"
                value={formData.frequency}
                onChange={(e) => handleTextChange('frequency', e.target.value)}
                placeholder="E.g., Weekly, Monthly, etc."
              />
            </div>
            
            <div className="examiner-group">
              <label>DONE BY:</label>
              <div className="radio-group">
                {examinerOptions.map(option => (
                  <label key={option} className="radio-option">
                    <input
                      type="radio"
                      name="examiner"
                      checked={formData.examBy === option}
                      onChange={() => handleExaminerChange(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="exam-by-clinician">
            <label>EXAM BY CLINICIAN THIS VISIT:</label>
            <select
              value={formData.examByClinician}
              onChange={(e) => handleTextChange('examByClinician', e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          
          <div className="integument-findings">
            <label>INTEGUMENT FINDINGS:</label>
            <textarea
              value={formData.integumentFindings}
              onChange={(e) => handleTextChange('integumentFindings', e.target.value)}
              rows={4}
              placeholder="Document any integument findings here"
            />
          </div>
          
          <div className="assessment-section">
            <div className="assessment-row">
              <div className="assessment-header">
                <h3>PEDAL PULSES</h3>
              </div>
              <div className="assessment-content">
                <div className="assessment-item">
                  <label>PRESENT:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.pedalPulsesPresent.right}
                        onChange={() => handleCheckboxChange('pedalPulsesPresent', 'right')}
                      />
                      <span>Right</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.pedalPulsesPresent.left}
                        onChange={() => handleCheckboxChange('pedalPulsesPresent', 'left')}
                      />
                      <span>Left</span>
                    </label>
                  </div>
                </div>
                <div className="assessment-item">
                  <label>ABSENT:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.pedalPulsesAbsent.right}
                        onChange={() => handleCheckboxChange('pedalPulsesAbsent', 'right')}
                      />
                      <span>Right</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.pedalPulsesAbsent.left}
                        onChange={() => handleCheckboxChange('pedalPulsesAbsent', 'left')}
                      />
                      <span>Left</span>
                    </label>
                  </div>
                </div>
                <textarea
                  value={formData.pedalPulsesNotes}
                  onChange={(e) => handleTextChange('pedalPulsesNotes', e.target.value)}
                  rows={3}
                  placeholder="Additional notes about pedal pulses"
                />
              </div>
            </div>
            
            <div className="assessment-row">
              <div className="assessment-header">
                <h3>LOSS OF SENSE</h3>
              </div>
              <div className="assessment-content">
                <div className="assessment-item">
                  <label>WARM:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.lossOfSenseWarm.right}
                        onChange={() => handleCheckboxChange('lossOfSenseWarm', 'right')}
                      />
                      <span>Right</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.lossOfSenseWarm.left}
                        onChange={() => handleCheckboxChange('lossOfSenseWarm', 'left')}
                      />
                      <span>Left</span>
                    </label>
                  </div>
                </div>
                <div className="assessment-item">
                  <label>COLD:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.lossOfSenseCold.right}
                        onChange={() => handleCheckboxChange('lossOfSenseCold', 'right')}
                      />
                      <span>Right</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.lossOfSenseCold.left}
                        onChange={() => handleCheckboxChange('lossOfSenseCold', 'left')}
                      />
                      <span>Left</span>
                    </label>
                  </div>
                </div>
                <textarea
                  value={formData.lossOfSenseNotes}
                  onChange={(e) => handleTextChange('lossOfSenseNotes', e.target.value)}
                  rows={3}
                  placeholder="Additional notes about loss of sense"
                />
              </div>
            </div>
            
            <div className="assessment-row">
              <div className="assessment-header">
                <h3>NEUROPATHY:</h3>
              </div>
              <div className="assessment-content">
                <div className="checkbox-group wide">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.neuropathy.right}
                      onChange={() => handleCheckboxChange('neuropathy', 'right')}
                    />
                    <span>Right</span>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.neuropathy.left}
                      onChange={() => handleCheckboxChange('neuropathy', 'left')}
                    />
                    <span>Left</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="assessment-row">
              <div className="assessment-header">
                <h3>ASCENDING CALF</h3>
              </div>
              <div className="assessment-content">
                <div className="measurement-group">
                  <div className="measurement-item">
                    <label>RIGHT FOOT:</label>
                    <div className="measurement-input">
                      <input
                        type="text"
                        value={formData.ascendingCalf.right}
                        onChange={(e) => handleCalfMeasureChange('right', e.target.value)}
                        placeholder="0"
                      />
                      <span className="unit">cm</span>
                    </div>
                  </div>
                  <div className="measurement-item">
                    <label>LEFT FOOT:</label>
                    <div className="measurement-input">
                      <input
                        type="text"
                        value={formData.ascendingCalf.left}
                        onChange={(e) => handleCalfMeasureChange('left', e.target.value)}
                        placeholder="0"
                      />
                      <span className="unit">cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="assessment-row">
              <div className="assessment-header">
                <h3>TINGLING:</h3>
              </div>
              <div className="assessment-content">
                <div className="checkbox-group wide">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.tingling.right}
                      onChange={() => handleCheckboxChange('tingling', 'right')}
                    />
                    <span>Right</span>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.tingling.left}
                      onChange={() => handleCheckboxChange('tingling', 'left')}
                    />
                    <span>Left</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="assessment-row">
              <div className="assessment-header">
                <h3>LEG HAIR</h3>
              </div>
              <div className="assessment-content">
                <div className="assessment-item">
                  <label>PRESENT:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.legHairPresent.right}
                        onChange={() => handleCheckboxChange('legHairPresent', 'right')}
                      />
                      <span>Right</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.legHairPresent.left}
                        onChange={() => handleCheckboxChange('legHairPresent', 'left')}
                      />
                      <span>Left</span>
                    </label>
                  </div>
                </div>
                <div className="assessment-item">
                  <label>ABSENT:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.legHairAbsent.right}
                        onChange={() => handleCheckboxChange('legHairAbsent', 'right')}
                      />
                      <span>Right</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.legHairAbsent.left}
                        onChange={() => handleCheckboxChange('legHairAbsent', 'left')}
                      />
                      <span>Left</span>
                    </label>
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

export default DiabeticFootModal;