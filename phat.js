const inkyphat = require('inkyphat')({logToStd: true});

async function main() {

  await inkyphat.init();

  inkyphat.setBorder(inkyphat.WHITE)

  await inkyphat.clearScreen()

  console.log('modes: ', inkyphat.getModes());
  inkyphat.setMode('pimoroni_yellow')
  inkyphat.setPixel(1, 5, inkyphat.YELLOW);

  inkyphat.drawRect(100, 100, inkyphat.WHITE);

  await inkyphat.redraw();

  await inkyphat.destroy();
}
main();
