// components/FinaleSection.jsx
import React, { useState } from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/FinaleSection.scss';
import StandardizedTest from './StandardizedTest';

const FinaleSection = ({ data, onChange }) => {
  // Estado local para manejar qué tab está activo
  const [activeTab, setActiveTab] = useState('additionalForms');
  
  // Manejador para los cambios en los campos
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };
  
  return (
    <div className="finale-section-container">
      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'additionalForms' ? 'active' : ''}`}
          onClick={() => setActiveTab('additionalForms')}
        >
          Additional Forms
        </button>
        <button 
          className={`tab-button ${activeTab === 'patientSignature' ? 'active' : ''}`}
          onClick={() => setActiveTab('patientSignature')}
        >
          Patient Signature
        </button>
        <button 
          className={`tab-button ${activeTab === 'therapistSignature' ? 'active' : ''}`}
          onClick={() => setActiveTab('therapistSignature')}
        >
          Therapist Signature
        </button>
        <button 
          className={`tab-button ${activeTab === 'therapistDate' ? 'active' : ''}`}
          onClick={() => setActiveTab('therapistDate')}
        >
          Therapist Date
        </button>
        <button 
          className={`tab-button ${activeTab === 'timeInOut' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeInOut')}
        >
          Time In / Time Out
        </button>
        <button 
          className={`tab-button ${activeTab === 'finalize' ? 'active' : ''}`}
          onClick={() => setActiveTab('finalize')}
        >
          Finalize
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'additionalForms' && (
          <div className="additional-forms-tab">
            <div className="form-section">
              <h2>Additional Forms</h2>
              
              <div className="forms-reference">
                <table className="forms-table">
                  <tbody>
                    <tr>
                      <td>NOMNC:</td>
                      <td>Notice of Medicare Non-Coverage</td>
                    </tr>
                    <tr>
                      <td>ABN:</td>
                      <td>Advance Beneficiary Notice of Non-Coverage</td>
                    </tr>
                    <tr>
                      <td>HHCCN:</td>
                      <td>Home Health Change of Care Notice</td>
                    </tr>
                    <tr>
                      <td>Patient's Rights Notification:</td>
                      <td>Patient's Rights Notification</td>
                    </tr>
                  </tbody>
                </table>
                <p className="form-note">*Consult an administrator for guidance</p>
              </div>
              
              <div className="form-row">
                <p>Check the forms that you would like to complete</p>
                
                <div className="forms-checkboxes">
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="nomnc" 
                      checked={data.nomnc || false}
                      onChange={(e) => handleChange('nomnc', e.target.checked)}
                    />
                    <label htmlFor="nomnc">NOMNC</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="abn" 
                      checked={data.abn || false}
                      onChange={(e) => handleChange('abn', e.target.checked)}
                    />
                    <label htmlFor="abn">ABN</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="hhccn" 
                      checked={data.hhccn || false}
                      onChange={(e) => handleChange('hhccn', e.target.checked)}
                    />
                    <label htmlFor="hhccn">HHCCN</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="patientsRights" 
                      checked={data.patientsRights || false}
                      onChange={(e) => handleChange('patientsRights', e.target.checked)}
                    />
                    <label htmlFor="patientsRights">Patient's Rights Notification</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'patientSignature' && (
          <div className="patient-signature-tab">
            <div className="form-section">
              <h2>Capture Patient Signature</h2>
              
              <div className="form-row">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="capturedSignatureOutside" 
                    checked={data.capturedSignatureOutside || false}
                    onChange={(e) => handleChange('capturedSignatureOutside', e.target.checked)}
                  />
                  <label htmlFor="capturedSignatureOutside">Captured signature outside of system</label>
                </div>
              </div>
              
              <div className="signature-pad">
                <div className="signature-area">
                  <span className="signature-label">SIGN</span>
                  <div className="signature-line"></div>
                </div>
                <button className="clear-btn">CLEAR</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'therapistSignature' && (
          <div className="therapist-signature-tab">
            <div className="form-section">
              <h2>Capture Therapist Signature</h2>
              
              <div className="form-row">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="therapistSignatureOutside" 
                    checked={data.therapistSignatureOutside || false}
                    onChange={(e) => handleChange('therapistSignatureOutside', e.target.checked)}
                  />
                  <label htmlFor="therapistSignatureOutside">Captured signature outside of system</label>
                </div>
              </div>
              
              <div className="form-row">
                <p>Did the patient accidentally sign the wrong spot? Click here to move this signature to the patient spot.</p>
                <button className="move-signature-btn">MOVE SIGNATURE</button>
              </div>
              
              <div className="signature-pad">
                <div className="signature-area">
                  <span className="signature-label">SIGN</span>
                  <div className="signature-line"></div>
                </div>
                <button className="clear-btn">CLEAR</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'therapistDate' && (
          <div className="therapist-date-tab">
            <div className="form-section">
              <h2>Capture Date</h2>
              
              <div className="form-row">
                <p>Did the patient accidentally sign the wrong spot? Click here to move this signature to the patient spot.</p>
                <button className="move-signature-btn">MOVE SIGNATURE</button>
              </div>
              
              <div className="signature-pad">
                <div className="signature-area">
                  <span className="signature-label">DATE</span>
                  <div className="signature-line"></div>
                </div>
                <button className="clear-btn">CLEAR</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'timeInOut' && (
          <div className="time-in-out-tab">
            <div className="form-section">
              <h2>Time In/Time Out</h2>
              
              <div className="form-row">
                <p className="time-note">Note: Be sure to modify your time in & time out. When you open a note, the current time is selected (as time in) & the system defaults units (4), as a guide for your time out. If this is your first visit of the day leave drive time at 0.</p>
              </div>
              
              <div className="time-selectors">
                <div className="time-group">
                  <label>TIME IN:</label>
                  <div className="time-inputs">
                    <select 
                      value={data.timeInHour || '05'}
                      onChange={(e) => handleChange('timeInHour', e.target.value)}
                    >
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                    <span>:</span>
                    <select 
                      value={data.timeInMinute || '41'}
                      onChange={(e) => handleChange('timeInMinute', e.target.value)}
                    >
                      {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(minute => (
                        <option key={minute} value={minute}>{minute}</option>
                      ))}
                    </select>
                    <select 
                      value={data.timeInAmPm || 'PM'}
                      onChange={(e) => handleChange('timeInAmPm', e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                
                <div className="time-group">
                  <label>TIME OUT:</label>
                  <div className="time-inputs">
                    <select 
                      value={data.timeOutHour || '06'}
                      onChange={(e) => handleChange('timeOutHour', e.target.value)}
                    >
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                    <span>:</span>
                    <select 
                      value={data.timeOutMinute || '35'}
                      onChange={(e) => handleChange('timeOutMinute', e.target.value)}
                    >
                      {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(minute => (
                        <option key={minute} value={minute}>{minute}</option>
                      ))}
                    </select>
                    <select 
                      value={data.timeOutAmPm || 'PM'}
                      onChange={(e) => handleChange('timeOutAmPm', e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="drive-time">
                <div className="time-group">
                  <label>DRIVE TIME:</label>
                  <div className="time-inputs">
                    <select 
                      value={data.driveTimeHour || '0'}
                      onChange={(e) => handleChange('driveTimeHour', e.target.value)}
                    >
                      {Array.from({ length: 5 }, (_, i) => String(i)).map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                    <span>:</span>
                    <select 
                      value={data.driveTimeMinute || '00'}
                      onChange={(e) => handleChange('driveTimeMinute', e.target.value)}
                    >
                      {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(minute => (
                        <option key={minute} value={minute}>{minute}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="units-display">
                <p>UNITS: (4) - 53-67 minutes</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'finalize' && (
          <div className="finalize-tab">
            <div className="form-section">
              <div className="incomplete-sections">
                <p className="warning-text">You must complete the following sections before being able to finalize:</p>
                <ul className="incomplete-list">
                  <li>Subjective</li>
                  <li>Transfers / Functional Independence</li>
                  <li>Problem List / Functional Limitations</li>
                  <li>Skilled Care Provided This Visit</li>
                  <li>Muscle Strength/ROM</li>
                </ul>
              </div>
              
              <h2>Finalize</h2>
              
              <div className="summary-container">
                <div className="facility-info">
                  <p>14445 Avenida Colonia<br />
                     Moorpark, CA 93021<br />
                     (805) 223-4094</p>
                  <p><strong>DOB:</strong> 07/19/1958<br />
                     <strong>Frequency:</strong> 1w1 2w1 1w1<br />
                     <strong>Cert Period:</strong> 03/27/2025 - 05/26/2025</p>
                </div>
                
                <div className="visit-info">
                  <p><strong>Physician:</strong> KRISTINA MUELLER<br />
                     <strong>Agency:</strong> DIVINE CARE HOME HEALTH SERVICES INC<br />
                     <strong>Medicare Week:</strong> Sunday - Saturday</p>
                  <p><strong>Visit Date:</strong> 04/10/2025<br />
                     <strong>Time In:</strong> 5:41 PM PST<br />
                     <strong>Time Out:</strong> 6:35 PM PST<br />
                     <strong>Supervisor:</strong> Barry Weiss, PT<br />
                     <strong>Therapist:</strong> Barry Weiss, PT<br />
                     w/ Motive Home Care</p>
                </div>
              </div>
              
              <div className="patient-information">
                <h3>Patient Information</h3>
                <div className="patient-info-grid">
                  <div className="info-row">
                    <div className="info-label">Past Medical History:</div>
                    <div className="info-value">To be obtained</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Past Therapy History:</div>
                    <div className="info-value"></div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Weight Bearing Status:</div>
                    <div className="info-value">CPMD</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Prior Level Of Function:</div>
                    <div className="info-value"></div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Surgical Procedure(s) History:</div>
                    <div className="info-value"></div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Hospitalization Dates (if applicable):</div>
                    <div className="info-value"></div>
                  </div>
                </div>
                
                <div className="patient-info-grid right-grid">
                  <div className="info-row">
                    <div className="info-label">Patient/Caregiver Expectations of Therapy:</div>
                    <div className="info-value">Nursing Diagnosis: see attached document</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Therapy Diagnosis:</div>
                    <div className="info-value">Hemiplegia, unspecified affecting left dominant side (G81.92)</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Additional Disciplines:</div>
                    <div className="info-value"></div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Homebound Status:</div>
                    <div className="info-value">Residual Weakness</div>
                  </div>
                </div>
              </div>
              
              <div className="rehab-info">
                <h3>Rehab Potential</h3>
                <p>- Good for stated goals</p>
              </div>
              
              <div className="treatment-info">
                <h3>Treatment As Tolerated/Interventions</h3>
                <p>- Evaluation, Therapeutic Exercise, Transfer Training, Establish Home Program, Gait Training, Stretching/Flexibility, Safety Training, Balance, PT and CG involved in development of goals and in agreement with POC</p>
              </div>
              
              <div className="certification-info">
                <h3>Certification Information</h3>
                <p><strong>Frequency:</strong> 1w1 2w1 1w1<br />
                  <strong>Additional Information:</strong></p>
              </div>
              
              <div className="goals-info">
                <h3>Goals</h3>
                <div className="goal-category">
                  <h4>Gait</h4>
                  <p><strong>Long Term (In Progress)</strong> - Patient to ambulate ft. on Even surfaces w/ No Assistive Device and I (No Assist) to ensure safe and functional ambulation</p>
                  <p><strong>Starting:</strong> 4/10/2025 <strong>Duration:</strong> 1 weeks (Week of 4/12/2025)</p>
                </div>
              </div>
              
              <div className="signature-info">
                <p className="digital-signature-text">Digitally Signed, which is approved by the Home Health Care Governing Bodies and Federal Guidelines.</p>
                
                <div className="signature-grid">
                  <div className="signature-row">
                    <div className="signature-label">Patient (HATCHER, LEONARD)</div>
                    <div className="signature-label">Therapist (Weiss, Barry , PT)</div>
                    <div className="signature-label">Date</div>
                  </div>
                </div>
              </div>
              
              {/* Finalize button would be here, but is shown in the footer navigation */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinaleSection;