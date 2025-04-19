from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np
import joblib  # for loading the pre-fitted scaler if saved separately
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model
model = load_model('my_model.h5')

# If you have saved a fitted scaler, use:
# scaler = joblib.load("scaler.pkl")
# Else, define manually and fit on training data structure
scaler = StandardScaler()

# Define the feature columns (excluding labels)
feature_columns = [
   # 'labels',
    'funding_total_usd', 'milestones', 'is_CA', 'is_NY', 'is_MA', 'is_TX', 'is_otherstate',
    'is_software', 'is_web', 'is_mobile', 'is_enterprise', 'is_advertising', 'is_gamesvideo',
    'is_ecommerce', 'is_biotech', 'is_consulting', 'is_othercategory', 'has_VC', 'has_angel',
    'has_roundA', 'has_roundB', 'has_roundC', 'has_roundD', 'avg_participants', 'is_top500'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive JSON input
        input_json = request.get_json()

        # Fix: ensure it's treated as a list of records
        df_input = pd.DataFrame(input_json if isinstance(input_json, list) else [input_json])

        # Check required columns
        if not all(col in df_input.columns for col in feature_columns):
            return jsonify({"error": "Missing required features"}), 400

        # Extract features only
        X = df_input[feature_columns]

        # Scale the input (if you have a pre-fitted scaler, use scaler.transform)
        X_scaled = scaler.fit_transform(X)

        # Predict
        predictions = model.predict(X_scaled)  # returns something like [[0.72]]
        predicted_classes = predictions  # keeping original float probabilities

# Optionally convert to label:
# status = ['acquired' if pred > 0.5 else 'closed' for pred in predicted_classes.flatten()]

        print(predictions)  # prints [[0.72]] or similar

# ✅ Return first value as float via JSON:
        return jsonify({"predictions": float(predictions[0][0])})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
