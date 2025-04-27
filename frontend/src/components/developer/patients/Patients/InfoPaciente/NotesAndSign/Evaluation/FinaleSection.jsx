// components/FinaleSection.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/FinaleSection.scss';
import SignaturePad from './SignaturePad';

const FinaleSection = ({ data, onChange, autoSaveMessage }) => {
  const [activeTab, setActiveTab] = useState('additionalForms');

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const tabs = [
    { id: 'additionalForms', label: 'Additional Forms' },
    { id: 'patientSignature', label: 'Patient Signature' },
    { id: 'therapistSignature', label: 'Therapist Signature' },
    { id: 'therapistDate', label: 'Therapist Date' },
    { id: 'timeInOut', label: 'Time In / Time Out' },
    { id: 'finalize', label: 'Finalize' }
  ];

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const [units, setUnits] = useState('(4) - 53-67 minutes');

  useEffect(() => {
    if (data.timeInHour && data.timeInMinute && data.timeOutHour && data.timeOutMinute && 
        data.timeInAmPm && data.timeOutAmPm) {
      const timeInMinutes = calculateTotalMinutes(data.timeInHour, data.timeInMinute, data.timeInAmPm);
      const timeOutMinutes = calculateTotalMinutes(data.timeOutHour, data.timeOutMinute, data.timeOutAmPm);
      let diffMinutes = timeOutMinutes - timeInMinutes;
      if (diffMinutes < 0) diffMinutes += 24 * 60;

      let unitValue = '(0) - 0 minutes';
      if (diffMinutes >= 8 && diffMinutes <= 22) unitValue = '(1) - 8-22 minutes';
      else if (diffMinutes >= 23 && diffMinutes <= 37) unitValue = '(2) - 23-37 minutes';
      else if (diffMinutes >= 38 && diffMinutes <= 52) unitValue = '(3) - 38-52 minutes';
      else if (diffMinutes >= 53 && diffMinutes <= 67) unitValue = '(4) - 53-67 minutes';
      else if (diffMinutes >= 68 && diffMinutes <= 82) unitValue = '(5) - 68-82 minutes';
      else if (diffMinutes >= 83) unitValue = '(6+) - 83+ minutes';

      setUnits(unitValue);
    }
  }, [data.timeInHour, data.timeInMinute, data.timeOutHour, data.timeOutMinute, data.timeInAmPm, data.timeOutAmPm]);

  const calculateTotalMinutes = (hour, minute, ampm) => {
    let h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (ampm === 'PM' && h !== 12) h += 12;
    else if (ampm === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  };

  const handlePatientSignatureChange = (signatureData) => {
    handleChange('patientSignature', signatureData);
  };

  const handleTherapistSignatureChange = (signatureData) => {
    handleChange('therapistSignature', signatureData);
  };

  const handleDateSignatureChange = (signatureData) => {
    handleChange('dateSignature', signatureData);
  };

  const handleMoveSignatureToPatient = () => {
    if (data.therapistSignature) {
      handleChange('patientSignature', data.therapistSignature);
      handleChange('therapistSignature', null);
      setActiveTab('patientSignature');
    }
  };

  const handleMoveDateToPatient = () => {
    if (data.dateSignature) {
      handleChange('patientSignature', data.dateSignature);
      handleChange('dateSignature', null);
      setActiveTab('patientSignature');
    }
  };

  const hasIncompleteSections = () => {
    const requiredSections = ['subjective', 'transfers', 'problemList', 'skilledCare', 'muscleStrength'];
    return requiredSections.some(section => !data[section]);
  };

  return (
    <div className="finale-section-container">
      <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'additionalForms' && (
          <div className="additional-forms-tab">
            <div className="form-section">
              <div className="section-title">
                <h2>Additional Forms</h2>
                {autoSaveMessage && (
                  <span className="autosaved-badge visible">{autoSaveMessage}</span>
                )}
              </div>

              <div className="forms-reference">
                <table className="forms-table">
                  <tbody>
                    <tr><td>NOMNC:</td><td>Notice of Medicare Non-Coverage</td></tr>
                    <tr><td>ABN:</td><td>Advance Beneficiary Notice of Non-Coverage</td></tr>
                    <tr><td>HHCCN:</td><td>Home Health Change of Care Notice</td></tr>
                    <tr><td>Patient's Rights Notification:</td><td>Patient's Rights Notification</td></tr>
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
              <div className="section-title">
                <h2>Capture Patient Signature</h2>
                {autoSaveMessage && (
                  <span className="autosaved-badge visible">{autoSaveMessage}</span>
                )}
              </div>
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
              <SignaturePad 
                label="SIGN" 
                onSignatureChange={handlePatientSignatureChange}
                initialSignature={data.patientSignature}
                disabled={data.capturedSignatureOutside}
              />
            </div>
          </div>
        )}

        {activeTab === 'therapistSignature' && (
          <div className="therapist-signature-tab">
            <div className="form-section">
              <div className="section-title">
                <h2>Capture Therapist Signature</h2>
                {autoSaveMessage && (
                  <span className="autosaved-badge visible">{autoSaveMessage}</span>
                )}
              </div>
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
              <div className="form-row signature-control-row">
                <div className="signature-control-text">
                  <p>Did the patient accidentally sign the wrong spot? Click here to move this signature to the patient spot.</p>
                </div>
                <button 
                  className="move-signature-btn"
                  onClick={handleMoveSignatureToPatient}
                  disabled={!data.therapistSignature}
                >
                  MOVE SIGNATURE
                </button>
              </div>
              <SignaturePad 
                label="SIGN" 
                onSignatureChange={handleTherapistSignatureChange}
                initialSignature={data.therapistSignature}
                disabled={data.therapistSignatureOutside}
              />
            </div>
          </div>
        )}

        {activeTab === 'therapistDate' && (
          <div className="therapist-date-tab">
            <div className="form-section">
              <div className="section-title">
                <h2>Capture Date</h2>
                {autoSaveMessage && (
                  <span className="autosaved-badge visible">{autoSaveMessage}</span>
                )}
              </div>
              <div className="form-row signature-control-row">
                <div className="signature-control-text">
                  <p>Did the patient accidentally sign the wrong spot? Click here to move this signature to the patient spot.</p>
                </div>
                <button 
                  className="move-signature-btn"
                  onClick={handleMoveDateToPatient}
                  disabled={!data.dateSignature}
                >
                  MOVE SIGNATURE
                </button>
              </div>
              <SignaturePad 
                label="DATE" 
                onSignatureChange={handleDateSignatureChange}
                initialSignature={data.dateSignature}
              />
            </div>
          </div>
        )}

        {activeTab === 'timeInOut' && (
          <div className="time-in-out-tab">
            <div className="form-section">
              <div className="section-title">
                <h2>Time In/Time Out</h2>
                {autoSaveMessage && (
                  <span className="autosaved-badge visible">{autoSaveMessage}</span>
                )}
              </div>
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
                      {hours.map(hour => (
                        <option key={`in-hour-${hour}`} value={hour}>{hour}</option>
                      ))}
                    </select>
                    <span className="time-separator">:</span>
                    <select 
                      value={data.timeInMinute || '15'}
                      onChange={(e) => handleChange('timeInMinute', e.target.value)}
                    >
                      {minutes.map(minute => (
                        <option key={`in-min-${minute}`} value={minute}>{minute}</option>
                      ))}
                    </select>
                    <select 
                      value={data.timeInAmPm || 'AM'}
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
                      {hours.map(hour => (
                        <option key={`out-hour-${hour}`} value={hour}>{hour}</option>
                      ))}
                    </select>
                    <span className="time-separator">:</span>
                    <select 
                      value={data.timeOutMinute || '09'}
                      onChange={(e) => handleChange('timeOutMinute', e.target.value)}
                    >
                      {minutes.map(minute => (
                        <option key={`out-min-${minute}`} value={minute}>{minute}</option>
                      ))}
                    </select>
                    <select 
                      value={data.timeOutAmPm || 'AM'}
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
                        <option key={`drive-hour-${hour}`} value={hour}>{hour}</option>
                      ))}
                    </select>
                    <span className="time-separator">:</span>
                    <select 
                      value={data.driveTimeMinute || '00'}
                      onChange={(e) => handleChange('driveTimeMinute', e.target.value)}
                    >
                      {minutes.map(minute => (
                        <option key={`drive-min-${minute}`} value={minute}>{minute}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="units-display">
                <p>UNITS: {units}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finalize' && (
          <div className="finalize-tab">
            <div className="form-section">
              <div className="section-title">
                <h2>Finalize</h2>
                {autoSaveMessage && (
                  <span className="autosaved-badge visible">{autoSaveMessage}</span>
                )}
              </div>

              {hasIncompleteSections() && (
                <div className="incomplete-sections">
                  <p className="warning-text">
                    <i className="fas fa-exclamation-triangle"></i>
                    You must complete the following sections before being able to finalize:
                  </p>
                  <ul className="incomplete-list">
                    {!data.subjective && <li>Subjective</li>}
                    {!data.transfers && <li>Transfers / Functional Independence</li>}
                    {!data.problemList && <li>Problem List / Functional Limitations</li>}
                    {!data.skilledCare && <li>Skilled Care Provided This Visit</li>}
                    {!data.muscleStrength && <li>Muscle Strength/ROM</li>}
                  </ul>
                </div>
              )}

              <div className="summary-container">
                <div className="facility-info">
                  <p>14445 Avenida Colonia<br />
                     Moorpark, CA 93021<br />
                     (805) 223-4094</p>
                  <div className="patient-details">
                    <p><strong>DOB:</strong> {data.dob || 'Not provided'}</p>
                    <p><strong>Frequency:</strong> {data.frequency || 'Not provided'}</p>
                    <p><strong>Cert Period:</strong> {data.certPeriod || 'Not provided'}</p>
                  </div>
                </div>

                <div className="visit-info">
                  <p><strong>Physician:</strong> {data.physician || 'Not provided'}</p>
                  <p><strong>Agency:</strong> {data.agency || 'Not provided'}</p>
                  <p><strong>Medicare Week:</strong> Sunday - Saturday</p>
                  <div className="visit-details">
                    <p>
                      <strong>Visit Date:</strong> {data.visitDate || 'Not provided'}<br />
                      <strong>Time In:</strong> {data.timeInHour || 'Not set'}:{data.timeInMinute || 'Not set'} {data.timeInAmPm || 'Not set'} PST<br />
                      <strong>Time Out:</strong> {data.timeOutHour || 'Not set'}:{data.timeOutMinute || 'Not set'} {data.timeOutAmPm || 'Not set'} PST
                    </p>
                    <p>
                      <strong>Supervisor:</strong> {data.supervisor || 'Not provided'}<br />
                      <strong>Therapist:</strong> {data.therapist || 'Not provided'}<br />
                      w/ {data.company || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="patient-information">
                <h3>Patient Information</h3>
                <div className="patient-info-grid">
                  <div className="info-row">
                    <div className="info-label">Past Medical History:</div>
                    <div className="info-value">{data.pastMedicalHistory || 'Not provided'}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Past Therapy History:</div>
                    <div className="info-value">{data.pastTherapyHistory || 'Not provided'}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Weight Bearing Status:</div>
                    <div className="info-value">{data.weightBearingStatus || 'Not provided'}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Prior Level Of Function:</div>
                    <div className="info-value">{data.priorLevelOfFunction || 'Not provided'}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Surgical Procedure(s) History:</div>
                    <div className="info-value">{data.surgicalProcedures || 'Not provided'}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Hospitalization Dates (if applicable):</div>
                    <div className="info-value">{data.hospitalizationDates || 'Not provided'}</div>
                  </div>
                </div>

                <div className="patient-info-grid right-grid">
                  <div className="info-row">
                    <div className="info-label">Patient/Caregiver Expectations of Therapy:</div>
                    <div className="info-value">{data.expectations || 'Not provided'}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Therapy Diagnosis:</div>
                    <div className="info-value">{data.therapyDiagnosis || 'Not provided'}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Additional Disciplines:</div>
                    <div className="info-value">{data.additionalDisciplines || 'Not provided'}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Homebound Status:</div>
                    <div className="info-value">{data.homeboundStatus || 'Not provided'}</div>
                  </div>
                </div>
              </div>

              <div className="subjective-info">
                <h3>Subjective</h3>
                <p>{data.subjective || 'Not provided'}</p>
              </div>

              <div className="objective-info">
                <h3>Objective</h3>
                <p><strong>Transfers/Functional Independence:</strong> {data.transfers || 'Not provided'}</p>
                <p><strong>Problem List/Functional Limitations:</strong> {data.problemList || 'Not provided'}</p>
                <p><strong>Skilled Care Provided This Visit:</strong> {data.skilledCare || 'Not provided'}</p>
                <p><strong>Muscle Strength/ROM:</strong> {data.muscleStrength || 'Not provided'}</p>
                {data.prosthetics && data.prosthetics.length > 0 && (
                  <div>
                    <h4>Prosthetics</h4>
                    <ul>
                      {data.prosthetics.map((item, index) => (
                        <li key={index}>{item.type} - {item.usage} {item.notes ? `(${item.notes})` : ''}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.orthotics && data.orthotics.length > 0 && (
                  <div>
                    <h4>Orthotics</h4>
                    <ul>
                      {data.orthotics.map((item, index) => (
                        <li key={index}>{item.type} - {item.usage} {item.notes ? `(${item.notes})` : ''}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.additionalInformation && (
                  <p><strong>Additional Information:</strong> {data.additionalInformation}</p>
                )}
              </div>

              <div className="assessment-info">
                <h3>Assessment</h3>
                <p><strong>Rehab Potential:</strong> {data.rehabPotential || 'Not provided'}</p>
              </div>

              <div className="plan-info">
                <h3>Plan</h3>
                <p><strong>Treatment As Tolerated/Interventions:</strong> {data.treatmentInterventions || 'Not provided'}</p>
                <p><strong>Frequency:</strong> {data.frequency || 'Not provided'}</p>
                <p><strong>Additional Information:</strong> {data.certificationAdditionalInfo || 'Not provided'}</p>
              </div>

              <div className="goals-info">
                <h3>Goals</h3>
                {data.goals && Object.keys(data.goals).length > 0 ? (
                  Object.entries(data.goals).map(([category, goal]) => (
                    <div className="goal-category" key={category}>
                      <h4>{category}</h4>
                      <p>
                        <strong>Long Term (In Progress)</strong> - {goal.description || 'Not provided'}
                      </p>
                      <p>
                        <strong>Starting:</strong> {goal.startDate || 'Not provided'} 
                        <strong> Duration:</strong> {goal.duration || 'Not provided'} 
                        {goal.duration === '1' ? ' week' : ' weeks'} 
                        (Week of {
                          goal.startDate && goal.duration ? 
                          new Date(
                            new Date(goal.startDate).getTime() + 
                            (parseInt(goal.duration, 10) * 7 * 24 * 60 * 60 * 1000)
                          ).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) : 
                          'Not provided'
                        })
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No goals set.</p>
                )}
              </div>

              <div className="transfers-adl-info">
                <h3>Transfers / ADL</h3>
                <p>{data.transfers || 'Not provided'}</p>
              </div>

              <div className="signature-info">
                <p className="digital-signature-text">Digitally Signed, which is approved by the Home Health Care Governing Bodies and Federal Guidelines.</p>
                <div className="signature-grid">
                  <div className="signature-row">
                    <div className="signature-item">
                      <div className="signature-label">Patient (HATCHER, LEONARD)</div>
                      <div className="signature-image">
                        {data.patientSignature && (
                          <img src={data.patientSignature} alt="Patient Signature" />
                        )}
                      </div>
                    </div>
                    <div className="signature-item">
                      <div className="signature-label">Therapist (Weiss, Barry, PT)</div>
                      <div className="signature-image">
                        {data.therapistSignature && (
                          <img src={data.therapistSignature} alt="Therapist Signature" />
                        )}
                      </div>
                    </div>
                    <div className="signature-item">
                      <div className="signature-label">Date</div>
                      <div className="signature-image">
                        {data.dateSignature && (
                          <img src={data.dateSignature} alt="Date Signature" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinaleSection;