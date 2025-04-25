// components/standardizedTests/BarthelModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/BarthelModal.scss';

const BarthelModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    feeding: initialData?.feeding || '',
    bathing: initialData?.bathing || '',
    grooming: initialData?.grooming || '',
    dressing: initialData?.dressing || '',
    bowels: initialData?.bowels || '',
    bladder: initialData?.bladder || '',
    toiletUse: initialData?.toiletUse || '',
    transfers: initialData?.transfers || '',
    mobility: initialData?.mobility || '',
    stairs: initialData?.stairs || '',
    totalScore: initialData?.totalScore || 0,
    dependencyLevel: initialData?.dependencyLevel || '',
    isComplete: initialData?.isComplete || false
  });

  // Estado para validación
  const [validationErrors, setValidationErrors] = useState({});

  // Opciones para los campos de selección
  const barthelOptions = {
    feeding: [
      { value: '0', label: '0 - unable' },
      { value: '5', label: '5 - needs help cutting, spreading butter, etc., or requires modified diet' },
      { value: '10', label: '10 - independent' }
    ],
    bathing: [
      { value: '0', label: '0 - dependent' },
      { value: '5', label: '5 - independent (or in shower)' }
    ],
    grooming: [
      { value: '0', label: '0 - needs help with personal care' },
      { value: '5', label: '5 - independent face/hair/teeth/shaving (implements provided)' }
    ],
    dressing: [
      { value: '0', label: '0 - dependent' },
      { value: '5', label: '5 - needs help but can do about half unaided' },
      { value: '10', label: '10 - independent (including buttons, zips, laces, etc.)' }
    ],
    bowels: [
      { value: '0', label: '0 - incontinent (or needs to be given enemas)' },
      { value: '5', label: '5 - occasional accident' },
      { value: '10', label: '10 - continent' }
    ],
    bladder: [
      { value: '0', label: '0 - incontinent, or catheterized and unable to manage alone' },
      { value: '5', label: '5 - occasional accident' },
      { value: '10', label: '10 - continent' }
    ],
    toiletUse: [
      { value: '0', label: '0 - dependent' },
      { value: '5', label: '5 - needs some help but can do something alone' },
      { value: '10', label: '10 - independent (on and off, dressing, wiping)' }
    ],
    transfers: [
      { value: '0', label: '0 - unable, no sitting balance' },
      { value: '5', label: '5 - major help (one or two people, physical), can sit' },
      { value: '10', label: '10 - minor help (verbal or physical)' },
      { value: '15', label: '15 - independent' }
    ],
    mobility: [
      { value: '0', label: '0 - immobile or less than 50 yards' },
      { value: '5', label: '5 - wheelchair independent, including corners, more than 50 yards' },
      { value: '10', label: '10 - walks with help of one person (verbal or physical), more than 50 yards' },
      { value: '15', label: '15 - independent (but may use aid, for example, stick), more than 50 yards' }
    ],
    stairs: [
      { value: '0', label: '0 - unable' },
      { value: '5', label: '5 - needs help (verbal, physical, carrying aid)' },
      { value: '10', label: '10 - independent' }
    ]
  };

  // Calcular el nivel de dependencia basado en la puntuación total
  const calculateDependencyLevel = (score) => {
    if (score <= 20) return 'Total Dependency';
    if (score <= 35) return 'Severe Dependency';
    if (score <= 55) return 'Moderate Dependency';
    if (score <= 90) return 'Slight Dependency';
    return 'Independence';
  };

  // Calcular el total cuando cambian los datos del formulario
  useEffect(() => {
    const feedingPoints = formData.feeding ? parseInt(formData.feeding) : 0;
    const bathingPoints = formData.bathing ? parseInt(formData.bathing) : 0;
    const groomingPoints = formData.grooming ? parseInt(formData.grooming) : 0;
    const dressingPoints = formData.dressing ? parseInt(formData.dressing) : 0;
    const bowelsPoints = formData.bowels ? parseInt(formData.bowels) : 0;
    const bladderPoints = formData.bladder ? parseInt(formData.bladder) : 0;
    const toiletUsePoints = formData.toiletUse ? parseInt(formData.toiletUse) : 0;
    const transfersPoints = formData.transfers ? parseInt(formData.transfers) : 0;
    const mobilityPoints = formData.mobility ? parseInt(formData.mobility) : 0;
    const stairsPoints = formData.stairs ? parseInt(formData.stairs) : 0;

    const total = feedingPoints + bathingPoints + groomingPoints + dressingPoints + 
                 bowelsPoints + bladderPoints + toiletUsePoints + transfersPoints + 
                 mobilityPoints + stairsPoints;
    
    setFormData(prevData => ({
      ...prevData,
      totalScore: total,
      dependencyLevel: calculateDependencyLevel(total)
    }));
  }, [
    formData.feeding,
    formData.bathing,
    formData.grooming,
    formData.dressing,
    formData.bowels,
    formData.bladder,
    formData.toiletUse,
    formData.transfers,
    formData.mobility,
    formData.stairs
  ]);

  // Verificar campos obligatorios
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'feeding',
      'bathing',
      'grooming',
      'dressing',
      'bowels',
      'bladder',
      'toiletUse',
      'transfers',
      'mobility',
      'stairs'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) errors[field] = true;
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar cambios en los campos
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));

    // Borrar error de validación si existe
    if (validationErrors[field]) {
      setValidationErrors(prevErrors => {
        const newErrors = {...prevErrors};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
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
    } else {
      // Resaltar los campos faltantes
      window.scrollTo(0, 0);
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="barthel-modal-overlay">
      <div className="barthel-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-tasks"></i>
            Barthel Index
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="barthel-form">
            <div className="form-section">
              <div className={`form-item ${validationErrors.feeding ? 'has-error' : ''}`}>
                <label>Feeding:</label>
                <div className="options-container">
                  {barthelOptions.feeding.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="feeding"
                        value={option.value}
                        checked={formData.feeding === option.value}
                        onChange={() => handleChange('feeding', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.feeding && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.bathing ? 'has-error' : ''}`}>
                <label>Bathing:</label>
                <div className="options-container">
                  {barthelOptions.bathing.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="bathing"
                        value={option.value}
                        checked={formData.bathing === option.value}
                        onChange={() => handleChange('bathing', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.bathing && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.grooming ? 'has-error' : ''}`}>
                <label>Grooming:</label>
                <div className="options-container">
                  {barthelOptions.grooming.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="grooming"
                        value={option.value}
                        checked={formData.grooming === option.value}
                        onChange={() => handleChange('grooming', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.grooming && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.dressing ? 'has-error' : ''}`}>
                <label>Dressing:</label>
                <div className="options-container">
                  {barthelOptions.dressing.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="dressing"
                        value={option.value}
                        checked={formData.dressing === option.value}
                        onChange={() => handleChange('dressing', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.dressing && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.bowels ? 'has-error' : ''}`}>
                <label>Bowels:</label>
                <div className="options-container">
                  {barthelOptions.bowels.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="bowels"
                        value={option.value}
                        checked={formData.bowels === option.value}
                        onChange={() => handleChange('bowels', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.bowels && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.bladder ? 'has-error' : ''}`}>
                <label>Bladder:</label>
                <div className="options-container">
                  {barthelOptions.bladder.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="bladder"
                        value={option.value}
                        checked={formData.bladder === option.value}
                        onChange={() => handleChange('bladder', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.bladder && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.toiletUse ? 'has-error' : ''}`}>
                <label>Toilet Use:</label>
                <div className="options-container">
                  {barthelOptions.toiletUse.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="toiletUse"
                        value={option.value}
                        checked={formData.toiletUse === option.value}
                        onChange={() => handleChange('toiletUse', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.toiletUse && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.transfers ? 'has-error' : ''}`}>
                <label>Transfers (Bed to Chair and Back):</label>
                <div className="options-container">
                  {barthelOptions.transfers.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="transfers"
                        value={option.value}
                        checked={formData.transfers === option.value}
                        onChange={() => handleChange('transfers', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.transfers && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.mobility ? 'has-error' : ''}`}>
                <label>Mobility (On Level Surfaces):</label>
                <div className="options-container">
                  {barthelOptions.mobility.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="mobility"
                        value={option.value}
                        checked={formData.mobility === option.value}
                        onChange={() => handleChange('mobility', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.mobility && <div className="error-message">Required</div>}
              </div>
              
              <div className={`form-item ${validationErrors.stairs ? 'has-error' : ''}`}>
                <label>Stairs:</label>
                <div className="options-container">
                  {barthelOptions.stairs.map(option => (
                    <label key={option.value} className="radio-container">
                      <input
                        type="radio"
                        name="stairs"
                        value={option.value}
                        checked={formData.stairs === option.value}
                        onChange={() => handleChange('stairs', option.value)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.stairs && <div className="error-message">Required</div>}
              </div>
            </div>
            
            <div className="summary-section">
              <div className="score-card">
                <div className="score-header">
                  <h3>Total Score</h3>
                  <div className="score-badge">{formData.totalScore}/100</div>
                </div>
                <div className="dependency-level">
                  <span className="level-label">Dependency Level:</span>
                  <span className={`level-value ${formData.dependencyLevel.toLowerCase().replace(' ', '-')}`}>
                    {formData.dependencyLevel}
                  </span>
                </div>
                <div className="score-interpretation">
                  <div className="interpretation-row">
                    <span className="range">0-20:</span>
                    <span className="description">Total Dependency</span>
                  </div>
                  <div className="interpretation-row">
                    <span className="range">21-35:</span>
                    <span className="description">Severe Dependency</span>
                  </div>
                  <div className="interpretation-row">
                    <span className="range">36-55:</span>
                    <span className="description">Moderate Dependency</span>
                  </div>
                  <div className="interpretation-row">
                    <span className="range">56-90:</span>
                    <span className="description">Slight Dependency</span>
                  </div>
                  <div className="interpretation-row">
                    <span className="range">91-100:</span>
                    <span className="description">Independence</span>
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

export default BarthelModal;