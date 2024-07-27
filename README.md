# Приложение для отображения данных счётчиков воды

Это приложение предназначено для отображения таблицы с данными счётчиков горячей и холодной воды. В приложении реализованы следующие функции:

1. Отображение списка счётчиков.
2. Отображение адресов счётчиков.
3. Функционал удаления строки из таблицы.

## Функциональные возможности

- **Отображение данных счётчиков**: Данные счётчиков загружаются с сервера и отображаются в таблице. В таблице отображаются следующие колонки:
  - Порядковый номер
  - Тип счётчика (ХВС или ГВС)
  - Дата установки (формат дд.мм.гггг)
  - Автоматический ли счётчик
  - Значение
  - Адрес
  - Примечание
- **Адреса счётчиков**: Адреса счётчиков загружаются параллельно и отображаются в таблице. Оптимизация: не запрашиваем уже известные адреса.
- **Удаление счётчиков**: При наведении на строку таблицы появляется кнопка удаления, которая позволяет удалить соответствующий счётчик.

## Стек технологий

- **React**: Для создания пользовательского интерфейса.
- **TypeScript**: Для обеспечения типизации и безопасности кода.
- **MobX-State-Tree**: Для управления состоянием приложения.
- **Styled-Components (опционально)**: Для стилизации компонентов.
- **Vite**: Для развертывания приложения.

## Установка

Чтобы развернуть и запустить приложение локально, выполните следующие шаги:

### 1. Клонируйте репозиторий

```bash
git clone ttps://github.com/SrgyS/water-metters-app.git
cd water-metters-app
```

### 2. Установите зависимости

```bash
npm install
```

### 3. Запустите

```bash
npm run dev
```