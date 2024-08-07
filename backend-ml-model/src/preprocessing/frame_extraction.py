import os
import cv2

def extract_frames(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    for video_file in os.listdir(input_folder):
        video_path = os.path.join(input_folder, video_file)
        output_path = os.path.join(output_folder, video_file.replace('.mp4', ''))
        os.makedirs(output_path, exist_ok=True)
        
        cap = cv2.VideoCapture(video_path)
        frame_number = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frame_filename = os.path.join(output_path, f'frame_{frame_number:04d}.jpg')
            cv2.imwrite(frame_filename, frame)
            frame_number += 1
        cap.release()