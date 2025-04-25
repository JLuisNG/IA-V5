// components/PlanSection.jsx
import React, { useState } from 'react';
import '../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/PlanSection.scss';
import StandardizedTest from './StandardizedTest';

const PlanSection = ({ data, onChange }) => {
  // Estado local para manejar qué acordeón está expandido
  const [expandedSection, setExpandedSection] = useState('gait');
  
  // Manejador para los cambios en los campos
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };
  
  // Cambiar la sección expandida
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Formatear fecha para mostrar en las duraciones
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return `Week of ${date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}`;
  };
  
  return (
    <div className="plan-section-container">
      <div className="form-section goal-plan-section">
        <h2>Short & Long Term Goals</h2>
        
        <div className="goal-duration-section">
          <h3>Goal Durations</h3>
          
          <div className="duration-controls">
            <div className="duration-control">
              <label>STG COMPLETED BY:</label>
              <div className="select-with-button">
                <select 
                  value={data.stgDuration || '1'}
                  onChange={(e) => handleChange('stgDuration', e.target.value)}
                >
                  <option value="1">1 Week (Week of 4/12/2025)</option>
                  <option value="2">2 Weeks (Week of 4/19/2025)</option>
                  <option value="3">3 Weeks (Week of 4/26/2025)</option>
                  <option value="4">4 Weeks (Week of 5/3/2025)</option>
                  <option value="5">5 Weeks (Week of 5/10/2025)</option>
                  <option value="6">6 Weeks (Week of 5/17/2025)</option>
                  <option value="7">7 Weeks (Week of 5/24/2025)</option>
                  <option value="8">8 Weeks (Week of 5/31/2025)</option>
                </select>
                <button className="update-btn">UPDATE</button>
              </div>
            </div>
            
            <div className="duration-control">
              <label>LTG COMPLETED BY:</label>
              <div className="select-with-button">
                <select 
                  value={data.ltgDuration || '3'}
                  onChange={(e) => handleChange('ltgDuration', e.target.value)}
                >
                  <option value="1">1 Week (Week of 4/12/2025)</option>
                  <option value="2">2 Weeks (Week of 4/19/2025)</option>
                  <option value="3">3 Weeks (Week of 4/26/2025)</option>
                  <option value="4">4 Weeks (Week of 5/3/2025)</option>
                  <option value="5">5 Weeks (Week of 5/10/2025)</option>
                  <option value="6">6 Weeks (Week of 5/17/2025)</option>
                  <option value="7">7 Weeks (Week of 5/24/2025)</option>
                  <option value="8">8 Weeks (Week of 5/31/2025)</option>
                </select>
                <button className="update-btn">UPDATE</button>
              </div>
            </div>
          </div>
          
          <div className="duration-note">
            <p>NOTE: Changing the drop down or pressing the update button will update ALL goals. Any existing goals do not update unless this is performed.</p>
          </div>
        </div>
        
        <div className="goals-accordion">
          {/* Gait Section */}
          <div className={`accordion-section ${expandedSection === 'gait' ? 'expanded' : ''}`}>
            <div className="accordion-header" onClick={() => toggleSection('gait')}>
              <i className={`fas fa-chevron-${expandedSection === 'gait' ? 'down' : 'right'}`}></i>
              <h3>GAIT</h3>
              <div className="goal-counters">
                <span className="goal-counter">LTG: {data.gaitLtgCount || 0}</span>
                <span className="goal-counter">STG: {data.gaitStgCount || 0}</span>
              </div>
            </div>
            
            {expandedSection === 'gait' && (
              <div className="accordion-content">
                <div className="goal-item">
                  <div className="goal-header">
                    <div className="checkbox-item">
                      <input 
                        type="checkbox" 
                        id="gaitLongTerm1" 
                        checked={data.gaitLongTerm1 || false}
                        onChange={(e) => handleChange('gaitLongTerm1', e.target.checked)}
                      />
                      <label htmlFor="gaitLongTerm1">Long Term</label>
                    </div>
                    <button className="add-stg-btn">Add STG</button>
                  </div>
                  
                  <div className="goal-template">
                    <p>
                      Patient to ambulate 
                      <input 
                        type="text" 
                        className="small-input" 
                        value={data.gaitDistance || ''}
                        onChange={(e) => handleChange('gaitDistance', e.target.value)}
                        placeholder="___"
                      /> 
                      ft. on 
                      <select 
                        className="inline-select"
                        value={data.gaitSurface || 'Even'}
                        onChange={(e) => handleChange('gaitSurface', e.target.value)}
                      >
                        <option value="Even">Even</option>
                        <option value="Uneven">Uneven</option>
                        <option value="Both Even-Uneven">Both Even-Uneven</option>
                      </select> 
                      surfaces w/ 
                      <select 
                        className="inline-select"
                        value={data.gaitDevice || ''}
                        onChange={(e) => handleChange('gaitDevice', e.target.value)}
                      >
                        <option value="">Select device</option>
                        <option value="No Assistive Device">No Assistive Device</option>
                        <option value="Axillary Crutches">Axillary Crutches</option>
                        <option value="Hand Held Assist">Hand Held Assist</option>
                        <option value="Hemi Walker">Hemi Walker</option>
                        <option value="Lofstrand Crutches">Lofstrand Crutches</option>
                        <option value="Quad Cane">Quad Cane</option>
                        <option value="Rollator">Rollator</option>
                        <option value="Rolling Walker">Rolling Walker</option>
                        <option value="Single Point Cane">Single Point Cane</option>
                        <option value="Stair Rails">Stair Rails</option>
                        <option value="Standard Walker">Standard Walker</option>
                        <option value="Wheelchair">Wheelchair</option>
                      </select> 
                      and 
                      <select 
                        className="inline-select"
                        value={data.gaitAssistLevel || ''}
                        onChange={(e) => handleChange('gaitAssistLevel', e.target.value)}
                      >
                        <option value="">Select assist level</option>
                        <option value="I">I (No Assist)</option>
                        <option value="MI">MI (Uses Assistive Device)</option>
                        <option value="S">S (Set up/Supervision)</option>
                        <option value="SBA">SBA (Stand By Assist)</option>
                        <option value="MIN">MIN (Requires 0-25% Assist)</option>
                        <option value="MOD">MOD (Requires 26-50% Assist)</option>
                        <option value="MAX">MAX (Requires 51-75% Assist)</option>
                        <option value="TOT">TOT (Requires 76-99% Assist)</option>
                        <option value="DEP">DEP (Requires 100% Assist)</option>
                        <option value="CGA">CGA (Contact Guard Assist)</option>
                      </select> 
                      assist to ensure safe and functional ambulation
                      <input 
                        type="text" 
                        className="medium-input" 
                        value={data.gaitOutcome || ''}
                        onChange={(e) => handleChange('gaitOutcome', e.target.value)}
                        placeholder="(optional functional outcome)"
                      />
                    </p>
                  </div>
                  
                  <div className="goal-dates">
                    <div className="date-field">
                      <label>Starting</label>
                      <input 
                        type="date" 
                        value={data.gaitStartDate || '2025-04-10'}
                        onChange={(e) => handleChange('gaitStartDate', e.target.value)}
                      />
                    </div>
                    <div className="date-field">
                      <label>Duration</label>
                      <select 
                        value={data.gaitDuration || '3'}
                        onChange={(e) => handleChange('gaitDuration', e.target.value)}
                      >
                        <option value="1">1 Week (Week of 4/12/2025)</option>
                        <option value="2">2 Weeks (Week of 4/19/2025)</option>
                        <option value="3">3 Weeks (Week of 4/26/2025)</option>
                        <option value="4">4 Weeks (Week of 5/3/2025)</option>
                        <option value="5">5 Weeks (Week of 5/10/2025)</option>
                        <option value="6">6 Weeks (Week of 5/17/2025)</option>
                        <option value="7">7 Weeks (Week of 5/24/2025)</option>
                        <option value="8">8 Weeks (Week of 5/31/2025)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <button className="add-additional-btn">ADD ADDITIONAL</button>
              </div>
            )}
          </div>
          
          {/* Transfers Section */}
          <div className={`accordion-section ${expandedSection === 'transfers' ? 'expanded' : ''}`}>
            <div className="accordion-header" onClick={() => toggleSection('transfers')}>
              <i className={`fas fa-chevron-${expandedSection === 'transfers' ? 'down' : 'right'}`}></i>
              <h3>TRANSFERS</h3>
              <div className="goal-counters">
                <span className="goal-counter">LTG: {data.transfersLtgCount || 0}</span>
                <span className="goal-counter">STG: {data.transfersStgCount || 0}</span>
              </div>
            </div>
            
            {expandedSection === 'transfers' && (
              <div className="accordion-content">
                <div className="goal-item">
                  <div className="goal-header">
                    <div className="checkbox-item">
                      <input 
                        type="checkbox" 
                        id="transfersLongTerm1" 
                        checked={data.transfersLongTerm1 || false}
                        onChange={(e) => handleChange('transfersLongTerm1', e.target.checked)}
                      />
                      <label htmlFor="transfersLongTerm1">Long Term</label>
                    </div>
                    <button className="add-stg-btn">Add STG</button>
                  </div>
                  
                  <div className="goal-template">
                    <p>
                      Patient to perform all bed mobility with 
                      <select 
                        className="inline-select"
                        value={data.transfersAssistLevel || ''}
                        onChange={(e) => handleChange('transfersAssistLevel', e.target.value)}
                      >
                        <option value="">Select assist level</option>
                        <option value="I">I (No Assist)</option>
                        <option value="MI">MI (Uses Assistive Device)</option>
                        <option value="S">S (Set up/Supervision)</option>
                        <option value="SBA">SBA (Stand By Assist)</option>
                        <option value="MIN">MIN (Requires 0-25% Assist)</option>
                          <option value="MOD">MOD (Requires 26-50% Assist)</option>
                          <option value="MAX">MAX (Requires 51-75% Assist)</option>
                          <option value="TOT">TOT (Requires 76-99% Assist)</option>
                          <option value="DEP">DEP (Requires 100% Assist)</option>
                          <option value="CGA">CGA (Contact Guard Assist)</option>
                        </select> 
                        assist using 
                        <input 
                          type="text" 
                          className="small-input" 
                          value={data.transfersDevice || ''}
                          onChange={(e) => handleChange('transfersDevice', e.target.value)}
                          placeholder="device"
                        /> 
                        assistive device to ensure safe and functional mobility
                        <input 
                          type="text" 
                          className="medium-input" 
                          value={data.transfersOutcome || ''}
                          onChange={(e) => handleChange('transfersOutcome', e.target.value)}
                          placeholder="(optional functional outcome)"
                        />
                      </p>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.transfersStartDate || '2025-04-10'}
                          onChange={(e) => handleChange('transfersStartDate', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.transfersDuration || '3'}
                          onChange={(e) => handleChange('transfersDuration', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button className="add-additional-btn">ADD ADDITIONAL</button>
                </div>
              )}
            </div>
            
            {/* Balance Section */}
            <div className={`accordion-section ${expandedSection === 'balance' ? 'expanded' : ''}`}>
              <div className="accordion-header" onClick={() => toggleSection('balance')}>
                <i className={`fas fa-chevron-${expandedSection === 'balance' ? 'down' : 'right'}`}></i>
                <h3>BALANCE</h3>
                <div className="goal-counters">
                  <span className="goal-counter">LTG: {data.balanceLtgCount || 0}</span>
                  <span className="goal-counter">STG: {data.balanceStgCount || 0}</span>
                </div>
              </div>
              
              {expandedSection === 'balance' && (
                <div className="accordion-content">
                  <div className="goal-item">
                    <div className="goal-header">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="balanceLongTerm1" 
                          checked={data.balanceLongTerm1 || false}
                          onChange={(e) => handleChange('balanceLongTerm1', e.target.checked)}
                        />
                        <label htmlFor="balanceLongTerm1">Long Term</label>
                      </div>
                      <button className="add-stg-btn">Add STG</button>
                    </div>
                    
                    <div className="goal-template">
                      <p>
                        Patient to increase 
                        <select 
                          className="inline-select"
                          value={data.balanceType || ''}
                          onChange={(e) => handleChange('balanceType', e.target.value)}
                        >
                          <option value="">Select balance type</option>
                          <option value="Sitting Static">Sitting Static</option>
                          <option value="Sitting Dynamic">Sitting Dynamic</option>
                          <option value="Standing Static">Standing Static</option>
                          <option value="Standing Dynamic">Standing Dynamic</option>
                        </select> 
                        balance to 
                        <select 
                          className="inline-select"
                          value={data.balanceGrade || ''}
                          onChange={(e) => handleChange('balanceGrade', e.target.value)}
                        >
                          <option value="">Select grade</option>
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
                        to ensure safe functional
                        <input 
                          type="text" 
                          className="medium-input" 
                          value={data.balanceOutcome || ''}
                          onChange={(e) => handleChange('balanceOutcome', e.target.value)}
                          placeholder="(functional outcome)"
                        />
                      </p>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.balanceStartDate || '2025-04-10'}
                          onChange={(e) => handleChange('balanceStartDate', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.balanceDuration || '3'}
                          onChange={(e) => handleChange('balanceDuration', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button className="add-additional-btn">ADD ADDITIONAL</button>
                </div>
              )}
            </div>
            
            {/* Strength/ROM/Activity Tolerance Section */}
            <div className={`accordion-section ${expandedSection === 'strength' ? 'expanded' : ''}`}>
              <div className="accordion-header" onClick={() => toggleSection('strength')}>
                <i className={`fas fa-chevron-${expandedSection === 'strength' ? 'down' : 'right'}`}></i>
                <h3>STRENGTH/ROM/ACTIVITY TOLERANCE</h3>
                <div className="goal-counters">
                  <span className="goal-counter">LTG: {data.strengthLtgCount || 0}</span>
                  <span className="goal-counter">STG: {data.strengthStgCount || 0}</span>
                </div>
              </div>
              
              {expandedSection === 'strength' && (
                <div className="accordion-content">
                  <div className="goal-item">
                    <div className="goal-header">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="strengthLongTerm1" 
                          checked={data.strengthLongTerm1 || false}
                          onChange={(e) => handleChange('strengthLongTerm1', e.target.checked)}
                        />
                        <label htmlFor="strengthLongTerm1">Long Term</label>
                      </div>
                      <button className="add-stg-btn">Add STG</button>
                    </div>
                    
                    <div className="goal-template">
                      <p>
                        Patient to increase strength of 
                        <input 
                          type="text" 
                          className="small-input" 
                          value={data.strengthBodyArea || ''}
                          onChange={(e) => handleChange('strengthBodyArea', e.target.value)}
                          placeholder="body area"
                        /> 
                        to/by 
                        <input 
                          type="text" 
                          className="small-input" 
                          value={data.strengthGrade || ''}
                          onChange={(e) => handleChange('strengthGrade', e.target.value)}
                          placeholder="grade"
                        /> 
                        in order to be 
                        <select 
                          className="inline-select"
                          value={data.strengthAssistLevel || ''}
                          onChange={(e) => handleChange('strengthAssistLevel', e.target.value)}
                        >
                          <option value="">Select assist level</option>
                          <option value="I">I (No Assist)</option>
                          <option value="MI">MI (Uses Assistive Device)</option>
                          <option value="S">S (Set up/Supervision)</option>
                          <option value="SBA">SBA (Stand By Assist)</option>
                          <option value="MIN">MIN (Requires 0-25% Assist)</option>
                          <option value="MOD">MOD (Requires 26-50% Assist)</option>
                          <option value="MAX">MAX (Requires 51-75% Assist)</option>
                          <option value="TOT">TOT (Requires 76-99% Assist)</option>
                          <option value="DEP">DEP (Requires 100% Assist)</option>
                          <option value="CGA">CGA (Contact Guard Assist)</option>
                        </select> 
                        assist 
                        <input 
                          type="text" 
                          className="small-input" 
                          value={data.strengthWith || ''}
                          onChange={(e) => handleChange('strengthWith', e.target.value)}
                          placeholder=""
                        /> 
                        to achieve
                        <input 
                          type="text" 
                          className="medium-input" 
                          value={data.strengthOutcome || ''}
                          onChange={(e) => handleChange('strengthOutcome', e.target.value)}
                          placeholder="(functional outcome)"
                        />
                      </p>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.strengthStartDate || '2025-04-10'}
                          onChange={(e) => handleChange('strengthStartDate', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.strengthDuration || '3'}
                          onChange={(e) => handleChange('strengthDuration', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button className="add-additional-btn">ADD ADDITIONAL</button>
                </div>
              )}
            </div>
            
            {/* Pain Section */}
            <div className={`accordion-section ${expandedSection === 'pain' ? 'expanded' : ''}`}>
              <div className="accordion-header" onClick={() => toggleSection('pain')}>
                <i className={`fas fa-chevron-${expandedSection === 'pain' ? 'down' : 'right'}`}></i>
                <h3>PAIN</h3>
                <div className="goal-counters">
                  <span className="goal-counter">LTG: {data.painLtgCount || 0}</span>
                  <span className="goal-counter">STG: {data.painStgCount || 0}</span>
                </div>
              </div>
              
              {expandedSection === 'pain' && (
                <div className="accordion-content">
                  <div className="goal-item">
                    <div className="goal-header">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="painLongTerm1" 
                          checked={data.painLongTerm1 || false}
                          onChange={(e) => handleChange('painLongTerm1', e.target.checked)}
                        />
                        <label htmlFor="painLongTerm1">Long Term</label>
                      </div>
                      <button className="add-stg-btn">Add STG</button>
                    </div>
                    
                    <div className="goal-template">
                      <p>
                        Patient's pain will decrease to 
                        <input 
                          type="text" 
                          className="small-input" 
                          value={data.painPoints || ''}
                          onChange={(e) => handleChange('painPoints', e.target.value)}
                          placeholder=""
                        /> 
                        points on the pain scale to achieve
                        <input 
                          type="text" 
                          className="medium-input" 
                          value={data.painOutcome || ''}
                          onChange={(e) => handleChange('painOutcome', e.target.value)}
                          placeholder="(functional outcome)"
                        />
                      </p>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.painStartDate || '2025-04-10'}
                          onChange={(e) => handleChange('painStartDate', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.painDuration || '3'}
                          onChange={(e) => handleChange('painDuration', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button className="add-additional-btn">ADD ADDITIONAL</button>
                </div>
              )}
            </div>
            
            {/* Home Program/HEP Section */}
            <div className={`accordion-section ${expandedSection === 'homeProgram' ? 'expanded' : ''}`}>
              <div className="accordion-header" onClick={() => toggleSection('homeProgram')}>
                <i className={`fas fa-chevron-${expandedSection === 'homeProgram' ? 'down' : 'right'}`}></i>
                <h3>HOME PROGRAM/HEP</h3>
                <div className="goal-counters">
                  <span className="goal-counter">LTG: {data.homeProgramLtgCount || 0}</span>
                  <span className="goal-counter">STG: {data.homeProgramStgCount || 0}</span>
                </div>
              </div>
              
              {expandedSection === 'homeProgram' && (
                <div className="accordion-content">
                  <div className="goal-item">
                    <div className="goal-header">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="homeProgramLongTerm1" 
                          checked={data.homeProgramLongTerm1 || false}
                          onChange={(e) => handleChange('homeProgramLongTerm1', e.target.checked)}
                        />
                        <label htmlFor="homeProgramLongTerm1">Long Term</label>
                      </div>
                      <button className="add-stg-btn">Add STG</button>
                    </div>
                    
                    <div className="goal-template">
                      <p>
                        <select 
                          className="inline-select"
                          value={data.homeProgramPerson || 'Patient'}
                          onChange={(e) => handleChange('homeProgramPerson', e.target.value)}
                        >
                          <option value="Patient">Patient</option>
                          <option value="Caregiver">Caregiver</option>
                        </select> 
                        will recall 
                        <input 
                          type="text" 
                          className="small-input" 
                          value={data.homeProgramRecallPercent || ''}
                          onChange={(e) => handleChange('homeProgramRecallPercent', e.target.value)}
                          placeholder=""
                        />% 
                        of 
                        <input 
                          type="text" 
                          className="small-input" 
                          value={data.homeProgramRecallOf || ''}
                          onChange={(e) => handleChange('homeProgramRecallOf', e.target.value)}
                          placeholder=""
                        /> 
                        to achieve
                        <input 
                          type="text" 
                          className="medium-input" 
                          value={data.homeProgramOutcome || ''}
                          onChange={(e) => handleChange('homeProgramOutcome', e.target.value)}
                          placeholder="(functional outcome)"
                        />
                      </p>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.homeProgramStartDate || '2025-04-10'}
                          onChange={(e) => handleChange('homeProgramStartDate', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.homeProgramDuration || '3'}
                          onChange={(e) => handleChange('homeProgramDuration', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button className="add-additional-btn">ADD ADDITIONAL</button>
                </div>
              )}
            </div>
            
            {/* Additional Functional Goals Section */}
            <div className={`accordion-section ${expandedSection === 'additionalGoals' ? 'expanded' : ''}`}>
              <div className="accordion-header" onClick={() => toggleSection('additionalGoals')}>
                <i className={`fas fa-chevron-${expandedSection === 'additionalGoals' ? 'down' : 'right'}`}></i>
                <h3>ADDITIONAL FUNCTIONAL GOALS</h3>
                <div className="goal-counters">
                  <span className="goal-counter">LTG: {data.additionalGoalsLtgCount || 0}</span>
                  <span className="goal-counter">STG: {data.additionalGoalsStgCount || 0}</span>
                </div>
              </div>
              
              {expandedSection === 'additionalGoals' && (
                <div className="accordion-content">
                  <div className="goal-item">
                    <div className="goal-header">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="additionalGoalsLongTerm1" 
                          checked={data.additionalGoalsLongTerm1 || false}
                          onChange={(e) => handleChange('additionalGoalsLongTerm1', e.target.checked)}
                        />
                        <label htmlFor="additionalGoalsLongTerm1">Long Term</label>
                      </div>
                      <button className="add-stg-btn">Add STG</button>
                    </div>
                    
                    <div className="goal-template">
                      <textarea 
                        className="additional-goal-textarea" 
                        placeholder="Additional Functional Goal"
                        value={data.additionalGoalText || ''}
                        onChange={(e) => handleChange('additionalGoalText', e.target.value)}
                        rows={4}
                      ></textarea>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.additionalGoalsStartDate || '2025-04-10'}
                          onChange={(e) => handleChange('additionalGoalsStartDate', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.additionalGoalsDuration || '3'}
                          onChange={(e) => handleChange('additionalGoalsDuration', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button className="add-additional-btn">ADD ADDITIONAL</button>
                </div>
              )}
            </div>
            
            {/* Disease Specific Goals Section */}
            <div className={`accordion-section ${expandedSection === 'diseaseGoals' ? 'expanded' : ''}`}>
              <div className="accordion-header" onClick={() => toggleSection('diseaseGoals')}>
                <i className={`fas fa-chevron-${expandedSection === 'diseaseGoals' ? 'down' : 'right'}`}></i>
                <h3>DISEASE SPECIFIC GOALS</h3>
                <div className="goal-counters">
                  <span className="goal-counter">LTG: {data.diseaseGoalsLtgCount || 0}</span>
                  <span className="goal-counter">STG: {data.diseaseGoalsStgCount || 0}</span>
                </div>
              </div>
              
              {expandedSection === 'diseaseGoals' && (
                <div className="accordion-content">
                  <div className="goal-item">
                    <div className="goal-header">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="diseaseGoalsLongTerm1" 
                          checked={data.diseaseGoalsLongTerm1 || false}
                          onChange={(e) => handleChange('diseaseGoalsLongTerm1', e.target.checked)}
                        />
                        <label htmlFor="diseaseGoalsLongTerm1">Long Term</label>
                      </div>
                      <button className="add-stg-btn">Add STG</button>
                    </div>
                    
                    <div className="goal-template">
                      <p>
                        <select 
                          className="inline-select"
                          value={data.diseaseGoalsPerson || 'Patient'}
                          onChange={(e) => handleChange('diseaseGoalsPerson', e.target.value)}
                        >
                          <option value="Patient">Patient</option>
                          <option value="Caregiver">Caregiver</option>
                        </select> 
                        to be independent with 
                        <select 
                          className="inline-select"
                          value={data.diseaseGoalsActivity || ''}
                          onChange={(e) => handleChange('diseaseGoalsActivity', e.target.value)}
                        >
                          <option value="">Select an activity</option>
                          <option value="diabetic foot exam">diabetic foot exam</option>
                          <option value="Foot Care">Foot Care</option>
                          <option value="monitoring glucose levels">monitoring glucose levels</option>
                          <option value="medication/insulin administration">medication/insulin administration</option>
                        </select> 
                        in order to
                        <input 
                          type="text" 
                          className="medium-input" 
                          value={data.diseaseGoalsOutcome || ''}
                          onChange={(e) => handleChange('diseaseGoalsOutcome', e.target.value)}
                          placeholder=""
                        />
                      </p>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.diseaseGoalsStartDate || '2025-04-10'}
                          onChange={(e) => handleChange('diseaseGoalsStartDate', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.diseaseGoalsDuration || '3'}
                          onChange={(e) => handleChange('diseaseGoalsDuration', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="goal-item">
                    <div className="goal-header">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="diseaseGoalsLongTerm2" 
                          checked={data.diseaseGoalsLongTerm2 || false}
                          onChange={(e) => handleChange('diseaseGoalsLongTerm2', e.target.checked)}
                        />
                        <label htmlFor="diseaseGoalsLongTerm2">Long Term</label>
                      </div>
                      <button className="add-stg-btn">Add STG</button>
                    </div>
                    
                    <div className="goal-template">
                      <p>
                        <select 
                          className="inline-select"
                          value={data.diseaseGoalsPerson2 || 'Patient'}
                          onChange={(e) => handleChange('diseaseGoalsPerson2', e.target.value)}
                        >
                          <option value="Patient">Patient</option>
                          <option value="Caregiver">Caregiver</option>
                        </select> 
                        to demonstrate understanding of abnormal signs and symptoms of diabetic condition and determine when it is appropriate to contact physician regarding
                        <input 
                          type="text" 
                          className="medium-input" 
                          value={data.diseaseGoalsPhysicianContact || ''}
                          onChange={(e) => handleChange('diseaseGoalsPhysicianContact', e.target.value)}
                          placeholder=""
                        />
                      </p>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.diseaseGoalsStartDate2 || '2025-04-10'}
                          onChange={(e) => handleChange('diseaseGoalsStartDate2', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.diseaseGoalsDuration2 || '3'}
                          onChange={(e) => handleChange('diseaseGoalsDuration2', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="goal-item">
                    <div className="goal-header">
                      <div className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id="diseaseGoalsLongTerm3" 
                          checked={data.diseaseGoalsLongTerm3 || false}
                          onChange={(e) => handleChange('diseaseGoalsLongTerm3', e.target.checked)}
                        />
                        <label htmlFor="diseaseGoalsLongTerm3">Long Term</label>
                      </div>
                      <button className="add-stg-btn">Add STG</button>
                    </div>
                    
                    <div className="goal-template">
                      <textarea 
                        className="additional-goal-textarea" 
                        placeholder="Additional Disease Specific Goal"
                        value={data.additionalDiseaseGoalText || ''}
                        onChange={(e) => handleChange('additionalDiseaseGoalText', e.target.value)}
                        rows={4}
                      ></textarea>
                    </div>
                    
                    <div className="goal-dates">
                      <div className="date-field">
                        <label>Starting</label>
                        <input 
                          type="date" 
                          value={data.diseaseGoalsStartDate3 || '2025-04-10'}
                          onChange={(e) => handleChange('diseaseGoalsStartDate3', e.target.value)}
                        />
                      </div>
                      <div className="date-field">
                        <label>Duration</label>
                        <select 
                          value={data.diseaseGoalsDuration3 || '3'}
                          onChange={(e) => handleChange('diseaseGoalsDuration3', e.target.value)}
                        >
                          <option value="1">1 Week (Week of 4/12/2025)</option>
                          <option value="2">2 Weeks (Week of 4/19/2025)</option>
                          <option value="3">3 Weeks (Week of 4/26/2025)</option>
                          <option value="4">4 Weeks (Week of 5/3/2025)</option>
                          <option value="5">5 Weeks (Week of 5/10/2025)</option>
                          <option value="6">6 Weeks (Week of 5/17/2025)</option>
                          <option value="7">7 Weeks (Week of 5/24/2025)</option>
                          <option value="8">8 Weeks (Week of 5/31/2025)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button className="add-additional-btn">ADD ADDITIONAL</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PlanSection;