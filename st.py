import keyboard
import random
import time
while True:
    time.sleep( random.uniform(0.5, 1.2) )
    keyboard.press( "a" )
    time.sleep( random.uniform(0.1,0.3) )
    keyboard.release("a")