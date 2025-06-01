# API エンドポイント設計

## 1. 認証関連

### 1.1 OAuth認証
- **GET /api/auth/signin**: 認証ページへリダイレクト
- **GET /api/auth/callback/:provider**: OAuthコールバック処理
- **GET /api/auth/signout**: ログアウト処理
- **GET /api/auth/session**: 現在のセッション情報取得

## 2. コース関連

### 2.1 コース一覧・詳細
- **GET /api/courses**: 公開されているコース一覧を取得
  - クエリパラメータ: `?limit=10&offset=0&search=typescript`
- **GET /api/courses/:courseId**: 特定のコース詳細を取得

### 2.2 レッスン一覧・詳細
- **GET /api/courses/:courseId/lessons**: コース内のレッスン一覧を取得
- **GET /api/lessons/:lessonId**: 特定のレッスン詳細を取得

### 2.3 問題一覧・詳細
- **GET /api/lessons/:lessonId/questions**: レッスン内の問題一覧を取得
- **GET /api/questions/:questionId**: 特定の問題詳細を取得

## 3. ユーザー進捗関連

### 3.1 回答提出
- **POST /api/questions/:questionId/answer**: 
  - リクエストボディ: `{ answerId: string, timeSpent: number }`
  - レスポンス: `{ isCorrect: boolean, explanation: string, nextQuestion?: { id: string } }`

### 3.2 進捗状況
- **GET /api/user/progress**: ユーザーの全体的な進捗状況を取得
- **GET /api/user/progress/:courseId**: 特定コースの進捗状況を取得
- **POST /api/lessons/:lessonId/complete**: レッスン完了を記録
  - レスポンス: `{ xpEarned: number, achievements: Achievement[], nextLesson?: { id: string } }`

## 4. 復習システム関連

### 4.1 復習リスト
- **GET /api/review/items**: 復習が必要な項目一覧を取得
  - クエリパラメータ: `?filter=all|mistakes|marked&sort=priority|date|course`

### 4.2 復習セッション
- **POST /api/review/sessions**: 新しい復習セッションを作成
  - オプションリクエストボディ: `{ courseId?: string, lessonId?: string }`
- **GET /api/review/sessions/:sessionId**: 特定の復習セッション情報を取得
- **POST /api/review/sessions/:sessionId/complete**: 復習セッションを完了
  - レスポンス: `{ correctCount: number, totalCount: number, improvement: number, nextReviewDate: string }`

### 4.3 復習アイテム
- **POST /api/review/items/:itemId/answer**: 
  - リクエストボディ: `{ answerId: string, timeSpent: number }`

## 5. ソーシャル機能関連

### 5.1 ユーザー情報
- **GET /api/users/:userId**: 特定ユーザーの公開プロフィールを取得
- **GET /api/user/profile**: 自分のプロフィール詳細を取得
- **PUT /api/user/profile**: プロフィール情報を更新

### 5.2 フォロー関連
- **POST /api/users/:userId/follow**: ユーザーをフォロー
- **DELETE /api/users/:userId/follow**: フォローを解除
- **GET /api/user/following**: フォロー中のユーザー一覧を取得
- **GET /api/user/followers**: フォロワー一覧を取得

### 5.3 ランキング
- **GET /api/leaderboards**: グローバルランキングを取得
- **GET /api/leaderboards/:courseId**: コース別ランキングを取得

## 6. 管理者向けAPI

### 6.1 コンテンツ管理
- **POST /api/admin/courses**: 新規コースを作成
- **PUT /api/admin/courses/:courseId**: コースを更新
- **POST /api/admin/lessons**: 新規レッスンを作成
- **PUT /api/admin/lessons/:lessonId**: レッスンを更新
- **POST /api/admin/questions**: 新規問題を作成
- **PUT /api/admin/questions/:questionId**: 問題を更新

### 6.2 公開管理
- **PUT /api/admin/courses/:courseId/publish**: コースの公開状態を変更
- **PUT /api/admin/lessons/:lessonId/publish**: レッスンの公開状態を変更

## 7. レスポンス形式

すべてのAPIエンドポイントは以下の共通形式でレスポンスを返します：

### 成功時
```json
{
  "status": "success",
  "data": {
    // レスポンスデータ
  }
}
```

### エラー時
```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ"
  }
}
```

## 8. エラーコード一覧

- `UNAUTHORIZED`: 認証が必要
- `FORBIDDEN`: 権限がない
- `NOT_FOUND`: リソースが見つからない
- `VALIDATION_ERROR`: リクエストデータが不正
- `INTERNAL_ERROR`: サーバー内部エラー
