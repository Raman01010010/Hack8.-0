from flask import Flask, request, jsonify
from flask_cors import CORS  # Added for CORS support
from tensorflow.keras.models import load_model
from tensorflow.keras.losses import MeanSquaredError
import joblib
import numpy as np
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow all CORS requests

# Load model and scaler
model = load_model('model1.h5', custom_objects={'mse': MeanSquaredError()})
scaler = joblib.load('scaler1.pkl')

@app.route('/predict', methods=['POST'])
def predict_funding():
    try:
        # Parse input JSON
        data = request.get_json()
        required_features = ['founded_year', 'num_funding_rounds', 'num_investors', 'num_milestones', 'num_local_competitors']

        # Ensure all required fields are present
        if not all(feature in data for feature in required_features):
            return jsonify({'error': 'Missing one or more required input fields'}), 400

        # Create dataframe from input
        input_df = pd.DataFrame([{
            feature: data[feature] for feature in required_features
        }])

        # Scale input
        input_scaled = scaler.transform(input_df)

        # Predict log funding and reverse log1p
        predicted_log = model.predict(input_scaled)
        predicted_funding = np.expm1(predicted_log[0][0])

        # Convert numpy float32 to Python float
        predicted_funding = float(predicted_funding)

        return jsonify({
            'predicted_funding_usd': round(predicted_funding, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)  # Custom port
