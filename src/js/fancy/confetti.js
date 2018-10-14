// https://codepen.io/jonathanbell/pen/OvYVYw?page=1&
import ConfettiParticle from './confetti-particle.js';

export default class Confetti {
  constructor(canvas, maxConfettis = 150) {
    this.canvas = canvas;
    this.maxConfettis = maxConfettis;
    this.keeDrawing = true;
    this.particles = [];

    this.init();
    this.createParticles();
  }

  init() {
    this.context = this.canvas.getContext('2d');
    this.possibleColors = [
      'DodgerBlue',
      'OliveDrab',
      'Gold',
      'Pink',
      'SlateBlue',
      'LightBlue',
      'Gold',
      'Violet',
      'PaleGreen',
      'SteelBlue',
      'SandyBrown',
      'Chocolate',
      'Crimson'
    ];
  }

  createParticles() {
    for (let i = 0; i < this.maxConfettis; i++) {
      this.particles.push(new ConfettiParticle({
        canvas: this.canvas,
        context: this.context,
        maxConfettis: this.maxConfettis,
        possibleColors: this.possibleColors
      }));
    }
  }

  draw = () => {
    if (this.keeDrawing) {
      requestAnimationFrame(this.draw);

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles.forEach((particle) => particle.draw());

      for (let i = 0; i < this.maxConfettis; i++) {
        const particle = this.particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.x > this.canvas.width + 30 || particle.x < -30 || particle.y > this.canvas.height) {
          particle.x = Math.random() * this.canvas.width;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }
    }
  }

  clear() {
    this.keeDrawing = false;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
