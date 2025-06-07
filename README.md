# 神林 論文読み履歴

論文を読んだ記録とメモを管理するAstroベースのブログサイトです。

## 概要

このプロジェクトは、論文の読書記録を効率的に管理し、美しいUIで表示するためのWebアプリケーションです。AstroフレームワークとMarkdownを使用して、静的サイト生成を行います。

## 特徴

- 📚 論文のMarkdownファイルベース管理
- 🎨 ダークテーマの美しいUI
- 📱 完全レスポンシブデザイン
- ⚡ 高速な静的サイト生成
- 🔍 論文の検索とフィルタリング機能

## 技術スタック

- **フレームワーク**: Astro 5.x
- **スタイリング**: CSS (スコープドCSS + Override CSS)
- **コンテンツ管理**: Markdown + Astro Content Collections
- **デプロイ**: Vercel
- **言語**: TypeScript

## インストールと起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build
```

## 重要: responsive-override.css の必要性

### ⚠️ 削除禁止ファイル

`src/styles/responsive-override.css` ファイルは **絶対に削除しないでください**。

### なぜresponsive-override.cssが必要なのか

1. **AstroのスコープドCSSの制限対応**
   - AstroのスコープドCSS（`:global()`）では、Markdownコンテンツの深いネスト要素に対するレスポンシブフォントサイズが適用されない場合がある
   - 特に複雑なMarkdown構造（リスト内のコード、テーブル内のリンクなど）で問題が発生

2. **確実なレスポンシブ対応**
   - モバイルデバイスでの可読性を保証
   - 768px、480px、360px の各ブレークポイントで適切なフォントサイズを強制適用
   - ユーザビリティの向上

3. **CSS特異性の問題解決**
   - 外部ライブラリやブラウザデフォルトスタイルによる上書きを防止
   - `!important` 宣言による強制適用
   - 複数レベルの特異性による確実な適用

### 適用されるフォントサイズ

| 画面サイズ | 基本フォント | 見出し(H2) | コード | 備考 |
|-----------|-------------|-----------|--------|------|
| デスクトップ | 1rem | 1.75rem | 0.9rem | 基本サイズ |
| タブレット(1024px以下) | 1.05rem | 1.6rem | 0.9rem | 若干拡大 |
| モバイル(768px以下) | 0.9rem | 1.2rem | 0.85rem | 読みやすさ重視 |
| 小型モバイル(480px以下) | 0.85rem | 1.1rem | 0.8rem | コンパクト |
| 極小モバイル(360px以下) | 0.8rem | 1rem | 0.75rem | 最小限 |

### ファイル構成と役割

```
src/
├── pages/papers/[slug].astro     # メインのレスポンシブCSS
├── styles/responsive-override.css # バックアップ・強制適用CSS
└── layouts/Layout.astro          # override.cssの読み込み
```

### トラブルシューティング

もしレスポンシブフォントが動作しない場合：

1. `responsive-override.css` が存在することを確認
2. `Layout.astro` で正しく読み込まれていることを確認
3. ブラウザのキャッシュをクリア
4. 開発サーバーを再起動

```bash
# 開発サーバー再起動
npm run dev
```

## プロジェクト構造

```
src/
├── components/
│   └── PaperCardMD.astro        # 論文カードコンポーネント
├── content/
│   ├── config.ts                # コンテンツ設定
│   └── papers/                  # 論文Markdownファイル
├── layouts/
│   └── Layout.astro             # 基本レイアウト
├── pages/
│   ├── index.astro              # トップページ
│   └── papers/[slug].astro      # 論文詳細ページ
├── styles/
│   └── responsive-override.css  # 重要: レスポンシブ強制CSS
├── types/
│   └── paper.ts                 # 型定義
└── utils/
    ├── date.ts                  # 日付ユーティリティ
    └── paper.ts                 # 論文ユーティリティ
```

## 論文の追加方法

1. `src/content/papers/` ディレクトリに新しい `.md` ファイルを作成
2. フロントマターに必要な情報を記載：

```markdown
---
title: "論文タイトル"
date: 2024-01-01
---

# 論文の内容

ここに論文のメモや要約を記載...
```

## デプロイ

### Vercelでの自動デプロイ

Vercelが自動実行するコマンド:

```bash
npm install
npm run build
# distフォルダを自動デプロイ
```

### 手動デプロイ

```bash
# 本番ビルド
npm run build

# プレビュー
npm run preview
```

## 開発時の注意事項

1. **CSS編集時**: `[slug].astro` と `responsive-override.css` の両方を確認
2. **レスポンシブテスト**: 必ず複数のデバイスサイズでテスト
3. **Markdownテスト**: 複雑な構造（ネストしたリスト、テーブルなど）でのフォント表示を確認

## ライセンス

このプロジェクトは個人用です。

## 問い合わせ

技術的な問題や改善提案がある場合は、Issues にてお知らせください。