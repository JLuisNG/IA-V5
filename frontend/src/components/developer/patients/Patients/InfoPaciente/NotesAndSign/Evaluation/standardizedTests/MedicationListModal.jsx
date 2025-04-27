// components/standardizedTests/MedicationListModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/MedicationListModal.scss';

const MedicationListModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    medications: initialData?.medications || [],
    sideEffects: initialData?.sideEffects || 'No',
    knowledgeDeficit: initialData?.knowledgeDeficit || 'No',
    nonCompliance: initialData?.nonCompliance || 'No',
    medicationQuestions: initialData?.medicationQuestions || 'No',
    adverseEffects: initialData?.adverseEffects || 'No',
    problemsExplanation: initialData?.problemsExplanation || '',
    medicationsReconciled: initialData?.medicationsReconciled || 'No',
    allergies: initialData?.allergies || '',
    noKnownAllergies: initialData?.noKnownAllergies || false,
    pharmacy: initialData?.pharmacy || '',
    administeredBy: initialData?.administeredBy || 'Patient',
    isComplete: initialData?.isComplete || false
  });

  // Estado para nuevo medicamento que se está agregando
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    route: '',
    prescriber: '',
    purpose: '',
    startDate: '',
    endDate: ''
  });

  // Estado para edición de medicamento
  const [editingIndex, setEditingIndex] = useState(null);

  // Estado para validación
  const [validationErrors, setValidationErrors] = useState({});
  const [medicationErrors, setMedicationErrors] = useState({});

  // Opciones para selección
  const yesNoOptions = [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' }
  ];

  const administeredByOptions = [
    { value: 'Patient', label: 'Patient' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Family', label: 'Family' },
    { value: 'Caregiver', label: 'Caregiver' }
  ];

  const routeOptions = [
    { value: 'Oral', label: 'Oral' },
    { value: 'Topical', label: 'Topical' },
    { value: 'Inhalation', label: 'Inhalation' },
    { value: 'Injection', label: 'Injection' },
    { value: 'Sublingual', label: 'Sublingual' },
    { value: 'Rectal', label: 'Rectal' },
    { value: 'Transdermal', label: 'Transdermal' },
    { value: 'Other', label: 'Other' }
  ];

  const frequencyOptions = [
    { value: 'Once daily', label: 'Once daily' },
    { value: 'Twice daily', label: 'Twice daily' },
    { value: 'Three times daily', label: 'Three times daily' },
    { value: 'Four times daily', label: 'Four times daily' },
    { value: 'Every morning', label: 'Every morning' },
    { value: 'Every evening', label: 'Every evening' },
    { value: 'Every 4 hours', label: 'Every 4 hours' },
    { value: 'Every 6 hours', label: 'Every 6 hours' },
    { value: 'Every 8 hours', label: 'Every 8 hours' },
    { value: 'Every 12 hours', label: 'Every 12 hours' },
    { value: 'As needed', label: 'As needed (PRN)' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Other', label: 'Other' }
  ];

  // Manejar cambios en los campos del formulario principal
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));

    // Si cambiamos noKnownAllergies a true, limpiamos el campo de alergias
    if (field === 'noKnownAllergies' && value === true) {
      setFormData(prevData => ({
        ...prevData,
        allergies: ''
      }));
    }

    // Limpiar error de validación si existe
    if (validationErrors[field]) {
      setValidationErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Manejar cambios en los campos del nuevo medicamento
  const handleMedicationChange = (field, value) => {
    setNewMedication(prevMed => ({
      ...prevMed,
      [field]: value
    }));

    // Limpiar error de validación si existe
    if (medicationErrors[field]) {
      setMedicationErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validar campos del nuevo medicamento
  const validateMedication = () => {
    const errors = {};
    const requiredFields = ['name', 'dosage', 'frequency', 'route'];

    requiredFields.forEach(field => {
      if (!newMedication[field]) errors[field] = true;
    });

    setMedicationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Agregar nuevo medicamento
  const handleAddMedication = () => {
    if (validateMedication()) {
      if (editingIndex !== null) {
        // Actualizar medicamento existente
        const updatedMedications = [...formData.medications];
        updatedMedications[editingIndex] = newMedication;
        
        setFormData(prevData => ({
          ...prevData,
          medications: updatedMedications
        }));
        
        setEditingIndex(null);
      } else {
        // Agregar nuevo medicamento
        setFormData(prevData => ({
          ...prevData,
          medications: [...prevData.medications, newMedication]
        }));
      }

      // Limpiar formulario de medicamento
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        route: '',
        prescriber: '',
        purpose: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  // Editar medicamento existente
  const handleEditMedication = (index) => {
    setNewMedication(formData.medications[index]);
    setEditingIndex(index);
  };

  // Eliminar medicamento
  const handleDeleteMedication = (index) => {
    const updatedMedications = formData.medications.filter((_, i) => i !== index);
    
    setFormData(prevData => ({
      ...prevData,
      medications: updatedMedications
    }));

    // Si estábamos editando este medicamento, cancelamos la edición
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        route: '',
        prescriber: '',
        purpose: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  // Validar formulario completo antes de enviar
  const validateForm = () => {
    // Para este formulario, no hacemos obligatorio ningún campo específico
    // excepto si el paciente tiene efectos secundarios, conocimientos deficientes, etc.
    const errors = {};

    if (formData.sideEffects === 'Yes' || 
        formData.knowledgeDeficit === 'Yes' || 
        formData.nonCompliance === 'Yes' || 
        formData.medicationQuestions === 'Yes' || 
        formData.adverseEffects === 'Yes') {
      if (!formData.problemsExplanation) {
        errors.problemsExplanation = true;
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onClose({
        ...formData,
        isComplete: true
      });
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="medication-list-modal-overlay">
      <div className="medication-list-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-pills"></i>
            Medication List
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="section medications-section">
            <h3>Current Medications</h3>
            
            <div className="medication-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Medication Name*</label>
                  <input
                    type="text"
                    placeholder="Enter medication name"
                    value={newMedication.name}
                    onChange={(e) => handleMedicationChange('name', e.target.value)}
                    className={medicationErrors.name ? 'error' : ''}
                  />
                  {medicationErrors.name && <div className="error-message">Required</div>}
                </div>
                
                <div className="form-group">
                  <label>Dosage*</label>
                  <input
                    type="text"
                    placeholder="Enter dosage"
                    value={newMedication.dosage}
                    onChange={(e) => handleMedicationChange('dosage', e.target.value)}
                    className={medicationErrors.dosage ? 'error' : ''}
                  />
                  {medicationErrors.dosage && <div className="error-message">Required</div>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Frequency*</label>
                  <select
                    value={newMedication.frequency}
                    onChange={(e) => handleMedicationChange('frequency', e.target.value)}
                    className={medicationErrors.frequency ? 'error' : ''}
                  >
                    <option value="">Select frequency</option>
                    {frequencyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {medicationErrors.frequency && <div className="error-message">Required</div>}
                </div>
                
                <div className="form-group">
                  <label>Route*</label>
                  <select
                    value={newMedication.route}
                    onChange={(e) => handleMedicationChange('route', e.target.value)}
                    className={medicationErrors.route ? 'error' : ''}
                  >
                    <option value="">Select route</option>
                    {routeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {medicationErrors.route && <div className="error-message">Required</div>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Prescriber</label>
                  <input
                    type="text"
                    placeholder="Prescribing doctor"
                    value={newMedication.prescriber}
                    onChange={(e) => handleMedicationChange('prescriber', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Purpose</label>
                  <input
                    type="text"
                    placeholder="Purpose of medication"
                    value={newMedication.purpose}
                    onChange={(e) => handleMedicationChange('purpose', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newMedication.startDate}
                    onChange={(e) => handleMedicationChange('startDate', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newMedication.endDate}
                    onChange={(e) => handleMedicationChange('endDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  className="add-medication-btn"
                  onClick={handleAddMedication}
                >
                  {editingIndex !== null ? 'Update Medication' : 'Add Medication'}
                </button>
                {editingIndex !== null && (
                  <button 
                    className="cancel-edit-btn"
                    onClick={() => {
                      setEditingIndex(null);
                      setNewMedication({
                        name: '',
                        dosage: '',
                        frequency: '',
                        route: '',
                        prescriber: '',
                        purpose: '',
                        startDate: '',
                        endDate: ''
                      });
                      setMedicationErrors({});
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
            
            <div className="medications-list">
              {formData.medications.length > 0 ? (
                <div className="medications-table">
                  <div className="table-header">
                    <div className="column">Medication</div>
                    <div className="column">Dosage</div>
                    <div className="column">Frequency</div>
                    <div className="column">Route</div>
                    <div className="column">Actions</div>
                  </div>
                  
                  {formData.medications.map((medication, index) => (
                    <div className="table-row" key={index}>
                      <div className="column">
                        <span className="med-name">{medication.name}</span>
                        {medication.purpose && <span className="med-purpose">({medication.purpose})</span>}
                      </div>
                      <div className="column">{medication.dosage}</div>
                      <div className="column">{medication.frequency}</div>
                      <div className="column">{medication.route}</div>
                      <div className="column actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditMedication(index)}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteMedication(index)}
                          title="Delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-medications">
                  <p>No medications added yet</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="section questions-section">
            <h3>Medication Assessment</h3>
            
            <div className="assessment-questions">
              <div className="question-item">
                <label className="question-label">A. DOES THE PATIENT REPORT EXPERIENCING 1 OR MORE SIGNIFICANT SIDE EFFECTS TO CURRENT DRUG REGIMEN?</label>
                <select
                  value={formData.sideEffects}
                  onChange={(e) => handleChange('sideEffects', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="question-item">
                <label className="question-label">B. DOES THE PATIENT AND/OR CAREGIVER DEMONSTRATE A KNOWLEDGE DEFICIT RELATED TO CURRENT MEDICATION USE?</label>
                <select
                  value={formData.knowledgeDeficit}
                  onChange={(e) => handleChange('knowledgeDeficit', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="question-item">
                <label className="question-label">C. DOES THE PATIENT DEMONSTRATE NONCOMPLIANCE WITH MEDICATION USE, AS PRESCRIBED BY PHYSICIAN?</label>
                <select
                  value={formData.nonCompliance}
                  onChange={(e) => handleChange('nonCompliance', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="question-item">
                <label className="question-label">D. DOES THE PATIENT AND/OR CAREGIVER HAVE ANY QUESTIONS RELATED TO CURRENT MEDICATIONS INCLUDING PURPOSE, DOSAGE, OR ADMINISTRATION?</label>
                <select
                  value={formData.medicationQuestions}
                  onChange={(e) => handleChange('medicationQuestions', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="question-item">
                <label className="question-label">E. HAVE POTENTIAL ADVERSE EFFECTS, SIGNIFICANT DRUG INTERACTIONS, DUPLICATE INEFFECTIVE DRUG THERAPY AND POTENTIAL CONTRAINDICATIONS BEEN IDENTIFIED?</label>
                <select
                  value={formData.adverseEffects}
                  onChange={(e) => handleChange('adverseEffects', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="question-item problems-explanation">
                <label className="question-label">F. DESCRIBE PROBLEMS AND ACTION FOR "YES" RESPONSES:</label>
                <textarea
                  value={formData.problemsExplanation}
                  onChange={(e) => handleChange('problemsExplanation', e.target.value)}
                  placeholder="Describe any identified problems and actions taken"
                  rows={4}
                  className={validationErrors.problemsExplanation ? 'error' : ''}
                />
                {validationErrors.problemsExplanation && (
                  <div className="error-message">Required for "Yes" responses</div>
                )}
              </div>
              
              <div className="question-item">
                <label className="question-label">G. MEDICATIONS RECONCILED (PER AGENCY POLICY):</label>
                <select
                  value={formData.medicationsReconciled}
                  onChange={(e) => handleChange('medicationsReconciled', e.target.value)}
                >
                  {yesNoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="section additional-info-section">
            <div className="form-row">
              <div className="form-group allergies-group">
                <label>ALLERGIES:</label>
                <div className="allergies-input">
                  <input
                    type="text"
                    placeholder="List medication allergies"
                    value={formData.allergies}
                    onChange={(e) => handleChange('allergies', e.target.value)}
                    disabled={formData.noKnownAllergies}
                  />
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="noKnownAllergies"
                      checked={formData.noKnownAllergies}
                      onChange={(e) => handleChange('noKnownAllergies', e.target.checked)}
                    />
                    <label htmlFor="noKnownAllergies">No Known Drug Allergies</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>PHARMACY:</label>
                <input
                  type="text"
                  placeholder="Pharmacy name and contact information"
                  value={formData.pharmacy}
                  onChange={(e) => handleChange('pharmacy', e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>MEDICATIONS ADMINISTERED BY:</label>
                <select
                  value={formData.administeredBy}
                  onChange={(e) => handleChange('administeredBy', e.target.value)}
                >
                  {administeredByOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
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

export default MedicationListModal;