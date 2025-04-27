// components/ObjectiveSections/WoundCareSection.jsx
import React from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/ObjectiveSections/WoundCareSection.scss';
import StandardizedTest from '../StandardizedTest';

const WoundCareSection = ({ data, onChange, onOpenTest }) => {
  // Opciones para los dropdowns
  const testNames = {
    BRADEN: 'Braden Scale',
    WOUND: 'Wound Assessment'
  };

  // Manejar cambios en textarea
  const handleTextChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // Verificar si una prueba está completa
  const isTestComplete = (testName) => {
    return data?.standardizedTests?.[testName]?.isComplete || false;
  };

  // Obtener la puntuación de un test
  const getTestScore = (testName) => {
    return data?.standardizedTests?.[testName]?.score || null;
  };

  return (
    <div className="wound-care-section">
      <h2 className="section-title">Wound Care (Optional)</h2>
      
      <div className="description-section">
        <textarea 
          value={data.woundDescription || ''}
          onChange={(e) => handleTextChange('woundDescription', e.target.value)}
          rows={5}
          placeholder="Enter wound description, location, measurements, treatment plan, and any other relevant information"
        />
      </div>
      
      <div className="separator" />
      
      <div className="standardized-tests-section">
        <h3 className="subsection-title">STANDARDIZED TESTS</h3>
        
        <div className="tests-grid">
          <StandardizedTest 
            title={testNames.BRADEN}
            isComplete={isTestComplete(testNames.BRADEN)}
            score={getTestScore(testNames.BRADEN)}
            onOpen={() => onOpenTest(testNames.BRADEN)}
            className="wound-test-card"
          />
          
          <StandardizedTest 
            title={testNames.WOUND}
            isComplete={isTestComplete(testNames.WOUND)}
            score={getTestScore(testNames.WOUND)}
            onOpen={() => onOpenTest(testNames.WOUND)}
            className="wound-test-card"
          />
        </div>
      </div>
    </div>
  );
};

export default WoundCareSection;