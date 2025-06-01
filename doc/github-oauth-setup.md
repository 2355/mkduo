# GitHub OAuthの設定手順

MKDuoアプリケーションでは、ユーザー認証にGitHub OAuthを使用します。これにより、以下のメリットがあります：

- ユーザーは新しいパスワードを覚える必要がない
- パスワード管理のセキュリティリスクを低減
- パスワードリセット機能の実装が不要
- ソーシャルログインによるユーザー体験の向上

以下の手順で設定を行います。

## 1. GitHubアプリケーションの作成

1. [GitHub Developer Settings](https://github.com/settings/developers) にアクセスします。
2. "New OAuth App" をクリックします。
3. アプリケーションの詳細を入力します。
   - **Application name**: MKDuo
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. "Register application" をクリックします。

## 2. クライアントIDとクライアントシークレットの取得

1. 作成したアプリケーションの詳細ページに移動します。
2. **Client ID** と **Client Secret** をメモします。
3. これらの情報を `.env` ファイルに追加します。

```env
GITHUB_ID=your_client_id
GITHUB_SECRET=your_client_secret
```

## 3. NextAuth.js の設定

1. `src/pages/api/auth/[...nextauth].ts` ファイルを作成します。
2. 以下のコードを追加します。

```typescript
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // その他の設定
});
```

## 4. OAuth認証の利点と注意点

### 4.1 利点
- ユーザーはGitHubアカウントで簡単にログインできる
- パスワード管理の負担がない
- セキュリティが向上（多要素認証などのGitHubのセキュリティ機能を活用）
- ユーザー登録フローが簡略化される

### 4.2 注意点
- ユーザーはGitHubアカウントが必要
- GitHubへの依存性が生まれる
- GitHubがダウンしている場合、ログインできなくなる可能性
- GitHubとの連携に関するプライバシーポリシーの考慮が必要

### 4.3 複数プロバイダーの追加
将来的には、Google、Twitter、LinkedInなどの他のOAuthプロバイダーを追加することで、ユーザーの選択肢を増やすことができます。これにより、GitHubアカウントを持たないユーザーもアプリケーションを利用できるようになります。
