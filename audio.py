import soundcard as sc
import soundfile as sf

OUTPUT_FILE_NAME = "out.wav"    # file name.
SAMPLE_RATE = 48000              # [Hz]. sampling rate.
RECORD_SEC = 30                  # [sec]. duration recording audio.

with sc.get_microphone(id=str(sc.default_speaker().name), include_loopback=True).recorder(samplerate=SAMPLE_RATE) as mic:
    # record audio with loopback from default speaker.
    data = mic.record(numframes=SAMPLE_RATE*RECORD_SEC)
    
    # change "data=data[:, 0]" to "data=data", if you would like to write audio as multiple-channels.
    sf.write(file=OUTPUT_FILE_NAME, data=data[:, 0], samplerate=SAMPLE_RATE)

# from moviepy.editor import VideoFileClip, AudioFileClip

# def combine_audio_video(video_path, audio_path, output_path):
#     # Load video clip
#     video_clip = VideoFileClip(video_path)
    
#     # Load audio clip
#     audio_clip = AudioFileClip(audio_path)
    
#     # Set video clip audio to the loaded audio clip
#     video_clip = video_clip.set_audio(audio_clip)
    
#     # Write the result to a new file
#     video_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')

# if __name__ == "__main__":
#     video_path = "video.mp4"
#     audio_path = "out.wav"
#     output_path = "output_video.mp4"
    
#     combine_audio_video(video_path, audio_path, output_path)
