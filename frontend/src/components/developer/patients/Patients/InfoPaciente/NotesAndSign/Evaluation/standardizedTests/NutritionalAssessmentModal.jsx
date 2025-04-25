// components/standardizedTests/NutritionalAssessmentModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/NutritionalAssessmentModal.scss';

const NutritionalAssessmentModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    illnessChangedDiet: initialData?.illnessChangedDiet || false,
    lessThanTwoMeals: initialData?.lessThanTwoMeals || false,
    fewFruitsVeggiesDairy: initialData?.fewFruitsVeggiesDairy || false,
    alcoholThreeDrinks: initialData?.alcoholThreeDrinks || false,
    teethOrMouthProblems: initialData?.teethOrMouthProblems || false,
    notEnoughMoney: initialData?.notEnoughMoney || false,
    eatsAlone: initialData?.eatsAlone || false,
    threeOrMoreMedications: initialData?.threeOrMoreMedications || false,
    weightLoss: initialData?.weightLoss || false,
    cannotShopCookFeed: initialData?.cannotShopCookFeed || false,
    totalScore: initialData?.totalScore || 0,
    riskLevel: initialData?.riskLevel || 'Good',
    intervention: initialData?.intervention || '',
    isComplete: initialData?.isComplete || false
  });

  // Opciones para el cuestionario nutricional
  const nutritionalQuestions = [
    { 
      id: 'illnessChangedDiet',
      label: 'Has an illness or a condition that changed the kind and/or amount of food eaten.',
      points: 2
    },
    { 
      id: 'lessThanTwoMeals', 
      label: 'Eats fewer than 2 meals per day.',
      points: 3
    },
    { 
      id: 'fewFruitsVeggiesDairy', 
      label: 'Eats few fruits, vegetables or milk products.',
      points: 2
    },
    { 
      id: 'alcoholThreeDrinks', 
      label: 'Has 3 or more drinks of beer, liquor or wine almost every day.',
      points: 2
    },
    { 
      id: 'teethOrMouthProblems', 
      label: 'Has tooth or mouth problems that make it hard to eat.',
      points: 2
    },
    { 
      id: 'notEnoughMoney', 
      label: 'Does not always have enough money to buy the food needed.',
      points: 4
    },
    { 
      id: 'eatsAlone', 
      label: 'Eats alone most of the time.',
      points: 1
    },
    { 
      id: 'threeOrMoreMedications', 
      label: 'Takes 3 or more different prescribed or over-the-counter drugs a day.',
      points: 1
    },
    { 
      id: 'weightLoss', 
      label: 'Without wanting to, has lost or gained 10 pounds in the last 6 months.',
      points: 2
    },
    { 
      id: 'cannotShopCookFeed', 
      label: 'Not always physically able to shop, cook, and/or feed self.',
      points: 2
    }
  ];

  // Calcular el total cuando cambian los checkboxes
  useEffect(() => {
    let total = 0;
    let riskLevel = 'Good';
    
    nutritionalQuestions.forEach(question => {
      if (formData[question.id]) {
        total += question.points;
      }
    });
    
    if (total >= 6) {
      riskLevel = 'High Risk';
    } else if (total >= 3) {
      riskLevel = 'Moderate Risk';
    } else {
      riskLevel = 'Good';
    }
    
    setFormData(prevData => ({
      ...prevData,
      totalScore: total,
      riskLevel: riskLevel
    }));
  }, [
    formData.illnessChangedDiet,
    formData.lessThanTwoMeals,
    formData.fewFruitsVeggiesDairy,
    formData.alcoholThreeDrinks,
    formData.teethOrMouthProblems,
    formData.notEnoughMoney,
    formData.eatsAlone,
    formData.threeOrMoreMedications,
    formData.weightLoss,
    formData.cannotShopCookFeed
  ]);

  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (id) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: !prevData[id]
    }));
  };

  // Manejar cambios en el campo de intervención
  const handleInterventionChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      intervention: e.target.value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    // Marcar como completo y cerrar el modal
    const updatedData = {
      ...formData,
      isComplete: true
    };
    
    onClose({
      ...updatedData,
      score: updatedData.totalScore
    });
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="nutritional-assessment-modal-overlay">
      <div className="nutritional-assessment-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-utensils"></i>
            Nutritional Status Assessment
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="assessment-instructions">
            <p>Directions: Check each area with "yes" to assess; then view total score to determine additional risk.</p>
          </div>
          
          <div className="assessment-form">
            <div className="checklist">
              {nutritionalQuestions.map(question => (
                <div className="checklist-item" key={question.id}>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={formData[question.id]}
                      onChange={() => handleCheckboxChange(question.id)}
                    />
                    <span className="checkmark"></span>
                    <div className="question-content">
                      <span className="question-text">{question.label}</span>
                      <span className="question-points">({question.points})</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="score-summary">
              <div className="total-score">
                <span className="score-label">TOTAL:</span>
                <span className={`score-value ${formData.riskLevel.toLowerCase().replace(' ', '-')}`}>
                  {formData.totalScore} out of 21 ({formData.riskLevel})
                </span>
              </div>
            </div>
            
            <div className="risk-levels">
              <div className={`risk-level ${formData.riskLevel === 'Good' ? 'active' : ''}`}>
                <div className="risk-level-header good">
                  <span>0-2 (Good):</span>
                </div>
                <p>As appropriate reassess and/or provide information based on situation.</p>
              </div>
              
              <div className={`risk-level ${formData.riskLevel === 'Moderate Risk' ? 'active' : ''}`}>
                <div className="risk-level-header moderate">
                  <span>3-5 (Moderate Risk):</span>
                </div>
                <p>Educate, refer, monitor and reevaluate based on patient situation and organization policy.</p>
              </div>
              
              <div className={`risk-level ${formData.riskLevel === 'High Risk' ? 'active' : ''}`}>
                <div className="risk-level-header high">
                  <span>6 or more (High Risk):</span>
                </div>
                <p>Coordinate with physician, dietitian, social service professional or nurse about how to improve nutritional health. Reassess nutritional status and educate based on plan of care.</p>
              </div>
            </div>
            
            <div className="intervention-section">
              <label>DESCRIBE AT RISK INTERVENTION AND PLAN:</label>
              <textarea 
                value={formData.intervention}
                onChange={handleInterventionChange}
                rows={5}
                placeholder="Document nutritional interventions and care plan"
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

export default NutritionalAssessmentModal;