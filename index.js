import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'
import path from 'path'
import Canvas from 'canvas'
import { exec } from 'child_process'
import util from 'util'
import fetch from 'node-fetch'

const execAsync = util.promisify(exec); 
const __dirname = dirname(fileURLToPath(import.meta.url));

const run = async () => {

  //process.env.TZ = 'Americas/New_York'

  const now = new Date()
  const now_message = `${now.getHours()}:${now.getMinutes().toString().length===1 ? '0'+now.getMinutes() : now.getMinutes()}`
  console.log(now_message)

  const message = `PIT Weather Report:`

  var canvas = Canvas.createCanvas(212, 104)
  var ctx = canvas.getContext('2d')

  ctx.font = 'bold 30px Impact, sans-serif'

  ctx.fillStyle = '#000'
  ctx.fillText(message, 2, 30, 212)


  const data = await fetch('https://cooper-union-weather-proxy-darksky.glitch.me/forecast?lat=40.4291291&lon=-79.9051357')
  const weather = await data.json()

  console.log(weather.currently.summary, weather.currently.temperature)

  const report = `${weather.currently.summary}, ${weather.currently.temperature}F`

  ctx.font = 'bold 30px Impact, sans-serif'
  //ctx.fillStyle = 'yellow'
  ctx.fillText(report, 2, 60, 212)
  ctx.fillText(now_message, 2, 90, 212)


  //console.log(canvas.toDataURL())

  canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'text.png')))
  const basepath = process.env.basepath || '/home/pi/image2phat'
  const { stdout, stderr } = await execAsync(`${basepath}/display.py`)

  if (stderr) throw new Error('Stderr: crashed')
  return  { now_message, report }

}



run().then((response)=>{
  console.log("response", response)
  process.exit(0)
}).catch((e)=>{
  console.log("error", e)
  process.exit(1)
})