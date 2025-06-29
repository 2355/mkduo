# バックエンド必要ライブラリ一覧

## コア

- **hono**: ^3.12.8 - 高速ウェブフレームワーク
- **@hono/node-server**: ^1.3.3 - Hono用Node.jsサーバー
- **typescript**: ^5.4.2 - 型システム（5.3.3から更新、最新安定版）

## データベース

- **@prisma/client**: ^5.9.1 - Prismaクライアント（5.5.0から更新）
- **prisma**: ^5.9.1 - データベースORM（開発依存）（5.5.0から更新）

## 認証とセキュリティ

- **@hono/jwt**: ^1.2.0 - JWT認証ミドルウェア（1.1.0から更新）
- **jose**: ^5.2.0 - JWTライブラリ（5.1.0から更新）
- **bcryptjs**: ^2.4.3 - パスワードハッシュ化（必要な場合）（2.4.0から更新）
- **zod**: ^3.22.4 - スキーマバリデーション（3.22.0から更新）

## ミドルウェア

- **@hono/zod-validator**: ^0.1.11 - Zodバリデーションミドルウェア（0.1.8から更新）
- **@hono/cors**: ^1.2.0 - CORSミドルウェア（1.1.0から更新）
- **@hono/logger**: ^1.2.0 - ロギングミドルウェア（1.1.0から更新）
- **@hono/sentry**: ^1.0.1 - Sentryエラーレポーティング（1.0.0から更新）
- **@hono/compress**: ^0.5.1 - 応答圧縮（0.5.0から更新）

## ユーティリティ

- **date-fns**: ^3.3.1 - 日付操作（2.30.0から更新）
- **lodash**: ^4.17.21 - 汎用ユーティリティ（4.17.0から更新）
- **nanoid**: ^5.0.4 - ユニークID生成（5.0.0から更新）
- **dotenv**: ^16.4.1 - 環境変数管理（16.3.0から更新）
- **pino**: ^8.18.0 - ロギング（8.16.0から更新）

## 開発ツール

- **tsx**: ^4.7.0 - TypeScriptファイルの実行（3.14.0から更新）
- **ts-node**: ^10.9.2 - TypeScriptのNode.js実行（10.9.0から更新）
- **nodemon**: ^3.0.3 - ファイル変更の監視と再起動（3.0.0から更新）
- **eslint**: ^8.56.0 - コード品質チェック（8.50.0から更新）
- **prettier**: ^3.2.5 - コードフォーマッター（3.0.0から更新）
- **husky**: ^9.0.7 - Gitフック（8.0.0から更新）
- **lint-staged**: ^15.2.0 - ステージングファイルのlint（14.0.0から更新）

## テスト

- **jest**: ^29.7.0 - テストフレームワーク
- **@types/jest**: ^29.5.12 - Jestの型定義（29.5.0から更新）
- **supertest**: ^6.3.4 - HTTPテスト（6.3.0から更新）
- **@types/supertest**: ^6.0.2 - Supertestの型定義（2.0.0から更新）

## モニタリング

- **@sentry/node**: ^7.101.1 - エラー監視（7.70.0から更新）
- **prom-client**: ^15.1.0 - Prometheusメトリクス（14.2.0から更新）

## インストールコマンド

```bash
# APIサーバーディレクトリの作成と初期化
mkdir -p api-server && cd api-server
npm init -y

# コア
npm install hono@latest @hono/node-server@latest

# データベース
npm install @prisma/client@latest
npm install -D prisma@latest

# 認証とセキュリティ
npm install @hono/jwt@latest jose@latest zod@latest

# ミドルウェア
npm install @hono/zod-validator@latest @hono/cors@latest @hono/logger@latest @hono/sentry@latest @hono/compress@latest

# ユーティリティ
npm install date-fns@latest lodash@latest nanoid@latest dotenv@latest pino@latest

# 開発ツール
npm install -D typescript@latest tsx@latest ts-node@latest nodemon@latest eslint@latest prettier@latest husky@latest lint-staged@latest

# テスト
npm install -D jest@latest @types/jest@latest supertest@latest @types/supertest@latest

# モニタリング
npm install @sentry/node@latest prom-client@latest

# TypeScript設定
npx tsc --init
```

## Prisma初期化コマンド

データベースの初期化とマイグレーションのコマンド:

```bash
# Prisma初期化
npx prisma init

# スキーマ編集後のマイグレーション
npx prisma migrate dev --name init

# クライアント生成
npx prisma generate
```
