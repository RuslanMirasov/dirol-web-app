# DIROL - web app

![Project Preview](./public/poster.webp)

# Quiz Store (LocalStorage)

Мини-хранилище для управления состоянием квиза в Telegram Web App или обычном Web App. Работает в localStorage.

## 📦 Назначение:

- Создаёт состояние квиза, если его нет
- Позволяет получать текущее состояние (все 6 вопросо)
- Позволяет менять конкретное поле (ответ на вопрос квиза)
- Позволяет сбросить квиз к дефолтным настройкам

## 🗂 Структура состояния:

```js
{
  unique: false,    // ВОПРОС 1: Хочу получить уникальный трек / Пропустить
  trackMeaning: '', // ВОПРОС 2: Скажи, о чём он для тебя?
  imageVibe: '',    // ВОПРОС 3: Огонь! 🔥 А теперь словим вайб твоего снимка. Какой он?
  photoFocus: '',   // ВОПРОС 4: Интересно, а что главное в твоей фотке?
  musicStyle: '',   // ВОПРОС 5: Теперь выбери, в каком стиле будет звучать трек! 🎵
  dirolFlavor: '',  // ВОПРОС 6: Просто выбери вкус Dirol, который созвучен твоему снимку
}
```

Хранится в localStorage под ключом:

```
dirol_quiz
```

## 🔧 Подключение:

Код стора находится в директории **./assets/js/quiz.js**. Подключается в главном модуле **scripts.js**

```js
import { quizStore } from './quiz.js';

window.quiz = quizStore();
window.quiz.init();
```

## 🧠 API Квиза:

**init()** - Создаёт хранилище c дефолтными данными, если его нет. Возвращает текущее состояние.

```js
window.quiz.init();
```

**get()** - Возвращает объект квиза.

```js
const quiz = window.quiz.get();

console.log(quiz.imageVibe);
```

**set(field, value)** - Изменяет конкретное поле/вопрос квиза. Если поле не существует — выводится предупреждение в консоль.

```js
window.quiz.set('imageVibe', 'Мой снимок супер позитивный!');
window.quiz.set('unique', true);
```

**reset()** - Сбрасывает состояние к дефолтному.

```js
window.quiz.reset();
```

## 🧩 Использование в разметке:

Можно, например, вызывать через стандартные события:

```html
<label>
  <input 
     type="radio" 
     name="imageVibe" 
     value="чилловый" 
     onchange="window.quiz.set('imageVibe', this.value)" 
  />
  <span>Чилловый</span>
</label>
```
