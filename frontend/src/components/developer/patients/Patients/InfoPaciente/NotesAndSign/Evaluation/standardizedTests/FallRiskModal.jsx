// components/standardizedTests/FallRiskModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/FallRiskModal.scss';

const FallRiskModal = ({ isOpen, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    patientFactors: initialData?.patientFactors || {
      historyOfFalls: false,
      sensoryDeficit: false,
      ageOver65: false,
      multipleCoexistingDiagnoses: false,
      confusion: false,
      impairedJudgment: false,
      decreasedCooperation: false,
      increasedAnxiety: false,
      painAffectingFunction: false,
      unableToAmbulate: false,
      gaitBalanceProblems: false,
      incontinence: false,
      cardiovascularRespiratory: false,
      posturalHypotension: false,
      alcoholUse: false,
      medicationsAffecting: false
    },
    environmentalFactors: initialData?.environmentalFactors || {
      homeSafetyIssues: false,
      lackOfHomeModifications: false
    },
    organizationalGuidelines: initialData?.organizationalGuidelines || {
      educateOnFallPrevention: false,
      referToTherapy: false,
      monitorRiskAreas: false,
      reassessPatient: false
    },
    additionalInformation: initialData?.additionalInformation || '',
    totalScore: initialData?.totalScore || 0,
    isComplete: initialData?.isComplete || false
  });

  // Calcular puntuación total al cambiar los factores
  useEffect(() => {
    const patientFactorCount = Object.values(formData.patientFactors).filter(value => value).length;
    const environmentalFactorCount = Object.values(formData.environmentalFactors).filter(value => value).length;
    
    // Cada factor vale 5 puntos
    const total = (patientFactorCount + environmentalFactorCount) * 5;
    
    setFormData(prevData => ({
      ...prevData,
      totalScore: total
    }));
  }, [formData.patientFactors, formData.environmentalFactors]);

  // Determinar el nivel de riesgo basado en la puntuación total
  const getRiskLevel = () => {
    const score = formData.totalScore;
    
    if (score >= 75) return 'severe';
    if (score >= 50) return 'high';
    if (score >= 25) return 'moderate';
    return 'low';
  };

  // Manejar cambios en los factores del paciente
  const handlePatientFactorChange = (factor, checked) => {
    setFormData(prevData => ({
      ...prevData,
      patientFactors: {
        ...prevData.patientFactors,
        [factor]: checked
      }
    }));
  };

  // Manejar cambios en los factores ambientales
  const handleEnvironmentalFactorChange = (factor, checked) => {
    setFormData(prevData => ({
      ...prevData,
      environmentalFactors: {
        ...prevData.environmentalFactors,
        [factor]: checked
      }
    }));
  };

  // Manejar cambios en las guías organizacionales
  const handleGuidelinesChange = (guideline, checked) => {
    setFormData(prevData => ({
      ...prevData,
      organizationalGuidelines: {
        ...prevData.organizationalGuidelines,
        [guideline]: checked
      }
    }));
  };

  // Manejar cambios en la información adicional
  const handleAdditionalInfoChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      additionalInformation: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    onClose({
      ...formData,
      isComplete: true,
      score: formData.totalScore
    });
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fall-risk-modal-overlay">
      <div className="fall-risk-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-person-falling"></i>
            Fall Risk Assessment
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
            <div className="factors-section">
              <h3>PATIENT FACTORS:</h3>
              <div className="factors-grid">
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="historyOfFalls" 
                    checked={formData.patientFactors.historyOfFalls}
                    onChange={(e) => handlePatientFactorChange('historyOfFalls', e.target.checked)}
                  />
                  <label htmlFor="historyOfFalls">15 - History of falls (any in the past 3 months?)</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="sensoryDeficit" 
                    checked={formData.patientFactors.sensoryDeficit}
                    onChange={(e) => handlePatientFactorChange('sensoryDeficit', e.target.checked)}
                  />
                  <label htmlFor="sensoryDeficit">5 - Sensory deficit (vision and/or hearing)</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="ageOver65" 
                    checked={formData.patientFactors.ageOver65}
                    onChange={(e) => handlePatientFactorChange('ageOver65', e.target.checked)}
                  />
                  <label htmlFor="ageOver65">5 - Age (over 65)</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="multipleCoexistingDiagnoses" 
                    checked={formData.patientFactors.multipleCoexistingDiagnoses}
                    onChange={(e) => handlePatientFactorChange('multipleCoexistingDiagnoses', e.target.checked)}
                  />
                  <label htmlFor="multipleCoexistingDiagnoses">5 - Diagnosis (3 or more co-existing)</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="confusion" 
                    checked={formData.patientFactors.confusion}
                    onChange={(e) => handlePatientFactorChange('confusion', e.target.checked)}
                  />
                  <label htmlFor="confusion">5 - Confusion</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="impairedJudgment" 
                    checked={formData.patientFactors.impairedJudgment}
                    onChange={(e) => handlePatientFactorChange('impairedJudgment', e.target.checked)}
                  />
                  <label htmlFor="impairedJudgment">5 - Impaired judgment</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="decreasedCooperation" 
                    checked={formData.patientFactors.decreasedCooperation}
                    onChange={(e) => handlePatientFactorChange('decreasedCooperation', e.target.checked)}
                  />
                  <label htmlFor="decreasedCooperation">5 - Decreased level of cooperation</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="increasedAnxiety" 
                    checked={formData.patientFactors.increasedAnxiety}
                    onChange={(e) => handlePatientFactorChange('increasedAnxiety', e.target.checked)}
                  />
                  <label htmlFor="increasedAnxiety">5 - Increased anxiety/emotional lability</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="painAffectingFunction" 
                    checked={formData.patientFactors.painAffectingFunction}
                    onChange={(e) => handlePatientFactorChange('painAffectingFunction', e.target.checked)}
                  />
                  <label htmlFor="painAffectingFunction">5 - Pain affecting level of function</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="unableToAmbulate" 
                    checked={formData.patientFactors.unableToAmbulate}
                    onChange={(e) => handlePatientFactorChange('unableToAmbulate', e.target.checked)}
                  />
                  <label htmlFor="unableToAmbulate">5 - Unable to ambulate independently (needs to use ambulatory aide, chairboard, etc.)</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="gaitBalanceProblems" 
                    checked={formData.patientFactors.gaitBalanceProblems}
                    onChange={(e) => handlePatientFactorChange('gaitBalanceProblems', e.target.checked)}
                  />
                  <label htmlFor="gaitBalanceProblems">5 - Gait/balance/coordination problems/mobility</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="incontinence" 
                    checked={formData.patientFactors.incontinence}
                    onChange={(e) => handlePatientFactorChange('incontinence', e.target.checked)}
                  />
                  <label htmlFor="incontinence">5 - Incontinence/urgency</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="cardiovascularRespiratory" 
                    checked={formData.patientFactors.cardiovascularRespiratory}
                    onChange={(e) => handlePatientFactorChange('cardiovascularRespiratory', e.target.checked)}
                  />
                  <label htmlFor="cardiovascularRespiratory">5 - Cardiovascular/respiratory disease affecting perfusion and/or oxygenation</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="posturalHypotension" 
                    checked={formData.patientFactors.posturalHypotension}
                    onChange={(e) => handlePatientFactorChange('posturalHypotension', e.target.checked)}
                  />
                  <label htmlFor="posturalHypotension">5 - Postural hypotension with dizziness</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="alcoholUse" 
                    checked={formData.patientFactors.alcoholUse}
                    onChange={(e) => handlePatientFactorChange('alcoholUse', e.target.checked)}
                  />
                  <label htmlFor="alcoholUse">5 - Alcohol use</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="medicationsAffecting" 
                    checked={formData.patientFactors.medicationsAffecting}
                    onChange={(e) => handlePatientFactorChange('medicationsAffecting', e.target.checked)}
                  />
                  <label htmlFor="medicationsAffecting">5 - Medications affecting blood pressure, level of consciousness, or blood coagulants (consider antihistamines, antihypertensives, antiseizure, benzodiazepines, cathartics, diuretics, hypoglycemics, narcotics, psychotropics, sedatives/hypnotics, anticoagulants)</label>
                </div>
              </div>
            </div>
            
            <div className="factors-section environmental">
              <h3>ENVIRONMENTAL FACTORS:</h3>
              <div className="factors-grid">
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="homeSafetyIssues" 
                    checked={formData.environmentalFactors.homeSafetyIssues}
                    onChange={(e) => handleEnvironmentalFactorChange('homeSafetyIssues', e.target.checked)}
                  />
                  <label htmlFor="homeSafetyIssues">5 - Home safety issues (lighting, pathway, cord, tubing, floor coverings, stairs, etc.)</label>
                </div>
                
                <div className="factor-item">
                  <input 
                    type="checkbox" 
                    id="lackOfHomeModifications" 
                    checked={formData.environmentalFactors.lackOfHomeModifications}
                    onChange={(e) => handleEnvironmentalFactorChange('lackOfHomeModifications', e.target.checked)}
                  />
                  <label htmlFor="lackOfHomeModifications">5 - Lack of home modifications (bathroom, kitchen, stairs, entries, etc.)</label>
                </div>
              </div>
              
              <div className="risk-score">
                <div className="score-display">
                  <div className="score-label">TOTAL:</div>
                  <div className="score-value">{formData.totalScore} out of 100</div>
                </div>
                <div className={`risk-badge ${getRiskLevel()}`}>
                  {getRiskLevel() === 'severe' && 'Severe Risk (75-100)'}
                  {getRiskLevel() === 'high' && 'High Risk (50-74)'}
                  {getRiskLevel() === 'moderate' && 'Moderate Risk (25-49)'}
                  {getRiskLevel() === 'low' && 'Low Risk (0-24)'}
                </div>
              </div>
            </div>
            
            <div className="guidelines-section">
              <h3>AS GUIDED BY ORGANIZATION GUIDELINES:</h3>
              <div className="guidelines-grid">
                <div className="guideline-item">
                  <input 
                    type="checkbox" 
                    id="educateOnFallPrevention" 
                    checked={formData.organizationalGuidelines.educateOnFallPrevention}
                    onChange={(e) => handleGuidelinesChange('educateOnFallPrevention', e.target.checked)}
                  />
                  <label htmlFor="educateOnFallPrevention">Educate on fall prevention strategies specific to areas of risk</label>
                </div>
                
                <div className="guideline-item">
                  <input 
                    type="checkbox" 
                    id="referToTherapy" 
                    checked={formData.organizationalGuidelines.referToTherapy}
                    onChange={(e) => handleGuidelinesChange('referToTherapy', e.target.checked)}
                  />
                  <label htmlFor="referToTherapy">Refer to Physical Therapy and/or Occupational Therapy</label>
                </div>
                
                <div className="guideline-item">
                  <input 
                    type="checkbox" 
                    id="monitorRiskAreas" 
                    checked={formData.organizationalGuidelines.monitorRiskAreas}
                    onChange={(e) => handleGuidelinesChange('monitorRiskAreas', e.target.checked)}
                  />
                  <label htmlFor="monitorRiskAreas">Monitor areas of risk to reduce falls</label>
                </div>
                
                <div className="guideline-item">
                  <input 
                    type="checkbox" 
                    id="reassessPatient" 
                    checked={formData.organizationalGuidelines.reassessPatient}
                    onChange={(e) => handleGuidelinesChange('reassessPatient', e.target.checked)}
                  />
                  <label htmlFor="reassessPatient">Reassess patient</label>
                </div>
              </div>
            </div>
            
            <div className="additional-info-section">
              <h3>ADDITIONAL INFORMATION:</h3>
              <textarea 
                value={formData.additionalInformation}
                onChange={(e) => handleAdditionalInfoChange(e.target.value)}
                placeholder="Enter any additional information or observations"
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

export default FallRiskModal;