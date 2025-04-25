// components/standardizedTests/AceIIIModal.jsx
import React, { useState, useEffect } from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/standardizedTests/AceIIIModal.scss';

const AceIIIModal = ({ isOpen, onClose, initialData = null }) => {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    // Sección de Atención
    attentionDay: initialData?.attentionDay || '',
    attentionDate: initialData?.attentionDate || '',
    attentionMonth: initialData?.attentionMonth || '',
    attentionYear: initialData?.attentionYear || '',
    attentionSeason: initialData?.attentionSeason || '',
    attentionFloor: initialData?.attentionFloor || '',
    attentionStreetHospital: initialData?.attentionStreetHospital || '',
    attentionTown: initialData?.attentionTown || '',
    attentionCounty: initialData?.attentionCounty || '',
    attentionCountry: initialData?.attentionCountry || '',
    attentionOrientationScore: initialData?.attentionOrientationScore || '0',
    attentionTrials: initialData?.attentionTrials || '',
    attentionThreeWordsScore: initialData?.attentionThreeWordsScore || '0',
    attentionSerial7s: initialData?.attentionSerial7s || '',
    attentionSerial7sScore: initialData?.attentionSerial7sScore || '0',
    
    // Sección de Memoria
    memoryThreeWordsScore: initialData?.memoryThreeWordsScore || '0',
    memoryNameAddress: initialData?.memoryNameAddress || '',
    memoryNameAddressScore: initialData?.memoryNameAddressScore || '0',
    memoryPresidents: initialData?.memoryPresidents || '',
    memoryPresidentsScore: initialData?.memoryPresidentsScore || '0',
    memoryDelayedRecall: initialData?.memoryDelayedRecall || '',
    memoryDelayedRecallScore: initialData?.memoryDelayedRecallScore || '0',
    
    // Sección de Fluidez
    fluencyLetterWords: initialData?.fluencyLetterWords || '',
    fluencyLetterScore: initialData?.fluencyLetterScore || '0',
    fluencyAnimals: initialData?.fluencyAnimals || '',
    fluencyAnimalsScore: initialData?.fluencyAnimalsScore || '0',
    
    // Sección de Lenguaje
    languagePencilPaper: initialData?.languagePencilPaper || '',
    languagePencilPaperScore: initialData?.languagePencilPaperScore || '0',
    languageSentences: initialData?.languageSentences || '',
    languageSentencesScore: initialData?.languageSentencesScore || '0',
    languageRepeat: initialData?.languageRepeat || '',
    languageRepeatCaterpillarScore: initialData?.languageRepeatCaterpillarScore || '0',
    languageRepeatGlittersScore: initialData?.languageRepeatGlittersScore || '0',
    languageRepeatStitchScore: initialData?.languageRepeatStitchScore || '0',
    languageReadingWords: initialData?.languageReadingWords || '',
    languageReadingWordsScore: initialData?.languageReadingWordsScore || '0',
    
    // Sección de Visuoespacial
    visuospatialPictures: initialData?.visuospatialPictures || '',
    visuospatialPicturesScore: initialData?.visuospatialPicturesScore || '0',
    visuospatialIdentifications: initialData?.visuospatialIdentifications || '',
    visuospatialIdentificationsScore: initialData?.visuospatialIdentificationsScore || '0',
    visuospatialInfinity: initialData?.visuospatialInfinity || '',
    visuospatialInfinityScore: initialData?.visuospatialInfinityScore || '0',
    visuospatialCube: initialData?.visuospatialCube || '',
    visuospatialCubeScore: initialData?.visuospatialCubeScore || '0',
    visuospatialClock: initialData?.visuospatialClock || '',
    visuospatialClockScore: initialData?.visuospatialClockScore || '0',
    visuospatialDots: initialData?.visuospatialDots || '',
    visuospatialDotsScore: initialData?.visuospatialDotsScore || '0',
    visuospatialLetters: initialData?.visuospatialLetters || '',
    visuospatialLettersScore: initialData?.visuospatialLettersScore || '0',
    
    // Resultados Totales
    attentionTotal: initialData?.attentionTotal || 0,
    memoryTotal: initialData?.memoryTotal || 0,
    fluencyTotal: initialData?.fluencyTotal || 0,
    languageTotal: initialData?.languageTotal || 0,
    visuospatialTotal: initialData?.visuospatialTotal || 0,
    totalScore: initialData?.totalScore || 0,
    
    isComplete: initialData?.isComplete || false
  });

  // Estado para controlar las secciones expandidas
  const [sectionsOpen, setSectionsOpen] = useState({
    attention: true,
    memory: true,
    fluency: true,
    language: true,
    visuospatial: true
  });

  // Estado para validación
  const [validationErrors, setValidationErrors] = useState({});

  // Calcular automáticamente los totales cuando cambian los datos
  useEffect(() => {
    const attentionTotal = (
      parseInt(formData.attentionOrientationScore) + 
      parseInt(formData.attentionThreeWordsScore) + 
      parseInt(formData.attentionSerial7sScore)
    );
    
    const memoryTotal = (
      parseInt(formData.memoryThreeWordsScore) + 
      parseInt(formData.memoryNameAddressScore) + 
      parseInt(formData.memoryPresidentsScore) + 
      parseInt(formData.memoryDelayedRecallScore)
    );
    
    const fluencyTotal = (
      parseInt(formData.fluencyLetterScore) + 
      parseInt(formData.fluencyAnimalsScore)
    );
    
    const languageTotal = (
      parseInt(formData.languagePencilPaperScore) + 
      parseInt(formData.languageSentencesScore) + 
      parseInt(formData.languageRepeatCaterpillarScore) + 
      parseInt(formData.languageRepeatGlittersScore) + 
      parseInt(formData.languageRepeatStitchScore) + 
      parseInt(formData.languageReadingWordsScore)
    );
    
    const visuospatialTotal = (
      parseInt(formData.visuospatialPicturesScore) + 
      parseInt(formData.visuospatialIdentificationsScore) + 
      parseInt(formData.visuospatialInfinityScore) + 
      parseInt(formData.visuospatialCubeScore) + 
      parseInt(formData.visuospatialClockScore) + 
      parseInt(formData.visuospatialDotsScore) + 
      parseInt(formData.visuospatialLettersScore)
    );
    
    const totalScore = attentionTotal + memoryTotal + fluencyTotal + languageTotal + visuospatialTotal;
    
    setFormData(prevData => ({
      ...prevData,
      attentionTotal,
      memoryTotal,
      fluencyTotal,
      languageTotal,
      visuospatialTotal,
      totalScore
    }));
  }, [
    formData.attentionOrientationScore, formData.attentionThreeWordsScore, formData.attentionSerial7sScore,
    formData.memoryThreeWordsScore, formData.memoryNameAddressScore, formData.memoryPresidentsScore, formData.memoryDelayedRecallScore,
    formData.fluencyLetterScore, formData.fluencyAnimalsScore,
    formData.languagePencilPaperScore, formData.languageSentencesScore, formData.languageRepeatCaterpillarScore,
    formData.languageRepeatGlittersScore, formData.languageRepeatStitchScore, formData.languageReadingWordsScore,
    formData.visuospatialPicturesScore, formData.visuospatialIdentificationsScore, formData.visuospatialInfinityScore,
    formData.visuospatialCubeScore, formData.visuospatialClockScore, formData.visuospatialDotsScore, formData.visuospatialLettersScore
  ]);

  // Manejar cambios en los campos
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
    
    // Limpiar error de validación si existe
    if (validationErrors[field]) {
      setValidationErrors(prevErrors => {
        const newErrors = {...prevErrors};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Alternar secciones expandidas/colapsadas
  const toggleSection = (section) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Opciones para los puntajes
  const scoreOptions = (max) => {
    const options = [];
    for (let i = 0; i <= max; i++) {
      options.push({ value: i.toString(), label: i.toString() });
    }
    return options;
  };

  // Validar el formulario antes de enviar
  const validateForm = () => {
    // Para este formulario, no hacemos obligatorio ningún campo específico
    // El evaluador puede completar las secciones que considere necesarias
    return true;
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      setFormData(prevData => ({
        ...prevData,
        isComplete: true
      }));
      
      onClose({
        ...formData,
        isComplete: true,
        score: formData.totalScore
      });
    }
  };

  // Obtener nivel de deterioro cognitivo basado en la puntuación total
  const getCognitiveLevel = () => {
    const score = formData.totalScore;
    
    if (score >= 88) return 'normal';
    if (score >= 82) return 'mild';
    if (score >= 52) return 'moderate';
    return 'severe';
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="ace-iii-modal-overlay">
      <div className="ace-iii-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-brain"></i>
            ACE III (Addenbrooke's Cognitive Examination)
          </h2>
          <button className="close-button" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="assessment-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="info-text">
                <p>The ACE-III is a cognitive assessment tool used to detect dementia. It assesses five cognitive domains: attention, memory, verbal fluency, language and visuospatial abilities. The maximum score is 100 points.</p>
              </div>
            </div>
            <p className="score-note">Prior scores are for reference only. To print previous scores please type in additional boxes below.</p>
          </div>
          
          {/* Sección de Atención */}
          <div className={`ace-section attention-section ${!sectionsOpen.attention ? 'collapsed' : ''}`}>
            <div 
              className="section-header" 
              onClick={() => toggleSection('attention')}
            >
              <h3>
                <i className="fas fa-bullseye"></i>
                Attention
              </h3>
              <span className="section-score">
                Score: {formData.attentionTotal}/18
              </span>
              <button className="toggle-btn">
                <i className={`fas fa-chevron-${sectionsOpen.attention ? 'up' : 'down'}`}></i>
              </button>
            </div>
            
            {sectionsOpen.attention && (
              <div className="section-content">
                <div className="scoring-instructions">
                  <h4>Scoring Instructions</h4>
                </div>
                
                <div className="subsection">
                  <h4>Orientation</h4>
                  
                  <div className="orientation-grid">
                    <div className="question-col">
                      <div className="question-item">
                        <label>Ask: What is the</label>
                      </div>
                      <div className="answer-item">
                        <label>DAY:</label>
                        <input 
                          type="text" 
                          value={formData.attentionDay} 
                          onChange={(e) => handleChange('attentionDay', e.target.value)}
                        />
                      </div>
                      <div className="answer-item">
                        <label>DATE:</label>
                        <input 
                          type="text" 
                          value={formData.attentionDate} 
                          onChange={(e) => handleChange('attentionDate', e.target.value)}
                        />
                      </div>
                      <div className="answer-item">
                        <label>MONTH:</label>
                        <input 
                          type="text" 
                          value={formData.attentionMonth} 
                          onChange={(e) => handleChange('attentionMonth', e.target.value)}
                        />
                      </div>
                      <div className="answer-item">
                        <label>YEAR:</label>
                        <input 
                          type="text" 
                          value={formData.attentionYear} 
                          onChange={(e) => handleChange('attentionYear', e.target.value)}
                        />
                      </div>
                      <div className="answer-item">
                        <label>SEASON:</label>
                        <input 
                          type="text" 
                          value={formData.attentionSeason} 
                          onChange={(e) => handleChange('attentionSeason', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="question-col">
                      <div className="question-item">
                        <label>Ask: Which</label>
                      </div>
                      <div className="answer-item">
                        <label>NO./FLOOR:</label>
                        <input 
                          type="text" 
                          value={formData.attentionFloor} 
                          onChange={(e) => handleChange('attentionFloor', e.target.value)}
                        />
                      </div>
                      <div className="answer-item">
                        <label>STREET/HOSPITAL:</label>
                        <input 
                          type="text" 
                          value={formData.attentionStreetHospital} 
                          onChange={(e) => handleChange('attentionStreetHospital', e.target.value)}
                        />
                      </div>
                      <div className="answer-item">
                        <label>TOWN:</label>
                        <input 
                          type="text" 
                          value={formData.attentionTown} 
                          onChange={(e) => handleChange('attentionTown', e.target.value)}
                        />
                      </div>
                      <div className="answer-item">
                        <label>COUNTY:</label>
                        <input 
                          type="text" 
                          value={formData.attentionCounty} 
                          onChange={(e) => handleChange('attentionCounty', e.target.value)}
                        />
                      </div>
                      <div className="answer-item">
                        <label>COUNTRY:</label>
                        <input 
                          type="text" 
                          value={formData.attentionCountry} 
                          onChange={(e) => handleChange('attentionCountry', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-10:</label>
                    <select 
                      value={formData.attentionOrientationScore}
                      onChange={(e) => handleChange('attentionOrientationScore', e.target.value)}
                    >
                      {scoreOptions(10).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Attention & Concentration</h4>
                  
                  <div className="instruction-text">
                    <p>"I'M GOING TO GIVE YOU THREE WORDS AND I'D LIKE YOU TO REPEAT THEM AFTER ME: LEMON, KEY AND BALL." AFTER SUBJECT REPEATS, SAY "TRY TO REMEMBER THEM BECAUSE I'M GOING TO ASK YOU LATER".</p>
                    <p>SCORE ONLY THE FIRST TRIAL (REPEAT 3 TIMES IF NECESSARY).</p>
                  </div>
                  
                  <div className="trials-input">
                    <label>REGISTER NUMBER OF TRIALS:</label>
                    <input 
                      type="text" 
                      value={formData.attentionTrials} 
                      onChange={(e) => handleChange('attentionTrials', e.target.value)}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-3:</label>
                    <select 
                      value={formData.attentionThreeWordsScore}
                      onChange={(e) => handleChange('attentionThreeWordsScore', e.target.value)}
                    >
                      {scoreOptions(3).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Serial 7's</h4>
                  
                  <div className="instruction-text">
                    <p>"ASK THE SUBJECT "COULD YOU TAKE 7 AWAY FROM 100?" I'D LIKE YOU TO KEEP TAKING 7 AWAY FROM EACH NEW NUMBER UNTIL I TELL YOU TO STOP".</p>
                    <p>IF SUBJECT MAKES A MISTAKE, DO NOT STOP THEM. LET THE SUBJECT CARRY ON AND CHECK SUBSEQUENT ANSWERS (E.G., 93, 84, 77, 70, 63 - SCORE 4).</p>
                    <p>STOP AFTER FIVE SUBTRACTIONS (93, 86, 79, 72, 65).</p>
                  </div>
                  
                  <div className="serial7s-input">
                    <textarea 
                      value={formData.attentionSerial7s} 
                      onChange={(e) => handleChange('attentionSerial7s', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={3}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-5:</label>
                    <select 
                      value={formData.attentionSerial7sScore}
                      onChange={(e) => handleChange('attentionSerial7sScore', e.target.value)}
                    >
                      {scoreOptions(5).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="section-footer">
              <div className="section-score-summary">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(formData.attentionTotal / 18) * 100}%` }}
                  ></div>
                </div>
                <span className="score-value">{formData.attentionTotal}/18 points</span>
              </div>
            </div>
          </div>
          
          {/* Sección de Memoria */}
          <div className={`ace-section memory-section ${!sectionsOpen.memory ? 'collapsed' : ''}`}>
            <div 
              className="section-header" 
              onClick={() => toggleSection('memory')}
            >
              <h3>
                <i className="fas fa-memory"></i>
                Memory
              </h3>
              <span className="section-score">
                Score: {formData.memoryTotal}/26
              </span>
              <button className="toggle-btn">
                <i className={`fas fa-chevron-${sectionsOpen.memory ? 'up' : 'down'}`}></i>
              </button>
            </div>
            
            {sectionsOpen.memory && (
              <div className="section-content">
                <div className="subsection">
                  <h4>Recall</h4>
                  
                  <div className="instruction-text">
                    <p>ASK: "WHICH 3 WORDS DID I ASK YOU TO REPEAT AND REMEMBER?"</p>
                  </div>
                  
                  <div className="recall-input">
                    <textarea 
                      value={formData.memoryThreeWords} 
                      onChange={(e) => handleChange('memoryThreeWords', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={3}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-3:</label>
                    <select 
                      value={formData.memoryThreeWordsScore}
                      onChange={(e) => handleChange('memoryThreeWordsScore', e.target.value)}
                    >
                      {scoreOptions(3).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Anterograde Memory</h4>
                  
                  <div className="instruction-text">
                    <p>"I'M GOING TO GIVE YOU A NAME AND ADDRESS AND I'D LIKE YOU TO REPEAT THE NAME AND ADDRESS AFTER ME. SO YOU HAVE A CHANCE TO LEARN, WE'LL BE DOING THAT 3 TIMES. I'LL ASK YOU THE NAME AND ADDRESS LATER."</p>
                  </div>
                  
                  <div className="name-address-example">
                    <p>Harry Barnes</p>
                    <p>73 Orchard Close</p>
                    <p>Springfield</p>
                    <p>Minnesota</p>
                  </div>
                  
                  <div className="name-address-input">
                    <textarea 
                      value={formData.memoryNameAddress} 
                      onChange={(e) => handleChange('memoryNameAddress', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={4}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-7:</label>
                    <select 
                      value={formData.memoryNameAddressScore}
                      onChange={(e) => handleChange('memoryNameAddressScore', e.target.value)}
                    >
                      {scoreOptions(7).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Retrograde Memory</h4>
                  
                  <div className="instruction-text">
                    <p>NAME OF THE CURRENT PRESIDENT</p>
                    <p>NAME OF THE VICE PRESIDENT</p>
                    <p>NAME OF THE PREVIOUS PRESIDENT</p>
                    <p>NAME OF THE PRESIDENT WHO WAS ASSASSINATED IN THE 1960s</p>
                  </div>
                  
                  <div className="presidents-input">
                    <textarea 
                      value={formData.memoryPresidents} 
                      onChange={(e) => handleChange('memoryPresidents', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={4}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-4:</label>
                    <select 
                      value={formData.memoryPresidentsScore}
                      onChange={(e) => handleChange('memoryPresidentsScore', e.target.value)}
                    >
                      {scoreOptions(4).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Delayed Recall</h4>
                  
                  <div className="instruction-text">
                    <p>ASK: "NOW TELL ME WHAT YOU REMEMBER ABOUT THAT NAME AND ADDRESS WE WERE REPEATING AT THE BEGINNING"</p>
                  </div>
                  
                  <div className="name-address-input">
                    <textarea 
                      value={formData.memoryDelayedRecall} 
                      onChange={(e) => handleChange('memoryDelayedRecall', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={4}
                    />
                  </div>
                  
                  <div className="name-address-hints">
                    <table className="hints-table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Freely Recalled</th>
                          <th>After Cue</th>
                          <th>After Recognition</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>First Name</td>
                          <td>Harry</td>
                          <td>H___</td>
                          <td>Henry / Harold / Harry</td>
                        </tr>
                        <tr>
                          <td>Last Name</td>
                          <td>Barnes</td>
                          <td>B___</td>
                          <td>Barnes / Burgess / Brown</td>
                        </tr>
                        <tr>
                          <td>Street Number</td>
                          <td>73</td>
                          <td>7____</td>
                          <td>73 / 72 / 83</td>
                        </tr>
                        <tr>
                          <td>Street Name</td>
                          <td>Orchard</td>
                          <td>O___</td>
                          <td>Oak / Orchard / Olive</td>
                        </tr>
                        <tr>
                          <td>Type of Street</td>
                          <td>Close</td>
                          <td>C___</td>
                          <td>Close / Court / Circle</td>
                        </tr>
                        <tr>
                          <td>Town</td>
                          <td>Springfield</td>
                          <td>S___</td>
                          <td>Springfield / Springwater / Summerfield</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>Minnesota</td>
                          <td>M___</td>
                          <td>Minnesota / Montana / Missouri</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-12:</label>
                    <select 
                      value={formData.memoryDelayedRecallScore}
                      onChange={(e) => handleChange('memoryDelayedRecallScore', e.target.value)}
                    >
                      {scoreOptions(12).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="section-footer">
              <div className="section-score-summary">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(formData.memoryTotal / 26) * 100}%` }}
                  ></div>
                </div>
                <span className="score-value">{formData.memoryTotal}/26 points</span>
              </div>
            </div>
          </div>
          
          {/* Sección de Fluidez */}
          <div className={`ace-section fluency-section ${!sectionsOpen.fluency ? 'collapsed' : ''}`}>
            <div 
              className="section-header" 
              onClick={() => toggleSection('fluency')}
            >
              <h3>
              <i className="fas fa-comments"></i>
                Fluency
              </h3>
              <span className="section-score">
                Score: {formData.fluencyTotal}/14
              </span>
              <button className="toggle-btn">
                <i className={`fas fa-chevron-${sectionsOpen.fluency ? 'up' : 'down'}`}></i>
              </button>
            </div>
            
            {sectionsOpen.fluency && (
              <div className="section-content">
                <div className="subsection">
                  <h4>Letter Fluency</h4>
                  
                  <div className="instruction-text">
                    <p>SAY: "I'M GOING TO GIVE YOU A LETTER OF THE ALPHABET AND I'D LIKE YOU TO GENERATE AS MANY WORDS AS YOU CAN BEGINNING WITH THAT LETTER, BUT NOT NAMES OF PEOPLE OR PLACES. FOR EXAMPLE, IF I GIVE YOU THE LETTER "C", YOU COULD GIVE ME WORDS LIKE "CAT, CRY, CLOCK" AND SO ON. BUT, YOU CAN'T GIVE ME WORDS LIKE CATHERINE OR CANADA. DO YOU UNDERSTAND? ARE YOU READY? YOU HAVE ONE MINUTE. THE LETTER I WANT YOU TO USE IS THE LETTER P."</p>
                  </div>
                  
                  <div className="fluency-words-input">
                    <textarea 
                      value={formData.fluencyLetterWords} 
                      onChange={(e) => handleChange('fluencyLetterWords', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={4}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-7:</label>
                    <select 
                      value={formData.fluencyLetterScore}
                      onChange={(e) => handleChange('fluencyLetterScore', e.target.value)}
                    >
                      {scoreOptions(7).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Category Fluency</h4>
                  
                  <div className="instruction-text">
                    <p>SAY: "NOW CAN YOU NAME AS MANY ANIMALS AS POSSIBLE. IT CAN BEGIN WITH ANY LETTER."</p>
                  </div>
                  
                  <div className="fluency-words-input">
                    <textarea 
                      value={formData.fluencyAnimals} 
                      onChange={(e) => handleChange('fluencyAnimals', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={4}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-7:</label>
                    <select 
                      value={formData.fluencyAnimalsScore}
                      onChange={(e) => handleChange('fluencyAnimalsScore', e.target.value)}
                    >
                      {scoreOptions(7).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="section-footer">
              <div className="section-score-summary">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(formData.fluencyTotal / 14) * 100}%` }}
                  ></div>
                </div>
                <span className="score-value">{formData.fluencyTotal}/14 points</span>
              </div>
            </div>
          </div>
          
          {/* Sección de Lenguaje */}
          <div className={`ace-section language-section ${!sectionsOpen.language ? 'collapsed' : ''}`}>
            <div 
              className="section-header" 
              onClick={() => toggleSection('language')}
            >
              <h3>
                <i className="fas fa-language"></i>
                Language
              </h3>
              <span className="section-score">
                Score: {formData.languageTotal}/26
              </span>
              <button className="toggle-btn">
                <i className={`fas fa-chevron-${sectionsOpen.language ? 'up' : 'down'}`}></i>
              </button>
            </div>
            
            {sectionsOpen.language && (
              <div className="section-content">
                <div className="subsection">
                  <h4>Comprehension</h4>
                  
                  <div className="instruction-text">
                    <p>PLACE A PENCIL AND A PIECE OF PAPER IN FRONT OF THE SUBJECT AS A PRACTICE TRIAL. ASK THE SUBJECT TO "PICK UP THE PENCIL AND THEN THE PAPER." IF INCORRECT, SCORE 0 AND DO NOT CONTINUE FURTHER.</p>
                    <p>IF THE SUBJECT IS CORRECT ON THE PRACTICE TRIAL, CONTINUE WITH THE FOLLOWING THREE COMMANDS BELOW.</p>
                    <ol>
                      <li>ASK THE SUBJECT TO "POINT TO THE CEILING, THEN TO THE FLOOR."</li>
                      <li>ASK THE SUBJECT TO "PICK UP THE PENCIL BUT NOT THE PAPER."</li>
                      <li>ASK THE SUBJECT TO "PASS ME THE PENCIL AFTER TOUCHING THE PAPER."</li>
                    </ol>
                    <p>NOTE: PLACE THE PENCIL AND PAPER IN FRONT OF THE SUBJECT BEFORE EACH COMMAND!</p>
                  </div>
                  
                  <div className="pencil-paper-input">
                    <textarea 
                      value={formData.languagePencilPaper} 
                      onChange={(e) => handleChange('languagePencilPaper', e.target.value)}
                      placeholder="Enter patient's performance"
                      rows={3}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-3:</label>
                    <select 
                      value={formData.languagePencilPaperScore}
                      onChange={(e) => handleChange('languagePencilPaperScore', e.target.value)}
                    >
                      {scoreOptions(3).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Writing</h4>
                  
                  <div className="instruction-text">
                    <p>SAY: "I WANT YOU TO WRITE TWO SENTENCES. IT CAN BE ABOUT ANYTHING THAT YOU LIKE. I WANT YOU TO WRITE IN FULL SENTENCES AND AVOID ABBREVIATIONS." IF THE SUBJECT DOES NOT KNOW WHAT TO WRITE ABOUT, YOU COULD SUGGEST A FEW TOPICS. "FOR INSTANCE, YOU COULD WRITE ABOUT A RECENT HOLIDAY, YOUR HOBBIES, YOUR FAMILY OR CHILDHOOD." IF THE SUBJECT WRITES ONLY ONE SENTENCE, THEN PROMPT FOR A SECOND ONE.</p>
                    <p>SENTENCES MUST CONTAIN A SUBJECT AND A VERB. SPELLING AND GRAMMAR ARE PENALIZED. SENTENCES DO NOT NEED TO BE ABOUT THE SAME TOPIC. SEE SCORING GUIDELINES FOR MORE INFORMATION.</p>
                  </div>
                  
                  <div className="sentences-input">
                    <textarea 
                      value={formData.languageSentences} 
                      onChange={(e) => handleChange('languageSentences', e.target.value)}
                      placeholder="Enter patient's sentences"
                      rows={4}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-2:</label>
                    <select 
                      value={formData.languageSentencesScore}
                      onChange={(e) => handleChange('languageSentencesScore', e.target.value)}
                    >
                      {scoreOptions(2).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Repetition</h4>
                  
                  <div className="instruction-text">
                    <p>ASK THE SUBJECT TO REPEAT: "CATERPILLAR", "ECCENTRICITY", "UNINTELLIGIBLE", "STATISTICIAN"</p>
                    <p>SCORE 2 IF ALL ARE CORRECT; SCORE 1 IF 3 ARE CORRECT; AND SCORE 0 IF 2 OR LESS ARE CORRECT.</p>
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-2:</label>
                    <select 
                      value={formData.languageRepeatCaterpillarScore}
                      onChange={(e) => handleChange('languageRepeatCaterpillarScore', e.target.value)}
                    >
                      {scoreOptions(2).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="instruction-text mt-3">
                    <p>ASK THE SUBJECT TO REPEAT: "ALL THAT GLITTERS IS NOT GOLD"</p>
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-1:</label>
                    <select 
                      value={formData.languageRepeatGlittersScore}
                      onChange={(e) => handleChange('languageRepeatGlittersScore', e.target.value)}
                    >
                      {scoreOptions(1).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="instruction-text mt-3">
                    <p>ASK THE SUBJECT TO REPEAT: "A STITCH IN TIME SAVES NINE"</p>
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-1:</label>
                    <select 
                      value={formData.languageRepeatStitchScore}
                      onChange={(e) => handleChange('languageRepeatStitchScore', e.target.value)}
                    >
                      {scoreOptions(1).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Reading</h4>
                  
                  <div className="instruction-text">
                    <p>ASK THE SUBJECT TO READ THE FOLLOWING WORDS: (SCORE 1 ONLY IF ALL CORRECT)</p>
                  </div>
                  
                  <div className="reading-words">
                    <p>sew</p>
                    <p>pint</p>
                    <p>soot</p>
                    <p>dough</p>
                    <p>height</p>
                  </div>
                  
                  <div className="reading-input">
                    <textarea 
                      value={formData.languageReadingWords} 
                      onChange={(e) => handleChange('languageReadingWords', e.target.value)}
                      placeholder="Enter patient's performance"
                      rows={3}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-1:</label>
                    <select 
                      value={formData.languageReadingWordsScore}
                      onChange={(e) => handleChange('languageReadingWordsScore', e.target.value)}
                    >
                      {scoreOptions(1).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="section-footer">
              <div className="section-score-summary">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(formData.languageTotal / 26) * 100}%` }}
                  ></div>
                </div>
                <span className="score-value">{formData.languageTotal}/26 points</span>
              </div>
            </div>
          </div>
          
          {/* Sección de Visuoespacial */}
          <div className={`ace-section visuospatial-section ${!sectionsOpen.visuospatial ? 'collapsed' : ''}`}>
            <div 
              className="section-header" 
              onClick={() => toggleSection('visuospatial')}
            >
              <h3>
                <i className="fas fa-vector-square"></i>
                Visuospatial Abilities
              </h3>
              <span className="section-score">
                Score: {formData.visuospatialTotal}/16
              </span>
              <button className="toggle-btn">
                <i className={`fas fa-chevron-${sectionsOpen.visuospatial ? 'up' : 'down'}`}></i>
              </button>
            </div>
            
            {sectionsOpen.visuospatial && (
              <div className="section-content">
                <div className="subsection">
                  <h4>Object Recognition</h4>
                  
                  <div className="instruction-text">
                    <p>ASK THE SUBJECT TO NAME THE FOLLOWING PICTURES:</p>
                  </div>
                  
                  <div className="pictures-grid">
                    <div className="picture-row">
                      <div className="picture-item"><img src="/images/spoon.png" alt="spoon" /></div>
                      <div className="picture-item"><img src="/images/book.png" alt="book" /></div>
                      <div className="picture-item"><img src="/images/kangaroo.png" alt="kangaroo" /></div>
                    </div>
                    <div className="picture-row">
                      <div className="picture-item"><img src="/images/penguin.png" alt="penguin" /></div>
                      <div className="picture-item"><img src="/images/anchor.png" alt="anchor" /></div>
                      <div className="picture-item"><img src="/images/camel.png" alt="camel" /></div>
                    </div>
                    <div className="picture-row">
                      <div className="picture-item"><img src="/images/harp.png" alt="harp" /></div>
                      <div className="picture-item"><img src="/images/rhino.png" alt="rhinoceros" /></div>
                      <div className="picture-item"><img src="/images/barrel.png" alt="barrel" /></div>
                    </div>
                    <div className="picture-row">
                      <div className="picture-item"><img src="/images/crown.png" alt="crown" /></div>
                      <div className="picture-item"><img src="/images/crocodile.png" alt="crocodile" /></div>
                      <div className="picture-item"><img src="/images/accordion.png" alt="accordion" /></div>
                    </div>
                  </div>
                  
                  <div className="naming-input">
                    <textarea 
                      value={formData.visuospatialPictures} 
                      onChange={(e) => handleChange('visuospatialPictures', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={3}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-12:</label>
                    <select 
                      value={formData.visuospatialPicturesScore}
                      onChange={(e) => handleChange('visuospatialPicturesScore', e.target.value)}
                    >
                      {scoreOptions(12).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Perceptual Abilities</h4>
                  
                  <div className="instruction-text">
                    <p>USING THE PICTURES ABOVE, ASK THE SUBJECT TO:</p>
                    <ol>
                      <li>POINT TO THE ONE WHICH IS ASSOCIATED WITH THE MONARCHY</li>
                      <li>POINT TO THE ONE WHICH IS A MARSUPIAL</li>
                      <li>POINT TO THE ONE WHICH IS FOUND IN THE ANTARCTIC</li>
                      <li>POINT TO THE ONE WHICH HAS A NAUTICAL CONNECTION</li>
                    </ol>
                  </div>
                  
                  <div className="perceptual-input">
                    <textarea 
                      value={formData.visuospatialIdentifications} 
                      onChange={(e) => handleChange('visuospatialIdentifications', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={3}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-4:</label>
                    <select 
                      value={formData.visuospatialIdentificationsScore}
                      onChange={(e) => handleChange('visuospatialIdentificationsScore', e.target.value)}
                    >
                      {scoreOptions(4).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Visuospatial Drawing</h4>
                  
                  <div className="instruction-text">
                    <p>INFINITY DIAGRAM: ASK THE SUBJECT TO COPY THIS DIAGRAM.</p>
                    <div className="diagram-sample">
                      <img src="/images/infinity.png" alt="infinity diagram" />
                    </div>
                  </div>
                  
                  <div className="visuospatial-input">
                    <textarea 
                      value={formData.visuospatialInfinity} 
                      onChange={(e) => handleChange('visuospatialInfinity', e.target.value)}
                      placeholder="Enter observations of patient's drawing"
                      rows={2}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-1:</label>
                    <select 
                      value={formData.visuospatialInfinityScore}
                      onChange={(e) => handleChange('visuospatialInfinityScore', e.target.value)}
                    >
                      {scoreOptions(1).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="instruction-text mt-3">
                    <p>WIRE CUBE: ASK THE SUBJECT TO COPY THIS DRAWING (FOR SCORING, SEE INSTRUCTION GUIDE)</p>
                    <div className="diagram-sample">
                      <img src="/images/cube.png" alt="wire cube" />
                    </div>
                  </div>
                  
                  <div className="visuospatial-input">
                    <textarea 
                      value={formData.visuospatialCube} 
                      onChange={(e) => handleChange('visuospatialCube', e.target.value)}
                      placeholder="Enter observations of patient's drawing"
                      rows={2}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-2:</label>
                    <select 
                      value={formData.visuospatialCubeScore}
                      onChange={(e) => handleChange('visuospatialCubeScore', e.target.value)}
                    >
                      {scoreOptions(2).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="instruction-text mt-3">
                    <p>CLOCK: ASK THE SUBJECT TO DRAW A CLOCK FACE WITH NUMBERS, THEN ASK THE SUBJECT TO PUT THE HANDS AT TEN PAST FIVE. (FOR SCORING, SEE INSTRUCTION GUIDE: CIRCLE = 1; NUMBERS = 2; HANDS = 2 IF ALL CORRECT).</p>
                  </div>
                  
                  <div className="visuospatial-input">
                    <textarea 
                      value={formData.visuospatialClock} 
                      onChange={(e) => handleChange('visuospatialClock', e.target.value)}
                      placeholder="Enter observations of patient's drawing"
                      rows={2}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-5:</label>
                    <select 
                      value={formData.visuospatialClockScore}
                      onChange={(e) => handleChange('visuospatialClockScore', e.target.value)}
                    >
                      {scoreOptions(5).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Dot Counting</h4>
                  
                  <div className="instruction-text">
                    <p>ASK THE SUBJECT TO COUNT THE DOTS WITHOUT POINTING TO THEM:</p>
                    <div className="dots-grid">
                      <div className="dots-row">
                        <div className="dots-box">
                          <img src="/images/dots1.png" alt="dots 1" />
                        </div>
                        <div className="dots-box">
                          <img src="/images/dots2.png" alt="dots 2" />
                        </div>
                      </div>
                      <div className="dots-row">
                        <div className="dots-box">
                          <img src="/images/dots3.png" alt="dots 3" />
                        </div>
                        <div className="dots-box">
                          <img src="/images/dots4.png" alt="dots 4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dots-input">
                    <textarea 
                      value={formData.visuospatialDots} 
                      onChange={(e) => handleChange('visuospatialDots', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={2}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-4:</label>
                    <select 
                      value={formData.visuospatialDotsScore}
                      onChange={(e) => handleChange('visuospatialDotsScore', e.target.value)}
                    >
                      {scoreOptions(4).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="subsection">
                  <h4>Letter Identification</h4>
                  
                  <div className="instruction-text">
                    <p>ASK THE SUBJECT TO IDENTIFY THE LETTERS:</p>
                    <div className="letters-grid">
                      <div className="letter-box">
                        <img src="/images/letter-k.png" alt="letter K" />
                      </div>
                      <div className="letter-box">
                        <img src="/images/letter-m.png" alt="letter M" />
                      </div>
                      <div className="letter-box">
                        <img src="/images/letter-a.png" alt="letter A" />
                      </div>
                      <div className="letter-box">
                        <img src="/images/letter-t.png" alt="letter T" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="letters-input">
                    <textarea 
                      value={formData.visuospatialLetters} 
                      onChange={(e) => handleChange('visuospatialLetters', e.target.value)}
                      placeholder="Enter patient's responses"
                      rows={2}
                    />
                  </div>
                  
                  <div className="score-selector">
                    <label>SCORE 0-4:</label>
                    <select 
                      value={formData.visuospatialLettersScore}
                      onChange={(e) => handleChange('visuospatialLettersScore', e.target.value)}
                    >
                      {scoreOptions(4).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="section-footer">
              <div className="section-score-summary">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(formData.visuospatialTotal / 16) * 100}%` }}
                  ></div>
                </div>
                <span className="score-value">{formData.visuospatialTotal}/16 points</span>
              </div>
            </div>
          </div>
          
          {/* Sección de Resultados Totales */}
          <div className="total-score">
            <div className={`score-card ${getCognitiveLevel()}`}>
              <div className="score-header">
                <h4>ACE-III Total Score</h4>
                <span className="score-badge">{formData.totalScore}/100</span>
              </div>
              
              <div className="score-content">
                <div className="domains-summary">
                  <div className="domain-item">
                    <div className="domain-label">
                      <i className="fas fa-bullseye"></i>
                      <span>Attention</span>
                    </div>
                    <div className="domain-score">{formData.attentionTotal}/18</div>
                    <div className="domain-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${(formData.attentionTotal / 18) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="domain-item">
                    <div className="domain-label">
                      <i className="fas fa-memory"></i>
                      <span>Memory</span>
                    </div>
                    <div className="domain-score">{formData.memoryTotal}/26</div>
                    <div className="domain-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${(formData.memoryTotal / 26) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="domain-item">
                    <div className="domain-label">
                      <i className="fas fa-comments"></i>
                      <span>Fluency</span>
                    </div>
                    <div className="domain-score">{formData.fluencyTotal}/14</div>
                    <div className="domain-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${(formData.fluencyTotal / 14) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="domain-item">
                    <div className="domain-label">
                      <i className="fas fa-language"></i>
                      <span>Language</span>
                    </div>
                    <div className="domain-score">{formData.languageTotal}/26</div>
                    <div className="domain-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${(formData.languageTotal / 26) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="domain-item">
                    <div className="domain-label">
                      <i className="fas fa-vector-square"></i>
                      <span>Visuospatial</span>
                    </div>
                    <div className="domain-score">{formData.visuospatialTotal}/16</div>
                    <div className="domain-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${(formData.visuospatialTotal / 16) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="interpretation">
                  <div className="cutoff-levels">
                    <div className={`level ${formData.totalScore < 82 ? 'active' : ''}`}>
                      <div className="level-indicator severe"></div>
                      <div className="level-label">
                        <strong>Severe Impairment</strong>
                        <span>Score &lt; 82</span>
                      </div>
                    </div>
                    
                    <div className={`level ${formData.totalScore >= 82 && formData.totalScore < 88 ? 'active' : ''}`}>
                      <div className="level-indicator moderate"></div>
                      <div className="level-label">
                      <strong>Mild Cognitive Impairment</strong>
                        <span>Score: 82-87</span>
                      </div>
                    </div>
                    
                    <div className={`level ${formData.totalScore >= 88 ? 'active' : ''}`}>
                      <div className="level-indicator normal"></div>
                      <div className="level-label">
                        <strong>Normal Cognition</strong>
                        <span>Score ≥ 88</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="guidelines">
                    <p><strong>Interpretation Guidelines:</strong></p>
                    <ul>
                      <li>Score ≥ 88: Normal cognition</li>
                      <li>Score 82-87: Possible mild cognitive impairment</li>
                      <li>Score &lt; 82: Possible dementia</li>
                    </ul>
                    <p className="note">Note: The ACE-III is a screening tool. A detailed neuropsychological evaluation is needed for formal diagnosis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            <i className="fas fa-check"></i>
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AceIIIModal;