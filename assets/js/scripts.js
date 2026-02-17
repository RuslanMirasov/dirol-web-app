import { quizStore } from './quiz.js';
import { initNavigationMenu, hidePreloader } from './helpers.js';
import { initSelectFields } from './forms.js';
import { initSliders } from './sliders.js';
import { initUploadPhoto } from './uploadPhoto.js';

window.quiz = quizStore();
window.quiz.init();
window.upload = initUploadPhoto();

initNavigationMenu();
initSliders();
initSelectFields();

window.addEventListener('load', () => {
  setTimeout(() => {
    hidePreloader();
  }, 300);
});
