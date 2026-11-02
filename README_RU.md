![Изображение](https://github.com/user-attachments/assets/4f9dfa0e-e600-4d4e-9e73-c919184f7573)

<div align="center">

[![Лицензия](https://img.shields.io/github/license/bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/blob/main/LICENSE) [![@flowgram.ai/editor](https://img.shields.io/npm/dm/%40flowgram.ai%2Fcore)](https://www.npmjs.com/package/@flowgram.ai/editor) [![Спросить DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/bytedance/flowgram.ai) [![juejin](https://img.shields.io/badge/juejin-FFFFFF?logo=juejin&logoColor=%23007FFF)](https://juejin.cn/column/7479814468601315362)

[![](https://trendshift.io/api/badge/repositories/13877)](https://trendshift.io/repositories/13877)

</div>

# FlowGram | Фреймворк для разработки рабочих процессов

[English](README.md) | [中文](README_ZH.md) | [Español](README_ES.md) | [Русский](README_RU.md) | [Português](README_PT.md) | [Deutsch](README_DE.md) | [日本語](README_JA.md)

FlowGram — это компонуемый, визуальный, легко интегрируемый и расширяемый фреймворк и набор инструментов для разработки рабочих процессов.
Наша цель — помочь разработчикам создавать платформы для рабочих процессов ИИ **быстрее** и **проще**.
FlowGram поставляется со встроенным набором инструментов для разработки рабочих процессов: визуальным холстом потока, формами конфигурации узлов, цепочкой области видимости переменных и готовыми к использованию материалами (LLM, Условие, Редактор кода и т. д.). Пакеты фреймворка предоставляют компоненты для создания собственной платформы рабочих процессов, а FlowGram Desktop объединяет их в нативной рабочей среде для ИИ-агентов.

Узнайте больше на [FlowGram.AI 🌐](https://flowgram.ai)

## 🖥️ FlowGram Desktop

FlowGram Desktop — нативная рабочая среда для ИИ-агентов на macOS и Windows. Создавайте, запускайте, отлаживайте и повторно используйте рабочие процессы с помощью диалога и визуального холста.

- **Создание:** опишите задачу в чате, затем настройте на холсте узлы, условия, параллельные ветви, объединения и циклы.
- **Отладка:** тестируйте отдельные узлы, изучайте входные и выходные данные, просматривайте пути выполнения и исторические снимки рабочих процессов.
- **Повторное использование:** публикуйте рабочие процессы с версиями для клиентов HTTP и MCP или вызывайте их из других рабочих процессов.
- **Организация:** управляйте рабочими процессами и чатами по проектам, импортируйте и экспортируйте проекты, используйте интерфейс на английском или упрощённом китайском языке со светлой или тёмной темой. Шесть отраслевых примеров проектов помогут начать работу.

<https://github.com/user-attachments/assets/48c0e187-5bd8-40b2-9a96-60d3839db170>

### Скачать Desktop

**macOS — установка одной командой** (Apple Silicon и Intel):

```sh
curl --fail --silent --show-error https://flowgram.ai/desktop/install.sh | sh
```

Выполните в Терминале, чтобы скачать последнюю предварительную версию, проверить SHA-256 и установить FlowGram. Скрипт снимает атрибут карантина только с установленного приложения, чтобы можно было открыть неподписанную версию. `sudo` не требуется. Для обновления закройте FlowGram и повторите ту же команду.

[⬇ Последняя предварительная версия](https://github.com/bytedance/flowgram.ai/releases/tag/desktop-preview)

Выберите платформу для загрузки последней предварительной версии. Постоянные ссылки обновляются автоматически после успешной сборки для всех трёх платформ.

| Платформа | Скачать |
| --- | --- |
| macOS · Apple Silicon (ARM64) | [Скачать DMG](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_aarch64-apple-darwin.dmg) |
| macOS · Intel | [Скачать DMG](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_x86_64-apple-darwin.dmg) |
| Windows 10/11 · x64 | [Скачать EXE](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_x86_64-pc-windows-msvc-setup.exe) |

Скачайте установщик напрямую, без входа в GitHub. Откройте .dmg в macOS или запустите установщик .exe в Windows. Контрольные суммы и сведения о сборке доступны на странице выпуска. Предварительные установщики не подписаны; сборки macOS не прошли нотариализацию.

## 🎬 Демо

<https://github.com/user-attachments/assets/fee87890-ceec-4c07-b659-08afc4dedc26>

Откройте в [CodeSandbox 🌐](https://codesandbox.io/p/github/louisyoungx/flowgram-demo/main) или [StackBlitz 🌐](https://stackblitz.com/~/github.com/louisyoungx/flowgram-demo)

В этом демо мы перебираем список городов, получаем погоду в реальном времени по HTTP, анализируем температуру с помощью узла «Код», генерируем предложения по одежде с помощью LLM, управляем с помощью «Условия», агрегируем результаты по циклу и, наконец, используем LLM-советника, чтобы выбрать самый комфортный город, прежде чем отправить результат в конечный узел.

## 🚀 Быстрый старт

1. Создайте новый проект FlowGram:

```sh
npx @flowgram.ai/create-app@latest
```

> Мы рекомендуем выбрать шаблон `Free Layout Demo ⭐️`.

2. Запустите проект:

```sh
cd demo-free-layout
npm install
npm start
```

3. Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## ✨ Особенности

| Особенность                                                                                                | Описание                                                                                                                                                                          | Демо                                                                                           |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Холст со свободной компоновкой](https://flowgram.ai/examples/free-layout/free-feature-overview.html)      | Холст со свободной компоновкой, где узлы можно размещать где угодно и соединять линиями произвольной формы.                                                                       | ![Демо со свободной компоновкой](./apps/docs/src/public/free-layout/free-layout-demo.gif)      |
| [Холст с фиксированной компоновкой](https://flowgram.ai/examples/fixed-layout/fixed-feature-overview.html) | Холст с фиксированной компоновкой, где узлы можно перетаскивать в указанные позиции, с поддержкой составных узлов, таких как ветви и циклы.                                       | ![Демо с фиксированной компоновкой](./apps/docs/src/public/fixed-layout/fixed-layout-demo.gif) |
| [Форма](https://flowgram.ai/examples/node-form/basic.html)                                                 | Движок форм управляет операциями CRUD данных узлов и предоставляет возможности рендеринга, валидации, побочных эффектов, связывания и обработки ошибок, упрощая разработку конфигураций узлов. | ![Форма](https://github.com/user-attachments/assets/13e9b4cd-e993-4d21-901c-fb6cf106de78)      |
| [Переменная](https://flowgram.ai/guide/variable/basic.html)                                                | Движок переменных поддерживает ограничения области видимости, инспекцию структуры переменных и вывод типов, облегчая управление потоком данных в рабочем процессе.                                  | ![Переменная](https://github.com/user-attachments/assets/442006db-25e3-4fb5-972c-7a0545638ff5) |


## 📖 Документация

Вы можете найти документацию FlowGram [на веб-сайте](https://flowgram.ai).

Документация разделена на несколько разделов:

- [Быстрый старт](https://flowgram.ai/guide/getting-started/introduction.html)
- [Холст](https://flowgram.ai/guide/free-layout/load.html)
- [Форма](https://flowgram.ai/guide/form/form.html)
- [Переменная](https://flowgram.ai/guide/variable/basic.html)
- [Материал](https://flowgram.ai/materials/introduction.html)
- [Среда выполнения](https://flowgram.ai/guide/runtime/introduction.html)
- [Расширенные руководства](https://flowgram.ai/guide/advanced/zoom-scroll.html)
- [Справочник по API](https://flowgram.ai/api/index.html)
- [Где получить поддержку](https://flowgram.ai/guide/contact-us.html)
- [Руководство по вкладу](https://flowgram.ai/guide/contributing.html)

## 🙌 Участники

[![Участники FlowGram.AI](https://contrib.rocks/image?repo=bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/graphs/contributors)

## 🌍 Внедрение

- [Coze Studio](https://github.com/coze-dev/coze-studio) — это универсальный инструмент для разработки агентов ИИ. Предоставляя новейшие большие модели и инструменты, различные режимы и фреймворки разработки, Coze Studio предлагает наиболее удобную среду разработки агентов ИИ, от разработки до развертывания.
- [NNDeploy](https://github.com/NNDeploy/nndeploy) — это мультиплатформенный инструмент развертывания ИИ на основе рабочих процессов.
- [Certimate](https://github.com/certimate-go/certimate) — это инструмент управления SSL-сертификатами с открытым исходным кодом, который помогает автоматически подавать заявки и развертывать SSL-сертификаты с помощью визуального рабочего процесса. Это один из вариантов клиента ACME, перечисленных в официальной документации Let's Encrypt.

## 📬 Свяжитесь с нами

- Проблемы: [Проблемы](https://github.com/bytedance/flowgram.ai/issues)
- Lark: отсканируйте QR-код ниже с помощью [Register Feishu](https://www.feishu.cn/en/), чтобы присоединиться к нашей группе пользователей FlowGram.

<img src="./apps/docs/src/public/lark-group.png" width="200"/>
