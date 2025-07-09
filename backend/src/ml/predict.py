import sys
import json
import joblib

# Load saved model & vectorizer
model = joblib.load('model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

def predict(log):
    text = json.dumps(log, sort_keys=True)
    X = vectorizer.transform([text])
    pred = model.predict(X)
    return 'malicious' if pred[0] == 1 else 'benign'

if __name__ == '__main__':
    input_text = sys.stdin.read()
    try:
        log = json.loads(input_text)
        prediction = predict(log)
        print(prediction)
    except Exception as e:
        print("benign")
