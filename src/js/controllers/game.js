import { Controller } from 'stimulus';

import games from '../games/definition';

export default class extends Controller {
  game = null;

  connect() {
    console.log("Hello, Stimulus!", this.element)
  }
}
