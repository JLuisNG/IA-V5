// components/standardizedTests/AdvancedBalanceModal.jsx
import React, { useState } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/AdvancedBalanceModal.scss';

const AdvancedBalanceModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    // Sharp-Pursar Test
    sharpPursarTest: initialData?.sharpPursarTest || 'Neg',
    
    // Oculomotor Tests
    smoothPursuit: initialData?.smoothPursuit || 'Neg',
    saccades: initialData?.saccades || 'Neg',
    nystagmusPresent: initialData?.nystagmusPresent || 'Neg',
    
    // Vestibular Tests
    headShakeNystagmus: initialData?.headShakeNystagmus || 'Neg',
    headThrustRight: initialData?.headThrustRight || 'Neg',
    headThrustLeft: initialData?.headThrustLeft || 'Neg',
    
    // Additional Testing
    dynamicVisualAcuity: initialData?.dynamicVisualAcuity || 'Neg',
    linesOfDeficit: initialData?.linesOfDeficit || '',
    gazeStabilizationDeficits: initialData?.gazeStabilizationDeficits || 'No',
    otherTesting: initialData?.otherTesting || '',
    
    // MCTSIB (Modified Clinical Test of Sensory Integration for Balance)
    eyesOpenFirmSurface: initialData?.eyesOpenFirmSurface || '',
    eyesClosedFirmSurface: initialData?.eyesClosedFirmSurface || '',
    eyesOpenCompliantSurface: initialData?.eyesOpenCompliantSurface || '',
    eyesClosedCompliantSurface: initialData?.eyesClosedCompliantSurface || '',
    
    // Additional Scores
    tinettiPOMA: initialData?.tinettiPOMA || '',
    dynamicGait4Step: initialData?.dynamicGait4Step || '',
    dynamicGait8Step: initialData?.dynamicGait8Step || '',
    
    // Additional Fields
    otherBalanceTests: initialData?.otherBalanceTests || '',
    interpretation: initialData?.interpretation || '',
    
    isComplete: initialData?.isComplete || false
  });

  // Opciones para los campos de selección
  const posNegOptions = [
    { value: 'Pos', label: 'Pos' },
    { value: 'Neg', label: 'Neg' }
  ];

  const yesNoOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

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
      // El puntaje no es relevante para esta evaluación
      score: null
    });
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="advanced-balance-modal-overlay">
      <div className="advanced-balance-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-balance-scale-right"></i>
            Advanced Balance
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="assessment-section">
            <div className="section-row">
              <div className="label-column">
                <label>SHARP-PURSAR TEST (CERVICAL INSTABILITY):</label>
              </div>
              <div className="field-column">
                <div className="radio-group">
                  {posNegOptions.map(option => (
                    <div className="radio-option" key={option.value}>
                      <input
                        type="radio"
                        id={`sharpPursar${option.value}`}
                        name="sharpPursarTest"
                        checked={formData.sharpPursarTest === option.value}
                        onChange={() => handleChange('sharpPursarTest', option.value)}
                      />
                      <label htmlFor={`sharpPursar${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="dual-column-section">
              <div className="column">
                <h3>OCULOMOTOR</h3>
                
                <div className="test-row">
                  <label>SMOOTH PURSUIT:</label>
                  <div className="radio-group">
                    {posNegOptions.map(option => (
                      <div className="radio-option" key={option.value}>
                        <input
                          type="radio"
                          id={`smoothPursuit${option.value}`}
                          name="smoothPursuit"
                          checked={formData.smoothPursuit === option.value}
                          onChange={() => handleChange('smoothPursuit', option.value)}
                        />
                        <label htmlFor={`smoothPursuit${option.value}`}>{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="test-row">
                  <label>SACCADES:</label>
                  <div className="radio-group">
                    {posNegOptions.map(option => (
                      <div className="radio-option" key={option.value}>
                        <input
                          type="radio"
                          id={`saccades${option.value}`}
                          name="saccades"
                          checked={formData.saccades === option.value}
                          onChange={() => handleChange('saccades', option.value)}
                        />
                        <label htmlFor={`saccades${option.value}`}>{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="test-row">
                  <label>NYSTAGMUS PRESENT:</label>
                  <div className="radio-group">
                    {posNegOptions.map(option => (
                      <div className="radio-option" key={option.value}>
                        <input
                          type="radio"
                          id={`nystagmusPresent${option.value}`}
                          name="nystagmusPresent"
                          checked={formData.nystagmusPresent === option.value}
                          onChange={() => handleChange('nystagmusPresent', option.value)}
                        />
                        <label htmlFor={`nystagmusPresent${option.value}`}>{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="column">
                <h3>VESTIBULAR</h3>
                
                <div className="test-row">
                  <label>HEAD SHAKE NYSTAGMUS:</label>
                  <div className="radio-group">
                    {posNegOptions.map(option => (
                      <div className="radio-option" key={option.value}>
                        <input
                          type="radio"
                          id={`headShakeNystagmus${option.value}`}
                          name="headShakeNystagmus"
                          checked={formData.headShakeNystagmus === option.value}
                          onChange={() => handleChange('headShakeNystagmus', option.value)}
                        />
                        <label htmlFor={`headShakeNystagmus${option.value}`}>{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="test-row">
                  <label>HEAD THRUST (R):</label>
                  <div className="radio-group">
                    {posNegOptions.map(option => (
                      <div className="radio-option" key={option.value}>
                        <input
                          type="radio"
                          id={`headThrustRight${option.value}`}
                          name="headThrustRight"
                          checked={formData.headThrustRight === option.value}
                          onChange={() => handleChange('headThrustRight', option.value)}
                        />
                        <label htmlFor={`headThrustRight${option.value}`}>{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="test-row">
                  <label>HEAD THRUST (L):</label>
                  <div className="radio-group">
                    {posNegOptions.map(option => (
                      <div className="radio-option" key={option.value}>
                        <input
                          type="radio"
                          id={`headThrustLeft${option.value}`}
                          name="headThrustLeft"
                          checked={formData.headThrustLeft === option.value}
                          onChange={() => handleChange('headThrustLeft', option.value)}
                        />
                        <label htmlFor={`headThrustLeft${option.value}`}>{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="section-row">
              <div className="label-column">
                <label>DYNAMIC VISUAL ACUITY (DVA):</label>
              </div>
              <div className="field-column">
                <div className="radio-group">
                  {posNegOptions.map(option => (
                    <div className="radio-option" key={option.value}>
                      <input type="radio"
                        id={`dynamicVisualAcuity${option.value}`}
                        name="dynamicVisualAcuity"
                        checked={formData.dynamicVisualAcuity === option.value}
                        onChange={() => handleChange('dynamicVisualAcuity', option.value)}
                      />
                      <label htmlFor={`dynamicVisualAcuity${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="field-column">
                <label>LINES OF DEFICIT:</label>
                <input
                  type="text"
                  value={formData.linesOfDeficit}
                  onChange={(e) => handleChange('linesOfDeficit', e.target.value)}
                  placeholder="0-2 lines indicates vestibular Hypo function"
                />
              </div>
            </div>
            
            <div className="section-row">
              <div className="label-column">
                <label>DOES OCULOMOTOR AND VESTIBULAR TESTING INDICATE GAZE STABILIZATION DEFICITS?</label>
              </div>
              <div className="field-column">
                <div className="radio-group">
                  {yesNoOptions.map(option => (
                    <div className="radio-option" key={option.value}>
                      <input
                        type="radio"
                        id={`gazeStabilizationDeficits${option.value}`}
                        name="gazeStabilizationDeficits"
                        checked={formData.gazeStabilizationDeficits === option.value}
                        onChange={() => handleChange('gazeStabilizationDeficits', option.value)}
                      />
                      <label htmlFor={`gazeStabilizationDeficits${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="section-row">
              <div className="label-column">
                <label>OTHER TESTING:</label>
              </div>
              <div className="field-column">
                <textarea
                  value={formData.otherTesting}
                  onChange={(e) => handleChange('otherTesting', e.target.value)}
                  rows={4}
                  placeholder="Describe any other tests performed"
                ></textarea>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <h3 className="section-title">MODIFIED CLINICAL TEST OF SENSORY INTEGRATION FOR BALANCE (MCTSIB)</h3>
            
            <div className="mctsib-grid">
              <div className="mctsib-row">
                <div className="test-label">
                  <label>EYES OPEN-FIRM SURFACE (EO/FS):</label>
                </div>
                <div className="test-input">
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.eyesOpenFirmSurface}
                      onChange={(e) => handleChange('eyesOpenFirmSurface', e.target.value)}
                      placeholder=""
                    />
                    <span className="unit">/ 30 sec</span>
                  </div>
                </div>
                <div className="test-label">
                  <label>TINETTI (POMA):</label>
                </div>
                <div className="test-input">
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.tinettiPOMA}
                      onChange={(e) => handleChange('tinettiPOMA', e.target.value)}
                      placeholder=""
                    />
                    <span className="unit">/ 28</span>
                  </div>
                </div>
              </div>
              
              <div className="mctsib-row">
                <div className="test-label">
                  <label>EYES CLOSED-FIRM SURFACE (EC/FS):</label>
                </div>
                <div className="test-input">
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.eyesClosedFirmSurface}
                      onChange={(e) => handleChange('eyesClosedFirmSurface', e.target.value)}
                      placeholder=""
                    />
                    <span className="unit">/ 30 sec</span>
                  </div>
                </div>
                <div className="test-label">
                  <label>DYNAMIC GAIT (DGI) 4 STEP:</label>
                </div>
                <div className="test-input">
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.dynamicGait4Step}
                      onChange={(e) => handleChange('dynamicGait4Step', e.target.value)}
                      placeholder=""
                    />
                    <span className="unit">/ 12</span>
                  </div>
                </div>
              </div>
              
              <div className="mctsib-row">
                <div className="test-label">
                  <label>EYES OPEN-COMPLIANT SURFACE (EO/CS):</label>
                </div>
                <div className="test-input">
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.eyesOpenCompliantSurface}
                      onChange={(e) => handleChange('eyesOpenCompliantSurface', e.target.value)}
                      placeholder=""
                    />
                    <span className="unit">/ 30 sec</span>
                  </div>
                </div>
                <div className="test-label">
                  <label>DYNAMIC GAIT (DGI) 8 STEP:</label>
                </div>
                <div className="test-input">
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.dynamicGait8Step}
                      onChange={(e) => handleChange('dynamicGait8Step', e.target.value)}
                      placeholder=""
                    />
                    <span className="unit">/ 24</span>
                  </div>
                </div>
              </div>
              
              <div className="mctsib-row single-row">
                <div className="test-label">
                  <label>EYES CLOSED-COMPLIANT SURFACE (EC/CS):</label>
                </div>
                <div className="test-input">
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.eyesClosedCompliantSurface}
                      onChange={(e) => handleChange('eyesClosedCompliantSurface', e.target.value)}
                      placeholder=""
                    />
                    <span className="unit">/ 30 sec</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="section-row">
              <div className="label-column">
                <label>OTHER BALANCE TESTS:</label>
              </div>
              <div className="field-column">
                <textarea
                  value={formData.otherBalanceTests}
                  onChange={(e) => handleChange('otherBalanceTests', e.target.value)}
                  rows={4}
                  placeholder="Describe any other balance tests performed"
                ></textarea>
              </div>
            </div>
            
            <div className="section-row">
              <div className="label-column">
                <label>INTERPRETATION OF STANDARDIZED TESTING AND IMPACT OF FUNCTION:</label>
              </div>
              <div className="field-column">
                <textarea
                  value={formData.interpretation}
                  onChange={(e) => handleChange('interpretation', e.target.value)}
                  rows={4}
                  placeholder="Provide interpretation of test results and impact on function"
                ></textarea>
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

export default AdvancedBalanceModal;