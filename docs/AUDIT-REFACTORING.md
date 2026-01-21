# Аудит проекта NAKORT React для рефакторинга

**Дата:** 2025-01  
**Цель:** выявить возможности рефакторинга без потери функциональности, производительности и анимаций.

---

## 1. Архитектура и структура

### 1.1 Два сборных контура (legacy)

Сейчас в репозитории живут **два набора исходников**:

| Назначение | Каталоги | Сборка |
|------------|----------|--------|
| **Next.js (React)** | `src/app/`, `src/components/`, `src/styles/`, `src/hooks/`, `src/utils/` | `next build` |
| **Pug/Gulp (legacy)** | `src/pug/`, `src/scss/`, `src/js/`, `gulpfile.js` | `gulp` → `dist/` |

Рекомендация: если прод — только Next.js, пометить legacy-контур (pug, scss, js, gulp) как устаревший и в перспективе удалить после выгрузки нужных данных/верстки.

### 1.2 Дублирование изображений

- `public/img/` — используется Next.js (`/img/...`).
- ~~`src/img/`~~ — **удалён** (2025-01): использовался только в `Footer.module.scss` как `../img/icons/ball.svg`; заменено на `/img/icons/ball.svg` из `public/img/`.

Рекомендация: оставить один источник истины (`public/img/`). ~~Если `src/img/` не нужен для сборки — удалить~~ — выполнено.

---

## 2. Стили: глобальные vs CSS‑модули

### 2.1 Что реально используется

В `layout` подключается `src/styles/main.scss`, который тянет:

- `variables`, `mixins`, `base`, `typography` — **нужны**
- `animations` — **по сути не используется** (ключевые keyframes продублированы в модулях, глобальные селекторы под них в React не применяются)
- `components/utilities` — **нужен** (`.container`)
- Остальные `components/header`, `hero`, `about`, `features`, `highlight-strip`, `application`, `reviews`, `pricing`, `certificates`, `faq`, `modal`, `desktop-only`, `footer`, `activities`, `activity-card` — глобальный BEM (`.hero`, `.about` и т.п.), а в React используются только CSS‑модули с хешированными именами (`styles.hero` → `Hero_hero__…`). Эти глобальные файлы **в React‑сборке не матчатся** и дают мёртвый CSS.

### 2.2 Дублирование keyframes

- `ballDrop`: `styles/animations.scss`, `styles/components/_header.scss`, `Logo.module.scss`. В React живёт только `Logo.module.scss`.
- `about-grid-item-shadow`: `styles/animations.scss`, `About.module.scss`, `_about.scss`. В React — только `About.module.scss`.
- `marquee`, `pulse`, `fadeOut`: `styles/animations.scss` и `Application.module.scss`. В React — только в модуле.

Рекомендация: убрать из `main.scss` импорт `animations` и при необходимости — сам файл, либо оставить в нём только то, что явно используется глобальными селекторами (сейчас таких нет).

### 2.3 Что оставить в `main.scss`

Минимально нужный набор:

```scss
@use 'variables' as *;
@use 'mixins' as *;
@use 'base';        // reset, .wrapper, .section-title, body, html
@use 'typography';
@use 'components/utilities';  // .container
```

Остальные `@use 'components/...'` для hero, about, header, footer, modal и т.д. можно убрать по мере уверенности, что ни один глобальный класс оттуда не используется (уже проверено: в React везде модули).

### 2.4 Глобальные классы, которые используются

- `container` — `_utilities.scss`
- `main` — тег `main` внутри `.wrapper` в `base.scss`
- `wrapper` — `base.scss`
- `section-title` — `base.scss`, используется в `FAQ`

Их при рефакторинге сохранять.

---

## 3. Компоненты и логика

### 3.1 Хук `useModal`

- Реализован в `src/hooks/useModal.ts`, в компонентах **не используется**.
- `ModalTraining` и `ModalCertificate` дублируют ту же логику: `openModal`/`closeModal`, `Escape`, `body.style.overflow`.

Рекомендация: перевести оба модала на `useModal` и вынести общую разметку/стили в один `Modal` с пропсами (тип, контент). Это упростит поддержку и уберёт дублирование.

