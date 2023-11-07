import cv2
import pyautogui
import numpy as np
from moviepy.editor import VideoFileClip, AudioFileClip
import time
import subprocess

# def run_script(script_path):
#     # Open a new command prompt window and run the script
#     cmd_command = f'cmd.exe /c start cmd.exe /k python {script_path}'
#     subprocess.run(cmd_command, shell=True)

# # Paths to your python scripts
# audio_script_path = "audio.py"

# Run scripts simultaneously in different cmd windows
# run_script(audio_script_path)

# Specify resolution
resolution = (1920, 1080)

# Specify video codec
codec = cv2.VideoWriter_fourcc(*"XVID")

# Specify name of Output file
filename = "Recording.avi"

# Creating a VideoWriter object
out = cv2.VideoWriter(filename, codec, 30.0, resolution)

# Create an Empty window
cv2.namedWindow("Live", cv2.WINDOW_NORMAL)

# Resize this window
cv2.resizeWindow("Live", 480, 270)

duration = 100

start_time = time.time()

while True:
	img = pyautogui.screenshot()

	frame = np.array(img)
	frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
	out.write(frame)		

	# # Optional: Display the recording screen
	# cv2.imshow('Live', frame)
	
	# Stop recording when we press 'q' or when time limit is reached
	if (cv2.waitKey(1) == ord('q')) or (time.time() - start_time > duration):
		break

	time.sleep(5)
	


# Release the Video writer
out.release()

# # Destroy all windows
cv2.destroyAllWindows()


# # Load video and audio files
# video = VideoFileClip("Recording.avi")
# audio = AudioFileClip("out.wav")

# # Set the audio of the video clip
# video = video.set_audio(audio)

# # Write the result to a file
# video.write_videofile("lecture.mp4", codec='libx264')
