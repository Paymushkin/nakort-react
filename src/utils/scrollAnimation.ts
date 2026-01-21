// Утилита для анимаций при скролле: IntersectionObserver + scroll.
// IO может пропустить пересечение границы (top/bottom/center) — ratio меняется редко для высоких блоков.
// scroll + rAF гарантирует проверку при каждом кадре скролла.
// position: 'top' | 'bottom' (2/3) | 'center'; data-scroll-reverse, once, те же классы.

const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

type ElementConfig = {
  visibleClass: string;
  optionsPosition: string | undefined;
  optionsReverse: boolean;
  once: boolean;
  isVisible: boolean;
  isReverse: boolean;
  lastRectTop: number | undefined;
};

const elementConfig = new WeakMap<Element, ElementConfig>();
const observedElements = new Set<HTMLElement>();
let sharedObserver: IntersectionObserver | null = null;
let scrollTicking = false;

function onScrollTick(): void {
  scrollTicking = false;
  const toRemove: HTMLElement[] = [];
  for (const el of observedElements) {
    const cfg = elementConfig.get(el);
    if (!cfg) continue;
    if (runCheck(el, cfg)) toRemove.push(el);
  }
  const obs = getObserver();
  for (const el of toRemove) {
    obs.unobserve(el);
    elementConfig.delete(el);
    observedElements.delete(el);
  }
  if (observedElements.size === 0) window.removeEventListener('scroll', onScroll);
}

function onScroll(): void {
  if (scrollTicking || observedElements.size === 0) return;
  scrollTicking = true;
  requestAnimationFrame(onScrollTick);
}

function runCheck(element: HTMLElement, cfg: ElementConfig): boolean {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const { once } = cfg;
  const position = element.dataset.scrollPosition || cfg.optionsPosition || 'bottom';
  const reverse = element.dataset.scrollReverse === 'true' || cfg.optionsReverse;
  const scrolledUp = cfg.lastRectTop !== undefined && rect.top > cfg.lastRectTop;
  cfg.lastRectTop = rect.top;

  let shouldBeVisible: boolean;
  if (position === 'top') {
    // Касание верхней границы viewport: верх элемента достиг или пересёк y=0
    shouldBeVisible = rect.top <= 0 && rect.bottom > 0;
  } else if (position === 'bottom') {
    const bottomThirdThreshold = viewportHeight * (2 / 3);
    shouldBeVisible = rect.top <= bottomThirdThreshold && rect.bottom > 0;
  } else {
    const viewportCenter = viewportHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    shouldBeVisible = elementCenter <= viewportCenter;
  }

  // Вход в зону: прямая анимация (или переход из обратной в прямую)
  if (shouldBeVisible && (!cfg.isVisible || cfg.isReverse)) {
    element.classList.remove(cfg.visibleClass);
    element.removeAttribute('data-scroll-direction');
    element.classList.add(cfg.visibleClass);
    cfg.isVisible = true;
    cfg.isReverse = false;
    return once;
  }

  // Выход из зоны (были в зоне, не в состоянии reverse)
  if (!shouldBeVisible && cfg.isVisible && !cfg.isReverse) {
    if (reverse && scrolledUp) {
      // Выход скроллом вверх и пересечение чекпоинта — анимация в обратную сторону
      element.setAttribute('data-scroll-direction', 'reverse');
      cfg.isReverse = true;
    } else if (scrolledUp && !reverse) {
      // Выход скроллом вверх, reverse выключен — снять класс
      element.classList.remove(cfg.visibleClass);
      element.removeAttribute('data-scroll-direction');
      cfg.isVisible = false;
    }
    // Выход скроллом вниз — ничего не делаем, остаёмся в финальном положении
  }

  return false;
}

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const cfg = elementConfig.get(el);
          if (!cfg) continue;
          if (runCheck(el, cfg)) {
            sharedObserver!.unobserve(el);
            elementConfig.delete(el);
          }
        }
      },
      { root: null, rootMargin: '0px', threshold: THRESHOLDS }
    );
  }
  return sharedObserver;
}

export function initScrollToCenterAnimation(
  element: HTMLElement | null,
  visibleClass: string,
  options: { once?: boolean; position?: string; reverse?: boolean } = {}
): () => void {
  if (!element) return () => {};

  const once = options.once ?? false;
  const cfg: ElementConfig = {
    visibleClass,
    optionsPosition: options.position,
    optionsReverse: options.reverse ?? false,
    once,
    isVisible: false,
    isReverse: false,
    lastRectTop: undefined,
  };
  elementConfig.set(element, cfg);
  observedElements.add(element);

  if (observedElements.size === 1) {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const observer = getObserver();
  observer.observe(element);

  if (runCheck(element, cfg)) {
    observer.unobserve(element);
    elementConfig.delete(element);
    observedElements.delete(element);
    if (observedElements.size === 0) window.removeEventListener('scroll', onScroll);
  }

  return () => {
    observer.unobserve(element);
    elementConfig.delete(element);
    observedElements.delete(element);
    if (observedElements.size === 0) window.removeEventListener('scroll', onScroll);
  };
}
