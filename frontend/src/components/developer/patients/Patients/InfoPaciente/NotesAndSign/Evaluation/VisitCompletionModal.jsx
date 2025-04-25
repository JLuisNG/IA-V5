// VisitCompletionModal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/VisitCompletionModal.scss';

// Importar todos los componentes de los pasos
import Navigation from './Navigation';
import PTEvaluation from './PTEvaluation';
import ObjectiveSection from './ObjectiveSection';
import AssessmentSection from './AssessmentSection';
import PlanSection from './PlanSection';
import TransfersSection from './TransfersSection';
import FinaleSection from './FinaleSection';
import FooterNavigation from './FooterNavigation';


// Importar componentes de pruebas estandarizadas
import TinettiModal from './FstandardizedTests/TinettiModal.jsx';
import BergModal from './standardizedTests/BergModal.jsx';
import AceIIIModal from './standardizedTests/AceIIIModal.jsx';
import TimedUpAndGoModal from './standardizedTests/TimedUpAndGoModal.jsx';
import FunctionalReachModal from './standardizedTests/FunctionalReachModal.jsx';
import FallRiskModal from './standardizedTests/FallRiskModal.jsx';
import AdvancedBalanceModal from './standardizedTests/AdvancedBalanceModal.jsx';
import MAHC10Modal from './standardizedTests/MAHC10Modal.jsx';
import BarthelModal from './standardizedTests/BarthelModal.jsx';
import SPPBModal from './standardizedTests/SPPBModal.jsx';
import NutritionalAssessmentModal from './standardizedTests/NutritionalAssessmentModal.jsx';
import DiabeticFootModal from './standardizedTests/DiabeticFootModal.jsx';
import KatzModal from './standardizedTests/KatzModal.jsx';
import WoundAssessmentModal from './standardizedTests/WoundAssessmentModal.jsx';
import BradenScaleModal from './standardizedTests/BradenScaleModal.jsx';
import MedicationListModal from './standardizedTests/MedicationListModal.jsx';
import DiagnosisModal from './DiagnosisModal.jsx';

// Constantes para los nombres de los test estandarizados
const STANDARDIZED_TESTS = {
  ACE_III: 'ACE III',
  TINETTI: 'Tinetti',
  TIMED_UP_AND_GO: 'Timed Up And Go',
  FUNCTIONAL_REACH: 'Functional Reach',
  BERG: 'BERG',
  FALL_RISK: 'Fall Risk Assessment',
  ADVANCED_BALANCE: 'Advanced Balance',
  MAHC10: 'MAHC10',
  BARTHEL: 'Barthel Index',
  SPPB: 'Short Physical Performance Battery',
  NUTRITIONAL: 'Nutritional Status Assessment',
  DIABETIC_FOOT: 'Diabetic Foot Exam',
  KATZ: 'Katz Index',
  WOUND: 'Wound Assessment',
  BRADEN: 'Braden Scale',
  MEDICATION: 'Medication List'
};