### 3.2 Модалы и CustomEvent

- Открытие: `window.dispatchEvent(new CustomEvent('openModal', { detail: 'training' | 'certificate' }))`.
- `Button` при `data-modal` и `type="button"` сам диспатчит `openModal`.
- Модалы слушают `openModal`/`closeModal` на `window`.

При переходе на `useModal` можно либо оставить `CustomEvent` как слой совместимости для `data-modal`, либо пошагово заменить на контекст/пропсы.

### 3.3 `DesktopOnly`

- Оверлей при `width < 1280px` с предложением открыть десктоп.
- Используется на главной, логика изолирована.

При рефакторинге достаточно не трогать, если не планируется менять порог или UX.

---

## 4. Анимации и scroll‑логика

### 4.1 `initScrollToCenterAnimation` (`src/utils/scrollAnimation.ts`)

- Используется в: `HighlightStrip`, `Application`, `Pricing`, `Certificates`.
- Добавляет глобальные классы (`highlight-strip--visible`, `application__img--visible`, `card-pricing--active`, `certificate-gift__image--active`), которые в модулях подхватываются через `:global(...)`.

Важно при рефакторинге: сохранять имена этих классов и способ их добавления/удаления, иначе анимации перестанут срабатывать.

### 4.2 Scroll vs Intersection Observer

- ~~Сейчас: `scroll` + `requestAnimationFrame` + `getBoundingClientRect`.~~ **Выполнено (2025-01):** реализация переведена на `IntersectionObserver` с общим наблюдателем, `threshold: [0 … 1]` и той же логикой `position: 'center' | 'bottom'` и `getBoundingClientRect` в колбэке. API и классы сохранены.
- Для «появления при скролле» достаточно `IntersectionObserver` — меньше нагрузка при длинной странице.

~~Рекомендация: в отдельном рефакторинге вынести общий хук/утилиту на `IntersectionObserver`…~~ — выполнено.

### 4.3 Hero‑карусель

- `useHeroCarousel`: интервал, пауза по hover, `currentSlide`, `nextSlide`, `prevSlide`, `goToSlide`.
- Стили и смена слайдов — в `Hero.module.scss` и `Hero.tsx`.

При рефакторинге достаточно не менять контракт хука и имена классов в модуле.

### 4.4 Swiper

- `Reviews`, `Certificates` (два таба: tennis/padel).
- В `Certificates` — `overflow: visible` и т.п. для «выхода» слайдов; в `Reviews` — `overflow: hidden` для обычного поведения. Уже разделено по смыслу.

При рефакторинге: не трогать настройки `overflow` и `:global(.swiper-wrapper)`, `:global(.swiper-slide)` в `Certificates`, чтобы не сломать анимации и вёрстку.

---

## 5. Производительность

### 5.1 Next.js и изображения

- `next.config.js`: `images.formats: ['image/avif', 'image/webp']`, `deviceSizes`, `imageSizes` заданы.
- В компонентах используется `next/image` с `sizes`, `loading="lazy"`, `priority` только где нужно (Hero).

Рекомендация: при добавлении новых секций — по умолчанию `loading="lazy"` и адекватные `sizes`.

### 5.2 Шрифты

- `next/font`: Google Fonts (`Mulish`, `PT_Sans`) с `display: 'swap'`.
- ~~Локальные `src/fonts/`~~ (Mulish, PT Sans) — **удалены** (2025-01): в Next‑сборке используются только `next/font` (Google Fonts).

Рекомендация: ~~либо удалить `src/fonts/`~~ — выполнено. При необходимости офлайн/брендинга — перевести на `localFont` из `public/fonts/`.

### 5.3 Preconnect

- В `layout`: `preconnect` и `dns-prefetch` на `cdn.jsdelivr.net`. Стоит проверить, что с них реально что‑то грузится (например, через Network). Если нет — удалить.

---

## 6. Legacy и неиспользуемый код

### 6.1 Не используются в Next.js

- `src/js/*` — `main.js`, `modal.js`, `carousel.js`, `about-scroll.js`, `scroll-animations.js`, `swiper.min.js`. В `app/` и `components/` не импортируются.
- `src/pug/`, `src/scss/` — используются только Gulp.
- `gulpfile.js` — сборка Pug/SCSS/JS в `dist/`.
- `useModal` — хук не импортируется.
- ~~Локальные `src/fonts/`~~ — удалены.

