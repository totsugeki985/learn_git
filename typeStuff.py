import sys
sys.path.append( './pyautogui/pyautogui' )
import pyautogui

print( pyautogui )

pyautogui.write( 'rawr!!!!' , interval=0.25 )
