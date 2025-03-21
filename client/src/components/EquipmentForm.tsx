import { useState, ChangeEvent, FormEvent } from 'react';
import '../assets/styles/EquipmentForm.css';

interface Equipment {
  id: string;
  image: File;
  status: 'already-purchased' | 'considering-purchasing';
  preview: string;
}

const EquipmentForm = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [hoursOfOperation, setHoursOfOperation] = useState('');
  const [hasGreenLease, setHasGreenLease] = useState(false);
  const [miscInfo, setMiscInfo] = useState('');

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const newEquipment: Equipment[] = Array.from(e.target.files).map(file => ({
      id: crypto.randomUUID(),
      image: file,
      status: 'already-purchased',
      preview: URL.createObjectURL(file)
    }));
    
    setEquipment([...equipment, ...newEquipment]);
  };

  const handleStatusChange = (id: string, status: 'already-purchased' | 'considering-purchasing') => {
    setEquipment(
      equipment.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const handleRemoveEquipment = (id: string) => {
    setEquipment(equipment.filter(item => item.id !== id));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create form data to send
    const formData = new FormData();
    equipment.forEach(item => {
      formData.append('images', item.image);
      formData.append('statuses', item.status);
    });
    formData.append('hoursOfOperation', hoursOfOperation);
    formData.append('hasGreenLease', hasGreenLease.toString());
    formData.append('miscInfo', miscInfo);
    
    // Here you would send the formData to your backend
    console.log('Form submitted with data:', {
      equipment,
      hoursOfOperation,
      hasGreenLease,
      miscInfo
    });
    
    // Reset form after submission
    // setEquipment([]);
    // setHoursOfOperation('');
    // setHasGreenLease(false);
    // setMiscInfo('');
  };

  return (
    <div className="equipment-form-container">
      <h2>Equipment Carbon Footprint Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Upload Equipment Images</h3>
          <div className="upload-container">
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageUpload} 
              id="image-upload"
              className="file-input"
            />
            <label htmlFor="image-upload" className="file-input-label">
              Choose Files
            </label>
          </div>
          
          {equipment.length > 0 && (
            <div className="equipment-list">
              {equipment.map((item) => (
                <div key={item.id} className="equipment-item">
                  <img 
                    src={item.preview} 
                    alt="Equipment preview" 
                    className="equipment-preview" 
                  />
                  <div className="equipment-controls">
                    <select 
                      value={item.status}
                      onChange={(e) => handleStatusChange(
                        item.id, 
                        e.target.value as 'already-purchased' | 'considering-purchasing'
                      )}
                      className="status-select"
                    >
                      <option value="already-purchased">Already Purchased</option>
                      <option value="considering-purchasing">Considering Purchasing</option>
                    </select>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveEquipment(item.id)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Hours of Operation</h3>
          <input
            type="text"
            value={hoursOfOperation}
            onChange={(e) => setHoursOfOperation(e.target.value)}
            placeholder="e.g., 9AM-5PM Monday-Friday"
            className="text-input"
          />
        </div>

        <div className="form-section">
          <h3>Green Lease</h3>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={hasGreenLease}
              onChange={(e) => setHasGreenLease(e.target.checked)}
            />
            <span className="checkbox-text">Does your establishment have a green lease?</span>
          </label>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <textarea
            value={miscInfo}
            onChange={(e) => setMiscInfo(e.target.value)}
            placeholder="Enter any additional information about your equipment or energy usage..."
            rows={4}
            className="textarea"
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default EquipmentForm;