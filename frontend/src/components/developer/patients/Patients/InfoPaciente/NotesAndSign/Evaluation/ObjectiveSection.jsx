// components/ObjectiveSection.jsx
import React, { useState } from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/ObjectiveSection.scss';
import StandardizedTest from './StandardizedTest';

// Importar los nuevos componentes
import CognitiveStatusSection from './ObjectiveSections/CognitiveStatusSection';
import SensorySection from './ObjectiveSections/SensorySection';
import EquipmentSection from './ObjectiveSections/EquipmentSection';
import ProstheticOrthoticSection from './ObjectiveSections/ProstheticOrthoticSection';
import PatientCaregiverEducationSection from './ObjectiveSections/PatientCaregiverEducationSection';
import WoundCareSection from './ObjectiveSections/WoundCareSection';

const ObjectiveSection = ({ data, onChange, onOpenTest, autoSaveMessage }) => {
  // Estados locales para los diversos componentes de la sección objetiva
  const [activeTab, setActiveTab] = useState('subjective');
  
  // Manejador para los cambios en los campos
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };
  
  // Manejador para los cambios en subsecciones completas
  const handleSectionChange = (section, sectionData) => {
    onChange({
      ...data,
      [section]: sectionData
    });
  };
  
  return (
    <div className="objective-section-container">
      <div className="section-header">
        <h2 className="section-title">Objective</h2>
        <span className={`autosaved-badge ${autoSaveMessage ? 'visible' : ''}`}>
          {autoSaveMessage || 'AUTOSAVED'}
        </span>
      </div>
      
      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'subjective' ? 'active' : ''}`}
          onClick={() => setActiveTab('subjective')}
        >
          Subjective
        </button>
        <button 
          className={`tab-button ${activeTab === 'cognitive' ? 'active' : ''}`}
          onClick={() => setActiveTab('cognitive')}
        >
          Cognitive Status
        </button>
        <button 
          className={`tab-button ${activeTab === 'sensory' ? 'active' : ''}`}
          onClick={() => setActiveTab('sensory')}
        >
          Sensory
        </button>
        <button 
          className={`tab-button ${activeTab === 'living' ? 'active' : ''}`}
          onClick={() => setActiveTab('living')}
        >
          Living Arrangements
        </button>
        <button 
          className={`tab-button ${activeTab === 'mobility' ? 'active' : ''}`}
          onClick={() => setActiveTab('mobility')}
        >
          Gait / Mobility
        </button>
        <button 
          className={`tab-button ${activeTab === 'muscle' ? 'active' : ''}`}
          onClick={() => setActiveTab('muscle')}
        >
          Muscle Strength/ROM
        </button>
        <button 
          className={`tab-button ${activeTab === 'balance' ? 'active' : ''}`}
          onClick={() => setActiveTab('balance')}
        >
          Balance
        </button>
        <button 
          className={`tab-button ${activeTab === 'equipment' ? 'active' : ''}`}
          onClick={() => setActiveTab('equipment')}
        >
          Equipment
        </button>
        <button 
          className={`tab-button ${activeTab === 'prosthetic' ? 'active' : ''}`}
          onClick={() => setActiveTab('prosthetic')}
        >
          Prosthetic/Orthotic
        </button>
        <button 
          className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Patient Education
        </button>
        <button 
          className={`tab-button ${activeTab === 'woundcare' ? 'active' : ''}`}
          onClick={() => setActiveTab('woundcare')}
        >
          Wound Care
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'subjective' && (
          <div className="subjective-tab">
            <div className="form-section">
              <h2>Subjective</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <textarea 
                    value={data.subjective || ''}
                    onChange={(e) => handleChange('subjective', e.target.value)}
                    rows={6}
                    placeholder="Enter patient's subjective experience and complaints"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'cognitive' && (
          <CognitiveStatusSection 
            data={data.cognitive || {}}
            onChange={(sectionData) => handleSectionChange('cognitive', sectionData)}
          />
        )}
        
        {activeTab === 'sensory' && (
          <SensorySection 
            data={data.sensory || {}}
            onChange={(sectionData) => handleSectionChange('sensory', sectionData)}
          />
        )}
        
        {activeTab === 'living' && (
          <div className="living-tab">
            <div className="form-section">
              <h2>Living Arrangements</h2>
              
              <div className="form-row living-options">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="clutter" 
                    checked={data.clutter || false}
                    onChange={(e) => handleChange('clutter', e.target.checked)}
                  />
                  <label htmlFor="clutter">Clutter</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="throwRugs" 
                    checked={data.throwRugs || false}
                    onChange={(e) => handleChange('throwRugs', e.target.checked)}
                  />
                  <label htmlFor="throwRugs">Throw Rugs</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="steps" 
                    checked={data.steps || false}
                    onChange={(e) => handleChange('steps', e.target.checked)}
                  />
                  <label htmlFor="steps">Steps</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="stairs" 
                    checked={data.stairs || false}
                    onChange={(e) => handleChange('stairs', e.target.checked)}
                  />
                  <label htmlFor="stairs">Stairs</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="railing" 
                    checked={data.railing || false}
                    onChange={(e) => handleChange('railing', e.target.checked)}
                  />
                  <label htmlFor="railing">Railing</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="house" 
                    checked={data.house || false}
                    onChange={(e) => handleChange('house', e.target.checked)}
                  />
                  <label htmlFor="house">House</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="apartment" 
                    checked={data.apartment || false}
                    onChange={(e) => handleChange('apartment', e.target.checked)}
                  />
                  <label htmlFor="apartment">Apartment</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="mobileHome" 
                    checked={data.mobileHome || false}
                    onChange={(e) => handleChange('mobileHome', e.target.checked)}
                  />
                  <label htmlFor="mobileHome">Mobile Home</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="assistedLiving" 
                    checked={data.assistedLiving || false}
                    onChange={(e) => handleChange('assistedLiving', e.target.checked)}
                  />
                  <label htmlFor="assistedLiving">Assisted Living Facility</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="governmentHousing" 
                    checked={data.governmentHousing || false}
                    onChange={(e) => handleChange('governmentHousing', e.target.checked)}
                  />
                  <label htmlFor="governmentHousing">Government Housing</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="nursingHome" 
                    checked={data.nursingHome || false}
                    onChange={(e) => handleChange('nursingHome', e.target.checked)}
                  />
                  <label htmlFor="nursingHome">Nursing Home</label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Additional Information</label>
                  <textarea 
                    value={data.livingAdditional || ''}
                    onChange={(e) => handleChange('livingAdditional', e.target.value)}
                    rows={4}
                    placeholder="Additional information about living arrangements"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'mobility' && (
          <div className="mobility-tab">
            <div className="form-section">
              <h2>Gait / Mobility Training</h2>
              
              <div className="form-row">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="mobilityNotApplicable" 
                    checked={data.mobilityNotApplicable || false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      handleChange('mobilityNotApplicable', isChecked);
                      // Clear other fields when "Not Applicable" is checked
                      if (isChecked) {
                        handleChange('levelSurface', false);
                        handleChange('unlevelSurface', false);
                        handleChange('carpetedSurface', false);
                        handleChange('gaitQualities', '');
                        handleChange('stairsCurb', '');
                        handleChange('sixMinuteWalk', '');
                        // Optionally clear standardized test data if needed
                        if (data.standardizedTests?.['Tinetti']) {
                          onChange({
                            ...data,
                            standardizedTests: {
                              ...data.standardizedTests,
                              'Tinetti': { ...data.standardizedTests['Tinetti'], isComplete: false }
                            }
                          });
                        }
                        if (data.standardizedTests?.['Timed Up And Go']) {
                          onChange({
                            ...data,
                            standardizedTests: {
                              ...data.standardizedTests,
                              'Timed Up And Go': { ...data.standardizedTests['Timed Up And Go'], isComplete: false }
                            }
                          });
                        }
                      }
                    }}
                  />
                  <label htmlFor="mobilityNotApplicable">Not Applicable</label>
                </div>
              </div>
              
              <div className="form-row mobility-options">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="levelSurface" 
                    checked={data.levelSurface || false}
                    onChange={(e) => handleChange('levelSurface', e.target.checked)}
                    disabled={data.mobilityNotApplicable}
                  />
                  <label htmlFor="levelSurface">Level Surface</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="unlevelSurface" 
                    checked={data.unlevelSurface || false}
                    onChange={(e) => handleChange('unlevelSurface', e.target.checked)}
                    disabled={data.mobilityNotApplicable}
                  />
                  <label htmlFor="unlevelSurface">Unlevel Surface</label>
                </div>
                
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="carpetedSurface" 
                    checked={data.carpetedSurface || false}
                    onChange={(e) => handleChange('carpetedSurface', e.target.checked)}
                    disabled={data.mobilityNotApplicable}
                  />
                  <label htmlFor="carpetedSurface">Carpeted Surface</label>
                </div>
              </div>
              
              <div className="form-row dual-column">
                <div className="form-group">
                  <label>Qualities / Deviations / Postures</label>
                  <textarea 
                    value={data.gaitQualities || ''}
                    onChange={(e) => handleChange('gaitQualities', e.target.value)}
                    rows={4}
                    placeholder="Describe gait qualities, deviations and postures"
                    disabled={data.mobilityNotApplicable}
                  />
                </div>
                
                <div className="form-group">
                  <label>Stairs / Curb</label>
                  <textarea 
                    value={data.stairsCurb || ''}
                    onChange={(e) => handleChange('stairsCurb', e.target.value)}
                    rows={4}
                    placeholder="Notes on stairs and curb navigation"
                    disabled={data.mobilityNotApplicable}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Six Minute Walk</label>
                  <input 
                    type="text" 
                    value={data.sixMinuteWalk || ''}
                    onChange={(e) => handleChange('sixMinuteWalk', e.target.value)}
                    placeholder="Enter distance covered in six minute walk"
                    disabled={data.mobilityNotApplicable}
                  />
                </div>
              </div>
              
              <div className="mobility-tests">
                <div className="standardized-tests-row">
                  <StandardizedTest 
                    title="Tinetti" 
                    isComplete={data?.standardizedTests?.['Tinetti']?.isComplete || false}
                    onOpen={() => !data.mobilityNotApplicable && onOpenTest('Tinetti')}
                    status={data.mobilityNotApplicable ? 'Not Required' : undefined}
                  />
                  
                  <StandardizedTest 
                    title="Timed Up And Go" 
                    isComplete={data?.standardizedTests?.['Timed Up And Go']?.isComplete || false}
                    onOpen={() => !data.mobilityNotApplicable && onOpenTest('Timed Up And Go')}
                    status={data.mobilityNotApplicable ? 'Not Required' : undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'muscle' && (
          <div className="muscle-tab">
            <div className="form-section">
              <h2>Muscle Strength/ROM</h2>
              
              <div className="form-row dual-column">
                <div className="form-group">
                  <label>Upper Extremities (UE)</label>
                  <textarea 
                    value={data.upperExtremities || ''}
                    onChange={(e) => handleChange('upperExtremities', e.target.value)}
                    rows={5}
                    placeholder="Describe upper extremities strength and ROM"
                  />
                </div>
                
                <div className="form-group">
                  <label>Lower Extremities (LE)</label>
                  <textarea 
                    value={data.lowerExtremities || ''}
                    onChange={(e) => handleChange('lowerExtremities', e.target.value)}
                    rows={5}
                    placeholder="Describe lower extremities strength and ROM"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Additional Information</label>
                  <textarea 
                    value={data.muscleAdditional || ''}
                    onChange={(e) => handleChange('muscleAdditional', e.target.value)}
                    rows={3}
                    placeholder="Additional information about muscle strength and ROM"
                  />
                </div>
              </div>
              
              <div className="muscle-tests">
                <StandardizedTest 
                  title="Functional Reach" 
                  isComplete={data?.standardizedTests?.['Functional Reach']?.isComplete || false}
                  onOpen={() => onOpenTest('Functional Reach')}
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'balance' && (
          <div className="balance-tab">
            <div className="form-section">
              <h2>Balance</h2>
              
              <div className="form-row">
                <button className="gfp-scale-btn" onClick={() => console.logใบ('Show GFP Scale')}>
                  <i className="fas fa-info-circle"></i>
                  <span>Show GFP Scale</span>
                </button>
              </div>
              
              <div className="balance-evaluation">
                <div className="balance-row">
                  <h3>Sitting</h3>
                  <div className="balance-options">
                    <div className="balance-option">
                      <label>Static</label>
                      <select 
                        value={data.sittingStatic || ''}
                        onChange={(e) => handleChange('sittingStatic', e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="Not Tested">Not Tested</option>
                        <option value="P-">P-</option>
                        <option value="P">P</option>
                        <option value="P+">P+</option>
                        <option value="F-">F-</option>
                        <option value="F">F</option>
                        <option value="F+">F+</option>
                        <option value="G-">G-</option>
                        <option value="G">G</option>
                        <option value="G+">G+</option>
                      </select>
                    </div>
                    
                    <div className="balance-option">
                      <label>Dynamic</label>
                      <select 
                        value={data.sittingDynamic || ''}
                        onChange={(e) => handleChange('sittingDynamic', e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="Not Tested">Not Tested</option>
                        <option value="P-">P-</option>
                        <option value="P">P</option>
                        <option value="P+">P+</option>
                        <option value="F-">F-</option>
                        <option value="F">F</option>
                        <option value="F+">F+</option>
                        <option value="G-">G-</option>
                        <option value="G">G</option>
                        <option value="G+">G+</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="balance-row">
                  <h3>Standing</h3>
                  <div className="balance-options">
                    <div className="balance-option">
                      <label>Static</label>
                      <select 
                        value={data.standingStatic || ''}
                        onChange={(e) => handleChange('standingStatic', e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="Not Tested">Not Tested</option>
                        <option value="P-">P-</option>
                        <option value="P">P</option>
                        <option value="P+">P+</option>
                        <option value="F-">F-</option>
                        <option value="F">F</option>
                        <option value="F+">F+</option>
                        <option value="G-">G-</option>
                        <option value="G">G</option>
                        <option value="G+">G+</option>
                      </select>
                    </div>
                    
                    <div className="balance-option">
                      <label>Dynamic</label>
                      <select 
                        value={data.standingDynamic || ''}
                        onChange={(e) => handleChange('standingDynamic', e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="Not Tested">Not Tested</option>
                        <option value="P-">P-</option>
                        <option value="P">P</option>
                        <option value="P+">P+</option>
                        <option value="F-">F-</option>
                        <option value="F">F</option>
                        <option value="F+">F+</option>
                        <option value="G-">G-</option>
                        <option value="G">G</option>
                        <option value="G+">G+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Additional Information</label>
                  <textarea 
                    value={data.balanceAdditional || ''}
                    onChange={(e) => handleChange('balanceAdditional', e.target.value)}
                    rows={3}
                    placeholder="Additional information about balance"
                  />
                </div>
              </div>
              
              <div className="balance-tests">
                <div className="standardized-tests-grid">
                  <StandardizedTest 
                    title="Berg" 
                    isComplete={data?.standardizedTests?.['BERG']?.isComplete || false}
                    onOpen={() => onOpenTest('BERG')}
                  />
                  
                  <StandardizedTest 
                    title="Fall Risk Assessment" 
                    isComplete={data?.standardizedTests?.['Fall Risk Assessment']?.isComplete || false}
                    onOpen={() => onOpenTest('Fall Risk Assessment')}
                  />
                  
                  <StandardizedTest 
                    title="Tinetti" 
                    isComplete={data?.standardizedTests?.['Tinetti']?.isComplete || false}
                    onOpen={() => onOpenTest('Tinetti')}
                  />
                  
                  <StandardizedTest 
                    title="Advanced Balance" 
                    isComplete={data?.standardizedTests?.['Advanced Balance']?.isComplete || false}
                    onOpen={() => onOpenTest('Advanced Balance')}
                  />
                  
                  <StandardizedTest 
                    title="Four Stage Balance Test" 
                    isComplete={data?.standardizedTests?.['Four Stage Balance Test']?.isComplete || false}
                    onOpen={() => onOpenTest('Four Stage Balance Test')}
                  />
                  
                  <StandardizedTest 
                    title="MAHC10" 
                    isComplete={data?.standardizedTests?.['MAHC10']?.isComplete || false}
                    onOpen={() => onOpenTest('MAHC10')}
                  />
                  
                  <StandardizedTest 
                    title="Short Physical Performance Battery" 
                    isComplete={data?.standardizedTests?.['Short Physical Performance Battery']?.isComplete || false}
                    onOpen={() => onOpenTest('Short Physical Performance Battery')}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'equipment' && (
          <EquipmentSection 
            data={data.equipment || {}}
            onChange={(sectionData) => handleSectionChange('equipment', sectionData)}
          />
        )}
        
        {activeTab === 'prosthetic' && (
          <ProstheticOrthoticSection 
            data={data.prostheticOrthotic || {}}
            onChange={(sectionData) => handleSectionChange('prostheticOrthotic', sectionData)}
          />
        )}
        
        {activeTab === 'education' && (
          <PatientCaregiverEducationSection 
            data={data.patientEducation || {}}
            onChange={(sectionData) => handleSectionChange('patientEducation', sectionData)}
          />
        )}
        
        {activeTab === 'woundcare' && (
          <WoundCareSection 
            data={data.woundCare || {}}
            onChange={(sectionData) => handleSectionChange('woundCare', sectionData)}
            onOpenTest={onOpenTest}
          />
        )}
      </div>
    </div>
  );
};

export default ObjectiveSection;