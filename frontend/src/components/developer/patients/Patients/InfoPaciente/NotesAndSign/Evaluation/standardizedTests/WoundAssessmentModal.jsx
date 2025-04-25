// components/standardizedTests/WoundAssessmentModal.jsx
import React, { useState } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/WoundAssessmentModal.scss';

const WoundAssessmentModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    objective: initialData?.objective || '',
    border: initialData?.border || 'Irregular',
    colorOfWoundBed: initialData?.colorOfWoundBed || 'Irregular',
    odor: initialData?.odor || 'Purulent',
    
    drainage: {
      type: initialData?.drainage?.type || '',
      quantity: initialData?.drainage?.quantity || ''
    },
    
    measurements: {
      length: initialData?.measurements?.length || '',
      width: initialData?.measurements?.width || '',
      depth: initialData?.measurements?.depth || '',
      tunneling: initialData?.measurements?.tunneling || ''
    },
    
    granulationTissue: initialData?.granulationTissue || '',
    treatmentPerformed: initialData?.treatmentPerformed || '',
    
    planOfCare: {
      preventInfection: initialData?.planOfCare?.preventInfection || false,
      woundClosureBy: initialData?.planOfCare?.woundClosureBy || '',
      increaseGranulationBy: initialData?.planOfCare?.increaseGranulationBy || ''
    },
    
    additionalInformation: initialData?.additionalInformation || '',
    isComplete: initialData?.isComplete || false
  });

  // Opciones para los selectores
  const borderOptions = ['Irregular', 'Red', 'White', 'Necrotic', 'Tunneling', 'Other (Explain)'];
  const colorOptions = ['Irregular', 'Red', 'White', 'Necrotic', 'Tunneling', 'Other (Explain)'];
  const odorOptions = ['Purulent', 'Pseudomonas', 'None'];

  // Manejar cambios en los campos de texto
  const handleTextChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Manejar cambios en los selectores
  const handleSelectChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Manejar cambios en campos anidados
  const handleNestedChange = (parentField, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [parentField]: {
        ...prevData[parentField],
        [field]: value
      }
    }));
  };

  // Manejar cambio en checkbox
  const handleCheckboxChange = (parentField, field) => {
    setFormData(prevData => ({
      ...prevData,
      [parentField]: {
        ...prevData[parentField],
        [field]: !prevData[parentField][field]
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
    <div className="wound-assessment-modal-overlay">
      <div className="wound-assessment-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-band-aid"></i>
            Wound Assessment
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="assessment-form">
            <div className="form-group">
              <label>OBJECTIVE:</label>
              <textarea
                value={formData.objective}
                onChange={(e) => handleTextChange('objective', e.target.value)}
                placeholder="Enter objective wound assessment"
                rows={4}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>BORDER:</label>
                <select
                  value={formData.border}
                  onChange={(e) => handleSelectChange('border', e.target.value)}
                >
                  {borderOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>COLOR OF WOUND BED:</label>
                <select
                  value={formData.colorOfWoundBed}
                  onChange={(e) => handleSelectChange('colorOfWoundBed', e.target.value)}
                >
                  {colorOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>ODOR:</label>
                <select
                  value={formData.odor}
                  onChange={(e) => handleSelectChange('odor', e.target.value)}
                >
                  {odorOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>GRANULATION TISSUE PRESENT:</label>
                <div className="input-with-unit">
                  <input
                    type="text"
                    value={formData.granulationTissue}
                    onChange={(e) => handleTextChange('granulationTissue', e.target.value)}
                    placeholder="0"
                  />
                  <span className="unit">%</span>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>DRAINAGE</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>TYPE:</label>
                  <input
                    type="text"
                    value={formData.drainage.type}
                    onChange={(e) => handleNestedChange('drainage', 'type', e.target.value)}
                    placeholder="Enter drainage type"
                  />
                </div>
                
                <div className="form-group">
                  <label>QUANTITY:</label>
                  <input
                    type="text"
                    value={formData.drainage.quantity}
                    onChange={(e) => handleNestedChange('drainage', 'quantity', e.target.value)}
                    placeholder="Enter quantity"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>MEASUREMENTS</h3>
              <div className="measurements-grid">
                <div className="form-group">
                  <label>LENGTH:</label>
                  <input
                    type="text"
                    value={formData.measurements.length}
                    onChange={(e) => handleNestedChange('measurements', 'length', e.target.value)}
                    placeholder="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>WIDTH:</label>
                  <input
                    type="text"
                    value={formData.measurements.width}
                    onChange={(e) => handleNestedChange('measurements', 'width', e.target.value)}
                    placeholder="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>DEPTH:</label>
                  <input
                    type="text"
                    value={formData.measurements.depth}
                    onChange={(e) => handleNestedChange('measurements', 'depth', e.target.value)}
                    placeholder="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>TUNNELING:</label>
                  <input
                    type="text"
                    value={formData.measurements.tunneling}
                    onChange={(e) => handleNestedChange('measurements', 'tunneling', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>TREATMENT PERFORMED TODAY:</label>
              <textarea
                value={formData.treatmentPerformed}
                onChange={(e) => handleTextChange('treatmentPerformed', e.target.value)}
                placeholder="Describe treatment performed"
                rows={4}
              />
            </div>
            
            <div className="form-section">
              <h3>PLAN OF CARE</h3>
              <div className="form-row align-center">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.planOfCare.preventInfection}
                      onChange={() => handleCheckboxChange('planOfCare', 'preventInfection')}
                    />
                    <span>PREVENT INFECTION:</span>
                  </label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>WOUND CLOSURE BY:</label>
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.planOfCare.woundClosureBy}
                      onChange={(e) => handleNestedChange('planOfCare', 'woundClosureBy', e.target.value)}
                      placeholder="0"
                    />
                    <span className="unit">%</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>INCREASE GRANULATION BY:</label>
                  <div className="input-with-unit">
                    <input
                      type="text"
                      value={formData.planOfCare.increaseGranulationBy}
                      onChange={(e) => handleNestedChange('planOfCare', 'increaseGranulationBy', e.target.value)}
                      placeholder="0"
                    />
                    <span className="unit">%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>ADDITIONAL WOUND POC INFORMATION:</label>
              <textarea
                value={formData.additionalInformation}
                onChange={(e) => handleTextChange('additionalInformation', e.target.value)}
                placeholder="Enter additional information"
                rows={4}
              />
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

export default WoundAssessmentModal;