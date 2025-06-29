## 機能

- プログラミング関連の学習を行うアプリ
- 問題は4択形式

## 画面一覧

- ログイン画面
- ダッシュボード画面
- コース一覧画面
- レッスン選択画面
- 問題画面
- レッスン終了画面

### ログイン画面

- GitHub OAuthを使用したログイン
- 表示要素
  - 「GitHubでログイン」ボタン

### ダッシュボード画面

- あらゆる画面へのハブ
- 表示要素
  - ユーザー名
    - プロフィール画像
    - 学習進捗（完了したコース数、レッスン数）
    - コース一覧画面へのリンク
    - クイックレッスンボタン
      - コースを選ばずに前回の続きからレッスンを開始
    - レッスン選択へのリンク
    - 学習状況サマリ
      - 連続学習日数
      - 総学習時間

### コース一覧画面

- 学習対象のコースを選択する
  - TypeScript, Kotlin, HTTP, セキュリティなど
- 表示要素
  - コース名
  - 完了率

### レッスン選択画面

- 選択したコースのレッスン一覧を表示
  - 変数と基本型
  - 配列とタプル
  - ...
- 1レッスンは5分程度で完了できる問題数で構成される
- 表示要素
  - レッスン名
  - 完了率

### 問題画面

- 選択したレッスンの問題に回答する画面
  - 4択形式の問題
  - 回答すると解説を表示
- 表示要素
  - 問題文
  - 選択肢（4択）
  - 回答ボタン
  - 回答後の解説
  - レッスン中止ボタン
    - レッスンを中止してダッシュボードに戻る
    - 進捗率は 0 に戻る

### レッスン終了画面

- レッスンが完了したことを表現する画面
- 表示要素
  - 「レッスンコンプリート！🎉」文言
  - result（正解率、回答時間）
  - 次のレッスンに進むボタン
  - ダッシュボードに戻るボタン

## データ設計

### ユーザー

- id: string (プライマリキー)
- githubId: string (GitHub OAuth ID)
- username: string (GitHub ユーザー名)
- displayName: string (表示名)
- profileImageUrl: string (プロフィール画像URL)
- email: string
- createdAt: DateTime
- updatedAt: DateTime
- 学習統計
  - totalStudyTime: number (総学習時間・分)
  - consecutiveStudyDays: number (連続学習日数)
  - completedCourses: number (完了コース数)
  - completedLessons: number (完了レッスン数)
  - lastStudyDate: DateTime (最終学習日)

### コース

- id: string (プライマリキー)
- title: string (コース名)
- description: string (コース説明)
- difficulty: string (難易度: beginner, intermediate, advanced)
- estimatedHours: number (推定学習時間)
- order: number (表示順序)
- isActive: boolean (公開状態)
- createdAt: DateTime
- updatedAt: DateTime

### レッスン

- id: string (プライマリキー)
- courseId: string (外部キー: Course.id)
- title: string (レッスン名)
- description: string (レッスン説明)
- order: number (コース内での順序)
- estimatedMinutes: number (推定学習時間・分)
- isActive: boolean (公開状態)
- createdAt: DateTime
- updatedAt: DateTime

### 問題

- id: string (プライマリキー)
- lessonId: string (外部キー: Lesson.id)
- questionText: string (問題文)
- options: string[] (選択肢配列・4択)
- correctAnswer: number (正解のインデックス: 0-3)
- explanation: string (解説文)
- order: number (レッスン内での順序)
- difficulty: string (問題の難易度)
- createdAt: DateTime
- updatedAt: DateTime

### ユーザー進捗 (UserProgress)

- id: string (プライマリキー)
- userId: string (外部キー: User.id)
- courseId: string (外部キー: Course.id)
- completedLessons: number (完了レッスン数)
- totalLessons: number (総レッスン数)
- completionRate: number (完了率: 0-100)
- lastLessonId: string (最後に学習したレッスンID)
- createdAt: DateTime
- updatedAt: DateTime

### レッスン結果 (LessonResult)

- id: string (プライマリキー)
- userId: string (外部キー: User.id)
- lessonId: string (外部キー: Lesson.id)
- score: number (正解率: 0-100)
- totalQuestions: number (総問題数)
- correctAnswers: number (正解数)
- timeSpent: number (回答時間・秒)
- completedAt: DateTime
- answers: AnswerRecord[] (回答記録)

### 回答記録 (AnswerRecord)

- questionId: string (問題ID)
- selectedAnswer: number (選択した回答のインデックス)
- isCorrect: boolean (正解かどうか)
- timeSpent: number (この問題にかけた時間・秒)
