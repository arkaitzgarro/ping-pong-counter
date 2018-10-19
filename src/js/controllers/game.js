import { Controller } from 'stimulus';

import games from '../games/definition';
import Confetti from '../fancy/confetti';

export default class extends Controller {
  static targets = [
    'scoreBlue',
    'scoreRed',
    'confettiBlue',
    'confettiRed',
    'btnShort',
    'btnLong'
  ]

  connect() {
    console.log('Ready to play?', this);
    this.init();

    this.confettiBlueTarget.width = window.innerWidth / 2;
    this.confettiBlueTarget.height = window.innerHeight;
    this.confettiRedTarget.width = window.innerWidth / 2;
    this.confettiRedTarget.height = window.innerHeight;

    this.render();
  }

  init() {
    this.serve = null;
    this.score = {
      blue: 0,
      red: 0
    }
    this.winner = null;
    this.confetti = null;
    this.game = games.short();
  }

  selectGame(event) {
    this.clearConfetti();
    this.init();
    this.game = games[event.target.dataset.game]();
    this.render();
  }

  updateScore(event) {
    event.stopPropagation();

    if (!this.game || this.winner) {
      return;
    }

    const player = event.currentTarget.dataset.player;

    // Only update score is someone is already serving
    if (this.serve) {
      this.score[player]++;
    }

    this.determineWinner();
    this.determineServe(player);
    this.render();
  }

  determineWinner() {
    const maxScore = Math.max(this.score.blue, this.score.red);
    if (maxScore === this.game.points) {
      if (Math.abs(this.score.blue - this.score.red) > 1) {
        this.winner = this.score.blue === this.game.points ? 'blue' : 'red';
      } else {
        this.game.points++;
        this.game.switchServe = 1;
      }
    }
  }

  determineServe(player) {
    if (!this.serve) {
      this.serve = player;
    } else {
      const totalScore = this.score.blue + this.score.red;
      // Switch players depending on the game
      if (totalScore % this.game.switchServe === 0) {
        this.serve = this.serve === 'blue' ? 'red' : 'blue';
      }
    }
  }

  reset() {
    this.clearConfetti();
    this.init();
    this.render();
  }

  clearConfetti() {
    if (this.confetti) {
      this.confetti.clear();
    }
  }

  undoScore(event) {
    event.stopPropagation();

    if (this.winner) return;
    if (!this.serve) return;

    const player = event.target.dataset.player;
    if (this.score[player] === 0) return;

    // Only undo score is someone is already serving
    if (this.serve) {
      this.determineServe();
      this.score[player]--;

      this.render();
    }
  }

  render() {
    // Update the scores
    this.scoreBlueTarget.innerHTML = this.score.blue;
    this.scoreRedTarget.innerHTML = this.score.red;

    // Show the paddle for the player serving
    this.element.classList.toggle('serve--blue', this.serve === 'blue');
    this.element.classList.toggle('serve--red', this.serve === 'red');

    // Select active game
    this.btnShortTarget.classList.toggle('btn__game--selected', this.game.name === 'short');
    this.btnLongTarget.classList.toggle('btn__game--selected', this.game.name === 'long');

    if (this.winner) {
      const canvas = this.winner === 'blue' ? this.confettiBlueTarget : this.confettiRedTarget;
      this.confetti = new Confetti(canvas);
      this.confetti.draw();
    }
  }
}
