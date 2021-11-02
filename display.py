#!/usr/bin/env python

import os
from PIL import Image
from inky.auto import auto


print("""Inky pHAT/wHAT: Logo

Displays the Inky pHAT/wHAT logo.

""")

# Get the current path
PATH = os.path.dirname(__file__)

# Set up the Inky display
try:
    inky_display = auto(ask_user=True, verbose=True)
except TypeError:
    raise TypeError("You need to update the Inky library to >= v1.1.0")

# Pick the correct logo image to show depending on display resolution/colour

if inky_display.resolution in ((212, 104), (250, 122)):
    if inky_display.resolution == (250, 122):
        if inky_display.colour == 'black':
            img = Image.open(os.path.join(PATH, "text.png"))
        else:
            img = Image.open(os.path.join(PATH, "text.png"))

# Display the logo image
# flipped = img.rotate(180)
inky_display.set_image(img)
inky_display.show()
