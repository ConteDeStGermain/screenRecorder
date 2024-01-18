from moviepy.editor import VideoFileClip, AudioFileClip

def combine_audio_video(video_path, audio_path, output_path):
    # Load video clip
    video_clip = VideoFileClip(video_path)
    
    # Load audio clip
    audio_clip = AudioFileClip(audio_path)
    
    # Set video clip audio to the loaded audio clip
    video_clip = video_clip.set_audio(audio_clip)
    
    # Write the result to a new file
    video_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')

if __name__ == "__main__":
    video_path = "video\simple.mp4"
    audio_path = "out.wav"
    output_path = "output_video.mp4"
    
    combine_audio_video(video_path, audio_path, output_path)