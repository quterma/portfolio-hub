"dependencies": {
"clsx": "^2.1.1",
"react": "^19.2.0",
"react-dom": "^19.2.0",
"recharts": "^3.5.1"
},
"devDependencies": {
"@eslint/js": "^9.39.1",
"@tailwindcss/postcss": "^4.1.17",
"@testing-library/jest-dom": "^6.9.1",
"@testing-library/react": "^16.3.0",
"@testing-library/user-event": "^14.6.1",
"@types/node": "^24.10.1",
"@types/react": "^19.2.5",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^5.1.1",
"@vitest/coverage-v8": "^4.0.14",
"@vitest/ui": "^4.0.14",
"autoprefixer": "^10.4.22",
"eslint": "^9.39.1",
"eslint-config-prettier": "^10.1.8",
"eslint-plugin-react-hooks": "^7.0.1",
"eslint-plugin-react-refresh": "^0.4.24",
"globals": "^16.5.0",
"husky": "^9.1.7",
"jsdom": "^27.2.0",
"lint-staged": "^16.2.7",
"postcss": "^8.5.6",
"prettier": "^3.7.1",
"tailwindcss": "^4.1.17",
"typescript": "~5.9.3",
"typescript-eslint": "^8.46.4",
"vite": "^7.2.4",
"vitest": "^4.0.14"
}

# Trading Mini App

Минимальное приложение (моделька-макетик) для торговли на React + TypeScript + Tailwind CSS.

# Архитектура Trading Mini App

## Описание

Trading Mini App — это мобильный виджет для трейдинга, разработанный как независимый встраиваемый компонент (embed-friendly). Основная целевая платформа — мобильные устройства.

## Структура проекта

Проект использует минимальную FSD-архитектуру для организации кода:

```
src/
  app/           - точка входа, глобальные стили
  features/      - бизнес-фичи приложения
    connect-wallet/
      ui/        - компоненты фичи
      model/     - логика и хуки
      index.ts   - публичный API
    price-chart/
      ui/
      model/
      index.ts
  shared/        - переиспользуемые компоненты и утилиты
    ui/          - UI-компоненты (Button, Card)
    lib/         - утилиты (форматтеры)
    index.ts     - публичные реэкспорты
  mocks/         - моковые данные для разработки
  docs/          - документация проекта
```

## Технологический стек

- **React 19** + TypeScript
- **Vite** — сборщик
- **Tailwind CSS** — стилизация
- **Recharts** — графики
- **clsx** — утилита для className
- **Prettier** + **ESLint** — форматирование и линтинг

## Принципы

1. **Минимальная FSD**: структура упрощена для тестового задания на 1 день
2. **Без стейт-менеджера**: вся логика на хуках
3. **Публичные API**: все модули экспортируют через index.ts
4. **Импорты через @/**: используются алиасы для чистого кода
5. **Мобильный-first**: дизайн рассчитан на мобильные устройства

## Реализованные модули

### Features

#### connect-wallet

- **ConnectWallet** — UI компонент подключения кошелька
- **useMockWallet** — хук управления состоянием кошелька (connect/disconnect)
- **WalletState** — тип состояния кошелька

#### price-chart

- **PriceChart** — UI компонент графика цен
- **usePriceData** — хук работы с данными цен

### Shared UI

- **Button** — кнопка с вариантами (primary/secondary)
- **Card** — карточка-контейнер

### Shared Lib

- **formatPrice** — форматирование цены
- **formatPercent** — форматирование процентов
- **formatAddress** — сокращение адреса кошелька

### Моки

- **MOCK_WALLET** — данные тестового кошелька
- **generateRandomBalance** — генератор случайного баланса
- **mockPrices** — массив точек цены за 24 часа
