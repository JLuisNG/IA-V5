// components/PTEvaluation.jsx
import React, { useState } from 'react';
import '../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/PTEvaluation.scss';
import StandardizedTest from './StandardizedTest.jsx';

const PTEvaluation = ({ data, onChange }) => {
  // Estados locales para los diversos componentes de la evaluación
  const [activeTab, setActiveTab] = useState('information');
  
  // Manejador para los cambios en los campos
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };
  
  // Manejador para abrir una prueba estandarizada
  const handleOpenTest = (testName) => {
    console.log(`Opening test: ${testName}`);
    // Aquí implementarías la lógica para abrir el modal de la prueba
  };
  
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
        {activeTab === 'information' && (
          <div className="information-tab">
            <div className="form-section">
              <div className="section-title">
                <h2>Patient Information</h2>
                <span className="autosaved-badge">AUTOSAVED</span>
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
                    />
                    <span className="unit">ft</span>
                    <input 
                      type="number" 
                      value={data.heightIn || ''}
                      onChange={(e) => handleChange('heightIn', e.target.value)}
                      placeholder="0"
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
                    onChange={(e) => handleChange('nursingDiagnosis', e.target.value)}
                    readOnly
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
                    />
                    <button className="add-btn">
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
                    />
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="needsAssistance" 
                          checked={data.needsAssistance || false}
                          onChange={(e) => handleChange('needsAssistance', e.target.checked)}
                        />
                        <label htmlFor="needsAssistance">Needs assistance for all activities</label>
                      </div>
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="residualWeakness" 
                          checked={data.residualWeakness || false}
                          onChange={(e) => handleChange('residualWeakness', e.target.checked)}
                        />
                        <label htmlFor="residualWeakness">Residual Weakness</label>
                      </div>
                      {/* Add more checkboxes as needed */}
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
        )}
        
        {activeTab === 'vitals' && (
          <div className="vitals-tab">
            <div className="form-section">
              <h2>Vitals</h2>
              
              <div className="vitals-container">
                <div className="vitals-column">
                  <h3>At Rest</h3>
                  
                  <div className="form-group">
                    <label>Heart Rate</label>
                    <input 
                      type="number" 
                      value={data.restHeartRate || ''}
                      onChange={(e) => handleChange('restHeartRate', e.target.value)}
                      placeholder="Enter heart rate"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Blood Pressure</label>
                    <div className="bp-inputs">
                      <input 
                        type="number" 
                        value={data.restSystolic || ''}
                        onChange={(e) => handleChange('restSystolic', e.target.value)}
                        placeholder="Systolic"
                      />
                      <span>/</span>
                      <input 
                        type="number" 
                        value={data.restDiastolic || ''}
                        onChange={(e) => handleChange('restDiastolic', e.target.value)}
                        placeholder="Diastolic"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Respirations</label>
                    <input 
                      type="number" 
                      value={data.restRespirations || ''}
                      onChange={(e) => handleChange('restRespirations', e.target.value)}
                      placeholder="Enter respirations"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>O<sub>2</sub> Saturation</label>
                    <div className="input-with-unit">
                      <input 
                        type="number" 
                        value={data.restO2Saturation || ''}
                        onChange={(e) => handleChange('restO2Saturation', e.target.value)}
                        placeholder="Enter O2 saturation"
                      />
                      <span className="unit">%</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Temperature</label>
                    <input 
                      type="number" 
                      value={data.temperature || ''}
                      onChange={(e) => handleChange('temperature', e.target.value)}
                      placeholder="Enter temperature"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="vitals-column">
                  <h3>After Exertion</h3>
                  
                  <div className="form-group">
                    <label>Heart Rate</label>
                    <input 
                      type="number" 
                      value={data.exertionHeartRate || ''}
                      onChange={(e) => handleChange('exertionHeartRate', e.target.value)}
                      placeholder="Enter heart rate"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Blood Pressure</label>
                    <div className="bp-inputs">
                      <input 
                        type="number" 
                        value={data.exertionSystolic || ''}
                        onChange={(e) => handleChange('exertionSystolic', e.target.value)}
                        placeholder="Systolic"
                      />
                      <span>/</span>
                      <input 
                        type="number" 
                        value={data.exertionDiastolic || ''}
                        onChange={(e) => handleChange('exertionDiastolic', e.target.value)}
                        placeholder="Diastolic"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Respirations</label>
                    <input 
                      type="number" 
                      value={data.exertionRespirations || ''}
                      onChange={(e) => handleChange('exertionRespirations', e.target.value)}
                      placeholder="Enter respirations"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>O<sub>2</sub> Saturation</label>
                    <div className="input-with-unit">
                      <input 
                        type="number" 
                        value={data.exertionO2Saturation || ''}
                        onChange={(e) => handleChange('exertionO2Saturation', e.target.value)}
                        placeholder="Enter O2 saturation"
                      />
                      <span className="unit">%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Vitals Additional</label>
                  <textarea 
                    value={data.vitalsAdditional || ''}
                    onChange={(e) => handleChange('vitalsAdditional', e.target.value)}
                    rows={3}
                    placeholder="Additional vitals information"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="vitalsOutOfParameters" 
                    checked={data.vitalsOutOfParameters || false}
                    onChange={(e) => handleChange('vitalsOutOfParameters', e.target.checked)}
                  />
                  <label htmlFor="vitalsOutOfParameters">Vitals Out of Parameters</label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'pain' && (
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
                </>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'medication' && (
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
              
              <button className="medication-list-btn">
                <i className="fas fa-pills"></i>
                <span>View/Add Medication List</span>
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'tests' && (
          <div className="tests-tab">
            <div className="form-section">
              <h2>Standardized Tests</h2>
              
              <div className="tests-grid">
                <StandardizedTest 
                  title="ACE III" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('ACE III')}
                />
                
                <StandardizedTest 
                  title="Tinetti" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Tinetti')}
                />
                
                <StandardizedTest 
                  title="Timed Up And Go" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Timed Up And Go')}
                />
                
                <StandardizedTest 
                  title="Functional Reach" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Functional Reach')}
                />
                
                <StandardizedTest 
                  title="BERG" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('BERG')}
                />
                
                <StandardizedTest 
                  title="Fall Risk Assessment" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Fall Risk Assessment')}
                />
                
                <StandardizedTest 
                  title="Advanced Balance" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Advanced Balance')}
                />
                
                <StandardizedTest 
                  title="MAHC10" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('MAHC10')}
                />
                
                <StandardizedTest 
                  title="Barthel Index" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Barthel Index')}
                />
                
                <StandardizedTest 
                  title="Short Physical Performance Battery" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Short Physical Performance Battery')}
                />
                
                <StandardizedTest 
                  title="Nutritional Status Assessment" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Nutritional Status Assessment')}
                />
                
                <StandardizedTest 
                  title="Diabetic Foot Exam" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Diabetic Foot Exam')}
                />
                
                <StandardizedTest 
                  title="Katz Index" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Katz Index')}
                />
                
                <StandardizedTest 
                  title="Wound Assessment" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Wound Assessment')}
                />
                
                <StandardizedTest 
                  title="Braden Scale" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Braden Scale')}
                />
                
                <StandardizedTest 
                  title="Medication List" 
                  isComplete={false}
                  onOpen={() => handleOpenTest('Medication List')}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTEvaluation;

