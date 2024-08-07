import os
from eda.eda_analysis import run_eda
from preprocessing.frame_extraction import extract_frames
# from preprocessing.augmentation import augment_frames
# from preprocessing.normalization import normalize_frames
# from preprocessing.balancing import balance_data

def main():
    # Paths to the datasets
    dataset_paths = [
        os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'datasets', 'ff++')),
        os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'datasets', 'celeb')),
        os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'datasets', 'youtube'))
    ]

    # EDA analysis
    # run_eda(dataset_paths)

    # Frame Extraction
    temp_frame_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'temp', 'frames'))
    for dataset_path in dataset_paths:
        for video_type in ['real', 'fake']:
            extract_frames(os.path.join(dataset_path, video_type), os.path.join(temp_frame_dir, video_type))

    # Data Augmentation
    # temp_augmented_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'temp', 'augmented_frames'))
    # for video_type in ['real', 'fake']:
    #     augment_frames(os.path.join(temp_frame_dir, video_type), os.path.join(temp_augmented_dir, video_type))

    # # Data Normalization
    # temp_normalized_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'temp', 'normalized_frames'))
    # for video_type in ['real', 'fake']:
    #     normalize_frames(os.path.join(temp_augmented_dir, video_type), os.path.join(temp_normalized_dir, video_type))

    # # Data Balancing
    # final_processed_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'processed'))
    # real_folder = os.path.join(temp_normalized_dir, 'real')
    # fake_folder = os.path.join(temp_normalized_dir, 'fake')
    # target_size = 1000  # Example target size, adjust as needed
    # balance_data(real_folder, fake_folder, final_processed_dir, target_size)

if __name__ == "__main__":
    main()
