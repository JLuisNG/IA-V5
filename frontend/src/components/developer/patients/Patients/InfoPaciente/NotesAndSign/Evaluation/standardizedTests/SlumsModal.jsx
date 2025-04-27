// components/standardizedTests/SlumsModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/SlumsModal.scss';

const SlumsModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    patientAlert: initialData?.patientAlert || 'Yes',
    educationLevel: initialData?.educationLevel || 'High School Education',
    dayOfWeek: initialData?.dayOfWeek || 'Correct',
    year: initialData?.year || 'Correct',
    state: initialData?.state || 'Correct',
    objectsRemembered: initialData?.objectsRemembered || '5 Objects Correct',
    moneySpent: initialData?.moneySpent || 'Correct',
    moneyLeft: initialData?.moneyLeft || 'Correct',
    animalsNamed: initialData?.animalsNamed || '0-4 animals',
    hourMarkers: initialData?.hourMarkers || 'Correct',
    timeCorrect: initialData?.timeCorrect || 'Correct',
    trianglePoint: initialData?.trianglePoint || 'Correct',
    largestFigure: initialData?.largestFigure || 'Correct',
    femalesName: initialData?.femalesName || 'Correct',
    workType: initialData?.workType || 'Correct',
    backToWork: initialData?.backToWork || 'Correct',
    stateOfResidence: initialData?.stateOfResidence || 'Correct',
    number87: initialData?.number87 || 'Correct',
    number649: initialData?.number649 || 'Correct',
    number8537: initialData?.number8537 || 'Correct',
    additionalNotes: initialData?.additionalNotes || '',
    isComplete: initialData?.isComplete || false
  });

  // Estado para el total de puntos
  const [totalScore, setTotalScore] = useState(0);
  
  // Estado para validación
  const [validationErrors, setValidationErrors] = useState({});
  
  // Opciones de selección
  const educationLevels = [
    { value: 'High School Education', label: 'High School Education' },
    { value: 'Less than High School Education', label: 'Less than High School Education' }
  ];
  
  const yesNoOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];
  
  const correctIncorrectOptions = [
    { value: 'Correct', label: 'Correct' },
    { value: 'Incorrect', label: 'Incorrect' }
  ];
  
  const animalOptions = [
    { value: '0-4 animals', label: '0-4 animals' },
    { value: '5-9 animals', label: '5-9 animals' },
    { value: '10-14 animals', label: '10-14 animals' },
    { value: '15+ animals', label: '15+ animals' }
  ];
  
  const objectsRememberedOptions = [
    { value: '5 Objects Correct', label: '5 Objects Correct' },
    { value: '4 Objects Correct', label: '4 Objects Correct' },
    { value: '3 Objects Correct', label: '3 Objects Correct' },
    { value: '2 Objects Correct', label: '2 Objects Correct' },
    { value: '1 Object Correct', label: '1 Object Correct' },
    { value: '0 Objects Correct', label: '0 Objects Correct' }
  ];

  // Calcular puntuación total
  useEffect(() => {
    let score = 0;
    
    // Puntuación para cada pregunta
    if (formData.dayOfWeek === 'Correct') score += 1;
    if (formData.year === 'Correct') score += 1;
    if (formData.state === 'Correct') score += 1;
    
    // Puntuación para objetos recordados
    switch (formData.objectsRemembered) {
      case '5 Objects Correct': score += 5; break;
      case '4 Objects Correct': score += 4; break;
      case '3 Objects Correct': score += 3; break;
      case '2 Objects Correct': score += 2; break;
      case '1 Object Correct': score += 1; break;
      default: break;
    }
    
    if (formData.moneySpent === 'Correct') score += 2;
    if (formData.moneyLeft === 'Correct') score += 2;
    
    // Puntuación por animales nombrados
    switch (formData.animalsNamed) {
      case '0-4 animals': score += 0; break;
      case '5-9 animals': score += 1; break;
      case '10-14 animals': score += 2; break;
      case '15+ animals': score += 3; break;
      default: break;
    }
    
    if (formData.hourMarkers === 'Correct') score += 2;
    if (formData.timeCorrect === 'Correct') score += 2;
    if (formData.trianglePoint === 'Correct') score += 1;
    if (formData.largestFigure === 'Correct') score += 1;
    if (formData.femalesName === 'Correct') score += 2;
    if (formData.workType === 'Correct') score += 2;
    if (formData.backToWork === 'Correct') score += 2;
    if (formData.stateOfResidence === 'Correct') score += 2;
    
    // Puntuación para números en reversa
    if (formData.number87 === 'Correct') score += 1;
    if (formData.number649 === 'Correct') score += 1;
    if (formData.number8537 === 'Correct') score += 1;
    
    setTotalScore(score);
  }, [formData]);

  // Interpretación de la puntuación
  const getScoreInterpretation = () => {
    const highEducationCutoff = 27;
    const lowEducationCutoff = 25;
    
    if (formData.educationLevel === 'High School Education') {
      if (totalScore >= highEducationCutoff) {
        return { level: 'Normal', cutoff: highEducationCutoff };
      } else {
        return { level: 'Cognitive Impairment', cutoff: highEducationCutoff };
      }
    } else {
      if (totalScore >= lowEducationCutoff) {
        return { level: 'Normal', cutoff: lowEducationCutoff };
      } else {
        return { level: 'Cognitive Impairment', cutoff: lowEducationCutoff };
      }
    }
  };

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
    
    // Verificar campos requeridos (en este caso asumimos que todos son requeridos)
    const requiredFields = [
      'patientAlert', 'educationLevel', 'dayOfWeek', 'year', 'state',
      'objectsRemembered', 'moneySpent', 'moneyLeft', 'animalsNamed',
      'hourMarkers', 'timeCorrect', 'trianglePoint', 'largestFigure',
      'femalesName', 'workType', 'backToWork', 'stateOfResidence',
      'number87', 'number649', 'number8537'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = true;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      const interpretation = getScoreInterpretation();
      
      onClose({
        ...formData,
        totalScore,
        interpretation: interpretation.level,
        isComplete: true,
        score: totalScore
      });
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  const interpretation = getScoreInterpretation();

  return (
    <div className="slums-modal-overlay">
      <div className="slums-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-brain"></i>
            SLUMS Examination
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
                <p>The Saint Louis University Mental Status (SLUMS) examination is a cognitive screening tool used to detect mild cognitive impairment and dementia. It assesses orientation, memory, attention, and executive functions.</p>
              </div>
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-section patient-status">
              <div className="question-item">
                <label htmlFor="patientAlert">IS PATIENT ALERT?</label>
                <select
                  id="patientAlert"
                  value={formData.patientAlert}
                  onChange={(e) => handleChange('patientAlert', e.target.value)}
                  className={validationErrors.patientAlert ? 'error' : ''}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {validationErrors.patientAlert && <div className="error-message">Required</div>}
              </div>
              
              <div className="question-item">
                <label htmlFor="educationLevel">LEVEL OF EDUCATION:</label>
                <select
                  id="educationLevel"
                  value={formData.educationLevel}
                  onChange={(e) => handleChange('educationLevel', e.target.value)}
                  className={validationErrors.educationLevel ? 'error' : ''}
                >
                  {educationLevels.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {validationErrors.educationLevel && <div className="error-message">Required</div>}
              </div>
            </div>
            
            <div className="form-row divider"></div>
            
            <div className="form-section orientation">
              <div className="question-item">
                <label htmlFor="dayOfWeek">1. What day of the week is it?</label>
                <select
                  id="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={(e) => handleChange('dayOfWeek', e.target.value)}
                  className={validationErrors.dayOfWeek ? 'error' : ''}
                >
                  {correctIncorrectOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {validationErrors.dayOfWeek && <div className="error-message">Required</div>}
              </div>
              
              <div className="question-item">
                <label htmlFor="year">2. What is the year?</label>
                <select
                  id="year"
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className={validationErrors.year ? 'error' : ''}
                >
                  {correctIncorrectOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {validationErrors.year && <div className="error-message">Required</div>}
              </div>
              
              <div className="question-item">
                <label htmlFor="state">3. What state are we in?</label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className={validationErrors.state ? 'error' : ''}
                >
                  {correctIncorrectOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {validationErrors.state && <div className="error-message">Required</div>}
              </div>
            </div>
            
            <div className="form-section memory">
              <div className="question-item">
                <label htmlFor="objectsRemembered">
                  4. Please remember these five objects: APPLE - PEN - TIE - HOUSE - CAR.
                  I will ask you what they are later.
                </label>
                <select
                  id="objectsRemembered"
                  value={formData.objectsRemembered}
                  onChange={(e) => handleChange('objectsRemembered', e.target.value)}
                  className={validationErrors.objectsRemembered ? 'error' : ''}
                >
                  {objectsRememberedOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {validationErrors.objectsRemembered && <div className="error-message">Required</div>}
              </div>
              
              <div className="question-item math-problem">
                <label>5. You have $100 and you go to the store and buy a dozen apples for $3 and a tricycle for $20.</label>
                
                <div className="sub-question">
                  <label htmlFor="moneySpent">How much did you spend?</label>
                  <select
                    id="moneySpent"
                    value={formData.moneySpent}
                    onChange={(e) => handleChange('moneySpent', e.target.value)}
                    className={validationErrors.moneySpent ? 'error' : ''}
                  >
                    {correctIncorrectOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {validationErrors.moneySpent && <div className="error-message">Required</div>}
                </div>
                
                <div className="sub-question">
                  <label htmlFor="moneyLeft">How much do you have left?</label>
                  <select
                    id="moneyLeft"
                    value={formData.moneyLeft}
                    onChange={(e) => handleChange('moneyLeft', e.target.value)}
                    className={validationErrors.moneyLeft ? 'error' : ''}
                  >
                    {correctIncorrectOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {validationErrors.moneyLeft && <div className="error-message">Required</div>}
                </div>
              </div>
              
              <div className="question-item">
                <label htmlFor="animalsNamed">6. Please name as many animals as you can in one minute.</label>
                <select
                  id="animalsNamed"
                  value={formData.animalsNamed}
                  onChange={(e) => handleChange('animalsNamed', e.target.value)}
                  className={validationErrors.animalsNamed ? 'error' : ''}
                >
                  {animalOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {validationErrors.animalsNamed && <div className="error-message">Required</div>}
              </div>
            </div>
            
            <div className="form-columns">
              <div className="form-column">
                <div className="question-item number-recall">
                  <label>7. What were the five objects I asked you to remember?</label>
                  <select
                    value={formData.objectsRemembered}
                    onChange={(e) => handleChange('objectsRemembered', e.target.value)}
                    className={validationErrors.objectsRemembered ? 'error' : ''}
                  >
                    {objectsRememberedOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="question-item number-reverse">
                  <label>8. I am going to give you a series of numbers and I would like you to give them to me backwards. For example, if I say 42, you would say 24.</label>
                  
                  <div className="sub-question">
                    <label>87</label>
                    <select
                      value={formData.number87}
                      onChange={(e) => handleChange('number87', e.target.value)}
                      className={validationErrors.number87 ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.number87 && <div className="error-message">Required</div>}
                  </div>
                  
                  <div className="sub-question">
                    <label>649</label>
                    <select
                      value={formData.number649}
                      onChange={(e) => handleChange('number649', e.target.value)}
                      className={validationErrors.number649 ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.number649 && <div className="error-message">Required</div>}
                  </div>
                  
                  <div className="sub-question">
                    <label>8537</label>
                    <select
                      value={formData.number8537}
                      onChange={(e) => handleChange('number8537', e.target.value)}
                      className={validationErrors.number8537 ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.number8537 && <div className="error-message">Required</div>}
                  </div>
                </div>
              </div>
              
              <div className="form-column">
                <div className="question-item clock-face">
                  <label>9. (Perform on paper) This is a clock face. Please put in the hour markers and the time at ten minutes to eleven o'clock.</label>
                  
                  <div className="clock-diagram">
                    <div className="shapes">
                      <div className="square"></div>
                      <div className="triangle"></div>
                      <div className="rectangle"></div>
                    </div>
                  </div>
                  
                  <div className="sub-question">
                    <label>Hour markers okay</label>
                    <select
                      value={formData.hourMarkers}
                      onChange={(e) => handleChange('hourMarkers', e.target.value)}
                      className={validationErrors.hourMarkers ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.hourMarkers && <div className="error-message">Required</div>}
                  </div>
                  
                  <div className="sub-question">
                    <label>Time correct</label>
                    <select
                      value={formData.timeCorrect}
                      onChange={(e) => handleChange('timeCorrect', e.target.value)}
                      className={validationErrors.timeCorrect ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.timeCorrect && <div className="error-message">Required</div>}
                  </div>
                </div>
                
                <div className="question-item figure-test">
                  <label>10.</label>
                  
                  <div className="sub-question">
                    <label>Please point to the triangle</label>
                    <select
                      value={formData.trianglePoint}
                      onChange={(e) => handleChange('trianglePoint', e.target.value)}
                      className={validationErrors.trianglePoint ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.trianglePoint && <div className="error-message">Required</div>}
                  </div>
                  
                  <div className="sub-question">
                    <label>Which of the above figures is largest?</label>
                    <select
                      value={formData.largestFigure}
                      onChange={(e) => handleChange('largestFigure', e.target.value)}
                      className={validationErrors.largestFigure ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.largestFigure && <div className="error-message">Required</div>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-section story-recall">
              <div className="question-item">
                <label>11. I am going to tell you a story. Please listen carefully because afterwards, I'm going to ask you some questions about it.</label>
                
                <div className="story-text">
                  <p>Jill was a very successful stockbroker. She made a lot of money on the stock market. She then met Jack, a devastatingly handsome man. She married him and had three children. They lived in Chicago. She then stopped work and stayed at home to bring up her children. When they were teenagers, she went back to work. She and Jack lived happily ever after.</p>
                </div>
                
                <div className="sub-questions">
                  <div className="sub-question">
                    <label>What was the female's name?</label>
                    <select
                      value={formData.femalesName}
                      onChange={(e) => handleChange('femalesName', e.target.value)}
                      className={validationErrors.femalesName ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.femalesName && <div className="error-message">Required</div>}
                  </div>
                  
                  <div className="sub-question">
                    <label>What work did she do?</label>
                    <select
                      value={formData.workType}
                      onChange={(e) => handleChange('workType', e.target.value)}
                      className={validationErrors.workType ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.workType && <div className="error-message">Required</div>}
                  </div>
                  
                  <div className="sub-question">
                    <label>When did she go back to work?</label>
                    <select
                      value={formData.backToWork}
                      onChange={(e) => handleChange('backToWork', e.target.value)}
                      className={validationErrors.backToWork ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.backToWork && <div className="error-message">Required</div>}
                  </div>
                  
                  <div className="sub-question">
                    <label>What state did she live in?</label>
                    <select
                      value={formData.stateOfResidence}
                      onChange={(e) => handleChange('stateOfResidence', e.target.value)}
                      className={validationErrors.stateOfResidence ? 'error' : ''}
                    >
                      {correctIncorrectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {validationErrors.stateOfResidence && <div className="error-message">Required</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="score-summary">
            <div className="score-display">
              <div className="score-value">
                TOTAL: <span className="score-number">{totalScore}</span> out of 30 ({interpretation.level})
              </div>
              <div className="score-interpretation">
                <div className={`interpretation-item ${interpretation.level === 'Normal' ? 'active' : ''}`}>
                  <span className="level normal">
                    Normal ≥ {interpretation.cutoff} points
                  </span>
                </div>
                <div className={`interpretation-item ${interpretation.level === 'Cognitive Impairment' ? 'active' : ''}`}>
                  <span className="level impaired">
                    Cognitive Impairment &lt; {interpretation.cutoff} points
                  </span>
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

export default SlumsModal;