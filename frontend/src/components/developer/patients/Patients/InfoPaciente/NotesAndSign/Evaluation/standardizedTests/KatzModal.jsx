// components/standardizedTests/KatzModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/KatzModal.scss';

const KatzModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    bathing: initialData?.bathing || '',
    dressing: initialData?.dressing || '',
    toileting: initialData?.toileting || '',
    transferring: initialData?.transferring || '',
    continence: initialData?.continence || '',
    feeding: initialData?.feeding || '',
    additionalNotes: initialData?.additionalNotes || '',
    isComplete: initialData?.isComplete || false
  });
  
  // Estado para el total calculado
  const [totalScore, setTotalScore] = useState(0);

  // Validación de errores
  const [validationErrors, setValidationErrors] = useState({});

  // Opciones para cada actividad
  const activities = [
    { 
      id: 'bathing', 
      name: 'Bathing',
      independenceText: 'Bathes self completely or needs help in bathing only a single part of the body such as the back, genital area or disabled extremity.',
      dependenceText: 'Needs help with bathing more than one part of the body, getting in or out of the tub or shower or requires total bathing.'
    },
    { 
      id: 'dressing', 
      name: 'Dressing',
      independenceText: 'Gets clothes from closets and drawers and puts on clothes and outer garments complete with fasteners. May have help tying shoes.',
      dependenceText: 'Has help dressing self or needs to be completely dressed.'
    },
    { 
      id: 'toileting', 
      name: 'Toileting',
      independenceText: 'Goes to toilet, gets on and off, arranges clothes, and cleans genital area without help.',
      dependenceText: 'Needs help transferring to the toilet, cleaning self or uses bedpan or commode.'
    },
    { 
      id: 'transferring', 
      name: 'Transferring',
      independenceText: 'Moves in and out of bed or chair unassisted. Mechanical transfer aids are acceptable.',
      dependenceText: 'Needs help in moving from bed to chair or requires a complete transfer.'
    },
    { 
      id: 'continence', 
      name: 'Continence',
      independenceText: 'Exercises complete self control over urination and defecation.',
      dependenceText: 'Is partially or totally incontinent of bowel or bladder.'
    },
    { 
      id: 'feeding', 
      name: 'Feeding',
      independenceText: 'Gets food from plate into mouth without help. Preparation of food may be done by another person.',
      dependenceText: 'Needs partial or total help with feeding or requires parenteral feeding.'
    }
  ];

  // Calcular total basado en las selecciones
  useEffect(() => {
    let score = 0;
    
    activities.forEach(activity => {
      if (formData[activity.id] === 'independence') {
        score += 1;
      }
    });
    
    setTotalScore(score);
  }, [formData]);

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
  };

  // Validar el formulario
  const validateForm = () => {
    const errors = {};
    
    // Verificar que todas las actividades tengan una selección
    activities.forEach(activity => {
      if (!formData[activity.id]) {
        errors[activity.id] = true;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onClose({
        ...formData,
        totalScore,
        isComplete: true,
        score: totalScore
      });
    } else {
      // Mensaje de error y desplazamiento al inicio del formulario
      window.scrollTo(0, 0);
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="katz-modal-overlay">
      <div className="katz-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-tasks"></i>
            Katz Index of Independence in ADL
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="assessment-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="info-text">
                <p>The Katz Index of Independence in Activities of Daily Living assesses functional status as a measurement of the patient's ability to perform activities of daily living independently. The score ranges from 0 (very dependent) to 6 (independent).</p>
              </div>
            </div>
          </div>
          
          <div className="activities-table">
            <div className="table-header">
              <div className="activity-column">ACTIVITIES</div>
              <div className="independence-column">INDEPENDENCE</div>
              <div className="dependence-column">DEPENDENCE</div>
            </div>
            
            <div className="table-body">
              {activities.map(activity => (
                <div 
                  key={activity.id} 
                  className={`table-row ${validationErrors[activity.id] ? 'has-error' : ''}`}
                >
                  <div className="activity-column">
                    {activity.name}
                    {validationErrors[activity.id] && (
                      <div className="error-message">Required</div>
                    )}
                  </div>
                  <div className="independence-column">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name={activity.id} 
                        value="independence" 
                        checked={formData[activity.id] === 'independence'}
                        onChange={() => handleChange(activity.id, 'independence')}
                      />
                      <span className="radio-text">{activity.independenceText}</span>
                    </label>
                  </div>
                  <div className="dependence-column">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name={activity.id} 
                        value="dependence" 
                        checked={formData[activity.id] === 'dependence'}
                        onChange={() => handleChange(activity.id, 'dependence')}
                      />
                      <span className="radio-text">{activity.dependenceText}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="score-summary">
            <div className="score-display">
              <div className="score-label">INDEPENDENCE INDEX:</div>
              <div className="score-value">{totalScore} out of 6</div>
            </div>
            
            <div className="score-interpretation">
              <div className={`interpretation-item ${totalScore >= 5 ? 'active' : ''}`}>
                <div className="indicator high"></div>
                <div className="text">
                  <strong>5-6 = High Independence</strong>
                  <span>Patient is independent in all or most ADL activities</span>
                </div>
              </div>
              <div className={`interpretation-item ${totalScore >= 3 && totalScore <= 4 ? 'active' : ''}`}>
                <div className="indicator moderate"></div>
                <div className="text">
                  <strong>3-4 = Moderate Independence</strong>
                  <span>Patient needs assistance with some ADL activities</span>
                </div>
              </div>
              <div className={`interpretation-item ${totalScore <= 2 ? 'active' : ''}`}>
                <div className="indicator low"></div>
                <div className="text">
                  <strong>0-2 = Low Independence</strong>
                  <span>Patient is dependent in most ADL activities</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="additional-notes">
            <h3>Additional Notes</h3>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              placeholder="Enter any additional observations or notes"
              rows={4}
            />
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

export default KatzModal;