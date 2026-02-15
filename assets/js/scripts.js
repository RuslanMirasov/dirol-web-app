import { quizStore } from './quiz.js';
import { initNavigationMenu, hidePreloader } from './helpers.js';
import { initSelectFields } from './forms.js';
import { initSliders } from './sliders.js';

window.quiz = quizStore();
window.quiz.init();

initNavigationMenu();
initSliders();
initSelectFields();

window.addEventListener('load', () => {
  setTimeout(() => {
    hidePreloader();
  }, 300);
});
