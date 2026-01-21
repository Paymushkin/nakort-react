# NAKORT - Теннисный клуб на Next.js

Современный веб-сайт теннисного клуба NAKORT, переписанный на Next.js с оптимизацией для производительности и SEO.

## 🚀 Особенности

- **Next.js 14** с App Router
- **TypeScript** для типобезопасности
- **SCSS Modules** для стилизации
- **Оптимизация изображений** через Next.js Image
- **SEO оптимизация** с мета-тегами, sitemap и structured data
- **Swiper** для каруселей
- **Адаптивный дизайн**

## 📦 Установка

```bash
npm install
```

## 🛠️ Разработка

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 🏗️ Сборка

```bash
npm run build
npm start
```

## 📁 Структура проекта

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Главный layout с метаданными
│   ├── page.tsx      # Главная страница
│   ├── sitemap.ts    # Sitemap для SEO
│   └── robots.ts     # Robots.txt
├── components/       # React компоненты
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   └── ...
├── hooks/           # React хуки
│   ├── useHeroCarousel.ts
│   └── useModal.ts
├── styles/          # SCSS стили
│   ├── main.scss
│   ├── variables.scss
│   └── components/
└── public/          # Статические файлы
    └── img/        # Изображения
```

## 🎨 Стили

Проект использует SCSS Modules для стилизации компонентов. Основные стили находятся в `src/styles/`, а модульные стили компонентов - в `src/components/*.module.scss`.

## 🔍 SEO

- Мета-теги настроены в `layout.tsx`
- Structured Data (JSON-LD) для поисковых систем
- Автоматическая генерация sitemap.xml
- Robots.txt настроен для поисковых систем

## 📱 Оптимизация производительности

- Автоматическая оптимизация изображений через Next.js Image
- Code splitting
- Lazy loading компонентов
- Оптимизация шрифтов через next/font

## 📝 Лицензия

ISC




