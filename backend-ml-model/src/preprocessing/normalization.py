import os
import cv2

def normalize_frames(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    target_size = (224, 224)  # Resize to 224x224 pixels
    
    for folder in os.listdir(input_folder):
        folder_path = os.path.join(input_folder, folder)
        output_path = os.path.join(output_folder, folder)
        os.makedirs(output_path, exist_ok=True)
        
        for frame_file in os.listdir(folder_path):
            frame_path = os.path.join(folder_path, frame_file)
            image = cv2.imread(frame_path)
            image_resized = cv2.resize(image, target_size)
            norm_frame_path = os.path.join(output_path, frame_file)
            cv2.imwrite(norm_frame_path, image_resized)
