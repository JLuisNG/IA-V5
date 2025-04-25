// components/PTEvaluation.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/PTEvaluation.scss';
import StandardizedTest from './StandardizedTest';
import TransfersSection from './TransfersSection';



const PTEvaluation = ({ data, onChange, onOpenTest, onOpenDiagnosisModal, autoSaveMessage }) => {
  // Estados locales para los diversos componentes de la evaluación
  const [activeTab, setActiveTab] = useState('information');
  const [homeboundOptions, setHomeboundOptions] = useState([
    { id: 'needsAssistance', label: 'Needs assistance for all activities' },
    { id: 'residualWeakness', label: 'Residual Weakness' },
    { id: 'requiresAssistanceToAmbulate', label: 'Requires assistance to ambulate' },
    { id: 'confusion', label: 'Confusion, unable to go out of home alone' },
    { id: 'unableToSafelyLeave', label: 'Unable to safely leave home unassisted' },
    { id: 'severeSob', label: 'Severe SOB, SOB upon exertion' },
    { id: 'dependentUponDevice', label: 'Dependent upon adaptive device(s)' },
    { id: 'medicalRestrictions', label: 'Medical restrictions' },
    { id: 'requiresTaxingEffort', label: 'Requires taxing effort to leave home' },
    { id: 'bedbound', label: 'Bedbound' },
    { id: 'requiresAssistanceWithTransfers', label: 'Requires assistance with transfers' },
    { id: 'other', label: 'Other (explain)' }
  ]);

  // Manejador para los cambios en los campos
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Verificar si un test está completo
  const isTestComplete = (testName) => {
    return data?.standardizedTests?.[testName]?.isComplete || false;
  };

  // Obtener la puntuación de un test
  const getTestScore = (testName) => {
    return data?.standardizedTests?.[testName]?.score || null;
  };

  // Renderizar la pestaña de información del paciente
  const renderPatientInformationTab = () => (
    <div className="information-tab">
      <div className="form-section">
        <div className="section-title">
          <h2>Patient Information</h2>
          <span className={`autosaved-badge ${autoSaveMessage ? 'visible' : ''}`}>
            {autoSaveMessage || 'AUTOSAVED'}
          </span>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Past Medical History</label>
            <textarea 
              value={data.pastMedicalHistory || ''}
              onChange={(e) => handleChange('pastMedicalHistory', e.target.value)}
              rows={4}
              placeholder="Enter past medical history"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Past Therapy History</label>
            <textarea 
              value={data.pastTherapyHistory || ''}
              onChange={(e) => handleChange('pastTherapyHistory', e.target.value)}
              rows={4}
              placeholder="Enter past therapy history"
            />
          </div>
        </div>
        
        <div className="form-row dual-column">
          <div className="form-group">
            <label>Height</label>
            <div className="input-group">
              <input 
                type="number" 
                value={data.heightFt || ''}
                onChange={(e) => handleChange('heightFt', e.target.value)}
                placeholder="0"
                min="0"
                max="8"
              />
              <span className="unit">ft</span>
              <input 
                type="number" 
                value={data.heightIn || ''}
                onChange={(e) => handleChange('heightIn', e.target.value)}
                placeholder="0"
                min="0"
                max="11"
              />
              <span className="unit">inches</span>
            </div>
          </div>
          
          <div className="form-group">
            <label>Weight</label>
            <div className="input-group">
              <input 
                type="number" 
                value={data.weight || ''}
                onChange={(e) => handleChange('weight', e.target.value)}
                placeholder="0"
                min="0"
              />
              <span className="unit">lbs</span>
            </div>
          </div>
        </div>
        
        <div className="form-row dual-column">
          <div className="form-group">
            <label>Weight Bearing Status</label>
            <select 
              value={data.weightBearingStatus || ''}
              onChange={(e) => handleChange('weightBearingStatus', e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Full Weight Bearing">Full Weight Bearing</option>
              <option value="Weight Bearing as Tolerated">Weight Bearing as Tolerated</option>
              <option value="Partial Weight Bearing">Partial Weight Bearing</option>
              <option value="Touch Down Weight Bearing">Touch Down Weight Bearing</option>
              <option value="Non Weight Bearing">Non Weight Bearing</option>
              <option value="Clarify w/Patient or MD">Clarify w/Patient or MD</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Nursing Diagnosis</label>
            <input 
              type="text" 
              value={data.nursingDiagnosis || 'see attached document'}
              readOnly
              className="read-only-field"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Reasons for Referral</label>
            <input 
              type="text" 
              value={data.referralReasons || ''}
              onChange={(e) => handleChange('referralReasons', e.target.value)}
              placeholder="Decreased Strength / Balance"
            />
          </div>
        </div>
        
        <div className="form-row dual-column">
          <div className="form-group">
            <label>Therapy Diagnosis</label>
            <div className="input-with-button">
              <input 
                type="text" 
                value={data.therapyDiagnosis || ''}
                readOnly
                placeholder="Select diagnosis"
                className="read-only-field"
              />
              <button className="add-btn" onClick={onOpenDiagnosisModal}>
                <i className="fas fa-plus"></i>
                <span>ADD DIAGNOSIS</span>
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Additional Disciplines</label>
            <input 
              type="text" 
              value={data.additionalDisciplines || 'N/A'}
              onChange={(e) => handleChange('additionalDisciplines', e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Patient/Caregiver Expectations of Therapy</label>
            <textarea 
              value={data.expectations || ''}
              onChange={(e) => handleChange('expectations', e.target.value)}
              rows={3}
              placeholder="Enter expectations"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Homebound Status</label>
            <div className="input-group-checkbox">
              <input 
                type="text" 
                value={data.homeboundStatus || 'N/A'}
                onChange={(e) => handleChange('homeboundStatus', e.target.value)}
                readOnly
                className="read-only-field"
              />
              <div className="checkbox-group">
                {homeboundOptions.map(option => (
                  <div className="checkbox-item" key={option.id}>
                    <input 
                      type="checkbox" 
                      id={option.id} 
                      checked={data[option.id] || false}
                      onChange={(e) => handleChange(option.id, e.target.checked)}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Prior Level of Function</label>
            <textarea 
              value={data.priorLevelOfFunction || ''}
              onChange={(e) => handleChange('priorLevelOfFunction', e.target.value)}
              rows={3}
              placeholder="PROGRESSIVE DECLINE"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Surgical Procedure(s) History</label>
            <textarea 
              value={data.surgicalProcedures || ''}
              onChange={(e) => handleChange('surgicalProcedures', e.target.value)}
              rows={3}
              placeholder="Enter surgical history"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Hospitalization Dates (if applicable)</label>
            <input 
              type="text" 
              value={data.hospitalizationDates || ''}
              onChange={(e) => handleChange('hospitalizationDates', e.target.value)}
              placeholder="Enter dates"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar la pestaña de signos vitales
// components/PTEvaluation.jsx - Vitals Tab Section (Rediseñado)
const renderVitalsTab = () => (
  <div className="vitals-tab">
    <div className="section-title">
      <h2>Vitals</h2>
      <span className={`autosaved-badge ${autoSaveMessage ? 'visible' : ''}`}>
        {autoSaveMessage || 'AUTOSAVED'}
      </span>
    </div>
    
    <div className="vitals-layout">
      {/* Sección de signos vitales en reposo */}
      <div className="vitals-section at-rest">
        <div className="vitals-header">
          <div className="title-with-icon">
            <i className="fas fa-heart-pulse"></i>
            <h3>At Rest</h3>
          </div>
          <div className="info-badge">Baseline</div>
        </div>
        
        <div className="vitals-grid">
          <div className="vital-card">
            <label>Heart Rate</label>
            <div className="input-field">
              <input 
                type="number" 
                value={data.restHeartRate || ''} 
                onChange={(e) => handleChange('restHeartRate', e.target.value)}
                placeholder="0"
                min="0"
                max="300"
              />
              <span className="unit">bpm</span>
            </div>
          </div>
          
          <div className="vital-card wide">
            <label>Blood Pressure</label>
            <div className="bp-field">
              <input 
                type="number" 
                value={data.restSystolic || ''} 
                onChange={(e) => handleChange('restSystolic', e.target.value)}
                placeholder="0"
                min="0"
                max="300"
              />
              <span className="bp-divider">/</span>
              <input 
                type="number" 
                value={data.restDiastolic || ''} 
                onChange={(e) => handleChange('restDiastolic', e.target.value)}
                placeholder="0"
                min="0"
                max="300"
              />
              <span className="unit">mmHg</span>
            </div>
          </div>
          
          <div className="vital-card">
            <label>Respirations</label>
            <div className="input-field">
              <input 
                type="number" 
                value={data.restRespirations || ''} 
                onChange={(e) => handleChange('restRespirations', e.target.value)}
                placeholder="0"
                min="0"
                max="100"
              />
              <span className="unit">breaths/min</span>
            </div>
          </div>
          
          <div className="vital-card">
            <label>O<sub>2</sub> Saturation</label>
            <div className="input-field">
              <input 
                type="number" 
                value={data.restO2Saturation || ''} 
                onChange={(e) => handleChange('restO2Saturation', e.target.value)}
                placeholder="0"
                min="0"
                max="100"
              />
              <span className="unit">%</span>
            </div>
          </div>
          
          <div className="vital-card">
            <label>Temperature</label>
            <div className="input-field">
              <input 
                type="number" 
                value={data.temperature || ''} 
                onChange={(e) => handleChange('temperature', e.target.value)}
                placeholder="0"
                step="0.1"
                min="90"
                max="110"
              />
              <span className="unit">°F</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección de signos vitales después del ejercicio */}
      <div className="vitals-section after-exertion">
        <div className="vitals-header">
          <div className="title-with-icon">
            <i className="fas fa-person-running"></i>
            <h3>After Exertion</h3>
          </div>
          <div className="info-badge">Activity Response</div>
        </div>
        
        <div className="vitals-grid">
          <div className="vital-card">
            <label>Heart Rate</label>
            <div className="input-field">
              <input 
                type="number" 
                value={data.exertionHeartRate || ''} 
                onChange={(e) => handleChange('exertionHeartRate', e.target.value)}
                placeholder="0"
                min="0"
                max="300"
              />
              <span className="unit">bpm</span>
            </div>
          </div>
          
          <div className="vital-card wide">
            <label>Blood Pressure</label>
            <div className="bp-field">
              <input 
                type="number" 
                value={data.exertionSystolic || ''} 
                onChange={(e) => handleChange('exertionSystolic', e.target.value)}
                placeholder="0"
                min="0"
                max="300"
              />
              <span className="bp-divider">/</span>
              <input 
                type="number" 
                value={data.exertionDiastolic || ''} 
                onChange={(e) => handleChange('exertionDiastolic', e.target.value)}
                placeholder="0"
                min="0"
                max="300"
              />
              <span className="unit">mmHg</span>
            </div>
          </div>
          
          <div className="vital-card">
            <label>Respirations</label>
            <div className="input-field">
              <input 
                type="number" 
                value={data.exertionRespirations || ''} 
                onChange={(e) => handleChange('exertionRespirations', e.target.value)}
                placeholder="0"
                min="0"
                max="100"
              />
              <span className="unit">breaths/min</span>
            </div>
          </div>
          
          <div className="vital-card">
            <label>O<sub>2</sub> Saturation</label>
            <div className="input-field">
              <input 
                type="number" 
                value={data.exertionO2Saturation || ''} 
                onChange={(e) => handleChange('exertionO2Saturation', e.target.value)}
                placeholder="0"
                min="0"
                max="100"
              />
              <span className="unit">%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección de análisis de signos vitales */}
      <div className="vitals-analytics-section">
        <div className="vitals-summary-card">
          <div className="card-header">
            <h4>Vital Signs Analysis</h4>
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="vital-comparison">
            <div className="comparison-item">
              <span className="label">Heart Rate Δ:</span>
              <span className="value">{
                data.restHeartRate && data.exertionHeartRate 
                ? `+${Math.max(0, data.exertionHeartRate - data.restHeartRate)} bpm` 
                : 'N/A'
              }</span>
            </div>
            <div className="comparison-item">
              <span className="label">Blood Pressure Δ:</span>
              <span className="value">{
                data.restSystolic && data.exertionSystolic 
                ? `+${Math.max(0, data.exertionSystolic - data.restSystolic)}/${Math.max(0, data.exertionDiastolic - data.restDiastolic)} mmHg` 
                : 'N/A'
              }</span>
            </div>
            <div className="comparison-item">
              <span className="label">O<sub>2</sub> Saturation Δ:</span>
              <span className={`value ${
                data.restO2Saturation && data.exertionO2Saturation && (data.exertionO2Saturation - data.restO2Saturation < -3) 
                ? 'negative' : ''}`
              }>{
                data.restO2Saturation && data.exertionO2Saturation 
                ? `${data.exertionO2Saturation - data.restO2Saturation > 0 ? '+' : ''}${data.exertionO2Saturation - data.restO2Saturation}%` 
                : 'N/A'
              }</span>
            </div>
          </div>
          <div className="vital-status">
            <div className="checkbox-alert">
              <input 
                type="checkbox" 
                id="vitalsOutOfParameters" 
                checked={data.vitalsOutOfParameters || false}
                onChange={(e) => handleChange('vitalsOutOfParameters', e.target.checked)}
              />
              <label htmlFor="vitalsOutOfParameters">
                <i className="fas fa-triangle-exclamation"></i>
                Vitals Out of Parameters
              </label>
            </div>
          </div>
        </div>
        
        <div className="vitals-notes-card">
          <div className="card-header">
            <h4>Additional Notes</h4>
            <i className="fas fa-clipboard-list"></i>
          </div>
          <textarea 
            value={data.vitalsAdditional || ''}
            onChange={(e) => handleChange('vitalsAdditional', e.target.value)}
            placeholder="Enter additional vitals information or observations..."
            rows={4}
          />
        </div>
      </div>
    </div>
  </div>
);

  // Renderizar la pestaña de dolor
  const renderPainTab = () => (
    <div className="pain-tab">
      <div className="form-section">
        <h2>Pain</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label>Is patient experiencing pain?</label>
            <select 
              value={data.experiencingPain || ''}
              onChange={(e) => handleChange('experiencingPain', e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        
        {data.experiencingPain === 'Yes' && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Pain Location</label>
                <input 
                  type="text" 
                  value={data.painLocation || ''}
                  onChange={(e) => handleChange('painLocation', e.target.value)}
                  placeholder="Enter pain location"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Pain Intensity</label>
                <div className="pain-scale">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                    <button 
                      key={level}
                      type="button"
                      className={`pain-level ${data.painIntensity === level ? 'active' : ''}`}
                      onClick={() => handleChange('painIntensity', level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className="pain-scale-labels">
                  <span>No Pain</span>
                  <span>Worst Pain</span>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Pain Description</label>
                <div className="pain-description-options">
                  {['Sharp', 'Dull', 'Aching', 'Throbbing', 'Burning', 'Stabbing', 'Tingling', 'Numbness'].map(type => (
                    <div className="checkbox-item" key={type}>
                      <input 
                        type="checkbox" 
                        id={`pain${type}`} 
                        checked={data[`pain${type}`] || false}
                        onChange={(e) => handleChange(`pain${type}`, e.target.checked)}
                      />
                      <label htmlFor={`pain${type}`}>{type}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Pain Severity</label>
                <select 
                  value={data.painSeverity || ''}
                  onChange={(e) => handleChange('painSeverity', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Pain Effect on Function</label>
                <textarea 
                  value={data.painEffect || ''}
                  onChange={(e) => handleChange('painEffect', e.target.value)}
                  rows={3}
                  placeholder="Describe how pain affects function"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Renderizar la pestaña de medicación
  const renderMedicationTab = () => (
    <div className="medication-tab">
      <div className="form-section">
        <h2>Medication (Optional)</h2>
        
        <div className="form-row">
          <div className="form-group radio-group">
            <label>Has Medication Changed</label>
            <div className="radio-options">
              <div className="radio-option">
                <input 
                  type="radio" 
                  id="medicationChangedNA" 
                  name="medicationChanged"
                  checked={data.medicationChanged === 'N/A'}
                  onChange={() => handleChange('medicationChanged', 'N/A')}
                />
                <label htmlFor="medicationChangedNA">N/A</label>
              </div>
              <div className="radio-option">
                <input 
                  type="radio" 
                  id="medicationChangedYes" 
                  name="medicationChanged"
                  checked={data.medicationChanged === 'Yes'}
                  onChange={() => handleChange('medicationChanged', 'Yes')}
                />
                <label htmlFor="medicationChangedYes">Yes</label>
              </div>
              <div className="radio-option">
                <input 
                  type="radio" 
                  id="medicationChangedNo" 
                  name="medicationChanged"
                  checked={data.medicationChanged === 'No'}
                  onChange={() => handleChange('medicationChanged', 'No')}
                />
                <label htmlFor="medicationChangedNo">No</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Additional Information</label>
            <textarea 
              value={data.medicationAdditional || ''}
              onChange={(e) => handleChange('medicationAdditional', e.target.value)}
              rows={4}
              placeholder="Additional medication information"
            />
          </div>
        </div>
        
        <button 
          className="medication-list-btn"
          onClick={() => onOpenTest('Medication List')}
        >
          <i className="fas fa-pills"></i>
          <span>View/Add Medication List</span>
        </button>
      </div>
    </div>
  );

  // Renderizar la pestaña de pruebas estandarizadas
  const renderTestsTab = () => (
    <div className="tests-tab">
      <div className="form-section">
        <h2>Standardized Tests</h2>
        
        <div className="tests-grid">
          <StandardizedTest 
            title="ACE III" 
            isComplete={isTestComplete('ACE III')}
            score={getTestScore('ACE III')}
            onOpen={() => onOpenTest('ACE III')}
          />
          
          <StandardizedTest 
            title="Tinetti" 
            isComplete={isTestComplete('Tinetti')}
            score={getTestScore('Tinetti')}
            onOpen={() => onOpenTest('Tinetti')}
          />
          
          <StandardizedTest 
            title="Timed Up And Go" 
            isComplete={isTestComplete('Timed Up And Go')}
            score={getTestScore('Timed Up And Go')}
            onOpen={() => onOpenTest('Timed Up And Go')}
          />
          
          <StandardizedTest 
            title="Functional Reach" 
            isComplete={isTestComplete('Functional Reach')}
            score={getTestScore('Functional Reach')}
            onOpen={() => onOpenTest('Functional Reach')}
          />
          
          <StandardizedTest 
            title="BERG" 
            isComplete={isTestComplete('BERG')}
            score={getTestScore('BERG')}
            onOpen={() => onOpenTest('BERG')}
          />
          
          <StandardizedTest 
            title="Fall Risk Assessment" 
            isComplete={isTestComplete('Fall Risk Assessment')}
            score={getTestScore('Fall Risk Assessment')}
            onOpen={() => onOpenTest('Fall Risk Assessment')}
          />
          
          <StandardizedTest 
            title="Advanced Balance" 
            isComplete={isTestComplete('Advanced Balance')}
            score={getTestScore('Advanced Balance')}
            onOpen={() => onOpenTest('Advanced Balance')}
          />
          
          <StandardizedTest 
            title="MAHC10" 
            isComplete={isTestComplete('MAHC10')}
            score={getTestScore('MAHC10')}
            onOpen={() => onOpenTest('MAHC10')}
          />
          
          <StandardizedTest 
            title="Barthel Index" 
            isComplete={isTestComplete('Barthel Index')}
            score={getTestScore('Barthel Index')}
            onOpen={() => onOpenTest('Barthel Index')}
          />
          
          <StandardizedTest 
            title="Short Physical Performance Battery" 
            isComplete={isTestComplete('Short Physical Performance Battery')}
            score={getTestScore('Short Physical Performance Battery')}
            onOpen={() => onOpenTest('Short Physical Performance Battery')}
          />
          
          <StandardizedTest 
            title="Nutritional Status Assessment" 
            isComplete={isTestComplete('Nutritional Status Assessment')}
            score={getTestScore('Nutritional Status Assessment')}
            onOpen={() => onOpenTest('Nutritional Status Assessment')}
          />
          
          <StandardizedTest 
            title="Diabetic Foot Exam" 
            isComplete={isTestComplete('Diabetic Foot Exam')}
            score={getTestScore('Diabetic Foot Exam')}
            onOpen={() => onOpenTest('Diabetic Foot Exam')}
          />
          
          <StandardizedTest 
            title="Katz Index" 
            isComplete={isTestComplete('Katz Index')}
            score={getTestScore('Katz Index')}
            onOpen={() => onOpenTest('Katz Index')}
          />
          
          <StandardizedTest 
            title="Wound Assessment" 
            isComplete={isTestComplete('Wound Assessment')}
            score={getTestScore('Wound Assessment')}
            onOpen={() => onOpenTest('Wound Assessment')}
          />
          
          <StandardizedTest 
            title="Braden Scale" 
            isComplete={isTestComplete('Braden Scale')}
            score={getTestScore('Braden Scale')}
            onOpen={() => onOpenTest('Braden Scale')}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-evaluation-container">
      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'information' ? 'active' : ''}`}
          onClick={() => setActiveTab('information')}
        >
          Patient Information
        </button>
        <button 
          className={`tab-button ${activeTab === 'vitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitals')}
        >
          Vitals
        </button>
        <button 
          className={`tab-button ${activeTab === 'pain' ? 'active' : ''}`}
          onClick={() => setActiveTab('pain')}
        >
          Pain
        </button>
        <button 
          className={`tab-button ${activeTab === 'medication' ? 'active' : ''}`}
          onClick={() => setActiveTab('medication')}
        >
          Medication
        </button>
        <button 
          className={`tab-button ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          Standardized Tests
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'information' && renderPatientInformationTab()}
        {activeTab === 'vitals' && renderVitalsTab()}
        {activeTab === 'pain' && renderPainTab()}
        {activeTab === 'medication' && renderMedicationTab()}
        {activeTab === 'tests' && renderTestsTab()}
      </div>
    </div>
  );
};

export default PTEvaluation;