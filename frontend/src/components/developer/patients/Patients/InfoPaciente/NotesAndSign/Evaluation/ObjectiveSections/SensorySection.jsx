// components/ObjectiveSections/SensorySection.jsx
import React from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/ObjectiveSections/SensorySection.scss';

const SensorySection = ({ data, onChange }) => {
  // Opciones para los dropdowns
  const normalAbnormalOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Normal', label: 'Normal (N)' },
    { value: 'Abnormal', label: 'Abnormal(AB)' },
    { value: 'Not Tested', label: 'Not Tested (NT)' }
  ];
  
  const handDominanceOptions = [
    { value: '', label: 'Select an option' },
    { value: 'N/A', label: 'N/A' },
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' }
  ];

  // Manejar cambios en los dropdowns
  const handleSelectChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };
  
  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (section, field) => {
    // Inicializar la sección si no existe
    const sectionData = data[section] || {};
    
    // Actualizar el valor del checkbox
    const updatedSection = {
      ...sectionData,
      [field]: !sectionData[field]
    };
    
    onChange({
      ...data,
      [section]: updatedSection
    });
  };

  // Manejar cambios en textarea
  const handleTextChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="sensory-section">
      <h2 className="section-title">Sensory</h2>
      
      <div className="sensory-grid">
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">SKIN:</span>
            <select 
              value={data.skin || ''}
              onChange={(e) => handleSelectChange('skin', e.target.value)}
            >
              {normalAbnormalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">EDEMA:</span>
            <select 
              value={data.edema || ''}
              onChange={(e) => handleSelectChange('edema', e.target.value)}
            >
              {normalAbnormalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">VISION:</span>
            <select 
              value={data.vision || ''}
              onChange={(e) => handleSelectChange('vision', e.target.value)}
            >
              {normalAbnormalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">SENSATION:</span>
            <select 
              value={data.sensation || ''}
              onChange={(e) => handleSelectChange('sensation', e.target.value)}
            >
              {normalAbnormalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">COMMUNICATION:</span>
            <select 
              value={data.communication || ''}
              onChange={(e) => handleSelectChange('communication', e.target.value)}
            >
              {normalAbnormalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">HEARING:</span>
            <select 
              value={data.hearing || ''}
              onChange={(e) => handleSelectChange('hearing', e.target.value)}
            >
              {normalAbnormalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">POSTURE:</span>
            <select 
              value={data.posture || ''}
              onChange={(e) => handleSelectChange('posture', e.target.value)}
            >
              {normalAbnormalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid-item">
            <span className="label">ACTIVITY TOLERANCE:</span>
            <select 
              value={data.activityTolerance || ''}
              onChange={(e) => handleSelectChange('activityTolerance', e.target.value)}
            >
              {normalAbnormalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid-row">
          <div className="grid-item">
            <span className="label">HAND DOMINANCE:</span>
            <select 
              value={data.handDominance || ''}
              onChange={(e) => handleSelectChange('handDominance', e.target.value)}
            >
              {handDominanceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="checkbox-section">
        <div className="checkbox-row">
          <span className="section-label">COGNITION:</span>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="cognitionOriented" 
                checked={data.cognition?.oriented || false}
                onChange={() => handleCheckboxChange('cognition', 'oriented')}
              />
              <label htmlFor="cognitionOriented">Oriented</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="cognitionDisoriented" 
                checked={data.cognition?.disoriented || false}
                onChange={() => handleCheckboxChange('cognition', 'disoriented')}
              />
              <label htmlFor="cognitionDisoriented">Disoriented</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="cognitionConfused" 
                checked={data.cognition?.confused || false}
                onChange={() => handleCheckboxChange('cognition', 'confused')}
              />
              <label htmlFor="cognitionConfused">Confused</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="cognitionForgetful" 
                checked={data.cognition?.forgetful || false}
                onChange={() => handleCheckboxChange('cognition', 'forgetful')}
              />
              <label htmlFor="cognitionForgetful">Forgetful</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="cognitionDepressed" 
                checked={data.cognition?.depressed || false}
                onChange={() => handleCheckboxChange('cognition', 'depressed')}
              />
              <label htmlFor="cognitionDepressed">Depressed</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="cognitionSafetyJudgement" 
                checked={data.cognition?.safetyJudgement || false}
                onChange={() => handleCheckboxChange('cognition', 'safetyJudgement')}
              />
              <label htmlFor="cognitionSafetyJudgement">Safety Judgement</label>
            </div>
          </div>
        </div>
        
        <div className="checkbox-row">
          <span className="section-label">BEHAVIOR/MENTAL STATUS:</span>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="behaviorAlert" 
                checked={data.behavior?.alert || false}
                onChange={() => handleCheckboxChange('behavior', 'alert')}
              />
              <label htmlFor="behaviorAlert">Alert</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="behaviorOriented" 
                checked={data.behavior?.oriented || false}
                onChange={() => handleCheckboxChange('behavior', 'oriented')}
              />
              <label htmlFor="behaviorOriented">Oriented</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="behaviorCooperative" 
                checked={data.behavior?.cooperative || false}
                onChange={() => handleCheckboxChange('behavior', 'cooperative')}
              />
              <label htmlFor="behaviorCooperative">Cooperative</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="behaviorConfused" 
                checked={data.behavior?.confused || false}
                onChange={() => handleCheckboxChange('behavior', 'confused')}
              />
              <label htmlFor="behaviorConfused">Confused</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="behaviorImpairedJudgement" 
                checked={data.behavior?.impairedJudgement || false}
                onChange={() => handleCheckboxChange('behavior', 'impairedJudgement')}
              />
              <label htmlFor="behaviorImpairedJudgement">Impaired Judgement</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="behaviorSTMDeficits" 
                checked={data.behavior?.stmDeficits || false}
                onChange={() => handleCheckboxChange('behavior', 'stmDeficits')}
              />
              <label htmlFor="behaviorSTMDeficits">STM Deficits</label>
            </div>
            
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="behaviorLTMDeficits" 
                checked={data.behavior?.ltmDeficits || false}
                onChange={() => handleCheckboxChange('behavior', 'ltmDeficits')}
              />
              <label htmlFor="behaviorLTMDeficits">LTM Deficits</label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="additional-info-row">
        <span className="label">ADDITIONAL INFORMATION:</span>
        <textarea 
          value={data.additionalInformation || ''}
          onChange={(e) => handleTextChange('additionalInformation', e.target.value)}
          rows={3}
          placeholder="Add any additional information about sensory status"
        />
      </div>
    </div>
  );
};

export default SensorySection;