// Утилита для анимаций при скролле
// Основана на оригинальной функции initScrollToCenterAnimation

export function initScrollToCenterAnimation(
  element: HTMLElement | null,
  visibleClass: string,
  options: { once?: boolean; position?: string } = {}
): () => void {
  if (!element) return () => {};

  // Получаем позицию из data-атрибута или опций
  const scrollPosition = element.dataset.scrollPosition || options.position || 'center';
  const { once = false } = options;

  let ticking = false;
  let isVisible = false;
  let cleanupExecuted = false;

  function checkPosition() {
    if (cleanupExecuted || !element) return;

    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const elementBottom = rect.bottom;
    const viewportHeight = window.innerHeight;

    let shouldBeVisible = false;

    if (scrollPosition === 'bottom') {
      // Нижняя треть экрана - анимация начинается когда элемент достигает нижней трети
      // и остается активной пока элемент виден, отключается когда уходит за нижнюю границу
      const bottomThirdThreshold = viewportHeight * (2 / 3); // 66.67% от верха = нижняя треть
      const elementTop = rect.top;

      // Анимация запускается когда верх элемента достиг нижней трети экрана
      // и остается активной пока элемент виден (нижняя граница выше низа экрана)
      // Отключается когда элемент полностью уходит за нижнюю границу экрана
      shouldBeVisible = elementTop <= bottomThirdThreshold && elementBottom > 0;
    } else {
      // По умолчанию - центр экрана
      const viewportCenter = viewportHeight / 2;
      shouldBeVisible = elementCenter <= viewportCenter;
    }

    if (shouldBeVisible && !isVisible) {
      element.classList.add(visibleClass);
      isVisible = true;
      if (once) {
        // Если once: true, отключаем отслеживание после первого срабатывания
        cleanup();
        return;
      }
    } else if (!shouldBeVisible && isVisible && !once) {
      element.classList.remove(visibleClass);
      isVisible = false;
    }
  }

  function onScroll() {
    if (!ticking && !cleanupExecuted) {
      window.requestAnimationFrame(() => {
        checkPosition();
        ticking = false;
      });
      ticking = true;
    }
  }

  function cleanup() {
    if (cleanupExecuted) return;
    cleanupExecuted = true;
    window.removeEventListener('scroll', onScroll);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  checkPosition(); // Проверяем начальную позицию

  // Возвращаем функцию очистки
  return cleanup;
}

