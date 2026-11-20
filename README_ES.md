![Imagen](https://github.com/user-attachments/assets/4f9dfa0e-e600-4d4e-9e73-c919184f7573)

<div align="center">

[![Licencia](https://img.shields.io/github/license/bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/blob/main/LICENSE) [![@flowgram.ai/editor](https://img.shields.io/npm/dm/%40flowgram.ai%2Fcore)](https://www.npmjs.com/package/@flowgram.ai/editor) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/bytedance/flowgram.ai) [![juejin](https://img.shields.io/badge/juejin-FFFFFF?logo=juejin&logoColor=%23007FFF)](https://juejin.cn/column/7479814468601315362)

[![](https://trendshift.io/api/badge/repositories/13877)](https://trendshift.io/repositories/13877)

</div>

# FlowGram | Marco de desarrollo de flujos de trabajo

[English](README.md) | [中文](README_ZH.md) | [Español](README_ES.md) | [Русский](README_RU.md) | [Português](README_PT.md) | [Deutsch](README_DE.md) | [日本語](README_JA.md)

FlowGram es un marco y conjunto de herramientas de desarrollo de flujos de trabajo componible, visual, fácil de integrar y extensible.
Nuestro objetivo es ayudar a los desarrolladores a crear plataformas de flujo de trabajo de IA de forma **más rápida** y **sencilla**.
FlowGram viene con un conjunto de herramientas integradas para el desarrollo de flujos de trabajo: un lienzo de flujo visual, formularios de configuración de nodos, una cadena de alcance de variables y materiales listos para usar (LLM, Condición, Editor de código, etc.). Los paquetes del marco proporcionan los componentes para crear su propia plataforma de flujos de trabajo; FlowGram Desktop los reúne en un espacio de trabajo nativo para agentes de IA.

Obtenga más información en [FlowGram.AI 🌐](https://flowgram.ai)

## 🖥️ FlowGram Desktop

FlowGram Desktop es un espacio de trabajo nativo para agentes de IA en macOS y Windows. Cree, ejecute, depure y reutilice flujos de trabajo mediante conversaciones y un lienzo visual.

- **Crear:** describa una tarea en el chat y ajuste los nodos, las condiciones, las ramas paralelas, las uniones y los bucles en el lienzo.
- **Depurar:** pruebe nodos individuales, inspeccione entradas y salidas y revise las rutas de ejecución y las instantáneas históricas de los flujos de trabajo.
- **Reutilizar:** publique flujos de trabajo con versiones para clientes HTTP y MCP, o invóquelos desde otros flujos de trabajo.
- **Organizar:** gestione flujos de trabajo y conversaciones por proyecto, importe y exporte proyectos y utilice la interfaz en inglés o chino simplificado con temas claro y oscuro. Seis proyectos de ejemplo de distintos sectores le ayudan a empezar.

<https://github.com/user-attachments/assets/48c0e187-5bd8-40b2-9a96-60d3839db170>

### Descargar Desktop

**macOS — instalar con un solo comando** (Apple Silicon e Intel):

```sh
curl --fail --silent --show-error https://flowgram.ai/desktop/install.sh | sh
```

Ejecute en Terminal para descargar la última versión preliminar, verificar su suma SHA-256 e instalar FlowGram. El script elimina el atributo de cuarentena solo de la aplicación instalada para poder abrir la versión sin firmar. No requiere `sudo`. Para actualizar, cierre FlowGram y ejecute el mismo comando.

[⬇ Última versión preliminar](https://github.com/bytedance/flowgram.ai/releases/tag/desktop-preview)

Elija su plataforma para descargar la última versión preliminar. Estos enlaces permanentes se actualizan automáticamente cuando las compilaciones de las tres plataformas finalizan correctamente.

| Plataforma | Descarga |
| --- | --- |
| macOS · Apple Silicon (ARM64) | [Descargar DMG](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_aarch64-apple-darwin.dmg) |
| macOS · Intel | [Descargar DMG](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_x86_64-apple-darwin.dmg) |
| Windows 10/11 · x64 | [Descargar EXE](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_x86_64-pc-windows-msvc-setup.exe) |

Descargue el instalador directamente, sin iniciar sesión en GitHub. Abra el archivo .dmg en macOS o ejecute el instalador .exe en Windows. Las sumas de verificación y la información de compilación están en la página de la versión. Los instaladores preliminares no están firmados; las versiones de macOS no están notarizadas.

## 🎬 Demostración

<https://github.com/user-attachments/assets/fee87890-ceec-4c07-b659-08afc4dedc26>

Abra en [CodeSandbox 🌐](https://codesandbox.io/p/github/louisyoungx/flowgram-demo/main) o [StackBlitz 🌐](https://stackblitz.com/~/github.com/louisyoungx/flowgram-demo)

En esta demostración, iteramos a través de una lista de ciudades, obtenemos el clima en tiempo real a través de HTTP, analizamos las temperaturas con un nodo de código, generamos sugerencias de atuendos con un LLM, controlamos mediante una condición, agregamos los resultados a lo largo del bucle y, finalmente, usamos un LLM asesor para elegir la ciudad más cómoda antes de enviar el resultado al nodo final.

## 🚀 Inicio rápido

1. Cree un nuevo proyecto de FlowGram:

```sh
npx @flowgram.ai/create-app@latest
```

> Le recomendamos que elija la plantilla `Free Layout Demo ⭐️`.

2. Inicie el proyecto:

```sh
cd demo-free-layout
npm install
npm start
```

3. Abra [http://localhost:3000](http://localhost:3000) en su navegador.

## ✨ Características

| Característica                                                                                 | Descripción                                                                                                                                                                                            | Demostración                                                                                   |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [Lienzo de diseño libre](https://flowgram.ai/examples/free-layout/free-feature-overview.html)  | Lienzo de diseño libre donde los nodos se pueden colocar en cualquier lugar y conectar mediante líneas de forma libre.                                                                                 | ![Demostración de diseño libre](./apps/docs/src/public/free-layout/free-layout-demo.gif)       |
| [Lienzo de diseño fijo](https://flowgram.ai/examples/fixed-layout/fixed-feature-overview.html) | Lienzo de diseño fijo donde los nodos se pueden arrastrar a posiciones específicas, con soporte para nodos compuestos como ramas y bucles.                                                             | ![Demostración de diseño fijo](./apps/docs/src/public/fixed-layout/fixed-layout-demo.gif)      |
| [Formulario](https://flowgram.ai/examples/node-form/basic.html)                                | El motor de formularios gestiona las operaciones CRUD de datos de nodos y proporciona capacidades de renderizado, validación, efectos secundarios, vinculación y captura de errores, simplificando el desarrollo de configuraciones de nodos. | ![Formulario](https://github.com/user-attachments/assets/13e9b4cd-e993-4d21-901c-fb6cf106de78) |
| [Variable](https://flowgram.ai/guide/variable/basic.html)                                      | El motor de variables admite restricciones de ámbito, inspección de estructura de variables e inferencia de tipos, facilitando la gestión del flujo de datos dentro del flujo de trabajo.                                     | ![Variable](https://github.com/user-attachments/assets/442006db-25e3-4fb5-972c-7a0545638ff5)   |


## 📖 Documentación

Puede encontrar la documentación de FlowGram [en el sitio web](https://flowgram.ai).

La documentación se divide en varias secciones:

- [Inicio rápido](https://flowgram.ai/guide/getting-started/introduction.html)
- [Lienzo](https://flowgram.ai/guide/free-layout/load.html)
- [Formulario](https://flowgram.ai/guide/form/form.html)
- [Variable](https://flowgram.ai/guide/variable/basic.html)
- [Material](https://flowgram.ai/materials/introduction.html)
- [Tiempo de ejecución](https://flowgram.ai/guide/runtime/introduction.html)
- [Guías avanzadas](https://flowgram.ai/guide/advanced/zoom-scroll.html)
- [Referencia de la API](https://flowgram.ai/api/index.html)
- [Dónde obtener soporte](https://flowgram.ai/guide/contact-us.html)
- [Guía de contribución](https://flowgram.ai/guide/contributing.html)

## 🙌 Colaboradores

[![Colaboradores de FlowGram.AI](https://contrib.rocks/image?repo=bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/graphs/contributors)

## 🌍 Adopción

- [Coze Studio](https://github.com/coze-dev/coze-studio) es una herramienta de desarrollo de agentes de IA todo en uno. Coze Studio, que proporciona los últimos modelos y herramientas grandes, varios modos y marcos de desarrollo, ofrece el entorno de desarrollo de agentes de IA más conveniente, desde el desarrollo hasta la implementación.
- [NNDeploy](https://github.com/NNDeploy/nndeploy) es una herramienta de implementación de IA multiplataforma basada en flujos de trabajo.
- [Certimate](https://github.com/certimate-go/certimate) es una herramienta de gestión de certificados SSL de código abierto que le ayuda a solicitar e implementar automáticamente certificados SSL con un flujo de trabajo visual. Es una de las opciones de cliente ACME que se enumeran en la documentación oficial de Let's Encrypt.

## 📬 Contáctenos

- Problemas: [Problemas](https://github.com/bytedance/flowgram.ai/issues)
- Lark: Escanee el código QR a continuación con [Registrar Feishu](https://www.feishu.cn/en/) para unirse a nuestro grupo de usuarios de FlowGram.

<img src="./apps/docs/src/public/lark-group.png" width="200"/>
