var fs = require('fs')
var path = require('path')
var Canvas = require('canvas')
const { exec } = require('child_process')

const message = "Hello, world."

var canvas = Canvas.createCanvas(212, 104)
var ctx = canvas.getContext('2d')

ctx.globalAlpha = 0.2
/*
ctx.beginPath()
ctx.lineTo(0,0)
ctx.lineTo(0,10)
ctx.lineTo(10,10)
ctx.lineTo(10,0)
ctx.stroke()

ctx.strokeRect(0, 0, 212, 104)
ctx.lineTo(0, 100)
ctx.lineTo(200, 100)
ctx.stroke()

ctx.beginPath()
ctx.lineTo(100, 0)
ctx.lineTo(100, 200)
ctx.stroke()

ctx.moveTo(0,0)

*/
ctx.globalAlpha = 1
ctx.font = 'normal 40px Impact, serif'

//ctx.rotate(0.5)
//ctx.translate(20, -40)

ctx.lineWidth = 1
ctx.strokeStyle = '#ddd'
ctx.strokeText(message, 0, 100)

ctx.fillStyle = '#000'
ctx.fillText(message, 0, 100)

var m = ctx.measureText(message)

ctx.strokeStyle = '#f00'

ctx.strokeRect(
//  49 + m.actualBoundingBoxLeft,
//  99 - m.actualBoundingBoxAscent,
  m.actualBoundingBoxLeft,
  m.actualBoundingBoxAscent,
  m.actualBoundingBoxRight - m.actualBoundingBoxLeft,
  m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
)

canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'text.png')))
//console.log(canvas.toDataUrl())
exec('python display.py', (err, stdout, stderr)=>{
  console.log(stdout)
})
