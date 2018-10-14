import { Controller } from 'stimulus';

import games from '../games/definition';

export default class extends Controller {
  static targets = [ 'scoreBlue', 'scoreRed' ]

  connect() {
    console.log('Ready to play?', this);
    this.init();
  }

  init() {
    this.game = null;
    this.serve = null;
    this.score = {
      blue: 0,
      red: 0
    }
  }

  selectGame(event) {
    this.game = games[event.target.dataset.game];
  }

  updateScore(event) {
    const player = event.target.dataset.player;

    // Only update score is someone is already serving
    if (this.serve) {
      this.score[player]++;
    }

    this.determineServe(player);
    this.updateView();
  }

  updateView() {
    // Update the scores
    this.scoreBlueTarget.innerHTML = this.score.blue;
    this.scoreRedTarget.innerHTML = this.score.red;

    // Show the paddle for the player serving
    this.element.classList.toggle('serve--blue', this.serve === 'blue');
    this.element.classList.toggle('serve--red', this.serve === 'red');
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
    this.init();
    this.updateView();
  }
}
