// uploadPhoto.js

export function initUploadPhoto() {
  const form = document.querySelector('.upload-form');
  if (!form) return null;

  const input = form.querySelector('#upload-photo');
  const previewEl = form.querySelector('.upload-preview');
  const filenameEl = form.querySelector('.upload-filename');
  const sizeEl = form.querySelector('.upload-size');
  const messageEl = form.querySelector('.upload-message');
  const deleteBtn = form.querySelector('.delete-button');

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  let currentObjectUrl = null;

  /* ------------------ STATE ------------------ */

  function setState(state) {
    form.dataset.state = state;
  }

  /* ------------------ HELPERS ------------------ */

  function formatSize(bytes) {
    const kb = bytes / 1024;
    if (kb < 1024) return Math.round(kb) + 'kb';
    return (kb / 1024).toFixed(1) + 'mb';
  }

  function clearPreview() {
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }
    previewEl.innerHTML = '';
  }

  function renderPreview(file) {
    clearPreview();

    currentObjectUrl = URL.createObjectURL(file);

    const img = document.createElement('img');
    img.src = currentObjectUrl;
    img.alt = 'photo';

    previewEl.appendChild(img);
  }

  /* ------------------ ERROR ------------------ */

  function setError(message) {
    messageEl.textContent = message;
    setState('error');
  }

  /* ------------------ RESET ------------------ */

  function reset() {
    input.value = '';
    filenameEl.textContent = '';
    sizeEl.textContent = '';
    messageEl.textContent = '';
    clearPreview();
    setState('empty');
  }

  /* ------------------ VALIDATION ------------------ */

  function validate(file) {
    // Проверка типа
    if (!file.type.startsWith('image/')) {
      throw new Error('Ошибка! Файл не является изображением!');
    }

    // Проверка размера
    if (file.size > MAX_SIZE) {
      throw new Error('Ошибка! Размер файла больше 10-и мегабайт!');
    }
  }

  /* ------------------ MAIN HANDLER ------------------ */

  function handleFile(file) {
    try {
      validate(file);

      renderPreview(file);

      // filenameEl.textContent = file.name;
      // filenameEl.title = file.name;

      sizeEl.textContent = formatSize(file.size);
      messageEl.textContent = '';

      setState('success');
    } catch (err) {
      clearPreview();
      setError(err.message);
    } finally {
      filenameEl.textContent = file.name;
      filenameEl.title = file.name;
    }
  }

  /* ------------------ EVENTS ------------------ */

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    handleFile(file);
  });

  deleteBtn.addEventListener('click', reset);

  /* ------------------ PUBLIC API ------------------ */

  return {
    reset,
    setError,
    getFile: () => input.files[0] || null,
  };
}
