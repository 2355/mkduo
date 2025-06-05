# MKDuo 開発環境セットアップガイド

このガイドでは、MKDuo アプリケーションの開発環境を一から設定する手順を詳しく説明します。

## 前提条件

- Git がインストール済み
- Node.js v22.x 以上がインストール済み
- npm v10.x 以上がインストール済み
- GitHub アカウントを持っていること

## 1. GitHub リポジトリ設定

### 1.1 リポジトリの作成

1. GitHub にログイン
2. 右上の「+」アイコン > 「New repository」をクリック
3. リポジトリ名を「mkduo-app」に設定
4. 説明に「TypeScriptとNext.jsを使用した学習プラットフォーム」と入力
5. リポジトリを「Public」に設定
6. 「Add a README file」にチェック
7. .gitignore テンプレートで「Node」を選択
8. ライセンスとして「MIT License」を選択
9. 「Create repository」をクリック

### 1.2 ブランチ保護ルールの設定

1. リポジトリページで「Settings」タブをクリック
2. 左サイドバーから「Branches」を選択
3. 「Branch protection rules」セクションで「Add rule」をクリック
4. 「Branch name pattern」に「main」と入力
5. 「Require a pull request before merging」にチェック
6. 「Require approvals」にチェックし、必要な承認数を「1」に設定
7. 「Save changes」をクリック

### 1.3 コラボレーターの招待

1. リポジトリページで「Settings」タブをクリック
2. 左サイドバーから「Collaborators and teams」を選択
3. 「Add people」をクリックし、チームメンバーのGitHubユーザー名またはメールアドレスを入力
4. 適切な権限レベルを選択し、「Add [ユーザー名]」をクリック

## 2. Next.js プロジェクト設定

### 2.1 プロジェクトの初期化

```bash
# リポジトリをクローン
git clone https://github.com/[ユーザー名またはorg名]/mkduo-app.git
cd mkduo-app

# Next.js プロジェクトを初期化
npx create-next-app@latest .
```

プロンプトで以下のように回答:
- Would you like to use TypeScript? » Yes
- Would you like to use ESLint? » Yes
- Would you like to use Tailwind CSS? » Yes
- Would you like to use `src/` directory? » Yes
- Would you like to use App Router? (recommended) » Yes
- Would you like to customize the default import alias (@/*)? » Yes (そのままEnterで @/* を使用)

### 2.2 追加パッケージのインストール

```bash
# UIコンポーネント、テーマ管理、ユーティリティのインストール
npm install next-themes @headlessui/react @heroicons/react clsx tailwindcss-animate

# 開発ツールのインストール
npm install --save-dev prettier eslint-config-prettier
```

## 3. ESLint と Prettier の設定

### 3.1 Prettier 設定

`.prettierrc` ファイルを作成:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### 3.2 ESLint 設定

`.eslintrc.json` ファイルを以下のように更新:

```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "react/no-unescaped-entities": "off",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "warn"
  }
}
```

### 3.3 VS Code 設定 (オプション)

`.vscode/settings.json` ファイルを作成:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 4. ディレクトリ構造の作成

以下のコマンドで必要なディレクトリ構造を作成します:

```bash
# src 内の基本ディレクトリ作成
mkdir -p src/components/{ui,auth,courses,dashboard}
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/types
mkdir -p prisma
mkdir -p tests
```

## 5. GitHub Actions の設定

`.github/workflows/ci.yml` ファイルを作成:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run test
```

## 6. package.json スクリプトの追加

package.json の scripts セクションに以下を追加:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
  "test": "jest"
}
```

## 7. Git 初期コミット

```bash
git add .
git commit -m "初期プロジェクト設定"
git push origin main
```

## 8. 開発ブランチの作成

```bash
git checkout -b develop
git push -u origin develop
```

これで MKDuo アプリケーションの開発環境セットアップは完了です。次のステップでバックエンドインフラの構築に進みます。
