const STORAGE_KEY = 'dirol_quiz';

const defaultQuiz = {
  unique: false,
  trackMeaning: '',
  imageVibe: '',
  photoFocus: '',
  musicStyle: '',
  dirolFlavor: '',
};

export const quizStore = () => {
  const init = () => {
    const existing = localStorage.getItem(STORAGE_KEY);

    let data;

    if (!existing) {
      data = { ...defaultQuiz };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuiz));
    } else {
      data = JSON.parse(existing);
    }

    syncRadios(data);

    return data;
  };

  const get = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : init();
  };

  const set = (field, value) => {
    const quiz = get();

    if (!(field in quiz)) {
      console.warn(`Field "${field}" does not exist in quiz`);
      return quiz;
    }

    quiz[field] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quiz));

    syncRadio(field, value);

    return quiz;
  };

  const reset = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuiz));
    syncRadios(defaultQuiz);
    return { ...defaultQuiz };
  };

  /* ---------------- UI SYNC ---------------- */

  const syncRadios = data => {
    Object.entries(data).forEach(([field, value]) => {
      syncRadio(field, value);
    });
  };

  const syncRadio = (field, value) => {
    const radios = document.querySelectorAll(`input[name="${field}"]`);

    if (!radios.length) return;

    const stringValue = String(value);
    let radioMatched = false;

    radios.forEach(radio => {
      const isMatch = radio.value === stringValue;
      radio.checked = isMatch;

      if (isMatch) radioMatched = true;
    });

    const textarea = document.querySelector(`textarea[name="${field}"]`);

    if (radioMatched) {
      if (textarea && textarea.value !== '') {
        textarea.value = '';
        closeTextarea(textarea);
      }
    } else {
      if (textarea && stringValue && textarea.value === '') {
        textarea.value = stringValue;
      }
    }
  };

  return {
    init,
    get,
    set,
    reset,
  };
};

const closeTextarea = textarea => {
  if (!textarea) return;
  const slide = textarea.closest('.swiper-slide');
  const nextBtn = slide?.querySelector('.button--next');
  const myVariantBtn = slide?.querySelector('.my-variant');

  nextBtn.style.display = '';
  myVariantBtn.classList.remove('active');
};

export const initQuizTextareas = () => {
  const textareas = document.querySelectorAll('[data-my-variant]');

  if (!textareas.length) return;

  textareas.forEach(textarea => {
    const name = textarea.name;
    const slide = textarea.closest('.swiper-slide');
    const nextBtn = slide?.querySelector('.button--next');
    const myVariantBtn = slide?.querySelector('.my-variant');

    const updateUI = value => {
      if (nextBtn) {
        nextBtn.style.display = value ? 'inline-flex' : '';
      }

      if (myVariantBtn && value) {
        myVariantBtn.classList.add('active');
      }

      window.swipers?.quiz?.updateAutoHeight();
    };

    updateUI(textarea.value);

    textarea.addEventListener('input', e => {
      const { value } = e.target;

      window.quiz.set(name, value);
      updateUI(value);
    });
  });
};
