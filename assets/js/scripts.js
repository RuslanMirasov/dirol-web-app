import { quizStore, initQuizTextareas } from './quiz.js';
import { initNavigationMenu, hidePreloader } from './helpers.js';
import { initSelectFields } from './forms.js';
import { initSliders } from './sliders.js';
import { initUploadPhoto } from './uploadPhoto.js';

initNavigationMenu();
initSliders();
initSelectFields();

window.addEventListener('load', () => {
  window.quiz = quizStore();
  window.quiz.init();
  window.upload = initUploadPhoto();
  setTimeout(() => {
    hidePreloader();
    initQuizTextareas();
  }, 300);
});
