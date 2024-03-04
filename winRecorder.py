import pyautogui
import time
import sys

def press_windows_alt_r():
    try:
        pyautogui.click(900, 0)
        time.sleep(3)


        pyautogui.hotkey('win', 'g')
        time.sleep(3)
        pyautogui.hotkey('win', 'g')
        
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
        time.sleep(5)

    # Press Windows + Alt + R again
    press_windows_alt_r()
    
    print("Script completed.")
