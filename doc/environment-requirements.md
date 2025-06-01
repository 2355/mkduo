# 開発・実行環境要件

## 基本要件

### Node.js
- **必須バージョン**: v22.0.0 以上
- **推奨バージョン**: v22.1.0 以上
- **理由**: Node.js v22から導入された下記の機能を活用するため
  - パフォーマンス改善（V8エンジンの最適化）
  - ESM関連機能の充実
  - テスト機能の強化
  - WebSocketとHTTP/2のネイティブサポート改善

### npm
- **必須バージョン**: v10.2.0 以上
- **推奨バージョン**: v10.2.4 以上

### TypeScript
- **バージョン**: ^5.4.2 (最新安定版)
- **理由**: 以下の新機能を活用するため
  - 型安全性の向上
  - 複雑な型の推論改善
  - パフォーマンスの最適化

## 開発環境

### メモリ要件
- 最小: 8GB RAM
- 推奨: 16GB RAM以上

### ストレージ
- 最小: 2GB の空き容量（依存関係を含む）
- 推奨: 5GB 以上の空き容量

### OS
- Windows 10/11, macOS 12以降, または主要なLinuxディストリビューション
- WSL2 (Windows Subsystem for Linux 2) も対応

## CI/CD環境

### GitHub Actions
- Node.js v22.x ランタイム
- Ubuntu 最新LTS

### Vercel
- Node.js v22.x ランタイム
- Serverless Functions: Node.js v22.x 対応

## 本番環境

### ランタイム
- Node.js v22.x
- Vercel Edge Functions / Serverless Functions

### データベース
- PostgreSQL 15以上

## Node.js バージョン管理

プロジェクトでは `.nvmrc` ファイルを使用して、Node.jsのバージョンを指定しています：
