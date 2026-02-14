import { quizStore } from './quiz.js';
import { initNavigationMenu } from './helpers.js';

window.quiz = quizStore();
window.quiz.init();

initNavigationMenu();
