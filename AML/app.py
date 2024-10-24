from flask import Flask, render_template, request
import numpy as np
from joblib import load

app = Flask(__name__)
model = load('logistic_regression_model.joblib')

def predict(features):
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)
    return prediction[0]

@app.route('/', methods=['GET', 'POST'])
def home():
    prediction = None
    if request.method == 'POST':
        try:
            feature1 = float(request.form['feature1'])
            feature2 = float(request.form['feature2'])
            
            features = [feature1, feature2]
            prediction = predict(features)
        except KeyError as e:
            return render_template('index.html', error=f"Missing input: {str(e)}")
        except ValueError as e:
            return render_template('index.html', error=f"Invalid input: {str(e)}")
    
    return render_template('index.html', prediction=prediction)

if __name__ == '__main__':
    app.run(debug=True)