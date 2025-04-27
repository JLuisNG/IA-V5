// components/ObjectiveSections/ProstheticOrthoticSection.jsx
import React, { useState } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/ObjectiveSections/ProstheticOrthoticSection.scss';

const ProstheticOrthoticSection = ({ data, onChange }) => {
  // Estados para la lista de prótesis y órtesis
  const [prostheticsList, setProstheticsList] = useState(data.prosthetics || []);
  const [orthoticsList, setOrthoticsList] = useState(data.orthotics || []);
  
  // Estados para elementos en edición
  const [newProsthetic, setNewProsthetic] = useState({
    type: 'AKA (Above Knee)',
    usage: 'Both',
    notes: ''
  });
  
  const [newOrthotic, setNewOrthotic] = useState({
    type: 'AFO (Ankle/Foot Orthosis)',
    usage: 'Donning/Doffing',
    notes: ''
  });
  
  // Opciones para los dropdowns
  const prostheticTypes = [
    { value: 'AKA (Above Knee)', label: 'AKA (Above Knee)' },
    { value: 'BKA (Below Knee)', label: 'BKA (Below Knee)' }
  ];
  
  const orthoticTypes = [
    { value: 'AFO (Ankle/Foot Orthosis)', label: 'AFO (Ankle/Foot Orthosis)' },
    { value: 'KAFO (Knee/Ankle/Foot Orthosis)', label: 'KAFO (Knee/Ankle/Foot Orthosis)' },
    { value: 'HKAFO (Hip/Knee/Ankle/Foot Orthosis)', label: 'HKAFO (Hip/Knee/Ankle/Foot Orthosis)' },
    { value: 'LSO (Lumbar/Sacral Orthosis)', label: 'LSO (Lumbar/Sacral Orthosis)' },
    { value: 'RGO (Reciprocating Gait Orthosis)', label: 'RGO (Reciprocating Gait Orthosis)' },
    { value: 'TLSO (Thoraco/Lumbar/Sacral Orthosis)', label: 'TLSO (Thoraco/Lumbar/Sacral Orthosis)' },
    { value: 'WHO (Wrist/Hand Orthosis)', label: 'WHO (Wrist/Hand Orthosis)' },
    { value: 'Swedish Knee Cage', label: 'Swedish Knee Cage' }
  ];
  
  const usageTypes = [
    { value: 'Donning/Doffing', label: 'Donning/Doffing' },
    { value: 'Evaluation', label: 'Evaluation' },
    { value: 'Both', label: 'Both' }
  ];
  
  // Manejar cambios en los campos de nueva prótesis
  const handleProstheticChange = (field, value) => {
    setNewProsthetic(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Manejar cambios en los campos de nueva órtesis
  const handleOrthoticChange = (field, value) => {
    setNewOrthotic(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Añadir una nueva prótesis
  const handleAddProsthetic = () => {
    const updatedProsthetics = [...prostheticsList, { ...newProsthetic, id: Date.now() }];
    setProstheticsList(updatedProsthetics);
    onChange({
      ...data,
      prosthetics: updatedProsthetics
    });
    
    // Resetear a valores por defecto
    setNewProsthetic({
      type: 'AKA (Above Knee)',
      usage: 'Both',
      notes: ''
    });
  };
  
  // Añadir una nueva órtesis
  const handleAddOrthotic = () => {
    const updatedOrthotics = [...orthoticsList, { ...newOrthotic, id: Date.now() }];
    setOrthoticsList(updatedOrthotics);
    onChange({
      ...data,
      orthotics: updatedOrthotics
    });
    
    // Resetear a valores por defecto
    setNewOrthotic({
      type: 'AFO (Ankle/Foot Orthosis)',
      usage: 'Donning/Doffing',
      notes: ''
    });
  };
  
  // Eliminar una prótesis
  const handleRemoveProsthetic = (id) => {
    const updatedProsthetics = prostheticsList.filter(item => item.id !== id);
    setProstheticsList(updatedProsthetics);
    onChange({
      ...data,
      prosthetics: updatedProsthetics
    });
  };
  
  // Eliminar una órtesis
  const handleRemoveOrthotic = (id) => {
    const updatedOrthotics = orthoticsList.filter(item => item.id !== id);
    setOrthoticsList(updatedOrthotics);
    onChange({
      ...data,
      orthotics: updatedOrthotics
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
    <div className="prosthetic-orthotic-section">
      <h2 className="section-title">Prosthetic And Orthotic (Optional)</h2>
      
      <div className="content-grid">
        <div className="prosthetic-column">
          <h3 className="column-title">PROSTHETIC</h3>
          
          <div className="prosthetic-list">
            {prostheticsList.map((item, index) => (
              <div className="item-row" key={item.id || index}>
                <div className="item-details">
                  <span className="item-type">{item.type}</span>
                  <span className="item-usage">{item.usage}</span>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveProsthetic(item.id)}
                  title="Remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="add-item-section">
            <div className="dropdown-row">
              <select 
                value={newProsthetic.type}
                onChange={(e) => handleProstheticChange('type', e.target.value)}
                className="type-dropdown"
              >
                {prostheticTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <select 
                value={newProsthetic.usage}
                onChange={(e) => handleProstheticChange('usage', e.target.value)}
                className="usage-dropdown"
              >
                {usageTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <button 
                className="remove-field-btn"
                title="Clear Field"
                onClick={() => setNewProsthetic({
                  type: 'AKA (Above Knee)',
                  usage: 'Both',
                  notes: ''
                })}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <button 
              className="add-btn"
              onClick={handleAddProsthetic}
            >
              <i className="fas fa-plus"></i>
              <span>ADD PROSTHETIC</span>
            </button>
          </div>
        </div>

        <div className="orthotic-column">
          <h3 className="column-title">ORTHOTIC</h3>
          
          <div className="orthotic-list">
            {orthoticsList.map((item, index) => (
              <div className="item-row" key={item.id || index}>
                <div className="item-details">
                  <span className="item-type">{item.type}</span>
                  <span className="item-usage">{item.usage}</span>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveOrthotic(item.id)}
                  title="Remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="add-item-section">
            <div className="dropdown-row">
              <select 
                value={newOrthotic.type}
                onChange={(e) => handleOrthoticChange('type', e.target.value)}
                className="type-dropdown"
              >
                {orthoticTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <select 
                value={newOrthotic.usage}
                onChange={(e) => handleOrthoticChange('usage', e.target.value)}
                className="usage-dropdown"
              >
                {usageTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <button 
                className="remove-field-btn"
                title="Clear Field"
                onClick={() => setNewOrthotic({
                  type: 'AFO (Ankle/Foot Orthosis)',
                  usage: 'Donning/Doffing',
                  notes: ''
                })}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <button 
              className="add-btn"
              onClick={handleAddOrthotic}
            >
              <i className="fas fa-plus"></i>
              <span>ADD ORTHOTIC</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="additional-info-row">
        <span className="label">ADDITIONAL INFORMATION:</span>
        <textarea 
          value={data.additionalInformation || ''}
          onChange={(e) => handleTextChange('additionalInformation', e.target.value)}
          rows={3}
          placeholder="Add any additional information about prosthetics or orthotics"
        />
      </div>
    </div>
  );
};

export default ProstheticOrthoticSection;