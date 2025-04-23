// components/TransfersSection.jsx
import React, { useState } from 'react';
import '../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/TransfersSection.scss';
import StandardizedTest from './StandardizedTest';

const TransfersSection = ({ data, onChange }) => {
  // Manejador para los cambios en los campos
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };
  
  return (
    <div className="transfers-section-container">
      <div className="form-section">
        <h2>Transfers / Functional Independence</h2>
        
        <div className="transfers-grid">
          <div className="transfer-option">
            <label>Sit / Stand</label>
            <select 
              value={data.sitStand || ''}
              onChange={(e) => handleChange('sitStand', e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Not Tested">Not Tested</option>
              <option value="I">I (No Assist)</option>
              <option value="MI">MI (Uses Assistive Device)</option>
              <option value="S">S (Set up/Supervision)</option>
              <option value="SBA">SBA (Stand By Assist)</option>
              <option value="MIN">MIN (Requires 0-25% Assist)</option>
              <option value="MOD">MOD (Requires 26-50% Assist)</option>
              <option value="MAX">MAX (Requires 51-75% Assist)</option>
              <option value="TOT">TOT (Requires 76-99% Assist)</option>
              <option value="DEP">DEP (100% Assist)</option>
              <option value="CGA">CGA (Contact Guard Assist)</option>
            </select>
          </div>
          
          <div className="transfer-option">
            <label>Auto</label>
            <select 
              value={data.auto || ''}
              onChange={(e) => handleChange('auto', e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Not Tested">Not Tested</option>
              <option value="I">I (No Assist)</option>
              <option value="MI">MI (Uses Assistive Device)</option>
              <option value="S">S (Set up/Supervision)</option>
              <option value="SBA">SBA (Stand By Assist)</option>
              <option value="MIN">MIN (Requires 0-25% Assist)</option>
              <option value="MOD">MOD (Requires 26-50% Assist)</option>
              <option value="MAX">MAX (Requires 51-75% Assist)</option>
              <option value="TOT">TOT (Requires 76-99% Assist)</option>
              <option value="DEP">DEP (100% Assist)</option>
              <option value="CGA">CGA (Contact Guard Assist)</option>
            </select>
          </div>
          
          <div className="transfer-option">
            <label>Bed / Wheelchair</label>
            <select 
              value={data.bedWheelchair || ''}
              onChange={(e) => handleChange('bedWheelchair', e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Not Tested">Not Tested</option>
              <option value="I">I (No Assist)</option>
              <option value="MI">MI (Uses Assistive Device)</option>
              <option value="S">S (Set up/Supervision)</option>
              <option value="SBA">SBA (Stand By Assist)</option>
              <option value="MIN">MIN (Requires 0-25% Assist)</option>
              <option value="MOD">MOD (Requires 26-50% Assist)</option>
              <option value="MAX">MAX (Requires 51-75% Assist)</option>
              <option value="TOT">TOT (Requires 76-99% Assist)</option>
              <option value="DEP">DEP (100% Assist)</option>
              <option value="CGA">CGA (Contact Guard Assist)</option>
            </select>
          </div>
          
          <div className="transfer-option">
            <label>Roll / Turn</label>
            <select 
              value={data.rollTurn || ''}
              onChange={(e) => handleChange('rollTurn', e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Not Tested">Not Tested</option>
              <option value="I">I (No Assist)</option>
              <option value="MI">MI (Uses Assistive Device)</option>
              <option value="S">S (Set up/Supervision)</option>
              <option value="SBA">SBA (Stand By Assist)</option>
              <option value="MIN">MIN (Requires 0-25% Assist)</option>
              <option value="MOD">MOD (Requires 26-50% Assist)</option>
              <option value="MAX">MAX (Requires 51-75% Assist)</option>
              <option value="TOT">TOT (Requires 76-99% Assist)</option>
              <option value="DEP">DEP (100% Assist)</option>
              <option value="CGA">CGA (Contact Guard Assist)</option>
            </select>
          </div>
          
          <div className="transfer-option">
            <label>Toilet</label>
            <select 
              value={data.toilet || ''}
              onChange={(e) => handleChange('toilet', e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Not Tested">Not Tested</option>
              <option value="I">I (No Assist)</option>
              <option value="MI">MI (Uses Assistive Device)</option>
              <option value="S">S (Set up/Supervision)</option>
              <option value="SBA">SBA (Stand By Assist)</option>
              <option value="MIN">MIN (Requires 0-25% Assist)</option>
              <option value="MOD">MOD (Requires 26-50% Assist)</option>
              <option value="MAX">MAX (Requires 51-75% Assist)</option>
              <option value="TOT">TOT (Requires 76-99% Assist)</option>
              <option value="DEP">DEP (100% Assist)</option>
              <option value="CGA">CGA (Contact Guard Assist)</option>
            </select>
          </div>
          
          <div className="transfer-option">
            <label>Sit / Supine</label>
            <select 
              value={data.sitSupine || ''}
              onChange={(e) => handleChange('sitSupine', e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Not Tested">Not Tested</option>
              <option value="I">I (No Assist)</option>
              <option value="MI">MI (Uses Assistive Device)</option>
              <option value="S">S (Set up/Supervision)</option>
              <option value="SBA">SBA (Stand By Assist)</option>
              <option value="MIN">MIN (Requires 0-25% Assist)</option>
              <option value="MOD">MOD (Requires 26-50% Assist)</option>
              <option value="MAX">MAX (Requires 51-75% Assist)</option>
              <option value="TOT">TOT (Requires 76-99% Assist)</option>
              <option value="DEP">DEP (100% Assist)</option>
              <option value="CGA">CGA (Contact Guard Assist)</option>
            </select>
          </div>
          
          <div className="transfer-option">
            <label>Tub</label>
            <select 
              value={data.tub || ''}
              onChange={(e) => handleChange('tub', e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Not Tested">Not Tested</option>
              <option value="I">I (No Assist)</option>
              <option value="MI">MI (Uses Assistive Device)</option>
              <option value="S">S (Set up/Supervision)</option>
              <option value="SBA">SBA (Stand By Assist)</option>
              <option value="MIN">MIN (Requires 0-25% Assist)</option>
              <option value="MOD">MOD (Requires 26-50% Assist)</option>
              <option value="MAX">MAX (Requires 51-75% Assist)</option>
              <option value="TOT">TOT (Requires 76-99% Assist)</option>
              <option value="DEP">DEP (100% Assist)</option>
              <option value="CGA">CGA (Contact Guard Assist)</option>
            </select>
          </div>
          
          <div className="transfer-option">
            <label>Scoot / Bridge</label>
            <select 
              value={data.scootBridge || ''}
              onChange={(e) => handleChange('scootBridge', e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Not Tested">Not Tested</option>
              <option value="I">I (No Assist)</option>
              <option value="MI">MI (Uses Assistive Device)</option>
              <option value="S">S (Set up/Supervision)</option>
              <option value="SBA">SBA (Stand By Assist)</option>
              <option value="MIN">MIN (Requires 0-25% Assist)</option>
              <option value="MOD">MOD (Requires 26-50% Assist)</option>
              <option value="MAX">MAX (Requires 51-75% Assist)</option>
              <option value="TOT">TOT (Requires 76-99% Assist)</option>
              <option value="DEP">DEP (100% Assist)</option>
              <option value="CGA">CGA (Contact Guard Assist)</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Does patient have a wheelchair?</label>
            <select 
              value={data.hasWheelchair || ''}
              onChange={(e) => handleChange('hasWheelchair', e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Additional Information</label>
            <textarea 
              value={data.transfersAdditional || ''}
              onChange={(e) => handleChange('transfersAdditional', e.target.value)}
              rows={4}
              placeholder="Additional information about transfers"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2>ADL / Self Care Skills</h2>
        
        <div className="adl-grid">
          <div className="adl-column">
            <div className="adl-skill">
              <div className="skill-header">
                <label>Self Feeding</label>
                <select 
                  value={data.selfFeeding || ''}
                  onChange={(e) => handleChange('selfFeeding', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.selfFeedingComments || ''}
                onChange={(e) => handleChange('selfFeedingComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Swallowing</label>
                <select 
                  value={data.swallowing || ''}
                  onChange={(e) => handleChange('swallowing', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.swallowingComments || ''}
                onChange={(e) => handleChange('swallowingComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Oral Hygiene</label>
                <select 
                  value={data.oralHygiene || ''}
                  onChange={(e) => handleChange('oralHygiene', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.oralHygieneComments || ''}
                onChange={(e) => handleChange('oralHygieneComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Grooming / Hygiene</label>
                <select 
                  value={data.grooming || ''}
                  onChange={(e) => handleChange('grooming', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.groomingComments || ''}
                onChange={(e) => handleChange('groomingComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Toileting</label>
                <select 
                  value={data.toileting || ''}
                  onChange={(e) => handleChange('toileting', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.toiletingComments || ''}
                onChange={(e) => handleChange('toiletingComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Functional Mobility</label>
                <select 
                  value={data.functionalMobility || ''}
                  onChange={(e) => handleChange('functionalMobility', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.functionalMobilityComments || ''}
                onChange={(e) => handleChange('functionalMobilityComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
          </div>
          
          <div className="adl-column">
            <div className="adl-skill">
              <div className="skill-header">
                <label>Bathing</label>
                <select 
                  value={data.bathing || ''}
                  onChange={(e) => handleChange('bathing', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.bathingComments || ''}
                onChange={(e) => handleChange('bathingComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Bed Mobility</label>
                <select 
                  value={data.bedMobility || ''}
                  onChange={(e) => handleChange('bedMobility', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.bedMobilityComments || ''}
                onChange={(e) => handleChange('bedMobilityComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Housework / Homemaking</label>
                <select 
                  value={data.housework || ''}
                  onChange={(e) => handleChange('housework', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.houseworkComments || ''}
                onChange={(e) => handleChange('houseworkComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Telephone Use</label>
                <select 
                  value={data.telephoneUse || ''}
                  onChange={(e) => handleChange('telephoneUse', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.telephoneUseComments || ''}
                onChange={(e) => handleChange('telephoneUseComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Meal Preparation</label>
                <select 
                  value={data.mealPreparation || ''}
                  onChange={(e) => handleChange('mealPreparation', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.mealPreparationComments || ''}
                onChange={(e) => handleChange('mealPreparationComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
            
            <div className="adl-skill">
              <div className="skill-header">
                <label>Medication Management</label>
                <select 
                  value={data.medicationManagement || ''}
                  onChange={(e) => handleChange('medicationManagement', e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="NT">NT</option>
                  <option value="DEP">DEP</option>
                  <option value="MAX">MAX</option>
                  <option value="MOD">MOD</option>
                  <option value="MIN">MIN</option>
                  <option value="S">S</option>
                  <option value="SBA">SBA</option>
                  <option value="SUP">SUP</option>
                  <option value="MI">MI</option>
                  <option value="I">I</option>
                  <option value="CGA">CGA</option>
                </select>
              </div>
              <textarea 
                value={data.medicationManagementComments || ''}
                onChange={(e) => handleChange('medicationManagementComments', e.target.value)}
                placeholder="Comments"
              />
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Additional Information</label>
            <textarea 
              value={data.adlAdditional || ''}
              onChange={(e) => handleChange('adlAdditional', e.target.value)}
              rows={4}
              placeholder="Additional information about ADL / Self Care Skills"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2>Standardized Tests</h2>
        <div className="adl-tests">
          <div className="standardized-tests-row">
            <StandardizedTest 
              title="Katz" 
              isComplete={false}
              onOpen={() => console.log('Opening Katz test')}
            />
            
            <StandardizedTest 
              title="Barthel" 
              isComplete={false}
              onOpen={() => console.log('Opening Barthel test')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransfersSection;