# Portfolio Hub — Roadmap & TODO

Цель: довести Portfolio Hub до demo-ready состояния (1 законченный проект + несколько placeholders), с сильной архитектурой, контентом и базовым QA.

## Stage 0 — Foundation polish (быстрый)

- Проверить i18n coverage для ключевых строк (nav, projects list/detail, about, contact).
- Добавить Zod-схемы для projects data.
- Убедиться, что все error/loading маршруты есть: `error.tsx`, `not-found.tsx`, `loading.tsx` (глобально и для projects).

## Stage 1 — Projects & Content

- Заполнить реальные данные для:
  - Product App (готовый мини-проект — основной кейс).
  - Progis test (если нужен как отдельный проект).
  - 2–3 placeholders (минимально, но честно: статус WIP).
- Для каждого проекта:
  - title, summary, role, period, stack, tags, links (demo/repo), cover, хотя бы 1–2 highlights.
- Обновить projects list/detail так, чтобы:
  - использовались `featured`, `tags`, `year`, `status`.
  - `getFeaturedProjects`, `getAllTags`, `getProjectYears` реально работали на этих данных.

## Stage 2 — About & Contact & CV

- **About:**
  - Сформировать структурированный текст о себе (коротко: кто ты, стек, опыт, чем можешь быть полезен).
  - Локализовать EN/RU (HE позже при желании).
- **Contact:**
  - Реализовать форму на `react-hook-form + zod`:
    - поля: name, email, message;
    - валидация, ошибки, сообщение об успехе/ошибке.
  - Серверная обработка:
    - либо интеграция с Resend/SMTP;
    - либо временный лог (+ пометка в README).
- **CV & Links:**
  - Положить актуальный CV в `/public/cv/...`.
  - Добавить кнопки:
    - Download CV;
    - GitHub, LinkedIn, X, Telegram, Email.

## Stage 3 — Visual & UX (можно частично параллелить)

- Уточнить дизайн-токены: цветовая палитра, типографика, spacing.
- Добавить:
  - нормальные hover-состояния;
  - скелетоны загрузки projects;
  - лёгкие анимации (framer-motion).
- (Опционально) Dark mode (theme toggle или system).

## Stage 4 — QA, Tests, Analytics

- **Тесты (Vitest + RTL):**
  - unit: utils из `lib/projects.ts`, i18n routing;
  - 1–2 ключевых компонента (ProjectCard, ProjectsList).
- **Playwright:**
  - smoke-сценарии:
    - открытие `/[locale]`;
    - просмотр проекта;
    - отправка контактной формы (с моками);
    - скачивание CV.
- **Analytics:**
  - Подключить Plausible/Umami.
  - События: проект просмотрен, контакт отправлен, CV скачан, язык переключён.

## Stage 5 — Nice to have / Later

- JSON-LD для projects.
- Security headers / CSP (через Next middleware или Vercel config).
- Storybook (если понадобится для демонстрации UI).
- Возможная миграция c JSON на CMS / DB при росте числа проектов.
