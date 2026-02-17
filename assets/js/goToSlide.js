const REGISTRY = (window.swipers ||= Object.create(null));

export function registerNamedSwiper(key, instance) {
  const name = String(key || '').trim();
  if (!name) return;
  REGISTRY[name] = instance;
}

function resolveIndex(swiper, target, base = 1) {
  const s = String(target).trim();
  const num = Number(s);
  if (s !== '' && Number.isFinite(num)) {
    return base === 1 ? num - 1 : num;
  }
  return Array.from(swiper.slides).findIndex(el => el.dataset.step === s);
}

export function goToSlide(key, target, base = 1) {
  const swiper = REGISTRY[key];

  if (!swiper) {
    console.warn('[goToSlide] swiper not found:', key);
    return;
  }

  const idx = resolveIndex(swiper, target, base);

  if (idx < 0 || idx >= swiper.slides.length) {
    console.warn('[goToSlide] target not found:', target);
    return;
  }

  swiper.slideTo(idx);
}

window.goToSlide = goToSlide;
window.registerNamedSwiper = registerNamedSwiper;
