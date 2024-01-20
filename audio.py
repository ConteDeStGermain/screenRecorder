import soundcard as sc
import soundfile as sf
import sys
import time

# Set default values
DEFAULT_OUTPUT_FILE_NAME = "out.wav"
SAMPLE_RATE = 48000
RECORD_SEC_1_HOUR = 3600
RECORD_SEC_2_HOURS = 60
RECORD_SEC_DEFAULT = 15

def record_and_save(output_file_name, record_duration_sec):
    with sc.get_microphone(id=str(sc.default_speaker().name), include_loopback=True).recorder(samplerate=SAMPLE_RATE) as mic:
        data = mic.record(numframes=SAMPLE_RATE*record_duration_sec)
        sf.write(file=output_file_name, data=data[:, 0], samplerate=SAMPLE_RATE)

if __name__ == "__main__":
    # Check if command-line arguments are provided

    time.sleep(10)
    if len(sys.argv) > 1:
        output_file_name = sys.argv[1]
    else:
        output_file_name = DEFAULT_OUTPUT_FILE_NAME

    # Check if a second command-line argument is provided for the recording duration
    if len(sys.argv) > 2 and sys.argv[2] in ["0", "1"]:
        record_duration_sec = RECORD_SEC_1_HOUR if sys.argv[2] == "1" else RECORD_SEC_2_HOURS
    else:
        record_duration_sec = RECORD_SEC_DEFAULT

    record_and_save(output_file_name, record_duration_sec)
