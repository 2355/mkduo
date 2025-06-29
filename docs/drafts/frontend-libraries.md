# フロントエンド必要ライブラリ一覧

## コア

- **next**: ^14.1.0 - Reactフレームワーク
- **react**: ^18.2.0 - UIライブラリ
- **react-dom**: ^18.2.0 - ReactのDOM操作
- **typescript**: ^5.4.2 - 型システム（5.3.3から更新、最新安定版）

## スタイリング

- **tailwindcss**: ^3.4.1 - ユーティリティファーストCSSフレームワーク（3.3.0から更新）
- **postcss**: ^8.4.35 - CSSツール（8.4.0から更新）
- **autoprefixer**: ^10.4.17 - ベンダープレフィックス自動追加（10.4.0から更新）
- **@tailwindcss/typography**: ^0.5.10 - 長文コンテンツのスタイリング（0.5.0から更新）
- **@tailwindcss/forms**: ^0.5.7 - フォーム要素のスタイリング（0.5.0から更新）

## 認証

- **next-auth**: ^4.24.5 - 認証ライブラリ（4.24.0から更新）
- **@auth/prisma-adapter**: ^1.0.12 - PrismaをNextAuthで使用するためのアダプター（1.0.0から更新）

## データフェッチとキャッシュ

- **swr**: ^2.2.4 - データフェッチとキャッシュライブラリ（2.2.0から更新）
- **axios**: ^1.6.7 - HTTPクライアント（1.5.0から更新）

## フォーム処理

- **react-hook-form**: ^7.50.1 - フォーム管理（7.45.0から更新）
- **zod**: ^3.22.4 - スキーマバリデーション（3.22.0から更新）

## UI コンポーネント

- **@headlessui/react**: ^1.7.18 - アクセシブルなUIコンポーネント（1.7.0から更新）
- **@heroicons/react**: ^2.1.1 - アイコンセット（2.0.0から更新）
- **framer-motion**: ^11.0.3 - アニメーションライブラリ（10.16.0から更新）
- **react-markdown**: ^9.0.1 - Markdownレンダリング（9.0.0から更新）
- **react-syntax-highlighter**: ^15.5.0 - コードシンタックスハイライト

## データ可視化

- **chart.js**: ^4.4.1 - チャート描画（4.4.0から更新）
- **react-chartjs-2**: ^5.2.0 - Chart.jsのReactラッパー

## ユーティリティ

- **date-fns**: ^3.3.1 - 日付操作（2.30.0から更新）
- **lodash**: ^4.17.21 - 汎用ユーティリティ（4.17.0から更新）
- **nanoid**: ^5.0.4 - ユニークID生成（5.0.0から更新）
- **clsx**: ^2.1.0 - 条件付きクラス名（2.0.0から更新）

## 開発ツール

- **eslint**: ^8.56.0 - コード品質チェック（8.50.0から更新）
- **eslint-config-next**: ^14.1.0 - Next.js用ESLint設定（14.0.0から更新）
- **prettier**: ^3.2.5 - コードフォーマッター（3.0.0から更新）
- **husky**: ^9.0.7 - Gitフック（8.0.0から更新）
- **lint-staged**: ^15.2.0 - ステージングファイルのlint（14.0.0から更新）

## テスト

- **jest**: ^29.7.0 - テストフレームワーク
- **@testing-library/react**: ^14.2.1 - Reactコンポーネントテスト（14.0.0から更新）
- **@testing-library/jest-dom**: ^6.4.2 - DOM検証用カスタムマッチャー（6.1.0から更新）
- **msw**: ^2.1.5 - APIモック（2.0.0から更新）

## 分析とモニタリング

- **@vercel/analytics**: ^1.1.2 - Vercelアナリティクス（1.1.0から更新）
- **@sentry/nextjs**: ^7.101.1 - エラー監視（7.70.0から更新）

## インストールコマンド

```bash
# コア & スタイリング
npm install next@latest react@latest react-dom@latest typescript@latest tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/typography@latest @tailwindcss/forms@latest

# 認証
npm install next-auth@latest @auth/prisma-adapter@latest

# データフェッチとフォーム
npm install swr@latest axios@latest react-hook-form@latest zod@latest

# UI コンポーネント
npm install @headlessui/react@latest @heroicons/react@latest framer-motion@latest react-markdown@latest react-syntax-highlighter@latest

# ユーティリティ
npm install date-fns@latest lodash@latest nanoid@latest clsx@latest

# データ可視化
npm install chart.js@latest react-chartjs-2@latest

# 開発ツール
npm install -D eslint@latest eslint-config-next@latest prettier@latest husky@latest lint-staged@latest

# テスト
npm install -D jest@latest @testing-library/react@latest @testing-library/jest-dom@latest msw@latest

# 分析とモニタリング
npm install @vercel/analytics@latest @sentry/nextjs@latest
```
