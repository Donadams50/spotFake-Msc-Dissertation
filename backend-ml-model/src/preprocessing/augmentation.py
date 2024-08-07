import os
import cv2
from imgaug import augmenters as iaa

def augment_frames(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    seq = iaa.Sequential([
        iaa.Flipud(0.5),
        iaa.Affine(rotate=(-25, 25)),
    ])
    
    for folder in os.listdir(input_folder):
        folder_path = os.path.join(input_folder, folder)
        output_path = os.path.join(output_folder, folder)
        os.makedirs(output_path, exist_ok=True)
        
        for frame_file in os.listdir(folder_path):
            frame_path = os.path.join(folder_path, frame_file)
            image = cv2.imread(frame_path)
            image_aug = seq(image=image)
            aug_frame_path = os.path.join(output_path, frame_file)
            cv2.imwrite(aug_frame_path, image_aug)
