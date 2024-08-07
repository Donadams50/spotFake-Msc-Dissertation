import os
import shutil
import numpy as np
from sklearn.utils import resample

def balance_data(real_folder, fake_folder, output_folder, target_size):
    os.makedirs(output_folder, exist_ok=True)
    
    real_files = [os.path.join(real_folder, f) for f in os.listdir(real_folder)]
    fake_files = [os.path.join(fake_folder, f) for f in os.listdir(fake_folder)]
    
    if len(real_files) < target_size:
        real_files = resample(real_files, replace=True, n_samples=target_size)
    
    if len(fake_files) > target_size:
        fake_files = resample(fake_files, replace=False, n_samples=target_size)
    
    for folder, files in [('real', real_files), ('fake', fake_files)]:
        folder_path = os.path.join(output_folder, folder)
        os.makedirs(folder_path, exist_ok=True)
        for file in files:
            shutil.copy(file, folder_path)
