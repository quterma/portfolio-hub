# Portfolio Hub — Development Plan

Цель: довести Portfolio Hub до состояния, в котором его можно уверенно показывать рекрутёрам и использовать как основной портфель проектов.

Проекты в портфолио:

- `prod-show-case` — completed
- `yokai-monitor` — completed
- `progis-map-app` — in-progress
- `trading-mini-app` — planned / placeholder

---

## Stage A — Projects Data & Content (Foundation)

**Цель:**  
Сделать данные проектов и контент demo-ready, без изменения UI.

**Границы:**  
— Работаем только с данными и контентом.  
— UI, верстку и визуальную полировку не трогаем.  
— EN обязательно, RU по возможности.

**Process note:**  
All changes in Stage A are completed in one logical commit.

### Задачи

- Привести `projects.json` в соответствие `ProjectSchema`.
- Заполнить проекты:
  - `prod-show-case` (completed, featured)
  - `yokai-monitor` (completed)
  - `progis-map-app` (in-progress)
  - `trading-mini-app` (planned, minimal placeholder content allowed)
- Для каждого проекта:
  - `title`, `summary`, `description` (EN, RU optional)
  - `status`, `year`, `tech`, `tags`
  - `urls.demo`, `urls.github` (если применимо)
  - `images.cover`, `images.gallery[]`
- Проверить:
  - корректное отображение `/projects`
  - корректное отображение `/project/[slug]`
  - работу Zod-валидации и fallback’ов
- Провести self-review:
  - видно ли 2–3 сильных проекта
  - понятны ли статусы (completed / in-progress / planned)

**DoD:**  
Данные проектов полные, страницы list/detail не ломаются placeholder-проектами, контент готов к показу.

---

## Stage B — Project Page Layout (Key UX Stage)

**Цель:**  
Сделать страницу проекта сильной, понятной и убедительной.

### Задачи

- Переработать layout `/project/[slug]` **в рамках существующих компонентов и дизайн-системы**:
  - hero / title
  - summary + description
  - project facts (status, year, tech)
  - gallery
  - CTA (demo / github)
- При необходимости слегка улучшить `/projects` list (без сложных фильтров).
- Убедиться, что completed и in-progress визуально различимы.

**DoD:**  
Страница проекта выглядит как production-case и понятно рассказывает о проекте.

---

## Stage C — Core Pages (About / Contact / Home)

**Цель:**  
Сделать сайт завершённым, а не набором проектов.

### Задачи

- **About**
  - Живой текст о себе (EN, RU optional).
  - Стек, опыт, фокус.
- **Contact**
  - Контакты и ссылки (email, GitHub, LinkedIn).
  - Contact form is optional and not required for Stage C completion.
- **Home**
  - Короткий лендинг: кто ты, что делаешь, чем полезен.
  - Ссылка на проекты.

**DoD:**  
Пользователь понимает, кто ты, чем занимаешься и как связаться.

---

## Stage D — Ready to Show (Must-have Polish)

**Цель:**  
Довести до состояния “можно отправлять ссылку”.

### MUST

- LanguageSwitcher (EN / RU).
- ThemeToggle (light / dark).
- Проверка:
  - mobile / desktop
  - 404 / error handling
  - no console errors
  - no broken links
- Финальный self-review как рекрутёр:
  - кто ты?
  - какие проекты ключевые?
  - где код и демо?

### LATER

- Мини-анимации
- Analytics
- Расширенные тесты
- SEO-расширения

**DoD:**  
Сайт стабилен, чист по консоли, читаем, удобен и не вызывает вопросов при первом просмотре.

---

## Stage E — Nice to Have (Optional)

- Визуальная полировка
- Анимации (framer-motion)
- Аналитика
- Дополнительные проекты
- CMS / data migration (если потребуется)

---

## Итог

После Stage D портфолио считается **готовым к продакшену и показу**.  
Stage E — опционально и не блокирует использование портфолио.
