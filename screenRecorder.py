# import cv2
# import pyautogui
# import numpy as np
# import sounddevice as sd
# from moviepy.editor import VideoFileClip, AudioFileClip

# # Define the codec using VideoWriter_fourcc() and create a VideoWriter object
# seconds = 10  # Define the duration of the recording
# fs = 44100  # Sample rate

# # myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
# # sd.wait()  # Wait for the recording to finish

# fourcc = cv2.VideoWriter_fourcc(*"XVID")
# out = cv2.VideoWriter("lecture.avi", fourcc, 20.0, (1920, 1080))

# # Record audio
# # myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)

# # Write audio to file
# # sd.write("lecture_audio.wav", myrecording, fs)

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

# # # Load video and audio files
# # video = VideoFileClip("lecture.mp4")
# # audio = AudioFileClip("lecture_audio.wav")

# # # Set the audio of the video clip
# # video = video.set_audio(audio)

# # # Write the result to a file
# # video.write_videofile("lecture.mp4", codec='libx264')

# importing the required packages
import pyautogui
import cv2
import numpy as np

# Specify resolution
resolution = (1920, 1080)

# Specify video codec
codec = cv2.VideoWriter_fourcc(*"XVID")

# Specify name of Output file
filename = "Recording.avi"

# Specify frames rate. We can choose any 
# value and experiment with it
fps = 60.0

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

# Destroy all windows
cv2.destroyAllWindows()
