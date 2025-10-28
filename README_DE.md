![Image](https://github.com/user-attachments/assets/4f9dfa0e-e600-4d4e-9e73-c919184f7573)

<div align="center">

[![Lizenz](https://img.shields.io/github/license/bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/blob/main/LICENSE) [![@flowgram.ai/editor](https://img.shields.io/npm/dm/%40flowgram.ai%2Fcore)](https://www.npmjs.com/package/@flowgram.ai/editor) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/bytedance/flowgram.ai) [![juejin](https://img.shields.io/badge/juejin-FFFFFF?logo=juejin&logoColor=%23007FFF)](https://juejin.cn/column/7479814468601315362)

[![](https://trendshift.io/api/badge/repositories/13877)](https://trendshift.io/repositories/13877)

</div>

# FlowGram | Workflow-Entwicklungs-Framework

[English](README.md) | [中文](README_ZH.md) | [Español](README_ES.md) | [Русский](README_RU.md) | [Português](README_PT.md) | [Deutsch](README_DE.md) | [日本語](README_JA.md)

FlowGram ist ein zusammensetzbares, visuelles, einfach zu integrierendes und erweiterbares Workflow-Entwicklungs-Framework & Toolkit.
Unser Ziel ist es, Entwicklern zu helfen, KI-Workflow-Plattformen **schneller** und **einfacher** zu erstellen.
FlowGram wird mit einer Reihe von integrierten Werkzeugen für die Workflow-Entwicklung geliefert: eine visuelle Flow-Canvas, Node-Konfigurationsformulare, eine Variablen-Scope-Chain und sofort einsatzbereite Materialien (LLM, Bedingung, Code-Editor usw.). Es ist keine fertige Workflow-Plattform; es ist das Framework und Toolkit, um Ihre zu erstellen.

Erfahren Sie mehr unter [FlowGram.AI 🌐](https://flowgram.ai)

## 🎬 Demo

<https://github.com/user-attachments/assets/fee87890-ceec-4c07-b659-08afc4dedc26>

Öffnen Sie in [CodeSandbox 🌐](https://codesandbox.io/p/github/louisyoungx/flowgram-demo/main) oder [StackBlitz 🌐](https://stackblitz.com/~/github.com/louisyoungx/flowgram-demo)

In dieser Demo durchlaufen wir eine Liste von Städten, rufen das Echtzeit-Wetter über HTTP ab, parsen die Temperaturen mit einem Code-Knoten, generieren Outfit-Vorschläge mit einem LLM, steuern durch eine Bedingung, aggregieren die Ergebnisse über die Schleife und verwenden schließlich einen Berater-LLM, um die komfortabelste Stadt auszuwählen, bevor das Ergebnis an den Endknoten gesendet wird.

## 🚀 Schnellstart

1. Erstellen Sie ein neues FlowGram-Projekt:

```sh
npx @flowgram.ai/create-app@latest
```

> Wir empfehlen, die Vorlage `Free Layout Demo ⭐️` zu wählen.

2. Starten Sie das Projekt:

```sh
cd demo-free-layout
npm install
npm start
```

3. Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## ✨ Funktionen

| Funktion                                                                                     | Beschreibung                                                                                                                                                                  | Demo                                                                                         |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Free Layout Canvas](https://flowgram.ai/examples/free-layout/free-feature-overview.html)    | Freie Layout-Canvas, auf der Knoten beliebig platziert und mit Freiformlinien verbunden werden können.                                                                        | ![Free Layout Demo](./apps/docs/src/public/free-layout/free-layout-demo.gif)                 |
| [Fixed Layout Canvas](https://flowgram.ai/examples/fixed-layout/fixed-feature-overview.html) | Feste Layout-Canvas, auf der Knoten an bestimmte Positionen gezogen werden können, mit Unterstützung für zusammengesetzte Knoten wie Verzweigungen und Schleifen.             | ![Fixed Layout Demo](./apps/docs/src/public/fixed-layout/fixed-layout-demo.gif)              |
| [Formular](https://flowgram.ai/examples/node-form/basic.html)                                | Die Formular-Engine verwaltet CRUD-Operationen von Knotendaten und bietet Rendering-, Validierungs-, Nebeneffekt-, Verknüpfungs- und Fehlererfassungsfunktionen, wodurch die Entwicklung von Knotenkonfigurationen vereinfacht wird. | ![Formular](https://github.com/user-attachments/assets/13e9b4cd-e993-4d21-901c-fb6cf106de78) |
| [Variable](https://flowgram.ai/guide/variable/basic.html)                                    | Die Variablen-Engine unterstützt Bereichsbeschränkungen, Variablenstrukturinspektion und Typinferenz, wodurch der Datenfluss im Workflow einfach verwaltet werden kann. | ![Variable](https://github.com/user-attachments/assets/442006db-25e3-4fb5-972c-7a0545638ff5) |


## 📖 Dokumentation

Sie finden die FlowGram-Dokumentation [auf der Website](https://flowgram.ai).

Die Dokumentation ist in mehrere Abschnitte unterteilt:

- [Schnellstart](https://flowgram.ai/guide/getting-started/introduction.html)
- [Canvas](https://flowgram.ai/guide/free-layout/load.html)
- [Formular](https://flowgram.ai/guide/form/form.html)
- [Variable](https://flowgram.ai/guide/variable/basic.html)
- [Material](https://flowgram.ai/materials/introduction.html)
- [Laufzeit](https://flowgram.ai/guide/runtime/introduction.html)
- [Erweiterte Anleitungen](https://flowgram.ai/guide/advanced/zoom-scroll.html)
- [API-Referenz](https://flowgram.ai/api/index.html)
- [Wo Sie Unterstützung erhalten](https://flowgram.ai/guide/contact-us.html)
- [Leitfaden für Beiträge](https://flowgram.ai/guide/contributing.html)

## 🙌 Mitwirkende

[![FlowGram.AI-Mitwirkende](https://contrib.rocks/image?repo=bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/graphs/contributors)

## 🌍 Einführung

- [Coze Studio](https://github.com/coze-dev/coze-studio) ist ein All-in-One-KI-Agenten-Entwicklungstool. Coze Studio bietet die neuesten großen Modelle und Werkzeuge, verschiedene Entwicklungsmodi und Frameworks und bietet die bequemste KI-Agenten-Entwicklungsumgebung, von der Entwicklung bis zur Bereitstellung.
- [NNDeploy](https://github.com/NNDeploy/nndeploy) ist ein Workflow-basiertes Multi-Plattform-KI-Bereitstellungstool.
- [Certimate](https://github.com/certimate-go/certimate) ist ein Open-Source-SSL-Zertifikatsverwaltungstool, mit dem Sie SSL-Zertifikate automatisch mit einem visuellen Workflow beantragen und bereitstellen können. Es ist eine der ACME-Client-Optionen, die in der offiziellen Dokumentation von Let's Encrypt aufgeführt sind.

## 📬 Kontaktieren Sie uns

- Probleme: [Probleme](https://github.com/bytedance/flowgram.ai/issues)
- Lark: Scannen Sie den QR-Code unten mit [Register Feishu](https://www.feishu.cn/en/), um unserer FlowGram-Benutzergruppe beizutreten.

<img src="./apps/docs/src/public/lark-group.png" width="200"/>
