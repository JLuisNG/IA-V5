// components/AssessmentSection.jsx
import React, { useState } from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/AssessmentSection.scss';
import StandardizedTest from './StandardizedTest';

const AssessmentSection = ({ data, onChange }) => {
  // Manejador para los cambios en los campos
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };
  
  return (
    <div className="assessment-section-container">
      <div className="form-section">
        <h2>Problem List / Functional Limitations</h2>
        
        <div className="problem-list-grid">
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="decreasedROM" 
              checked={data.decreasedROM || false}
              onChange={(e) => handleChange('decreasedROM', e.target.checked)}
            />
            <label htmlFor="decreasedROM">Decreased ROM</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="dysfunctionalPosture" 
              checked={data.dysfunctionalPosture || false}
              onChange={(e) => handleChange('dysfunctionalPosture', e.target.checked)}
            />
            <label htmlFor="dysfunctionalPosture">Dysfunctional Posture</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="impairedFunctionalActivityTolerance" 
              checked={data.impairedFunctionalActivityTolerance || false}
              onChange={(e) => handleChange('impairedFunctionalActivityTolerance', e.target.checked)}
            />
            <label htmlFor="impairedFunctionalActivityTolerance">Impaired Functional Activity Tolerance</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="impairedFunctionalMobility" 
              checked={data.impairedFunctionalMobility || false}
              onChange={(e) => handleChange('impairedFunctionalMobility', e.target.checked)}
            />
            <label htmlFor="impairedFunctionalMobility">Impaired Functional Mobility</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="impairedSafetyAwareness" 
              checked={data.impairedSafetyAwareness || false}
              onChange={(e) => handleChange('impairedSafetyAwareness', e.target.checked)}
            />
            <label htmlFor="impairedSafetyAwareness">Impaired Safety Awareness</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="softTissueDysfunction" 
              checked={data.softTissueDysfunction || false}
              onChange={(e) => handleChange('softTissueDysfunction', e.target.checked)}
            />
            <label htmlFor="softTissueDysfunction">Soft Tissue Dysfunction</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="jointHypoHypermobility" 
              checked={data.jointHypoHypermobility || false}
              onChange={(e) => handleChange('jointHypoHypermobility', e.target.checked)}
            />
            <label htmlFor="jointHypoHypermobility">Joint Hyper/Hypomobility</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="impairedBalance" 
              checked={data.impairedBalance || false}
              onChange={(e) => handleChange('impairedBalance', e.target.checked)}
            />
            <label htmlFor="impairedBalance">Impaired Balance</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="impairedFunctionalStrength" 
              checked={data.impairedFunctionalStrength || false}
              onChange={(e) => handleChange('impairedFunctionalStrength', e.target.checked)}
            />
            <label htmlFor="impairedFunctionalStrength">Impaired Functional Strength</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="dysfunctionalGait" 
              checked={data.dysfunctionalGait || false}
              onChange={(e) => handleChange('dysfunctionalGait', e.target.checked)}
            />
            <label htmlFor="dysfunctionalGait">Dysfunctional Gait</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="impairedCoordination" 
              checked={data.impairedCoordination || false}
              onChange={(e) => handleChange('impairedCoordination', e.target.checked)}
            />
            <label htmlFor="impairedCoordination">Impaired Coordination</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="painRestrictingFunction" 
              checked={data.painRestrictingFunction || false}
              onChange={(e) => handleChange('painRestrictingFunction', e.target.checked)}
            />
            <label htmlFor="painRestrictingFunction">Pain Restricting Function</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="impairedTransfers" 
              checked={data.impairedTransfers || false}
              onChange={(e) => handleChange('impairedTransfers', e.target.checked)}
            />
            <label htmlFor="impairedTransfers">Impaired Transfers</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="fallRisk" 
              checked={data.fallRisk || false}
              onChange={(e) => handleChange('fallRisk', e.target.checked)}
            />
            <label htmlFor="fallRisk">Fall Risk</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="urinaryIncontinence" 
              checked={data.urinaryIncontinence || false}
              onChange={(e) => handleChange('urinaryIncontinence', e.target.checked)}
            />
            <label htmlFor="urinaryIncontinence">Urinary Incontinence (Timed Up & Go)</label>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Additional Information</label>
            <textarea 
              value={data.problemListAdditional || ''}
              onChange={(e) => handleChange('problemListAdditional', e.target.value)}
              rows={4}
              placeholder="Additional information about problems/limitations"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2>Assessment/Justification</h2>
        
        <div className="form-row">
          <div className="form-group radio-group">
            <div className="radio-options assessment-options">
              <div className="radio-option">
                <input 
                  type="radio" 
                  id="patientTolerated" 
                  name="assessmentJustification"
                  checked={data.assessmentJustification === 'tolerated'}
                  onChange={() => handleChange('assessmentJustification', 'tolerated')}
                />
                <label htmlFor="patientTolerated">Patient tolerated treatment and is benefiting from skilled PT.</label>
              </div>
              
              <div className="radio-option">
                <input 
                  type="radio" 
                  id="patientCouldNotTolerate" 
                  name="assessmentJustification"
                  checked={data.assessmentJustification === 'couldNotTolerate'}
                  onChange={() => handleChange('assessmentJustification', 'couldNotTolerate')}
                />
                <label htmlFor="patientCouldNotTolerate">Patient could not tolerate the following treatments</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Additional Information</label>
            <textarea 
              value={data.assessmentJustificationAdditional || ''}
              onChange={(e) => handleChange('assessmentJustificationAdditional', e.target.value)}
              rows={4}
              placeholder="Additional information about assessment/justification"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2>Rehab Potential</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label>Rehab Potential</label>
            <select 
              value={data.rehabPotential || ''}
              onChange={(e) => handleChange('rehabPotential', e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Good for stated goals">Good for stated goals</option>
              <option value="Fair for stated goals">Fair for stated goals</option>
              <option value="Poor for stated goals">Poor for stated goals</option>
              <option value="Guarded for stated goals">Guarded for stated goals</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Additional Information</label>
            <textarea 
              value={data.rehabPotentialAdditional || ''}
              onChange={(e) => handleChange('rehabPotentialAdditional', e.target.value)}
              rows={3}
              placeholder="Additional information about rehab potential"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2>Treatment As Tolerated</h2>
        
        <div className="treatment-options-grid">
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="evaluation" 
              checked={data.treatmentEvaluation || false}
              onChange={(e) => handleChange('treatmentEvaluation', e.target.checked)}
            />
            <label htmlFor="evaluation">Evaluation</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="therapeuticExercise" 
              checked={data.therapeuticExercise || false}
              onChange={(e) => handleChange('therapeuticExercise', e.target.checked)}
            />
            <label htmlFor="therapeuticExercise">Therapeutic Exercise</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="transferTraining" 
              checked={data.transferTraining || false}
              onChange={(e) => handleChange('transferTraining', e.target.checked)}
            />
            <label htmlFor="transferTraining">Transfer Training</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="establisHomeProgram" 
              checked={data.establishHomeProgram || false}
              onChange={(e) => handleChange('establishHomeProgram', e.target.checked)}
            />
            <label htmlFor="establisHomeProgram">Establish Home Program</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="gaitTraining" 
              checked={data.gaitTraining || false}
              onChange={(e) => handleChange('gaitTraining', e.target.checked)}
            />
            <label htmlFor="gaitTraining">Gait Training</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="stretchingFlexibility" 
              checked={data.stretchingFlexibility || false}
              onChange={(e) => handleChange('stretchingFlexibility', e.target.checked)}
            />
            <label htmlFor="stretchingFlexibility">Stretching/Flexibility</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="safetyTraining" 
              checked={data.safetyTraining || false}
              onChange={(e) => handleChange('safetyTraining', e.target.checked)}
            />
            <label htmlFor="safetyTraining">Safety Training</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="balance" 
              checked={data.balance || false}
              onChange={(e) => handleChange('balance', e.target.checked)}
            />
            <label htmlFor="balance">Balance</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="prostheticTherapy" 
              checked={data.prostheticTherapy || false}
              onChange={(e) => handleChange('prostheticTherapy', e.target.checked)}
            />
            <label htmlFor="prostheticTherapy">Prosthetic Therapy</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="painModalities" 
              checked={data.painModalities || false}
              onChange={(e) => handleChange('painModalities', e.target.checked)}
            />
            <label htmlFor="painModalities">Pain Modalities</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="woundCare" 
              checked={data.woundCare || false}
              onChange={(e) => handleChange('woundCare', e.target.checked)}
            />
            <label htmlFor="woundCare">Wound Care</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="chestPhysicalTherapy" 
              checked={data.chestPhysicalTherapy || false}
              onChange={(e) => handleChange('chestPhysicalTherapy', e.target.checked)}
            />
            <label htmlFor="chestPhysicalTherapy">Chest Physical Therapy</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="manualTherapy" 
              checked={data.manualTherapy || false}
              onChange={(e) => handleChange('manualTherapy', e.target.checked)}
            />
            <label htmlFor="manualTherapy">Manual Therapy</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="neuromuscularReeducation" 
              checked={data.neuromuscularReeducation || false}
              onChange={(e) => handleChange('neuromuscularReeducation', e.target.checked)}
            />
            <label htmlFor="neuromuscularReeducation">Neuromuscular Re-Education</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="voiceTrainingEducation" 
              checked={data.voiceTrainingEducation || false}
              onChange={(e) => handleChange('voiceTrainingEducation', e.target.checked)}
            />
            <label htmlFor="voiceTrainingEducation">Voice Training Education</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="selfCareManagement" 
              checked={data.selfCareManagement || false}
              onChange={(e) => handleChange('selfCareManagement', e.target.checked)}
            />
            <label htmlFor="selfCareManagement">Self Care Management</label>
          </div>
          
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="fallRiskTreatment" 
              checked={data.fallRiskTreatment || false}
              onChange={(e) => handleChange('fallRiskTreatment', e.target.checked)}
            />
            <label htmlFor="fallRiskTreatment">Fall Risk</label>
          </div>
          
          <div className="checkbox-item wide-checkbox">
            <input 
              type="checkbox" 
              id="ptcgInvolvedInGoals" 
              checked={data.ptcgInvolvedInGoals || false}
              onChange={(e) => handleChange('ptcgInvolvedInGoals', e.target.checked)}
            />
            <label htmlFor="ptcgInvolvedInGoals">PT and CG involved in development of goals and in agreement with POC</label>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Additional Information</label>
            <textarea 
              value={data.treatmentToleratedAdditional || ''}
              onChange={(e) => handleChange('treatmentToleratedAdditional', e.target.value)}
              rows={3}
              placeholder="Additional information about treatment"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2>Skilled Care Provided This Visit</h2>
        
        <div className="form-row">
          <div className="form-group">
            <textarea 
              value={data.skilledCareProvided || ''}
              onChange={(e) => handleChange('skilledCareProvided', e.target.value)}
              rows={6}
              placeholder="Detail skilled care provided during this visit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSection;