import os
import matplotlib.pyplot as plt
import cv2
import numpy as np

def get_video_durations(folder_paths):
    durations = []
    for folder_path in folder_paths:
        for video_file in os.listdir(folder_path):
            video_path = os.path.join(folder_path, video_file)
            cap = cv2.VideoCapture(video_path)
            if cap.isOpened():
                fps = cap.get(cv2.CAP_PROP_FPS)
                frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
                duration = frame_count / fps
                durations.append(duration)
            cap.release()
    return durations

def plot_duration_distribution(durations, video_type):
    plt.figure(figsize=(12, 6))
    bins = np.linspace(0, max(durations), 50)
    plt.hist(durations, bins=bins, alpha=0.5, color='blue', edgecolor='black')
    plt.xlabel('Duration (seconds)')
    plt.ylabel('Frequency')
    plt.title(f'Video Duration Distribution - {video_type}')
    plt.show()

def get_frame_rates(folder_paths):
    frame_rates = []
    for folder_path in folder_paths:
        for video_file in os.listdir(folder_path):
            video_path = os.path.join(folder_path, video_file)
            cap = cv2.VideoCapture(video_path)
            if cap.isOpened():
                frame_rate = cap.get(cv2.CAP_PROP_FPS)
                frame_rates.append(frame_rate)
            cap.release()
    return frame_rates

def plot_frame_rate_distribution(frame_rates, video_type):
    plt.figure(figsize=(12, 6))
    bins = np.linspace(0, max(frame_rates), 30)
    plt.hist(frame_rates, bins=bins, alpha=0.5, color='blue', edgecolor='black')
    plt.xlabel('Frame Rate (FPS)')
    plt.ylabel('Frequency')
    plt.title(f'Frame Rate Distribution - {video_type}')
    plt.show()

def get_resolutions(folder_paths):
    resolutions = []
    for folder_path in folder_paths:
        for video_file in os.listdir(folder_path):
            video_path = os.path.join(folder_path, video_file)
            cap = cv2.VideoCapture(video_path)
            if cap.isOpened():
                width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
                height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
                resolutions.append((width, height))
            cap.release()
    return resolutions

def plot_resolution_distribution(resolutions, video_type):
    widths, heights = zip(*resolutions) if resolutions else ([], [])

    plt.figure(figsize=(12, 6))
    plt.scatter(widths, heights, alpha=0.5, color='blue', edgecolor='black')
    plt.xlabel('Width')
    plt.ylabel('Height')
    plt.title(f'Resolution Distribution - {video_type}')
    plt.show()

def plot_distribution(real_count, fake_count):
    labels = ['Real Videos', 'Fake Videos']
    counts = [real_count, fake_count]

    plt.figure(figsize=(10, 6))
    bars = plt.bar(labels, counts, color=['blue', 'red'])
    plt.xlabel('Video Type')
    plt.ylabel('Count')
    plt.title('Distribution of Real and Fake Videos')

    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2.0, yval, int(yval), va='bottom')  # Text on the bars

    plt.show()

def run_eda(dataset_paths):
    # Collect data from all folders
    real_paths = [os.path.join(path, 'real') for path in dataset_paths]
    fake_paths = [os.path.join(path, 'fake') for path in dataset_paths]

    # Get durations
    real_durations = get_video_durations(real_paths)
    fake_durations = get_video_durations(fake_paths)
    plot_duration_distribution(real_durations, 'Real Videos')
    plot_duration_distribution(fake_durations, 'Fake Videos')

    # Get frame rates
    real_frame_rates = get_frame_rates(real_paths)
    fake_frame_rates = get_frame_rates(fake_paths)
    plot_frame_rate_distribution(real_frame_rates, 'Real Videos')
    plot_frame_rate_distribution(fake_frame_rates, 'Fake Videos')

    # Get resolutions
    real_resolutions = get_resolutions(real_paths)
    fake_resolutions = get_resolutions(fake_paths)
    plot_resolution_distribution(real_resolutions, 'Real Videos')
    plot_resolution_distribution(fake_resolutions, 'Fake Videos')

    # Count videos
    real_count = sum(len(os.listdir(path)) for path in real_paths)
    fake_count = sum(len(os.listdir(path)) for path in fake_paths)
    plot_distribution(real_count, fake_count)
