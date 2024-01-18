import pyautogui
import time
import sys

def press_windows_alt_r():
    try:
        pyautogui.hotkey('win', 'g')
        time.sleep(3)
        pyautogui.hotkey('win', 'g')
        # Simulate Windows + Alt + R keypress
        pyautogui.hotkey('win', 'alt', 'r')
        print("Pressed Windows + Alt + R")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Press Windows + Alt + R without any checks
    press_windows_alt_r()

    if len(sys.argv) > 1:
        is1Hour = int(sys.argv[1]) == 1

    if is1Hour:
        time.sleep(3600)
    else:
        time.sleep(7200)

    # Press Windows + Alt + R again
    press_windows_alt_r()
    
    print("Script completed.")
