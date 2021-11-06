# Node wrapper for Pimoroni's inkyphat utility
## Status: Currently almost unuseable, but works...

# Installation and Usage
## Prerequisites:
1. Install PIL or Pillow (e.g. `$ python3 -m pip install --upgrade Pillow`)
1. Install Pimoroni's [inky](https://github.com/pimoroni/inky) library
1. Clone / download this repo, and `npm install` it
1. Set up a cron job to run the script every so often.

## index.js walkthrough
This code uses `node-canvas` to create a png image, and then asks the python script
`display.py` to dump it directly to a compatible Pimoroni e-ink inky phat. This 
example fetches weather data from a separate api, and then renders it directly to the png. There is a sample of this output in `test.png` in the root of this project.

### Sample cron job
```
# Run every 5 minutes, and dump the logs to a cron.log file outside of the project directory
*/5 * * * * /usr/local/bin/node /home/pi/image2phat/index.js >> /home/pi/cron.log
```

### Todo