const VisitCompletionModal = ({ isOpen, onClose, visitData, onSave }) => {
  // Estados para manejar los pasos y datos del formulario
  const [currentStep, setCurrentStep] = useState('evaluation');
  const [formData, setFormData] = useState({
    patientInfo: {},
    objective: {},
    transfers: {},
    assessment: {},
    plan: {},
    finale: {}
  });
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTest, setActiveTest] = useState(null);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  
  // Estado para controlar el guardado automático
  const [lastSaved, setLastSaved] = useState(new Date());
  const [autoSaveMessage, setAutoSaveMessage] = useState('');

  // Efecto para inicializar los datos del formulario con los datos de la visita
  useEffect(() => {
    if (visitData) {
      // Inicializar el formulario con los datos existentes de la visita si están disponibles
      // o con valores por defecto si es una nueva entrada
      setFormData({
        patientInfo: visitData.patientInfo || {},
        objective: visitData.objective || {},
        transfers: visitData.transfers || {},
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

  // Función para el guardado automático
  const autoSave = useCallback(async () => {
    if (isFormDirty) {
      try {
        await onSave(formData);
        setLastSaved(new Date());
        setAutoSaveMessage('AUTOSAVED');
        setTimeout(() => {
          setAutoSaveMessage('');
        }, 3000);
        setIsFormDirty(false);
      } catch (error) {
        console.error('Error during auto-save:', error);
      }
    }
  }, [formData, isFormDirty, onSave]);

  // Efecto para configurar el guardado automático cada 2 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 120000); // 2 minutos
    
    return () => clearInterval(interval);
  }, [autoSave]);

  // Función para cambiar entre los diferentes pasos
  const handleStepChange = (step) => {
    // Auto-guardar antes de cambiar de paso
    autoSave();
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
      // Implementar mensaje de error aquí
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

  // Manejar la apertura de una prueba estandarizada
  const handleOpenTest = (testName) => {
    setActiveTest(testName);
  };

  // Manejar el cierre de una prueba estandarizada
  const handleCloseTest = (testData) => {
    if (testData) {
      // Actualizar los datos del formulario con los resultados de la prueba
      const section = currentStep === 'evaluation' ? 'patientInfo' : 'objective';
      const updatedTests = {
        ...formData[section].standardizedTests,
        [activeTest]: testData
      };
      
      handleFormChange(section, {
        standardizedTests: updatedTests
      });
    }
    setActiveTest(null);
  };

  // Manejar la apertura del modal de diagnóstico
  const handleOpenDiagnosisModal = () => {
    setShowDiagnosisModal(true);
  };

  // Manejar el cierre del modal de diagnóstico
  const handleCloseDiagnosisModal = (diagnosisData) => {
    if (diagnosisData) {
      handleFormChange('patientInfo', {
        therapyDiagnosis: diagnosisData
      });
    }
    setShowDiagnosisModal(false);
  };

  // Renderizar el componente actual basado en el paso
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'evaluation':
        return (
          <PTEvaluation
            data={formData.patientInfo}
            onChange={(data) => handleFormChange('patientInfo', data)}
            onOpenTest={handleOpenTest}
            onOpenDiagnosisModal={handleOpenDiagnosisModal}
            autoSaveMessage={autoSaveMessage}
          />
        );
      case 'objective':
        return (
          <ObjectiveSection
            data={formData.objective}
            onChange={(data) => handleFormChange('objective', data)}
            onOpenTest={handleOpenTest}
            autoSaveMessage={autoSaveMessage}
          />
        );
        case 'transfers': // Nuevo paso para la sección de transferencias
      return (
        <TransfersSection
          data={formData.transfers || {}} // Asegurarse de que existe la sección en formData
          onChange={(data) => handleFormChange('transfers', data)}
          onOpenTest={handleOpenTest}
          autoSaveMessage={autoSaveMessage}
        />
      );
      case 'assessment':
        return (
          <AssessmentSection
            data={formData.assessment}
            onChange={(data) => handleFormChange('assessment', data)}
            autoSaveMessage={autoSaveMessage}
          />
        );
      case 'plan':
        return (
          <PlanSection
            data={formData.plan}
            onChange={(data) => handleFormChange('plan', data)}
            autoSaveMessage={autoSaveMessage}
          />
        );
      case 'finale':
        return (
          <FinaleSection
            data={formData.finale}
            onChange={(data) => handleFormChange('finale', data)}
            autoSaveMessage={autoSaveMessage}
          />
        );
      default:
        return <PTEvaluation data={formData.patientInfo} onChange={(data) => handleFormChange('patientInfo', data)} />;
    }
  };

  // Renderizar el modal de prueba estandarizada activo
  const renderActiveTestModal = () => {
    switch (activeTest) {
      case STANDARDIZED_TESTS.ACE_III:
        return <AceIIIModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.ACE_III]} 
        />;
      case STANDARDIZED_TESTS.TINETTI:
        return <TinettiModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.TINETTI]} 
        />;
      case STANDARDIZED_TESTS.TIMED_UP_AND_GO:
        return <TimedUpAndGoModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.TIMED_UP_AND_GO]} 
        />;
      case STANDARDIZED_TESTS.FUNCTIONAL_REACH:
        return <FunctionalReachModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.FUNCTIONAL_REACH]} 
        />;
      case STANDARDIZED_TESTS.BERG:
        return <BergModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.BERG]} 
        />;
      case STANDARDIZED_TESTS.FALL_RISK:
        return <FallRiskModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.FALL_RISK]} 
        />;
      case STANDARDIZED_TESTS.ADVANCED_BALANCE:
        return <AdvancedBalanceModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.ADVANCED_BALANCE]} 
        />;
      case STANDARDIZED_TESTS.MAHC10:
        return <MAHC10Modal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.MAHC10]} 
        />;
      case STANDARDIZED_TESTS.BARTHEL:
        return <BarthelModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.BARTHEL]} 
        />;
      case STANDARDIZED_TESTS.SPPB:
        return <SPPBModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.SPPB]} 
        />;
      case STANDARDIZED_TESTS.NUTRITIONAL:
        return <NutritionalAssessmentModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.NUTRITIONAL]} 
        />;
      case STANDARDIZED_TESTS.DIABETIC_FOOT:
        return <DiabeticFootModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.DIABETIC_FOOT]} 
        />;
      case STANDARDIZED_TESTS.KATZ:
        return <KatzModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.KATZ]} 
        />;
      case STANDARDIZED_TESTS.WOUND:
        return <WoundAssessmentModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.WOUND]} 
        />;
      case STANDARDIZED_TESTS.BRADEN:
        return <BradenScaleModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.BRADEN]} 
        />;
      case STANDARDIZED_TESTS.MEDICATION:
        return <MedicationListModal 
          isOpen={!!activeTest} 
          onClose={handleCloseTest} 
          initialData={formData.patientInfo.standardizedTests?.[STANDARDIZED_TESTS.MEDICATION]} 
        />;
      default:
        return null;
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
        
        {/* Renderizar el modal de prueba estandarizada activo */}
        {renderActiveTestModal()}
        
        {/* Modal de diagnóstico */}
        {showDiagnosisModal && (
          <DiagnosisModal
            isOpen={showDiagnosisModal}
            onClose={handleCloseDiagnosisModal}
            initialData={formData.patientInfo.therapyDiagnosis}
          />
        )}
      </div>
    </div>
  );
};

export default VisitCompletionModal;