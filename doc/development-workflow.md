# 開発環境とワークフロー

## 1. 開発環境のセットアップ手順

### 1.1 前提条件
- Node.js (v18.x以上)
- npm (v8.x以上)
- PostgreSQL (v14以上)
- Git (v2.x以上)

### 1.2 リポジトリのクローンと初期セットアップ
```bash
# リポジトリをクローン
git clone https://github.com/your-organization/mkduo.git
cd mkduo

# 依存関係をインストール
npm install

# 環境変数ファイルを作成
cp .env.example .env.local

# 環境変数を適切に設定
# エディタで.env.localを開き、必要な値を設定

# Prismaクライアントを生成
npx prisma generate

# 開発サーバーを起動
npm run dev
```

### 1.3 並行開発環境
Next.jsフロントエンドとHono APIサーバーを並行して開発するための設定:

```bash
# ターミナル1でフロントエンドを起動
cd mkduo
npm run dev

# ターミナル2でAPIサーバーを起動
cd mkduo/api-server
npm run dev
```

## 2. ブランチ戦略とコミットルール

### 2.1 ブランチ命名規則
- `main`: 本番環境に対応するブランチ
- `develop`: 開発環境のメインブランチ
- 機能ブランチ: `feature/機能名`
- バグ修正: `fix/問題の簡潔な説明`
- リリース準備: `release/バージョン番号`

### 2.2 コミットメッセージ規則
