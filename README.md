# 📊 Telecom Customer Churn Prediction

An end-to-end **Machine Learning + Web App** solution to predict whether a telecom customer is likely to **churn (leave the service)** or **stay** — built using **FastAPI**, **React**, and **Scikit-learn/XGBoost**.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), Axios |
| **Backend** | FastAPI, Uvicorn |
| **Machine Learning** | Scikit-learn, XGBoost, Pandas, NumPy |
| **Model Storage** | Joblib / Pickle |
| **Version Control** | Git & GitHub |
| **Deployment Ready** | FastAPI backend + React frontend |

---

## 🧠 Project Overview

The goal is to predict **customer churn** using historical customer data such as demographics, service usage, and billing details.

The project demonstrates a **complete ML lifecycle**:
1. Data preprocessing  
2. Model training (Random Forest, XGBoost)  
3. Model stacking (Logistic Regression meta model)  
4. FastAPI serving the trained model  
5. React frontend for real-time predictions  

---

## 🧩 Dataset

**Telco Customer Churn Dataset**

- Rows: 7,043 customers  
- Columns: 20 features + 1 target (`Churn`)  
- Common fields: `gender`, `Contract`, `InternetService`, `MonthlyCharges`, `TotalCharges`, etc.  
- Target:  
  - `0` → Not churned  
  - `1` → Churned  

---

## ⚙️ Model Architecture

### 1️⃣ Preprocessing
- Label encoding for categorical variables  
- Standard scaling for numeric columns  
- Handling missing values  
- Train-test split

### 2️⃣ Models
- **RandomForestClassifier** (GridSearch tuned)  
- **XGBoostClassifier** (RandomSearch tuned)  
- **Stacking Meta Model:** Logistic Regression

### 3️⃣ Performance Summary

| Model | Accuracy |
|--------|-----------|
| Random Forest | 91.7% |
| XGBoost | 91.4% |
| Stacked Model | **92%** |

---

## 🧠 Model Output Example

**Input (JSON):**
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
