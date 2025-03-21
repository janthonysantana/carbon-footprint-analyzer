import { useState, useEffect } from 'react';
import '../assets/styles/DashboardView.css';

interface EquipmentData {
  id: string;
  name: string;
  status: 'already-purchased' | 'considering-purchasing';
  carbonImpact: number;
  energyUsage: number;
  recommendations: string[];
}

interface DashboardProps {
  formData?: {
    equipment: EquipmentData[];
    hoursOfOperation: string;
    hasGreenLease: boolean;
    miscInfo: string;
  };
  onBack: () => void;
}

const DashboardView = ({ formData, onBack }: DashboardProps) => {
  useEffect(() => {
    if (formData) {
      console.log("Form Data:", formData);
    }
  }, [formData]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    totalCarbonFootprint: number;
    equipmentData: EquipmentData[];
    insights: string[];
    recommendations: string[];
    improvementAreas: string[];
    savingsPotential: number;
  } | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call to your backend
    // that processes the submitted form data and returns analysis results
    const fetchAnalysisResults = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - in a real app, this would come from your API
        const mockAnalysisResults = {
          totalCarbonFootprint: 1250.75, // in kg CO2e
          equipmentData: [
            {
              id: "1",
              name: "HVAC System",
              status: "already-purchased" as const,
              carbonImpact: 450.23,
              energyUsage: 1200,
              recommendations: [
                "Schedule regular maintenance to improve efficiency",
                "Consider upgrading to a more energy-efficient model in the next replacement cycle"
              ]
            },
            {
              id: "2",
              name: "Refrigeration Unit",
              status: "already-purchased" as const,
              carbonImpact: 325.12,
              energyUsage: 850,
              recommendations: [
                "Ensure proper sealing to prevent energy loss",
                "Adjust temperature settings for optimal efficiency"
              ]
            },
            {
              id: "3",
              name: "New Lighting System",
              status: "considering-purchasing" as const,
              carbonImpact: 75.40,
              energyUsage: 200,
              recommendations: [
                "Choose LED options instead of fluorescent",
                "Install motion sensors to reduce unnecessary usage"
              ]
            }
          ],
          insights: [
            "Your current equipment setup produces approximately 1250 kg of CO2 annually",
            "Operating during off-peak hours could reduce your carbon footprint by up to 15%",
            "Your energy usage profile shows higher than average consumption during summer months"
          ],
          recommendations: [
            "Implement a scheduled maintenance program for all equipment",
            "Consider installing solar panels to offset energy consumption",
            "Update older equipment with ENERGY STAR certified alternatives",
            "Implement a power management system to reduce idle energy consumption"
          ],
          improvementAreas: [
            "HVAC system efficiency could be improved by 20% with modern controls",
            "Transitioning to LED lighting throughout the facility",
            "Implementing automatic shutdown procedures for unused equipment",
            "Better insulation could reduce heating/cooling needs"
          ],
          savingsPotential: 425.30 // in kg CO2e
        };
        
        setData(mockAnalysisResults);
        setLoading(false);
      } catch {
        setError("Failed to analyze carbon footprint. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnalysisResults();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container loading-container">
        <div className="loading-spinner"></div>
        <p>Analyzing your carbon footprint...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={onBack} className="back-button">
          Back to Form
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard-container error-container">
        <h2>No Data Available</h2>
        <p>We couldn't generate analysis for your submission.</p>
        <button onClick={onBack} className="back-button">
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Carbon Footprint Analysis Results</h2>
        <button onClick={onBack} className="back-button">
          Back to Form
        </button>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card total-carbon">
          <h3>Total Carbon Footprint</h3>
          <div className="summary-value">{data.totalCarbonFootprint.toLocaleString()} kg CO2e</div>
          <div className="summary-label">per year</div>
        </div>
        <div className="summary-card savings">
          <h3>Potential Savings</h3>
          <div className="summary-value">{data.savingsPotential.toLocaleString()} kg CO2e</div>
          <div className="summary-label">with improvements</div>
        </div>
      </div>

      <div className="dashboard-section equipment-analysis">
        <h3>Equipment Analysis</h3>
        <div className="equipment-grid">
          {data.equipmentData.map(item => (
            <div key={item.id} className="equipment-card">
              <div className="equipment-header">
                <h4>{item.name}</h4>
                <span className={`status-badge ${item.status}`}>
                  {item.status === 'already-purchased' ? 'Current' : 'Potential'}
                </span>
              </div>
              <div className="equipment-details">
                <div className="detail-item">
                  <span className="detail-label">Carbon Impact:</span>
                  <span className="detail-value">{item.carbonImpact.toLocaleString()} kg CO2e/year</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Energy Usage:</span>
                  <span className="detail-value">{item.energyUsage.toLocaleString()} kWh/year</span>
                </div>
              </div>
              <div className="equipment-recommendations">
                <h5>Recommendations:</h5>
                <ul>
                  {item.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-columns">
        <div className="dashboard-section insights">
          <h3>Key Insights</h3>
          <ul className="insight-list">
            {data.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section recommendations">
          <h3>Recommendations</h3>
          <ul className="recommendation-list">
            {data.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard-section improvement-areas">
        <h3>Areas for Improvement</h3>
        <div className="improvement-grid">
          {data.improvementAreas.map((area, index) => (
            <div key={index} className="improvement-card">
              <div className="improvement-number">{index + 1}</div>
              <div className="improvement-text">{area}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;