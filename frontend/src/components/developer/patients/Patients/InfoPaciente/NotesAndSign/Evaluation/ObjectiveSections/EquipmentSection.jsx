// components/ObjectiveSections/EquipmentSection.jsx
import React from 'react';
import '../../../../../../../../styles/developer/Patients/InfoPaciente/NotesAndSign/ObjectiveSections/EquipmentSection.scss';

const EquipmentSection = ({ data, onChange }) => {
  // Grupos de equipamientos
  const equipmentGroups = {
    gaitMobility: [
      { id: 'rollingWalker', label: 'Rolling Walker' },
      { id: 'rollator', label: 'Rollator' },
      { id: 'singlePointCane', label: 'Single Point Cane' },
      { id: 'standardWalker', label: 'Standard Walker' },
      { id: 'standardWheelchair', label: 'Standard Wheelchair' },
      { id: 'quadCane', label: 'Quad Cane' },
      { id: 'axillaryCrutches', label: 'Axillary Crutches' },
      { id: 'hemiWalker', label: 'Hemi Walker' },
      { id: 'lofstrandCrutches', label: 'Lofstrand Crutches' },
      { id: 'oneArmDriveWheelchair', label: 'One Arm Drive Wheelchair' },
      { id: 'platformWalker', label: 'Platform Walker' },
      { id: 'powerChair', label: 'Power Chair' }
    ],
    transfers: [
      { id: 'grabBars', label: 'Grab Bars' },
      { id: 'liftChair', label: 'Lift Chair' },
      { id: 'showerChair', label: 'Shower Chair' },
      { id: 'slidingBoard', label: 'Sliding Board' },
      { id: 'stairLift', label: 'Stair Lift' },
      { id: 'stander', label: 'Stander' },
      { id: 'tubTransferBench', label: 'Tub Transfer Bench' }
    ],
    toileting: [
      { id: 'threeInOne', label: '3-in-1' },
      { id: 'bedsideCommode', label: 'Bedside Commode' },
      { id: 'raisedToiletSeat', label: 'Raised Toilet Seat' }
    ],
    bathing: [
      { id: 'bathMitt', label: 'Bath Mitt' },
      { id: 'handHeldShowerHead', label: 'Hand-held Shower Head' },
      { id: 'longHandleSponge', label: 'Long Handle Sponge' },
      { id: 'rubberMatForTub', label: 'Rubber Mat for Tub' },
      { id: 'suctionBrush', label: 'Suction Brush' }
    ],
    bedMobility: [
      { id: 'armRests', label: 'Arm Rests' },
      { id: 'bedBar', label: 'Bed Bar' },
      { id: 'bedRails', label: 'Bed Rails' },
      { id: 'hospitalBed', label: 'Hospital Bed' },
      { id: 'hoyerLift', label: 'Hoyer Lift' },
      { id: 'trapeze', label: 'Trapeze' }
    ],
    dressing: [
      { id: 'buttonHook', label: 'Button Hook' },
      { id: 'dressingStick', label: 'Dressing Stick' },
      { id: 'elasticShoeLaces', label: 'Elastic Shoe Laces' },
      { id: 'longHandleShoeHorn', label: 'Long Handle Shoe Horn' },
      { id: 'sockAide', label: 'Sock Aide' }
    ],
    other: [
      { id: 'armSling', label: 'Arm Sling' },
      { id: 'eatingUtensils', label: 'Eating Utensils' },
      { id: 'reacher', label: 'Reacher' },
      { id: 'stairRails', label: 'Stair Rails' },
      { id: 'tensUnit', label: 'TENS Unit' },
      { id: 'ueSplints', label: 'UE Splints' }
    ]
  };
  
  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (group, itemId) => {
    // Inicializar grupo si no existe
    const groupData = data[group] || {};
    
    // Actualizar el valor del checkbox
    const updatedGroup = {
      ...groupData,
      [itemId]: !groupData[itemId]
    };
    
    onChange({
      ...data,
      [group]: updatedGroup
    });
  };

  // Manejar cambios en textarea
  const handleTextChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // Renderizar un grupo de checkboxes
  const renderCheckboxGroup = (title, group, items) => (
    <div className="equipment-group">
      <h3 className="group-title">{title}:</h3>
      <div className="checkbox-group">
        {items.map(item => (
          <div className="checkbox-item" key={item.id}>
            <input 
              type="checkbox" 
              id={item.id} 
              checked={data[group]?.[item.id] || false}
              onChange={() => handleCheckboxChange(group, item.id)}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="equipment-section">
      <h2 className="section-title">Equipment</h2>
      
      <div className="equipment-owned-section">
        <h3 className="subsection-title">EQUIPMENT OWNED</h3>
        
        <div className="equipment-grid">
          <div className="equipment-column">
            {renderCheckboxGroup('GAIT MOBILITY', 'gaitMobility', equipmentGroups.gaitMobility)}
            {renderCheckboxGroup('TRANSFERS', 'transfers', equipmentGroups.transfers)}
            {renderCheckboxGroup('TOILETING', 'toileting', equipmentGroups.toileting)}
          </div>
          
          <div className="equipment-column">
            {renderCheckboxGroup('BATHING', 'bathing', equipmentGroups.bathing)}
            {renderCheckboxGroup('BED MOBILITY', 'bedMobility', equipmentGroups.bedMobility)}
            {renderCheckboxGroup('DRESSING', 'dressing', equipmentGroups.dressing)}
            {renderCheckboxGroup('OTHER', 'other', equipmentGroups.other)}
          </div>
        </div>
      </div>
      
      <div className="additional-info-row">
        <span className="label">ADDITIONAL INFORMATION:</span>
        <textarea 
          value={data.additionalInformation || ''}
          onChange={(e) => handleTextChange('additionalInformation', e.target.value)}
          rows={3}
          placeholder="Add any additional information about equipment"
        />
      </div>
    </div>
  );
};

export default EquipmentSection;