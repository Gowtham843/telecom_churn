import { useState } from "react";
import axios from "axios";
import PredictionResult from "./PredictionResult";

function InputForm() {
  const [formData, setFormData] = useState({
    gender: "",
    SeniorCitizen: 0,
    Partner: "",
    Dependents: "",
    tenure: "",
    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: "",
    TotalCharges: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-fill example
  const autoFillExample = () => {
    setFormData({
      gender: "Female",
      SeniorCitizen: 0,
      Partner: "Yes",
      Dependents: "No",
      tenure: 12,
      PhoneService: "Yes",
      MultipleLines: "No",
      InternetService: "Fiber optic",
      OnlineSecurity: "No",
      OnlineBackup: "Yes",
      DeviceProtection: "No",
      TechSupport: "No",
      StreamingTV: "Yes",
      StreamingMovies: "Yes",
      Contract: "Month-to-month",
      PaperlessBilling: "Yes",
      PaymentMethod: "Electronic check",
      MonthlyCharges: 75.35,
      TotalCharges: 900.2,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      gender: "",
      SeniorCitizen: 0,
      Partner: "",
      Dependents: "",
      tenure: "",
      PhoneService: "",
      MultipleLines: "",
      InternetService: "",
      OnlineSecurity: "",
      OnlineBackup: "",
      DeviceProtection: "",
      TechSupport: "",
      StreamingTV: "",
      StreamingMovies: "",
      Contract: "",
      PaperlessBilling: "",
      PaymentMethod: "",
      MonthlyCharges: "",
      TotalCharges: "",
    });
    setResult(null);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    const res = await axios.post("http://127.0.0.1:8000/predict", formData);
    setResult(res.data);
  } catch (err) {
    setError("Backend not reachable. Check if FastAPI is running.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{padding:"auto", width:"95vw" }}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Telecom Customer Details</h2>

        <div style={buttonGroup}>
          <button type="button" onClick={autoFillExample} style={buttonSecondary}>
            Auto-Fill Example
          </button>
          <button type="button" onClick={resetForm} style={buttonReset}>
            Reset
          </button>
        </div>

        <div style={gridStyle}>
          {Object.entries(formFields).map(([key, options]) => (
            <div key={key} style={fieldGroup}>
              <label style={labelStyle}>{options.label}</label>
              {options.type === "select" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select</option>
                  {options.choices.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={options.type}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              )}
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading} style={submitButton}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <PredictionResult result={result} />}
    </div>
  );
}

export default InputForm;

// --- Form field definitions ---
const formFields = {
  gender: { label: "Gender", type: "select", choices: ["Male", "Female"] },
  SeniorCitizen: { label: "Senior Citizen", type: "select", choices: [0, 1] },
  Partner: { label: "Partner", type: "select", choices: ["Yes", "No"] },
  Dependents: { label: "Dependents", type: "select", choices: ["Yes", "No"] },
  tenure: { label: "Tenure (months)", type: "number" },
  PhoneService: { label: "Phone Service", type: "select", choices: ["Yes", "No"] },
  MultipleLines: {
    label: "Multiple Lines",
    type: "select",
    choices: ["Yes", "No", "No phone service"],
  },
  InternetService: {
    label: "Internet Service",
    type: "select",
    choices: ["DSL", "Fiber optic", "No"],
  },
  OnlineSecurity: {
    label: "Online Security",
    type: "select",
    choices: ["Yes", "No", "No internet service"],
  },
  OnlineBackup: {
    label: "Online Backup",
    type: "select",
    choices: ["Yes", "No", "No internet service"],
  },
  DeviceProtection: {
    label: "Device Protection",
    type: "select",
    choices: ["Yes", "No", "No internet service"],
  },
  TechSupport: {
    label: "Tech Support",
    type: "select",
    choices: ["Yes", "No", "No internet service"],
  },
  StreamingTV: {
    label: "Streaming TV",
    type: "select",
    choices: ["Yes", "No", "No internet service"],
  },
  StreamingMovies: {
    label: "Streaming Movies",
    type: "select",
    choices: ["Yes", "No", "No internet service"],
  },
  Contract: {
    label: "Contract",
    type: "select",
    choices: ["Month-to-month", "One year", "Two year"],
  },
  PaperlessBilling: { label: "Paperless Billing", type: "select", choices: ["Yes", "No"] },
  PaymentMethod: {
    label: "Payment Method",
    type: "select",
    choices: [
      "Electronic check",
      "Mailed check",
      "Bank transfer (automatic)",
      "Credit card (automatic)",
    ],
  },
  MonthlyCharges: { label: "Monthly Charges", type: "number" },
  TotalCharges: { label: "Total Charges", type: "number" },
};

// --- Styles ---
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  background: "white",
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  margin: "auto",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "1rem 2rem",
};

const fieldGroup = { display: "flex", flexDirection: "column" };
const labelStyle = { fontWeight: "bold", marginBottom: "0.3rem" };
const inputStyle = {
  padding: "0.4rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
};

const buttonSecondary = {
  backgroundColor: "#0284c7",
  color: "white",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  cursor: "pointer",
};

const buttonReset = {
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  cursor: "pointer",
};

const submitButton = {
  marginTop: "1rem",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "0.7rem",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};
