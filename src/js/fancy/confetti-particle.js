export default class ConfettiParticle {
  constructor({ canvas, context, maxConfettis = 150, possibleColors = []}) {
    this.canvas = canvas;
    this.context = context;

    this.init(maxConfettis, possibleColors);
  }

  init(maxConfettis, possibleColors) {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height - this.canvas.height;
    this.r = this.randomFromTo(11, 33);
    this.d = Math.random() * maxConfettis + 11;
    this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;
  }

  draw() {
    this.context.beginPath();
    this.context.lineWidth = this.r / 2;
    this.context.strokeStyle = this.color;
    this.context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    this.context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);

    this.context.stroke();
  }

  randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
}
