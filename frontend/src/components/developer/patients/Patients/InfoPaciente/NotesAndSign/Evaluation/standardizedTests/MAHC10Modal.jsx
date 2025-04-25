// components/standardizedTests/MAHC10Modal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/MAHC10Modal.scss';

const MAHC10Modal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    age65Plus: initialData?.age65Plus || 'No',
    threeOrMoreDiagnoses: initialData?.threeOrMoreDiagnoses || 'No',
    fallHistory: initialData?.fallHistory || 'No',
    incontinence: initialData?.incontinence || 'No',
    visualImpairment: initialData?.visualImpairment || 'No',
    impairedFunctionalMobility: initialData?.impairedFunctionalMobility || 'No',
    environmentalHazards: initialData?.environmentalHazards || 'No',
    polyPharmacy: initialData?.polyPharmacy || 'No',
    painAffectingFunction: initialData?.painAffectingFunction || 'No',
    cognitiveImpairment: initialData?.cognitiveImpairment || 'No',
    totalScore: initialData?.totalScore || 0,
    isComplete: initialData?.isComplete || false
  });

  // Opciones para los campos de selección
  const yesNoOptions = [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' }
  ];

  // Calcular la puntuación total cuando cambian los datos del formulario
  useEffect(() => {
    let total = 0;
    
    // Cada "Yes" suma 1 punto
    Object.keys(formData).forEach(key => {
      if (key !== 'totalScore' && key !== 'isComplete' && formData[key] === 'Yes') {
        total += 1;
      }
    });
    
    setFormData(prevData => ({
      ...prevData,
      totalScore: total
    }));
  }, [
    formData.age65Plus,
    formData.threeOrMoreDiagnoses,
    formData.fallHistory,
    formData.incontinence,
    formData.visualImpairment,
    formData.impairedFunctionalMobility,
    formData.environmentalHazards,
    formData.polyPharmacy,
    formData.painAffectingFunction,
    formData.cognitiveImpairment
  ]);

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
      score: formData.totalScore
    });
  };

  // Obtener nivel de riesgo basado en la puntuación total
  const getRiskLevel = () => {
    if (formData.totalScore >= 4) return 'High Fall Risk';
    return 'Low Fall Risk';
  };

  // Obtener clase CSS basada en el nivel de riesgo
  const getRiskClass = () => {
    if (formData.totalScore >= 4) return 'high-risk';
    return 'low-risk';
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="mahc10-modal-overlay">
      <div className="mahc10-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-clipboard-check"></i>
            MAHC10 - Missouri Alliance for Home Care
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="instructions-panel">
            <p>Information may be gathered from medical record, assessment and if applicable, the patient/caregiver.</p>
            <p>Beyond protocols listed below, scoring should be based on your clinical judgment.</p>
          </div>
          
          <div className="assessment-grid">
            <div className="assessment-item">
              <div className="item-label">AGE 65+:</div>
              <div className="item-field">
                <select 
                  value={formData.age65Plus}
                  onChange={(e) => handleChange('age65Plus', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">IMPAIRED FUNCTIONAL MOBILITY:</div>
              <div className="item-field">
                <select 
                  value={formData.impairedFunctionalMobility}
                  onChange={(e) => handleChange('impairedFunctionalMobility', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">DIAGNOSIS (3 OR MORE CO-EXISTING):</div>
              <div className="item-field">
                <select 
                  value={formData.threeOrMoreDiagnoses}
                  onChange={(e) => handleChange('threeOrMoreDiagnoses', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">ENVIRONMENTAL HAZARDS:</div>
              <div className="item-field">
                <select 
                  value={formData.environmentalHazards}
                  onChange={(e) => handleChange('environmentalHazards', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">PRIOR HISTORY OF FALLS WITHIN 3 MONTHS:</div>
              <div className="item-field">
                <select 
                  value={formData.fallHistory}
                  onChange={(e) => handleChange('fallHistory', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">POLY PHARMACY (4 OR MORE PRESCRIPTIONS - ANY TYPE):</div>
              <div className="item-field">
                <select 
                  value={formData.polyPharmacy}
                  onChange={(e) => handleChange('polyPharmacy', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">INCONTINENCE:</div>
              <div className="item-field">
                <select value={formData.incontinence}
                  onChange={(e) => handleChange('incontinence', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">PAIN AFFECTING LEVEL OF FUNCTION:</div>
              <div className="item-field">
                <select 
                  value={formData.painAffectingFunction}
                  onChange={(e) => handleChange('painAffectingFunction', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">VISUAL IMPAIRMENT:</div>
              <div className="item-field">
                <select 
                  value={formData.visualImpairment}
                  onChange={(e) => handleChange('visualImpairment', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="assessment-item">
              <div className="item-label">COGNITIVE IMPAIRMENT:</div>
              <div className="item-field">
                <select 
                  value={formData.cognitiveImpairment}
                  onChange={(e) => handleChange('cognitiveImpairment', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="total-score-section">
            <div className={`score-card ${getRiskClass()}`}>
              <div className="score-header">
                <h3>TOTAL: {formData.totalScore} out of 10</h3>
              </div>
              <div className="score-content">
                <div className="risk-indicator">
                  <div className="indicator-label">Fall Risk Level:</div>
                  <div className="indicator-value">{getRiskLevel()}</div>
                </div>
                <div className="risk-scale">
                  <div className="scale-bar">
                    <div className="scale-segments">
                      <div className="segment low">0-3</div>
                      <div className="segment high">4-10</div>
                    </div>
                    <div className="pointer" style={{ left: `${Math.min(100, (formData.totalScore / 10) * 100)}%` }}></div>
                  </div>
                </div>
                <div className="interpretation">
                  <ul>
                    <li><strong>Score of 4 or more</strong> - Implement fall prevention interventions</li>
                    <li><strong>Score of 0-3</strong> - Continue to monitor and reassess as needed</li>
                  </ul>
                  <div className="note">
                    <i className="fas fa-info-circle"></i>
                    <p>This tool is to be used in conjunction with your agency's fall prevention program and clinical judgment.</p>
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

export default MAHC10Modal;