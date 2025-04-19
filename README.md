# Hack8.-0

## API Server Setup

Follow these steps to prepare and run the prediction API server:

- No external scaler file is needed; the API fits a `StandardScaler` on incoming request data at runtime.

2. Install required Python packages:

```bash
pip install fastapi uvicorn[standard] pandas tensorflow scikit-learn
```

3. Place `my_model.h5` in the project root alongside `app.py`.

4. Start the server:

```bash
# On Windows, if 'uvicorn' isn't recognized, use:
python -m uvicorn app:app --reload
```

The API will be available at `http://127.0.0.1:8000/predict` and accepts a JSON array of feature objects matching the `DataPoint` schema.