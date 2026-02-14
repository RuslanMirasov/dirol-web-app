import { quizStore } from './quiz.js';
import { initNavigationMenu, hidePreloader } from './helpers.js';
import { initSliders } from './sliders.js';

window.quiz = quizStore();
window.quiz.init();

initNavigationMenu();
initSliders();

window.addEventListener('load', () => {
  setTimeout(() => {
    hidePreloader();
  }, 300);
});
