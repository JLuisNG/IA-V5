// components/standardizedTests/BradenScaleModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/BradenScaleModal.scss';

const BradenScaleModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    sensoryPerception: initialData?.sensoryPerception || '',
    moisture: initialData?.moisture || '',
    activity: initialData?.activity || '',
    mobility: initialData?.mobility || '',
    nutrition: initialData?.nutrition || '',
    frictionAndShear: initialData?.frictionAndShear || '',
    totalScore: initialData?.totalScore || 0,
    riskLevel: initialData?.riskLevel || '',
    isComplete: initialData?.isComplete || false
  });

  // Estado para validación
  const [validationErrors, setValidationErrors] = useState({});

  // Opciones para los campos de selección
  const bradenOptions = {
    sensoryPerception: [
      { value: '1', label: '1 - Completely Limited', description: 'Unresponsive (does not moan, flinch, or grasp) to painful stimuli, due to diminished level of consciousness or sedation. OR Has a sensory impairment which limits the ability to feel pain or discomfort over most of body surface.' },
      { value: '2', label: '2 - Very Limited', description: 'Responds only to painful stimuli. Cannot communicate discomfort except by moaning or restlessness. OR Has a sensory impairment which limits the ability to feel pain or discomfort over 1/2 of body.' },
      { value: '3', label: '3 - Slightly Limited', description: 'Responds to verbal commands but cannot always communicate discomfort or need to be turned. OR Has some sensory impairment which limits the ability to feel pain or discomfort in 1 or 2 extremities.' },
      { value: '4', label: '4 - No Impairment', description: 'Responds to verbal commands. Has no sensory deficit which would limit ability to feel or voice pain or discomfort.' }
    ],
    moisture: [
      { value: '1', label: '1 - Constantly Moist', description: 'Skin is kept moist almost constantly by perspiration, urine, etc. Dampness is detected every time patient is moved or turned.' },
      { value: '2', label: '2 - Often Moist', description: 'Skin is often but not always moist. Linen must be changed at least once a shift.' },
      { value: '3', label: '3 - Occasionally Moist', description: 'Skin is occasionally moist, requiring an extra linen change approximately once a day.' },
      { value: '4', label: '4 - Rarely Moist', description: 'Skin is usually dry; linen requires changing only at routine intervals.' }
    ],
    activity: [
      { value: '1', label: '1 - Bedfast', description: 'Confined to bed.' },
      { value: '2', label: '2 - Chairfast', description: 'Ability to walk severely limited or nonexistent. Cannot bear own weight and/or must be assisted into chair or wheelchair.' },
      { value: '3', label: '3 - Walks Occasionally', description: 'Walks occasionally during day, but for very short distances, with or without assistance. Spends majority of each shift in bed or chair.' },
      { value: '4', label: '4 - Walks Frequently', description: 'Walks outside the room at least twice a day and inside room at least once every 2 hours during waking hours.' }
    ],
    mobility: [
      { value: '1', label: '1 - Completely Immobile', description: 'Does not make even slight changes in body or extremity position without assistance.' },
      { value: '2', label: '2 - Very Limited', description: 'Makes occasional slight changes in body or extremity position but unable to make frequent or significant changes independently.' },
      { value: '3', label: '3 - Slightly Limited', description: 'Makes frequent though slight changes in body or extremity position independently.' },
      { value: '4', label: '4 - No Limitations', description: 'Makes major and frequent changes in position without assistance.' }
    ],
    nutrition: [
      { value: '1', label: '1 - Very Poor', description: 'Never eats a complete meal. Rarely eats more than 1/3 of any food offered. Eats 2 servings or less of protein (meat or dairy products) per day. Takes fluids poorly. Does not take a liquid dietary supplement. OR Is NPO and/or maintained on clear liquids or IVs for more than 5 days.' },
      { value: '2', label: '2 - Probably Inadequate', description: 'Rarely eats a complete meal and generally eats only about 1/2 of any food offered. Protein intake includes only 3 servings of meat or dairy products per day. Occasionally will take a dietary supplement. OR Receives less than optimum amount of liquid diet or tube feeding.' },
      { value: '3', label: '3 - Adequate', description: 'Eats over half of most meals. Eats a total of 4 servings of protein (meat, dairy products) each day. Occasionally will refuse a meal, but will usually take a supplement if offered. OR Is on a tube feeding or TPN regimen, which probably meets most of nutritional needs.' },
      { value: '4', label: '4 - Excellent', description: 'Eats most of every meal. Never refuses a meal. Usually eats a total of 4 or more servings of meat and dairy products. Occasionally eats between meals. Does not require supplementation.' }
    ],
    frictionAndShear: [
      { value: '1', label: '1 - Problem', description: 'Requires moderate to maximum assistance in moving. Complete lifting without sliding against sheets is impossible. Frequently slides down in bed or chair, requiring frequent repositioning with maximum assistance. Spasticity, contractures, or agitation leads to almost constant friction.' },
      { value: '2', label: '2 - Potential Problem', description: 'Moves feebly or requires minimum assistance. During a move, skin probably slides to some extent against sheets, chair, restraints, or other devices. Maintains relatively good position in chair or bed most of the time but occasionally slides down.' },
      { value: '3', label: '3 - No Apparent Problem', description: 'Moves in bed and in chair independently and has sufficient muscle strength to lift up completely during move. Maintains good position in bed or chair at all times.' }
    ]
  };

  // Calcular el nivel de riesgo basado en la puntuación total
  const calculateRiskLevel = (score) => {
    if (score <= 9) return 'Very High Risk';
    if (score <= 12) return 'High Risk';
    if (score <= 14) return 'Moderate Risk';
    if (score <= 18) return 'Mild Risk';
    return 'No Risk';
  };

  // Calcular el total cuando cambian los datos del formulario
  useEffect(() => {
    const sensoryPerceptionPoints = formData.sensoryPerception ? parseInt(formData.sensoryPerception) : 0;
    const moisturePoints = formData.moisture ? parseInt(formData.moisture) : 0;
    const activityPoints = formData.activity ? parseInt(formData.activity) : 0;
    const mobilityPoints = formData.mobility ? parseInt(formData.mobility) : 0;
    const nutritionPoints = formData.nutrition ? parseInt(formData.nutrition) : 0;
    const frictionAndShearPoints = formData.frictionAndShear ? parseInt(formData.frictionAndShear) : 0;

    const total = sensoryPerceptionPoints + moisturePoints + activityPoints + mobilityPoints + nutritionPoints + frictionAndShearPoints;
    
    setFormData(prevData => ({
      ...prevData,
      totalScore: total,
      riskLevel: calculateRiskLevel(total)
    }));
  }, [
    formData.sensoryPerception,
    formData.moisture,
    formData.activity,
    formData.mobility,
    formData.nutrition,
    formData.frictionAndShear
  ]);

  // Verificar campos obligatorios
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'sensoryPerception',
      'moisture',
      'activity',
      'mobility',
      'nutrition',
      'frictionAndShear'
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
    <div className="braden-scale-modal-overlay">
      <div className="braden-scale-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-clipboard-check"></i>
            Braden Scale
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="braden-table">
            <div className="table-header">
              <div className="risk-factor-col">RISK FACTOR</div>
              <div className="score-description-col">SCORE/DESCRIPTION</div>
            </div>
            
            <div className="table-row">
              <div className="risk-factor-col">
                <h3>Sensory Perception</h3>
                <p>Ability to respond meaningfully to pressure-related discomfort</p>
              </div>
              <div className="score-description-col">
                <div className={`score-options ${validationErrors.sensoryPerception ? 'has-error' : ''}`}>
                  {bradenOptions.sensoryPerception.map(option => (
                    <div className="score-option" key={option.value}>
                      <label className="radio-container">
                        <input
                          type="radio"
                          name="sensoryPerception"
                          value={option.value}
                          checked={formData.sensoryPerception === option.value}
                          onChange={() => handleChange('sensoryPerception', option.value)}
                        />
                        <span className="checkmark"></span>
                        <div className="option-content">
                          <div className="option-title">{option.label}</div>
                          <div className="option-description">{option.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {validationErrors.sensoryPerception && (
                  <div className="error-message">This field is required</div>
                )}
              </div>
            </div>
            
            <div className="table-row">
              <div className="risk-factor-col">
                <h3>Moisture</h3>
                <p>Degree to which skin is exposed to moisture</p>
              </div>
              <div className="score-description-col">
                <div className={`score-options ${validationErrors.moisture ? 'has-error' : ''}`}>
                  {bradenOptions.moisture.map(option => (
                    <div className="score-option" key={option.value}>
                      <label className="radio-container">
                        <input
                          type="radio"
                          name="moisture"
                          value={option.value}
                          checked={formData.moisture === option.value}
                          onChange={() => handleChange('moisture', option.value)}
                        />
                        <span className="checkmark"></span>
                        <div className="option-content">
                          <div className="option-title">{option.label}</div>
                          <div className="option-description">{option.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {validationErrors.moisture && (
                  <div className="error-message">This field is required</div>
                )}
              </div>
            </div>
            
            <div className="table-row">
              <div className="risk-factor-col">
                <h3>Activity</h3>
                <p>Degree of physical activity</p>
              </div>
              <div className="score-description-col">
                <div className={`score-options ${validationErrors.activity ? 'has-error' : ''}`}>
                  {bradenOptions.activity.map(option => (
                    <div className="score-option" key={option.value}>
                      <label className="radio-container">
                        <input
                          type="radio"
                          name="activity"
                          value={option.value}
                          checked={formData.activity === option.value}
                          onChange={() => handleChange('activity', option.value)}
                        />
                        <span className="checkmark"></span>
                        <div className="option-content">
                          <div className="option-title">{option.label}</div>
                          <div className="option-description">{option.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {validationErrors.activity && (
                  <div className="error-message">This field is required</div>
                )}
              </div>
            </div>
            
            <div className="table-row">
              <div className="risk-factor-col">
                <h3>Mobility</h3>
                <p>Ability to change and control body position</p>
              </div>
              <div className="score-description-col">
                <div className={`score-options ${validationErrors.mobility ? 'has-error' : ''}`}>
                  {bradenOptions.mobility.map(option => (
                    <div className="score-option" key={option.value}>
                      <label className="radio-container">
                        <input
                          type="radio"
                          name="mobility"
                          value={option.value}
                          checked={formData.mobility === option.value}
                          onChange={() => handleChange('mobility', option.value)}
                        />
                        <span className="checkmark"></span>
                        <div className="option-content">
                          <div className="option-title">{option.label}</div>
                          <div className="option-description">{option.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {validationErrors.mobility && (
                  <div className="error-message">This field is required</div>
                )}
              </div>
            </div>
            
            <div className="table-row">
              <div className="risk-factor-col">
                <h3>Nutrition</h3>
                <p>Usual food intake pattern (NPO: Nothing by mouth)</p>
              </div>
              <div className="score-description-col">
                <div className={`score-options ${validationErrors.nutrition ? 'has-error' : ''}`}>
                  {bradenOptions.nutrition.map(option => (
                    <div className="score-option" key={option.value}>
                      <label className="radio-container">
                        <input
                          type="radio"
                          name="nutrition"
                          value={option.value}
                          checked={formData.nutrition === option.value}
                          onChange={() => handleChange('nutrition', option.value)}
                        />
                        <span className="checkmark"></span>
                        <div className="option-content">
                          <div className="option-title">{option.label}</div>
                          <div className="option-description">{option.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {validationErrors.nutrition && (
                  <div className="error-message">This field is required</div>
                )}
              </div>
            </div>
            
            <div className="table-row">
              <div className="risk-factor-col">
                <h3>Friction and Shear</h3>
              </div>
              <div className="score-description-col">
                <div className={`score-options ${validationErrors.frictionAndShear ? 'has-error' : ''}`}>
                  {bradenOptions.frictionAndShear.map(option => (
                    <div className="score-option" key={option.value}>
                      <label className="radio-container">
                        <input
                          type="radio"
                          name="frictionAndShear"
                          value={option.value}
                          checked={formData.frictionAndShear === option.value}
                          onChange={() => handleChange('frictionAndShear', option.value)}
                        />
                        <span className="checkmark"></span>
                        <div className="option-content">
                          <div className="option-title">{option.label}</div>
                          <div className="option-description">{option.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {validationErrors.frictionAndShear && (
                  <div className="error-message">This field is required</div>
                )}
              </div>
            </div>
            
            <div className="table-footer">
              <div className="total-score">
                <span className="total-label">TOTAL:</span>
                <span className="total-value">{formData.totalScore} out of 23 ({formData.riskLevel})</span>
              </div>
            </div>
          </div>
          
          <div className="risk-interpretation">
            <div className={`risk-card ${formData.totalScore <= 9 ? 'active' : ''}`}>
              <div className="risk-level very-high">Very High Risk</div>
              <div className="risk-range">Total Score ≤ 9</div>
              <div className="risk-action">Implement comprehensive prevention protocol and consider specialty surface</div>
            </div>
            
            <div className={`risk-card ${formData.totalScore > 9 && formData.totalScore <= 12 ? 'active' : ''}`}>
              <div className="risk-level high">High Risk</div>
              <div className="risk-range">Total Score 10-12</div>
              <div className="risk-action">Implement prevention protocol and frequent repositioning</div>
            </div>
            
            <div className={`risk-card ${formData.totalScore > 12 && formData.totalScore <= 14 ? 'active' : ''}`}>
              <div className="risk-level moderate">Moderate Risk</div>
              <div className="risk-range">Total Score 13-14</div>
              <div className="risk-action">Implement basic prevention measures and reassess regularly</div>
            </div>
            
            <div className={`risk-card ${formData.totalScore > 14 && formData.totalScore <= 18 ? 'active' : ''}`}>
              <div className="risk-level mild">Mild Risk</div>
              <div className="risk-range">Total Score 15-18</div>
              <div className="risk-action">Monitor and implement basic prevention as needed</div>
            </div>
            
            <div className={`risk-card ${formData.totalScore > 18 ? 'active' : ''}`}>
              <div className="risk-level no-risk">No Risk</div>
              <div className="risk-range">Total Score 19-23</div>
              <div className="risk-action">Monitor and reassess as condition changes</div>
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

export default BradenScaleModal;