// VisitCompletionModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/VisitCompletionModal.scss';

// Importar todos los componentes de los pasos
import Navigation from './Navigation.jsx';
import PTEvaluation from './PTEvaluation.jsx';
import ObjectiveSection from './ObjectiveSection.jsx';
import AssessmentSection from './AssessmentSection.jsx';
import PlanSection from './PlanSection.jsx';
import FinaleSection from './FinaleSection.jsx';
import FooterNavigation from './FooterNavigation.jsx';

const VisitCompletionModal = ({ isOpen, onClose, visitData, onSave }) => {
  // Estados para manejar los pasos y datos del formulario
  const [currentStep, setCurrentStep] = useState('evaluation');
  const [formData, setFormData] = useState({
    patientInfo: {},
    objective: {},
    assessment: {},
    plan: {},
    finale: {}
  });
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Efecto para inicializar los datos del formulario con los datos de la visita
  useEffect(() => {
    if (visitData) {
      // Inicializar el formulario con los datos existentes de la visita si están disponibles
      // o con valores por defecto si es una nueva entrada
      setFormData({
        patientInfo: visitData.patientInfo || {},
        objective: visitData.objective || {},
        assessment: visitData.assessment || {},
        plan: visitData.plan || {},
        finale: visitData.finale || {}
      });
    }
  }, [visitData]);

  // Función para manejar los cambios en los datos del formulario
  const handleFormChange = (section, data) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        ...data
      }
    }));
    setIsFormDirty(true);
  };

  // Función para cambiar entre los diferentes pasos
  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  // Función para guardar y salir
  const handleSaveAndExit = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
      // Manejar el error
    } finally {
      setIsSaving(false);
    }
  };

  // Función para mostrar las notas anteriores
  const handleShowPastNotes = () => {
    // Implementar lógica para mostrar notas anteriores
    console.log('Show past notes');
  };

  // Función para mostrar el formulario de referencia
  const handleShowReferral = () => {
    // Implementar lógica para mostrar formulario de referencia
    console.log('Show referral form');
  };

  // Función para mostrar los stickies
  const handleShowStickies = () => {
    // Implementar lógica para mostrar stickies
    console.log('Show stickies');
  };

  // Renderizar el componente actual basado en el paso
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'evaluation':
        return (
          <PTEvaluation
            data={formData.patientInfo}
            onChange={(data) => handleFormChange('patientInfo', data)}
          />
        );
      case 'objective':
        return (
          <ObjectiveSection
            data={formData.objective}
            onChange={(data) => handleFormChange('objective', data)}
          />
        );
      case 'assessment':
        return (
          <AssessmentSection
            data={formData.assessment}
            onChange={(data) => handleFormChange('assessment', data)}
          />
        );
      case 'plan':
        return (
          <PlanSection
            data={formData.plan}
            onChange={(data) => handleFormChange('plan', data)}
          />
        );
      case 'finale':
        return (
          <FinaleSection
            data={formData.finale}
            onChange={(data) => handleFormChange('finale', data)}
          />
        );
      default:
        return <PTEvaluation data={formData.patientInfo} onChange={(data) => handleFormChange('patientInfo', data)} />;
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="visit-completion-modal-overlay">
      <div className="visit-completion-modal">
        <div className="modal-header">
          <h2>PT Evaluation</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <Navigation 
          currentStep={currentStep} 
          onStepChange={handleStepChange}
          patientName={visitData?.patientName}
          visitDate={visitData?.date}
        />
        
        <div className="modal-content">
          {renderCurrentStep()}
        </div>
        
        <FooterNavigation
          onSaveAndExit={handleSaveAndExit}
          onPastNotes={handleShowPastNotes}
          onReferral={handleShowReferral}
          onStickies={handleShowStickies}
          currentStep={currentStep}
          onStepChange={handleStepChange}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default VisitCompletionModal;