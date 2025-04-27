// components/ObjectiveSections/PatientCaregiverEducationSection.jsx
import React from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/ObjectiveSections/PatientCaregiverEducationSection.scss';

const PatientCaregiverEducationSection = ({ data, onChange }) => {
  // Lista de opciones para educación independiente
  const educationOptions = [
    { id: 'woundCare', label: 'Wound Care' },
    { id: 'insulinAdministration', label: 'Insulin Administration' },
    { id: 'nutritionalManagement', label: 'Nutritional Management' },
    { id: 'painManagement', label: 'Pain Management' },
    { id: 'useOfMedicalDevices', label: 'Use of Medical Devices' },
    { id: 'ostomyCare', label: 'Ostomy Care' },
    { id: 'caregiverPresent', label: 'Caregiver Present at time of visit' },
    { id: 'diabeticFootExam', label: 'Diabetic Foot Exam/Care' },
    { id: 'glucometerUse', label: 'Glucometer Use' },
    { id: 'medicationsAdministration', label: 'Oral/Injected/Infused/Inhaled medication(s) Administration' },
    { id: 'oxygenUse', label: 'Oxygen Use' },
    { id: 'trachCare', label: 'Trach Care' },
    { id: 'otherCares', label: 'Other Care(s)' },
    { id: 'satisfactoryReturnDemo', label: 'Satisfactory Return Demo' }
  ];
  
  // Opciones para los selects
  const yesNoOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (field) => {
    const updatedEducation = {
      ...(data.education || {}),
      [field]: !(data.education?.[field] || false)
    };
    
    onChange({
      ...data,
      education: updatedEducation
    });
  };

  // Manejar cambios en los selects
  const handleSelectChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // Manejar cambios en textarea
  const handleTextChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="patient-caregiver-education-section">
      <h2 className="section-title">Patient / Caregiver Education</h2>
      
      <div className="education-options-section">
        <h3 className="subsection-title">PATIENT/CAREGIVER INDEPENDENT WITH:</h3>
        
        <div className="education-options-grid">
          {educationOptions.map(option => (
            <div className="checkbox-item" key={option.id}>
              <input 
                type="checkbox" 
                id={option.id} 
                checked={data.education?.[option.id] || false}
                onChange={() => handleCheckboxChange(option.id)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="questions-section">
        <div className="question-row">
          <span className="question-label">DOES THE PATIENT/CAREGIVER HAVE AN ACTION PLAN WHEN DISEASE SYMPTOMS EXACERBATE (E.G., WHEN TO CALL THE HOMECARE AGENCY VS. EMERGENCY SERVICES):</span>
          <select 
            value={data.hasActionPlan || ''}
            onChange={(e) => handleSelectChange('hasActionPlan', e.target.value)}
          >
            {yesNoOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="question-row">
          <span className="question-label">DOES PATIENT/CAREGIVER APPEARS TO UNDERSTAND ALL INFORMATION GIVEN:</span>
          <select 
            value={data.understandsInformation || ''}
            onChange={(e) => handleSelectChange('understandsInformation', e.target.value)}
          >
            {yesNoOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="additional-info-row">
        <span className="label">ADDITIONAL INFORMATION:</span>
        <textarea 
          value={data.additionalInformation || ''}
          onChange={(e) => handleTextChange('additionalInformation', e.target.value)}
          rows={3}
          placeholder="Add any additional information about patient/caregiver education"
        />
      </div>
    </div>
  );
};

export default PatientCaregiverEducationSection;