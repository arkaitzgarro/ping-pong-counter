import '@stimulus/polyfills'

import '../style/main.css';

import { Application } from 'stimulus';

import GameController from './controllers/game';

const application = Application.start();
application.register('game', GameController);
