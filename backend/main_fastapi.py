from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pickle
import numpy as np
import pandas as pd


# ====================================================
# 1. Load trained models and preprocessors
# ====================================================
rf = joblib.load("pickle_files/random_forest_model.pkl")
xgb = joblib.load("pickle_files/xgboost_model.pkl")
meta = joblib.load("pickle_files/meta_logistic_model.pkl")

encoders = pickle.load(open("pickle_files/encoders.pkl", "rb"))
scalers = pickle.load(open("pickle_files/StandardScaler_dict.pkl", "rb"))


# ====================================================
# 2. FastAPI setup
# ====================================================
app = FastAPI(title="Telecom Churn Prediction API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ====================================================
# 3. Input schema
# ====================================================
class Customer(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: float
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float


# ====================================================
# 4. Preprocessing helper
# ====================================================
def preprocess_input(df: pd.DataFrame) -> pd.DataFrame:
    """
    Converts text inputs to numeric codes if encoders expect numbers.
    Then applies encoders and scalers.
    """

    # Manual mappings for categorical variables
    binary_map = {
        "Male": 1, "Female": 0,
        "Yes": 1, "No": 0,
        "No phone service": 2,
        "No internet service": 2
    }

    internet_map = {"DSL": 0, "Fiber optic": 1, "No": 2}
    contract_map = {"Month-to-month": 0, "One year": 1, "Two year": 2}
    payment_map = {
        "Electronic check": 0,
        "Mailed check": 1,
        "Bank transfer (automatic)": 2,
        "Credit card (automatic)": 3
    }

    # Replace textual categories with numeric equivalents
    df.replace(binary_map, inplace=True)
    df["InternetService"].replace(internet_map, inplace=True)
    df["Contract"].replace(contract_map, inplace=True)
    df["PaymentMethod"].replace(payment_map, inplace=True)

    # Encode categorical columns
    for col, encoder in encoders.items():
        if col in df.columns:
            try:
                df[col] = encoder.transform(df[col])
            except Exception as e:
                raise ValueError(f"Encoding failed for column '{col}': {e}")

    # Scale numeric columns
    for col, scaler in scalers.items():
        if col in df.columns:
            try:
                df[col] = scaler.transform(df[[col]])
            except Exception as e:
                raise ValueError(f"Scaling failed for column '{col}': {e}")

    return df


# ====================================================
# 5. Prediction endpoint
# ====================================================
@app.post("/predict")
def predict_churn(data: Customer):
    df = pd.DataFrame([data.dict()])
    df = preprocess_input(df)

    rf_prob = rf.predict_proba(df)[:, 1]
    xgb_prob = xgb.predict_proba(df)[:, 1]

    X_meta = np.column_stack([rf_prob, xgb_prob])
    final_prob = meta.predict_proba(X_meta)[:, 1][0]
    final_pred = int(final_prob >= 0.5)

    return {"prediction": final_pred, "probability": round(float(final_prob), 4)}


# ====================================================
# 6. Health check
# ====================================================
@app.get("/")
def health_check():
    return {"status": "ok", "message": "Churn Prediction API running"}
