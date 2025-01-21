from roboflow import Roboflow
import supervision as sv
import numpy as np
import cv2
import tempfile
import os

temp_dir = r"C:\Users\NIA\Desktop\Injury Detection YOLO model"
os.environ['TEMP'] = temp_dir
os.environ['TMP'] = temp_dir

rf = Roboflow(api_key="XthyO7SGIKkaga8ZEpYl")
project = rf.workspace().project("injured-animal-detector-6zzbu")
model = project.version(3).model

# def callback(image: np.ndarray) -> sv.Detections:
#     with tempfile.NamedTemporaryFile(suffix=".jpg") as f:
#         cv2.imwrite(f.name, image)
#         result = model.predict(f.name, confidence=40, overlap=30).json()

#     detections = sv.Detections.from_roboflow(result)
#     return detections
def callback(image: np.ndarray) -> sv.Detections:
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as f:
        cv2.imwrite(f.name, image)
        result = model.predict(f.name, confidence=40, overlap=30).json()
    
    # Print the entire result for debugging
    # print("Prediction Result:", result)
    detection_results = []
    for prediction in result['predictions']:
        detected_class = prediction['class']  # Access the class from the prediction
        confidence = prediction['confidence']  # Access the confidence
        detection_results.append({'class': detected_class, 'confidence': confidence})

    # Log the detection results
    print("Detection Results to Send:", detection_results)

        # # Access and log the detected classes and their confidence from result
        # for prediction in result['predictions']:
        #     detected_class = prediction['class']  # Access the class from the prediction
        #     confidence = prediction['confidence']  # Access the confidence
        #     print(f"Detected: {detected_class}, Confidence: {confidence:.2f}")  
     
    # Clean up the temporary file after use
    os.remove(f.name)
    
    detections = sv.Detections.from_inference(result)
    return detections
image = cv2.imread("doggy.jfif")

slicer = sv.InferenceSlicer(callback=callback)

detections = slicer(image=image)

# add your classes from Roboflow, as they appear in the "Classes" section of the "Overview" tab of your model
classes = ["cat", "cow", "dog", "person"]


prediction_num = len(detections.xyxy)



# Additionally, print the full detections object for debugging
# print("Full Detections:", detections)

box_annotator = sv.BoxAnnotator()

# annotated_frame = box_annotator.annotate(
#     scene=image.copy(),
#     detections=detections,
#     labels=[classes[detections.class_id[i]] for i in range(prediction_num)],
# )

annotated_frame = box_annotator.annotate(
    scene=image.copy(),
    detections=detections,
)

# Optionally, you can draw the labels manually if needed
# for i in range(len(detections.xyxy)):
#     label = f"{classes[int(detections.class_id[i])]}: {detections.confidence[i]:.2f}"
#     box_annotator.add_label(annotated_frame, detections.xyxy[i], label)
    
sv.plot_image(image=annotated_frame, size=(16, 16))