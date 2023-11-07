import cv2
import pyautogui
import numpy as np
from moviepy.editor import VideoFileClip, AudioFileClip
from scipy.io.wavfile import write

import soundcard as sc
import soundfile as sf

OUTPUT_FILE_NAME = "out.wav"    # file name.
SAMPLE_RATE = 48000              # [Hz]. sampling rate.
RECORD_SEC = 10                  # [sec]. duration recording audio.

with sc.get_microphone(id=str(sc.default_speaker().name), include_loopback=True).recorder(samplerate=SAMPLE_RATE) as mic:
    # record audio with loopback from default speaker.
    data = mic.record(numframes=SAMPLE_RATE*RECORD_SEC)
    
    # change "data=data[:, 0]" to "data=data", if you would like to write audio as multiple-channels.
    sf.write(file=OUTPUT_FILE_NAME, data=data[:, 0], samplerate=SAMPLE_RATE)



# # Record video
# while True:
#     img = pyautogui.screenshot()
#     frame = np.array(img)
#     frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     out.write(frame)
#     if cv2.waitKey(1) == ord("q"):
#         break

# # Release the VideoWriter
# out.release()
# cv2.destroyAllWindows()

# # Load video and audio files
# video = VideoFileClip("lecture.mp4")
# audio = AudioFileClip("out.wav")

# # Set the audio of the video clip
# video = video.set_audio(audio)

# # Write the result to a file
# video.write_videofile("lecture.mp4", codec='libx264')


# Specify resolution
resolution = (1920, 1080)

# Specify video codec
codec = cv2.VideoWriter_fourcc(*"XVID")

# Specify name of Output file
filename = "Recording.avi"

# Specify frames rate. We can choose any 
# value and experiment with it
fps = 30.0

# Creating a VideoWriter object
out = cv2.VideoWriter(filename, codec, fps, resolution)

# Create an Empty window
cv2.namedWindow("Live", cv2.WINDOW_NORMAL)

# Resize this window
cv2.resizeWindow("Live", 480, 270)

while True:
	# Take screenshot using PyAutoGUI
	img = pyautogui.screenshot()

	# Convert the screenshot to a numpy array
	frame = np.array(img)

	# Convert it from BGR(Blue, Green, Red) to
	# RGB(Red, Green, Blue)
	frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

	# Write it to the output file
	out.write(frame)
	
	# Optional: Display the recording screen
	cv2.imshow('Live', frame)
	
	# Stop recording when we press 'q'
	if cv2.waitKey(1) == ord('q'):
		break

# Release the Video writer
out.release()

# # Destroy all windows
cv2.destroyAllWindows()


# Load video and audio files
video = VideoFileClip("Recording.avi")
audio = AudioFileClip("out.wav")

# Set the audio of the video clip
video = video.set_audio(audio)

# Write the result to a file
video.write_videofile("lecture.mp4", codec='libx264')
