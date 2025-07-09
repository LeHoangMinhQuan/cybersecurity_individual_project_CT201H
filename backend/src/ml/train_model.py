import json
import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

# Load and preprocess
logs = []
labels = []
with open('../logs/labeled_traffic.json', 'r') as f:
    for line in f:
        entry = json.loads(line)
        raw = json.dumps(entry, sort_keys=True)
        logs.append(raw)
        labels.append(1 if entry['label'] == 'malicious' else 0)

# Feature extraction
vectorizer = TfidfVectorizer(max_features=1000)
X = vectorizer.fit_transform(logs)

# Train classifier
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X, labels)

# Save model and vectorizer
joblib.dump(clf, 'model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')

print("Model and vectorizer saved.")
