![画像](https://github.com/user-attachments/assets/4f9dfa0e-e600-4d4e-9e73-c919184f7573)

<div align="center">

[![ライセンス](https://img.shields.io/github/license/bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/blob/main/LICENSE) [![@flowgram.ai/editor](https://img.shields.io/npm/dm/%40flowgram.ai%2Fcore)](https://www.npmjs.com/package/@flowgram.ai/editor) [![DeepWikiに聞く](https://deepwiki.com/badge.svg)](https://deepwiki.com/bytedance/flowgram.ai) [![juejin](https://img.shields.io/badge/juejin-FFFFFF?logo=juejin&logoColor=%23007FFF)](https://juejin.cn/column/7479814468601315362)

[![](https://trendshift.io/api/badge/repositories/13877)](https://trendshift.io/repositories/13877)

</div>

# FlowGram｜ワークフロー開発フレームワーク

[English](README.md) | [中文](README_ZH.md) | [Español](README_ES.md) | [Русский](README_RU.md) | [Português](README_PT.md) | [Deutsch](README_DE.md) | [日本語](README_JA.md)

FlowGramは、構成可能で、視覚的で、統合しやすく、拡張可能なワークフロー開発フレームワーク＆ツールキットです。
私たちの目標は、開発者がAIワークフロープラットフォームを**より速く**、**よりシンプルに**構築できるよう支援することです。
FlowGramには、ワークフロー開発用の組み込みツール一式が付属しています。視覚的なフローキャンバス、ノード構成フォーム、変数スコープチェーン、すぐに使えるマテリアル（LLM、条件、コードエディターなど）です。フレームワークの各パッケージは独自のワークフロープラットフォームを構築するための基盤を提供し、FlowGram DesktopはそれらをネイティブのAIエージェント用ワークスペースに統合します。

詳細は[FlowGram.AI 🌐](https://flowgram.ai)をご覧ください。

## 🖥️ FlowGram Desktop

FlowGram Desktopは、macOSとWindows向けのネイティブなAIエージェント用ワークスペースです。対話とビジュアルキャンバスを使って、ワークフローの構築、実行、デバッグ、再利用を行えます。

- **構築：** チャットでタスクを説明し、キャンバス上でノード、条件、並列分岐、合流、ループを調整できます。
- **デバッグ：** 個別のノードをテストし、入出力を確認して、実行経路や過去のワークフローのスナップショットを振り返れます。
- **再利用：** バージョン管理されたワークフローを公開してHTTPやMCP経由で呼び出したり、別のワークフローから利用したりできます。
- **管理：** プロジェクトごとにワークフローとチャットを整理し、プロジェクトをインポート・エクスポートできます。UIは英語と簡体字中国語に対応し、ライト・ダークテーマを選べます。6つの業界別サンプルプロジェクトで始められます。

<https://github.com/user-attachments/assets/48c0e187-5bd8-40b2-9a96-60d3839db170>

### Desktopをダウンロード

**macOS — コマンド1つでインストール**（Apple Silicon / Intel対応）：

```sh
curl --fail --silent --show-error https://flowgram.ai/desktop/install.sh | sh
```

ターミナルで実行すると、最新のプレビュー版をダウンロードし、SHA-256を検証してFlowGramをインストールします。未署名のプレビュー版を開けるように、インストールしたアプリだけの隔離属性を削除します。`sudo`は不要です。更新する場合はFlowGramを終了してから同じコマンドを実行してください。

[⬇ 最新のプレビュー版](https://github.com/bytedance/flowgram.ai/releases/tag/desktop-preview)

プラットフォームを選んで最新のプレビュー版をダウンロードできます。3つのプラットフォームのビルドがすべて成功すると自動更新され、ダウンロードURLは変わりません。

| プラットフォーム | ダウンロード |
| --- | --- |
| macOS · Apple Silicon (ARM64) | [ダウンロード DMG](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_aarch64-apple-darwin.dmg) |
| macOS · Intel | [ダウンロード DMG](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_x86_64-apple-darwin.dmg) |
| Windows 10/11 · x64 | [ダウンロード EXE](https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview/FlowGram_x86_64-pc-windows-msvc-setup.exe) |

GitHubへのログインなしでインストーラーを直接ダウンロードできます。macOSでは.dmgを開き、Windowsではインストーラー.exeを実行してください。チェックサムとビルド情報はリリースページで確認できます。プレビュー版は未署名で、macOS版は公証されていません。

## 🎬 デモ

<https://github.com/user-attachments/assets/fee87890-ceec-4c07-b659-08afc4dedc26>

[CodeSandbox 🌐](https://codesandbox.io/p/github/louisyoungx/flowgram-demo/main)または[StackBlitz 🌐](https://stackblitz.com/~/github.com/louisyoungx/flowgram-demo)で開く

このデモでは、都市のリストを反復処理し、HTTP経由でリアルタイムの天気を取得し、コードノードで気温を解析し、LLMで服装の提案を生成し、条件でゲートし、ループ全体で結果を集計し、最後にアドバイザーLLMを使用して最も快適な都市を選択してから、結果を終了ノードに送信します。

## 🚀 クイックスタート

1. 新しいFlowGramプロジェクトを作成します:

```sh
npx @flowgram.ai/create-app@latest
```

> `Free Layout Demo ⭐️` テンプレートを選択することをお勧めします。

2. プロジェクトを開始します:

```sh
cd demo-free-layout
npm install
npm start
```

3. ブラウザで[http://localhost:3000](http://localhost:3000)を開きます。

## ✨ 機能

| 機能                                                                                              | 説明                                                                                                                                        | デモ                                                                                         |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [フリーレイアウトキャンバス](https://flowgram.ai/examples/free-layout/free-feature-overview.html) | ノードをどこにでも配置し、自由形式の線で接続できるフリーレイアウトキャンバス。                                                              | ![フリーレイアウトデモ](./apps/docs/src/public/free-layout/free-layout-demo.gif)             |
| [固定レイアウトキャンバス](https://flowgram.ai/examples/fixed-layout/fixed-feature-overview.html) | 分岐やループなどの複合ノードをサポートし、ノードを指定した位置にドラッグできる固定レイアウトキャンバス。                                    | ![固定レイアウトデモ](./apps/docs/src/public/fixed-layout/fixed-layout-demo.gif)             |
| [フォーム](https://flowgram.ai/examples/node-form/basic.html)                                     | フォームエンジンはノードデータのCRUD操作を管理し、レンダリング、検証、副作用、連動、エラー処理機能を提供し、ノード設定の開発を簡素化します。 | ![フォーム](https://github.com/user-attachments/assets/13e9b4cd-e993-4d21-901c-fb6cf106de78) |
| [変数](https://flowgram.ai/guide/variable/basic.html)                                             | 変数エンジンはスコープ制約、変数構造検査、型推論をサポートし、ワークフロー内のデータフローの管理を容易にします。            | ![変数](https://github.com/user-attachments/assets/442006db-25e3-4fb5-972c-7a0545638ff5)     |


## 📖 ドキュメント

FlowGramのドキュメントは[ウェブサイト](https://flowgram.ai)でご覧いただけます。

ドキュメントはいくつかのセクションに分かれています。

- [クイックスタート](https://flowgram.ai/guide/getting-started/introduction.html)
- [キャンバス](https://flowgram.ai/guide/free-layout/load.html)
- [フォーム](https://flowgram.ai/guide/form/form.html)
- [変数](https://flowgram.ai/guide/variable/basic.html)
- [マテリアル](https://flowgram.ai/materials/introduction.html)
- [ランタイム](https://flowgram.ai/guide/runtime/introduction.html)
- [高度なガイド](https://flowgram.ai/guide/advanced/zoom-scroll.html)
- [APIリファレンス](https://flowgram.ai/api/index.html)
- [サポートの入手先](https://flowgram.ai/guide/contact-us.html)
- [貢献ガイド](https://flowgram.ai/guide/contributing.html)

## 🙌 貢献者

[![FlowGram.AI貢献者](https://contrib.rocks/image?repo=bytedance/flowgram.ai)](https://github.com/bytedance/flowgram.ai/graphs/contributors)

## 🌍 採用

- [Coze Studio](https://github.com/coze-dev/coze-studio)は、オールインワンのAIエージェント開発ツールです。最新の主要モデルとツール、さまざまな開発モードとフレームワークを提供するCoze Studioは、開発から展開まで、最も便利なAIエージェント開発環境を提供します。
- [NNDeploy](https://github.com/NNDeploy/nndeploy)は、ワークフローベースのマルチプラットフォームAI展開ツールです。
- [Certimate](https://github.com/certimate-go/certimate)は、視覚的なワークフローでSSL証明書を自動的に申請および展開するのに役立つオープンソースのSSL証明書管理ツールです。これは、Let's Encryptの公式ドキュメントに記載されているACMEクライアントオプションの1つです。

## 📬 お問い合わせ

- 問題：[問題](https://github.com/bytedance/flowgram.ai/issues)
- Lark：[Register Feishu](https://www.feishu.cn/en/)で以下のQRコードをスキャンして、FlowGramユーザーグループに参加してください。

<img src="./apps/docs/src/public/lark-group.png" width="200"/>
