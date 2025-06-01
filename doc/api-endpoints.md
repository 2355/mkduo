# API エンドポイント設計（Hono）

## 1. APIサーバー構成

### 1.1 ベースURL
- 開発環境: `http://localhost:3001/api`
- 本番環境: `https://api.mkduo.example.com/api`

### 1.2 Honoルーター構成
```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { jwt } from 'hono/jwt';

const app = new Hono();

// グローバルミドルウェア
app.use('*', logger());
app.use('/api/*', cors());
app.use('/api/*', async (c, next) => {
  try {
    await next();
  } catch (error) {
    // エラーハンドリング
    return c.json({ 
      status: 'error',
      error: {
        code: error.code || 'INTERNAL_ERROR',
        message: error.message || 'サーバーエラーが発生しました'
      } 
    }, error.status || 500);
  }
});

// 認証ミドルウェア（保護されたルート用）
const auth = jwt({
  secret: process.env.JWT_SECRET
});

// 認証ルーター
const authRouter = new Hono();
app.route('/api/auth', authRouter);

// コースルーター
const coursesRouter = new Hono();
app.route('/api/courses', coursesRouter);

// レッスンルーター
const lessonsRouter = new Hono();
app.route('/api/lessons', lessonsRouter);

// ユーザー関連ルーター
const userRouter = new Hono();
app.route('/api/user', userRouter);

// ...他のルーター
```

## 2. 認証関連

### 2.1 OAuth認証
- **GET /api/auth/signin**: 認証ページへリダイレクト
- **GET /api/auth/callback/:provider**: OAuthコールバック処理
- **GET /api/auth/signout**: ログアウト処理
- **GET /api/auth/session**: 現在のセッション情報取得

```typescript
// 認証ルーターの実装例
authRouter.get('/signin', async (c) => {
  // サインインページへリダイレクト
});

authRouter.get('/callback/:provider', async (c) => {
  const provider = c.req.param('provider');
  // プロバイダーに応じたコールバック処理
});

authRouter.get('/signout', async (c) => {
  // ログアウト処理
});

authRouter.get('/session', async (c) => {
  // セッション情報を返す
});
```

## 3. コース関連

### 3.1 コース一覧・詳細
- **GET /api/courses**: 公開されているコース一覧を取得
  - クエリパラメータ: `?limit=10&offset=0&search=typescript`
- **GET /api/courses/:courseId**: 特定のコース詳細を取得

```typescript
// コースルーターの実装例
coursesRouter.get('/', async (c) => {
  const limit = parseInt(c.req.query('limit') || '10');
  const offset = parseInt(c.req.query('offset') || '0');
  const search = c.req.query('search');
  
  // コース一覧を取得
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
      ...(search ? { name: { contains: search } } : {})
    },
    take: limit,
    skip: offset
  });
  
  return c.json({ status: 'success', data: courses });
});

coursesRouter.get('/:courseId', async (c) => {
  const courseId = c.req.param('courseId');
  
  // コース詳細を取得
  const course = await prisma.course.findUnique({
    where: { id: courseId, isPublished: true }
  });
  
  if (!course) {
    return c.json({ status: 'error', error: { code: 'NOT_FOUND', message: 'コースが見つかりません' } }, 404);
  }
  
  return c.json({ status: 'success', data: course });
});
```

## 4. ユーザー進捗関連

### 4.1 回答提出
- **POST /api/questions/:questionId/answer**: 
  - リクエストボディ: `{ answerId: string, timeSpent: number }`
  - レスポンス: `{ isCorrect: boolean, explanation: string, nextQuestion?: { id: string } }`

### 4.2 進捗状況
- **GET /api/user/progress**: ユーザーの全体的な進捗状況を取得
- **GET /api/user/progress/:courseId**: 特定コースの進捗状況を取得
- **POST /api/lessons/:lessonId/complete**: レッスン完了を記録
  - レスポンス: `{ xpEarned: number, achievements: Achievement[], nextLesson?: { id: string } }`

## 5. 復習システム関連

### 5.1 復習リスト
- **GET /api/review/items**: 復習が必要な項目一覧を取得
  - クエリパラメータ: `?filter=all|mistakes|marked&sort=priority|date|course`

### 5.2 復習セッション
- **POST /api/review/sessions**: 新しい復習セッションを作成
  - オプションリクエストボディ: `{ courseId?: string, lessonId?: string }`
- **GET /api/review/sessions/:sessionId**: 特定の復習セッション情報を取得
- **POST /api/review/sessions/:sessionId/complete**: 復習セッションを完了
  - レスポンス: `{ correctCount: number, totalCount: number, improvement: number, nextReviewDate: string }`

### 5.3 復習アイテム
- **POST /api/review/items/:itemId/answer**: 
  - リクエストボディ: `{ answerId: string, timeSpent: number }`

## 6. ソーシャル機能関連

### 6.1 ユーザー情報
- **GET /api/users/:userId**: 特定ユーザーの公開プロフィールを取得
- **GET /api/user/profile**: 自分のプロフィール詳細を取得
- **PUT /api/user/profile**: プロフィール情報を更新

### 6.2 フォロー関連
- **POST /api/users/:userId/follow**: ユーザーをフォロー
- **DELETE /api/users/:userId/follow**: フォローを解除
- **GET /api/user/following**: フォロー中のユーザー一覧を取得
- **GET /api/user/followers**: フォロワー一覧を取得

### 6.3 ランキング
- **GET /api/leaderboards**: グローバルランキングを取得
- **GET /api/leaderboards/:courseId**: コース別ランキングを取得

## 7. 管理者向けAPI

### 7.1 コンテンツ管理
- **POST /api/admin/courses**: 新規コースを作成
- **PUT /api/admin/courses/:courseId**: コースを更新
- **POST /api/admin/lessons**: 新規レッスンを作成
- **PUT /api/admin/lessons/:lessonId**: レッスンを更新
- **POST /api/admin/questions**: 新規問題を作成
- **PUT /api/admin/questions/:questionId**: 問題を更新

### 7.2 公開管理
- **PUT /api/admin/courses/:courseId/publish**: コースの公開状態を変更
- **PUT /api/admin/lessons/:lessonId/publish**: レッスンの公開状態を変更

## 8. エラー処理とレスポンス形式

Honoではミドルウェアを使用して一貫したエラー処理とレスポンス形式を実装します：

```typescript
// グローバルエラーハンドラミドルウェア
app.use('*', async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    
    // エラータイプに基づいて適切なレスポンスを作成
    if (error instanceof ValidationError) {
      return c.json({
        status: 'error',
        error: {
          code: 'VALIDATION_ERROR',
          message: 'データが不正です',
          details: process.env.NODE_ENV === 'development' ? error.details : undefined
        }
      }, 400);
    }
    
    if (error instanceof UnauthorizedError) {
      return c.json({
        status: 'error',
        error: {
          code: 'UNAUTHORIZED',
          message: '認証が必要です'
        }
      }, 401);
    }
    
    // デフォルトエラーレスポンス
    return c.json({
      status: 'error',
      error: {
        code: 'INTERNAL_ERROR',
        message: 'サーバーエラーが発生しました',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }
    }, 500);
  }
});

// 成功レスポンス用のヘルパー関数
function successResponse(data) {
  return {
    status: 'success',
    data
  };
}
```
