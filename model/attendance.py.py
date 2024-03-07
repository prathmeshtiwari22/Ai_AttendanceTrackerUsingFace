import cv2
import numpy as np
import face_recognition
import os
import librosa
from keras.models import model_from_json
import firebase_admin
from firebase_admin import credentials
from google.cloud import firestore
from google.cloud.firestore import Client as FirestoreClient
import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase Admin SDK with your service account JSON file
cred = credentials.Certificate("attendance-55df5-firebase-adminsdk-va96h-4ea6b38c77.json")
firebase_admin.initialize_app(cred)

# Reference to your Firebase Realtime Database
ref = db.reference(url='https://attendance-55df5-default-rtdb.firebaseio.com/')

# Get Firestore client
#db = FirestoreClient()

#collection_ref = db.collection("Students")

# initial_data = {
#     "Students": ""
# }

# # Set initial data under the "students" node
# ref.set(initial_data)

def predict_studentvoice(file_path, model):
    try:
        y, sr = librosa.load(file_path, sr=None, duration=3)
        mfccs = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40).T, axis=0)
        input_data = np.expand_dims(np.expand_dims(mfccs, axis=0), axis=-1)
        prediction = model.predict(input_data)

        students = ["Prathmesh","Vedant"]
        predicted_student = students[np.argmax(prediction)]
        
        return predicted_student
        
    except Exception as e:
        print(f"Error: {e}")
        return "No Emotion Detected"

# Load face recognition model and known faces
student_dict = {
    "Vedant": 1,
    "Prathmesh": 2,
    "Dhrub": 3,
    "Siddhesh": 4
}

path = 'faceatten\Training_images'
images = []
classNames = []
myList = os.listdir(path)
for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])

def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

encodeListKnown = findEncodings(images)

# Load LSTM model for emotion prediction
with open("voicetoneanalysis-main\lstm_model.json", "r") as json_file:
    loaded_model_json = json_file.read()
voice_model = model_from_json(loaded_model_json)
voice_model.load_weights("voicetoneanalysis-main\lstm_model_weights.h5")

cap = cv2.VideoCapture(0)

detected_names = []

while True:
    success, img = cap.read()
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)
    
    if len(facesCurFrame) > 1:
        message = "Two persons detected. Only one can be detected."
        
        textSize = cv2.getTextSize(message, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)[0]
        
        textX = (img.shape[1] - textSize[0]) // 2
        textY = 30
        cv2.putText(img, message, (textX, textY), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
    elif len(facesCurFrame) == 0:
        cv2.putText(img, "No detections", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        
    else:
        for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
            matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
            matchIndex = np.argmin(faceDis)

            if matches[matchIndex]:
                detected_name = classNames[matchIndex]
                if detected_name not in detected_names:
                    roll_number = student_dict.get(detected_name, "Roll number not found")
                    detected_names.append(detected_name)  # Add detected name to list
                    y1, x2, y2, x1 = faceLoc
                    y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                    cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                    cv2.putText(img, f"{detected_name} Roll No: {roll_number}", (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
                    print("Predicted Student:", detected_name)
                    # Prompt for voice input
                    print("Please speak into the microphone...")
                    file_path = r"0_0_Prathmesh.wav"  # Path where you save the recorded audio
                    predicted_student = predict_studentvoice(file_path, voice_model)
                    
                    if predicted_student == detected_name:
                        print("Face and voice match!")
                        present = True

                        data = {"name": detected_name, "roll_number": roll_number, "Present": present}
                        #db.collection("students").add(data)
                        ref.push(data)
                    
                        
                        print("Data pushed to Firebase Realtime Database")

                        
                        #print(f"Name: {detected_name}, Roll No: {roll_number}")

                    else:
                        print("Emotion from face and voice do not match.")
                        
    cv2.imshow('Webcam', img)
    
    # Check for the escape key (ASCII value 27)
    if cv2.waitKey(1) == 27:
        break

# Release the webcam and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