### 6.2 Риски при удалении

- Удаление `src/js/`, `src/pug/`, `src/scss/`, `gulpfile.js` влияет только на Gulp‑сборку. Если она не нужна — код можно вынести в отдельную ветку или архив, затем удалить.
- Удаление глобальных `@use 'components/...'` и `@use 'animations'` из `main.scss` на текущей версии не ломает React, т.к. селекторы там не совпадают с классами из CSS‑модулей.

---

## 7. Зависимости

- `next`, `react`, `react-dom`, `swiper` — используются.
- `sass` — для SCSS и CSS‑модулей.
- В `package.json` нет `gulp`, `gulp-*` и т.п. — значит, Gulp‑задачи, если и запускаются, то из другого окружения или вручную. Стоит это зафиксировать (README или скрипты).

---

## 8. Чек‑лист перед рефакторингом

- [ ] Решить: один фронтенд (Next.js) или сохранение Pug/Gulp. От этого зависит, что удалять.
- [ ] Вынести из `main.scss` неиспользуемые `@use 'components/...'` и `@use 'animations'` (после проверки, что анимации остаются в модулях).
- [ ] Перевести `ModalTraining` и `ModalCertificate` на `useModal` и, при желании, на общий `Modal`.
- [x] Привести в порядок `src/img/` vs `public/img/` и, при необходимости, удалить `src/img/` — **удалён**; `Footer.module.scss`: `../img/icons/ball.svg` → `/img/icons/ball.svg`.
- [x] Удалить или перевести на `localFont` `src/fonts/` — **удалены** (используются `next/font`).
- [ ] Оставить без изменений: имена глобальных классов для scroll‑анимаций, `:global` в модулях под Swiper и под эти классы, логику `Button` с `data-modal` и `openModal`.
- [ ] При рефакторинге scroll‑анимаций — предусмотреть тот же набор глобальных классов и `position`, чтобы не ломать HighlightStrip, Application, Pricing, Certificates.

---

## 9. Порядок рефакторинга (приоритеты)

1. **Низкий риск**
   - Удаление/очистка `@use 'animations'` и неиспользуемых `@use 'components/...'` из `main.scss`.
   - Удаление `useModal` или его внедрение в модалы (с тестами/ручной проверкой).
   - Документирование или удаление `src/img/`, `src/fonts/`, `src/js/`, `src/pug/`, `src/scss/`, `gulpfile.js` при отказе от Gulp. **Выполнено:** `src/img/`, `src/fonts/`, `src/js/`, `src/pug/`, `src/scss/`, `gulpfile.js` удалены.

2. **Средний риск**
   - Введение общего `Modal` и переезд `ModalTraining`/`ModalCertificate` на `useModal`.
   - ~~Замена `initScrollToCenterAnimation` на реализацию на `IntersectionObserver`~~ — **выполнено** (те же классы, `position: 'center' | 'bottom'`, `once`).

3. **Высокий риск (только при явной необходимости)**
   - Разделение/переработка `main.scss` (base, typography, variables, mixins) — можно задеть глобальные классы `container`, `wrapper`, `section-title` и типографику.
   - Большие изменения в `Certificates` (Swiper, overflow, `:global`).

---

## 10. Анимации и глобальные классы — сводка

Сохранять при любом рефакторинге:

| Класс | Где добавляется | Модуль, где стили |
|-------|-----------------|-------------------|
| `highlight-strip--visible` | `HighlightStrip` | `HighlightStrip.module.scss` |
| `application__img--visible` | `Application` | `Application.module.scss` |
| `card-pricing--active` | `Pricing` | `Pricing.module.scss` |
| `certificate-gift__image--active` | `Certificates` (tennis + padel) | `Certificates.module.scss` |

В `initScrollToCenterAnimation` используется `data-scroll-position="center" | "bottom"` (по умолчанию `"center"`). `"bottom"` — в `Pricing` для карточек.

---

*Документ можно обновлять по мере рефакторинга и отключения legacy‑сборки.*
