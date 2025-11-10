# 📊 Telecom Customer Churn Prediction  

### 🧠 Overview
This project predicts whether a telecom customer is likely to **churn (leave the service)** based on their demographics, service usage, and contract details.  
It demonstrates a complete **Machine Learning → API → Frontend** pipeline using **Scikit-learn, FastAPI, and React (Vite)**.

---

## 🚀 Tech Stack

| Layer | Tools / Frameworks |
|--------|--------------------|
| **Machine Learning** | Scikit-learn, XGBoost, NumPy, Pandas |
| **Backend API** | FastAPI, Uvicorn, Joblib, Pickle |
| **Frontend** | React (Vite), Axios |
| **Dataset** | Telco Customer Churn (7,043 rows) |

---

## ⚙️ Model Architecture

### 🔹 Preprocessing
- Missing value handling  
- Label encoding for categorical variables  
- Standard scaling for numerical features  
- Train-test split  

### 🔹 Models Used
- **Random Forest Classifier**  
- **XGBoost Classifier**  
- **Logistic Regression (Meta Model for Stacking)**  

### 🔹 Stacking Ensemble
RandomForest and XGBoost act as **base learners**, and their prediction probabilities are passed into a **Logistic Regression meta model** to produce a final, more accurate churn probability.

---

## 📈 Performance Summary

| Model | Accuracy (Cross-Validation Mean) |
|--------|--------------------------------|
| Random Forest | ~91.7% |
| XGBoost | ~91.4% |
| Stacked Model | **~92.0%** |

The stacked model achieves better overall balance between predicting churn (1) and non-churn (0) classes.

---

## 🌐 FastAPI Backend

The backend exposes a REST API built using **FastAPI**.

### 🔹 Endpoint: `/predict`
- Accepts customer information as JSON input  
- Applies label encoding + standard scaling using saved encoders/scalers  
- Returns a predicted churn label and confidence probability  

#### Example Request:
```json
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 1,
  "PhoneService": "No",
  "MultipleLines": "No phone service",
  "InternetService": "DSL",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "No",
  "StreamingMovies": "No",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 29.85,
  "TotalCharges": 29.85
}
