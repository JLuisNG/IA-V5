// components/standardizedTests/SPPBModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/SPPBModal.scss';

const SPPBModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    balanceTests: {
      sideByStand: initialData?.balanceTests?.sideByStand || '1 - Held for 10 sec',
      semiTandemStand: initialData?.balanceTests?.semiTandemStand || '1 - Held for 10 sec',
      tandemStand: initialData?.balanceTests?.tandemStand || '2 - Held for 10 sec',
      balanceScore: initialData?.balanceTests?.balanceScore || 4,
    },
    balanceComments: initialData?.balanceComments || '',
    
    gaitSpeedTest: {
      time: initialData?.gaitSpeedTest?.time || '',
      attemptReason: initialData?.gaitSpeedTest?.attemptReason || '',
      aidsForWalk: initialData?.gaitSpeedTest?.aidsForWalk || 'None',
      walkScore: initialData?.gaitSpeedTest?.walkScore || '0 - Unable or more than 5.8s to walk'
    },
    gaitComments: initialData?.gaitComments || '',
    
    chairStandTest: {
      score: initialData?.chairStandTest?.score || '0 - Time is more than 60 sec'
    },
    chairComments: initialData?.chairComments || '',
    
    totalScore: initialData?.totalScore || 0,
    isComplete: initialData?.isComplete || false
  });
  
  // Opciones para los campos de selección
  const balanceOptions = {
    sideByStand: [
      '1 - Held for 10 sec',
      '0 - Not held for 10 sec',
      'WB restrictions or no goals for ambulation'
    ],
    semiTandemStand: [
      '1 - Held for 10 sec',
      '0 - Not held for 10 sec',
      'WB restrictions or no goals for ambulation'
    ],
    tandemStand: [
      '2 - Held for 10 sec',
      '1 - Held for 3 to 9.99 sec',
      '0 - Held for < 3 sec',
      'WB restrictions or no goals for ambulation'
    ]
  };
  
  const gaitSpeedScoreOptions = [
    '0 - Unable or more than 5.8s to walk',
    '1 - Time is more than 4.8 sec',
    '2 - Time is 4.1 to 6.70 sec',
    '3 - Time is 3.2 to 4.0 sec',
    '4 - Time is less than or equal to 3.1 sec'
  ];
  
  const chairStandScoreOptions = [
    '0 - Time is more than 60 sec',
    '1 - Time is 16.7 to 60 sec',
    '2 - Time is 13.7 to 16.65 sec',
    '3 - Time is 11.2 to 13.69 sec',
    '4 - Time is less than 11.19 sec'
  ];
  
  const aidsForWalkOptions = [
    'None',
    'Cane',
    'Walker',
    'Other'
  ];

  // Calcular las puntuaciones
  useEffect(() => {
    let balanceScore = 0;
    
    // Cálculo de balance
    if (formData.balanceTests.sideByStand === '1 - Held for 10 sec') {
      balanceScore += 1;
    }
    
    if (formData.balanceTests.semiTandemStand === '1 - Held for 10 sec') {
      balanceScore += 1;
    }
    
    if (formData.balanceTests.tandemStand === '2 - Held for 10 sec') {
      balanceScore += 2;
    } else if (formData.balanceTests.tandemStand === '1 - Held for 3 to 9.99 sec') {
      balanceScore += 1;
    }
    
    // Actualizar balanceScore
    setFormData(prevData => ({
      ...prevData,
      balanceTests: {
        ...prevData.balanceTests,
        balanceScore: balanceScore
      }
    }));
    
    // Cálculo del total
    const gaitScore = parseInt(formData.gaitSpeedTest.walkScore.charAt(0));
    const chairScore = parseInt(formData.chairStandTest.score.charAt(0));
    
    const totalScore = balanceScore + (isNaN(gaitScore) ? 0 : gaitScore) + (isNaN(chairScore) ? 0 : chairScore);
    
    setFormData(prevData => ({
      ...prevData,
      totalScore: totalScore
    }));
    
  }, [
    formData.balanceTests.sideByStand,
    formData.balanceTests.semiTandemStand,
    formData.balanceTests.tandemStand,
    formData.gaitSpeedTest.walkScore,
    formData.chairStandTest.score
  ]);

  // Manejar cambios en los campos de balance
  const handleBalanceChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      balanceTests: {
        ...prevData.balanceTests,
        [field]: value
      }
    }));
  };

  // Manejar cambios en los campos de texto
  const handleTextChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Manejar cambios en los campos de gait speed
  const handleGaitSpeedChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      gaitSpeedTest: {
        ...prevData.gaitSpeedTest,
        [field]: value
      }
    }));
  };

  // Manejar cambios en los campos de chair stand
  const handleChairStandChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      chairStandTest: {
        ...prevData.chairStandTest,
        [field]: value
      }
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    onClose({
      ...formData,
      isComplete: true,
      score: formData.totalScore
    });
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="sppb-modal-overlay">
      <div className="sppb-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-walking"></i>
            Short Physical Performance Battery
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="info-note">
            <p>Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          <div className="assessment-form">
            <div className="section balance-tests-section">
              <h3>BALANCE TESTS</h3>
              
              <div className="balance-test">
                <div className="test-item">
                  <label>SIDE BY SIDE STAND:</label>
                  <select
                    value={formData.balanceTests.sideByStand}
                    onChange={(e) => handleBalanceChange('sideByStand', e.target.value)}
                  >
                    {balanceOptions.sideByStand.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="instruction">Instructions: Try to stand with your feet together, side by side, for about 10 seconds.</div>
                </div>
                
                <div className="test-item">
                  <label>SEMI-TANDEM STAND:</label>
                  <select
                    value={formData.balanceTests.semiTandemStand}
                    onChange={(e) => handleBalanceChange('semiTandemStand', e.target.value)}
                  >
                    {balanceOptions.semiTandemStand.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="instruction">Instructions: Try to stand with the side of the heel of one foot touching the big toe of the other foot for about 10 seconds. You may put either foot in front, whichever is more comfortable for you.</div>
                </div>
                
                <div className="test-item">
                  <label>TANDEM STAND:</label>
                  <select
                    value={formData.balanceTests.tandemStand}
                    onChange={(e) => handleBalanceChange('tandemStand', e.target.value)}
                  >
                    {balanceOptions.tandemStand.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="instruction">Instructions: Try to stand with the heel of one foot in front of and touching the toes of the other foot for about 10 seconds. You may put either foot in front, whichever is more comfortable for you.</div>
                </div>
              </div>
              
              <div className="comments-area">
                <label>COMMENTS:</label>
                <textarea
                  value={formData.balanceComments}
                  onChange={(e) => handleTextChange('balanceComments', e.target.value)}
                  rows={3}
                  placeholder="Enter comments about balance tests"
                />
              </div>
            </div>
            
            <div className="section gait-speed-section">
              <h3>GAIT SPEED TEST</h3>
              
              <div className="test-info">
                <div className="info-row">
                  <label>LENGTH OF WALK TEST COURSE:</label>
                  <span className="static-value">Four meters (13.12 ft)</span>
                </div>
              </div>
              
              <div className="test-item">
                <label>TIME FOR GAIT SPEED TEST (SEC.):</label>
                <input
                  type="text"
                  value={formData.gaitSpeedTest.time}
                  onChange={(e) => handleGaitSpeedChange('time', e.target.value)}
                  placeholder="Enter time in seconds"
                />
              </div>
              
              <div className="test-item">
                <label>IF PARTICIPANT DID NOT ATTEMPT TEST OR FAILED:</label>
                <select
                  value={formData.gaitSpeedTest.attemptReason}
                  onChange={(e) => handleGaitSpeedChange('attemptReason', e.target.value)}
                >
                  <option value="">Select reason</option>
                  <option value="Tried but unable">Tried but unable</option>
                  <option value="Participant could not walk unassisted">Participant could not walk unassisted</option>
                  <option value="Not attempted, assessor felt unsafe">Not attempted, assessor felt unsafe</option>
                  <option value="Not attempted, participant felt unsafe">Not attempted, participant felt unsafe</option>
                  <option value="Participant unable to understand instructions">Participant unable to understand instructions</option>
                  <option value="Other">Other</option>
                  <option value="Participant refused">Participant refused</option>
                </select>
                <div className="instruction">Instructions: If participant did not attempt test or failed, select reason then go to chair stand test.</div>
              </div>
              
              <div className="test-item">
                <label>AIDS FOR FIRST WALK:</label>
                <select
                  value={formData.gaitSpeedTest.aidsForWalk}
                  onChange={(e) => handleGaitSpeedChange('aidsForWalk', e.target.value)}
                >
                  {aidsForWalkOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="test-item">
                <label>TOTAL WALK TEST SCORE:</label>
                <select
                  value={formData.gaitSpeedTest.walkScore}
                  onChange={(e) => handleGaitSpeedChange('walkScore', e.target.value)}
                >
                  {gaitSpeedScoreOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="comments-area">
                <label>COMMENTS:</label>
                <textarea
                  value={formData.gaitComments}
                  onChange={(e) => handleTextChange('gaitComments', e.target.value)}
                  rows={3}
                  placeholder="Enter comments about gait speed test"
                />
              </div>
            </div>
            
            <div className="section chair-stand-section">
              <h3>CHAIR STAND TEST</h3>
              
              <div className="test-item">
                <label>REPEATED CHAIR TEST SCORE:</label>
                <select
                  value={formData.chairStandTest.score}
                  onChange={(e) => handleChairStandChange('score', e.target.value)}
                >
                  {chairStandScoreOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="comments-area">
                <label>COMMENTS:</label>
                <textarea
                  value={formData.chairComments}
                  onChange={(e) => handleTextChange('chairComments', e.target.value)}
                  rows={3}
                  placeholder="Enter comments about chair stand test"
                />
              </div>
            </div>
            
            <div className="total-scores">
              <div className="score-item">
                <span className="score-label">Total Balance Test Score:</span>
                <span className="score-value">{formData.balanceTests.balanceScore}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Gait Speed Test Score:</span>
                <span className="score-value">{parseInt(formData.gaitSpeedTest.walkScore.charAt(0)) || 0}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Chair Stand Test Score:</span>
                <span className="score-value">{parseInt(formData.chairStandTest.score.charAt(0)) || 0}</span>
              </div>
              <div className="score-item total">
                <span className="score-label">Total Score:</span>
                <span className="score-value">{formData.totalScore}</span>
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

export default SPPBModal;