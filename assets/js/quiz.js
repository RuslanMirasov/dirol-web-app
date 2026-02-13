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

    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuiz));
      return { ...defaultQuiz };
    }

    return JSON.parse(existing);
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

    return quiz;
  };

  const reset = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuiz));
    return { ...defaultQuiz };
  };

  return {
    init,
    get,
    set,
    reset,
  };
};
