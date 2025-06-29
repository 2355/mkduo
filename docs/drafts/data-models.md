# MKDuo アプリケーション データモデル設計

## 1. 概要

MKDuoアプリケーションでは、以下の主要エンティティを中心にデータ構造を設計します。データベースにはPrismaとPostgreSQLを使用し、効率的なクエリと拡張性を確保します。

## 2. 主要エンティティとリレーション

### 2.1 User（ユーザー）

ユーザーアカウント情報を管理します。

```prisma
model User {
  id            String       @id @default(cuid())
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  email         String       @unique
  name          String
  username      String       @unique
  avatar        String?      // アバター画像のURL
  bio           String?      // 自己紹介
  level         Int          @default(1)
  totalXP       Int          @default(0)
  
  // OAuth関連
  githubId      String?      @unique
  googleId      String?      @unique
  twitterId     String?      @unique
  
  // リレーション
  userProgress    UserProgress[]
  achievements    UserAchievement[]
  streaks         Streak[]
  followedBy      UserFollowing[]    @relation("following")
  following       UserFollowing[]    @relation("follower")
  expertiseAreas  UserExpertise[]
  rankings        UserRanking[]
  reviewSessions  ReviewSession[]
}
```

### 2.2 Course（コース）

技術分野や知識領域を表します。

```prisma
model Course {
  id            String     @id @default(cuid())
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  name          String
  description   String
  imageUrl      String?    // コースのサムネイル画像
  difficulty    String     // "beginner", "intermediate", "advanced"
  estimatedTime Int        // 完了までの推定時間（分）
  isPublished   Boolean    @default(false)
  
  // リレーション
  lessons       Lesson[]
  userProgress  UserProgress[]
  achievements  Achievement[]
  userRankings  UserRanking[]
  expertiseAreas UserExpertise[]
  prerequisites CoursePrerequisite[] @relation("prerequisite")
  followups     CoursePrerequisite[] @relation("followup")
}
```

### 2.3 Lesson（レッスン）

コース内の特定トピックに関する学習単位です。

```prisma
model Lesson {
  id            String     @id @default(cuid())
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  courseId      String
  name          String
  description   String
  order         Int        // コース内での並び順
  estimatedTime Int        // 完了までの推定時間（分）
  xpReward      Int        // 完了時に獲得できるXP
  isPublished   Boolean    @default(false)
  
  // リレーション
  course        Course     @relation(fields: [courseId], references: [id])
  questions     Question[]
  userProgress  UserProgress[]
}
```

### 2.4 Question（問題）

各レッスン内の学習アクティビティです。

```prisma
model Question {
  id            String      @id @default(cuid())
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  lessonId      String
  content       String      // 問題文
  codeSnippet   String?     // コードスニペット（表示用）
  explanation   String      // 解説文
  difficulty    String      // "easy", "medium", "hard"
  order         Int         // レッスン内での並び順
  
  // リレーション
  lesson        Lesson      @relation(fields: [lessonId], references: [id])
  answers       Answer[]
  userAnswers   UserAnswer[]
  reviewItems   ReviewItem[]
}
```

### 2.5 Answer（回答選択肢）

問題の選択肢を表します。

```prisma
model Answer {
  id            String     @id @default(cuid())
  questionId    String
  content       String     // 選択肢の内容
  isCorrect     Boolean    // 正解か否か
  explanation   String?    // この選択肢を選んだ場合の補足説明
  
  // リレーション
  question      Question   @relation(fields: [questionId], references: [id])
  userAnswers   UserAnswer[]
}
```

### 2.6 UserProgress（ユーザー進捗）

ユーザーのコース・レッスン進捗状況を管理します。

```prisma
model UserProgress {
  id            String     @id @default(cuid())
  userId        String
  courseId      String
  lessonId      String?
  startedAt     DateTime   @default(now())
  completedAt   DateTime?
  xpEarned      Int        @default(0)
  
  // リレーション
  user          User       @relation(fields: [userId], references: [id])
  course        Course     @relation(fields: [courseId], references: [id])
  lesson        Lesson?    @relation(fields: [lessonId], references: [id])
}
```

### 2.7 UserAnswer（ユーザー回答）

ユーザーの回答履歴を保存します。

```prisma
model UserAnswer {
  id            String     @id @default(cuid())
  userId        String
  questionId    String
  answerId      String
  attemptedAt   DateTime   @default(now())
  timeSpent     Int        // 回答にかかった時間（秒）
  isCorrect     Boolean    // 回答が正解かどうか
  reviewStatus  String     @default("none") // "none", "marked", "reviewed"
  reviewedAt    DateTime?  // 復習した日時
  
  // リレーション
  user          User       @relation(fields: [userId], references: [id])
  question      Question   @relation(fields: [questionId], references: [id])
  answer        Answer     @relation(fields: [answerId], references: [id])
}
```

### 2.8 Achievement（バッジ・実績）

獲得可能なバッジや実績を表します。

```prisma
model Achievement {
  id            String     @id @default(cuid())
  name          String
  description   String
  imageUrl      String     // バッジの画像URL
  type          String     // "course_completion", "streak", "special" など
  courseId      String?    // コース関連のバッジの場合
  requirements  String     // 獲得条件の説明
  xpReward      Int        // 獲得時に得られるXP
  
  // リレーション
  course        Course?    @relation(fields: [courseId], references: [id])
  userAchievements UserAchievement[]
}
```

### 2.9 UserAchievement（ユーザーバッジ獲得）

ユーザーのバッジ獲得状況を表します。

```prisma
model UserAchievement {
  id            String     @id @default(cuid())
  userId        String
  achievementId String
  earnedAt      DateTime   @default(now())
  
  // リレーション
  user          User       @relation(fields: [userId], references: [id])
  achievement   Achievement @relation(fields: [achievementId], references: [id])
  
  @@unique([userId, achievementId])
}
```

### 2.10 Streak（学習ストリーク）

連続学習日数を管理します。

```prisma
model Streak {
  id            String     @id @default(cuid())
  userId        String
  date          DateTime   @default(now())
  count         Int        @default(1)  // 現在の連続日数
  
  // リレーション
  user          User       @relation(fields: [userId], references: [id])
}
```

### 2.11 UserFollowing（ユーザーフォロー関係）

ユーザー間のフォロー関係を表します。

```prisma
model UserFollowing {
  id            String     @id @default(cuid())
  followerId    String     // フォローしているユーザー
  followingId   String     // フォローされているユーザー
  createdAt     DateTime   @default(now())
  
  // リレーション
  follower      User       @relation("follower", fields: [followerId], references: [id])
  following     User       @relation("following", fields: [followingId], references: [id])
  
  @@unique([followerId, followingId])
}
```

### 2.12 UserRanking（ユーザーランキング）

特定コースやカテゴリでのユーザーランキングを表します。

```prisma
model UserRanking {
  id            String     @id @default(cuid())
  userId        String
  courseId      String
  score         Int
  rank          Int
  updatedAt     DateTime   @updatedAt
  
  // リレーション
  user          User       @relation(fields: [userId], references: [id])
  course        Course     @relation(fields: [courseId], references: [id])
  
  @@unique([userId, courseId])
}
```

### 2.13 UserExpertise（ユーザー専門分野）

ユーザーの専門分野やスキルレベルを表します。

```prisma
model UserExpertise {
  id            String     @id @default(cuid())
  userId        String
  courseId      String
  level         Int        // 1-10の専門度
  endorsements  Int        @default(0)  // 他ユーザーからの承認数
  
  // リレーション
  user          User       @relation(fields: [userId], references: [id])
  course        Course     @relation(fields: [courseId], references: [id])
  
  @@unique([userId, courseId])
}
```

### 2.14 CoursePrerequisite（コース前提条件）

コース間の前提関係を表します（スキルツリー用）。

```prisma
model CoursePrerequisite {
  id               String  @id @default(cuid())
  courseId         String  // このコースを学ぶための
  prerequisiteId   String  // 前提となるコース
  
  // リレーション
  course           Course  @relation("followup", fields: [courseId], references: [id])
  prerequisite     Course  @relation("prerequisite", fields: [prerequisiteId], references: [id])
  
  @@unique([courseId, prerequisiteId])
}
```

### 2.15 ReviewSession（復習セッション）

ユーザーの復習セッションを管理します。

```prisma
model ReviewSession {
  id            String     @id @default(cuid())
  userId        String
  createdAt     DateTime   @default(now())
  completedAt   DateTime?
  
  // リレーション
  user          User       @relation(fields: [userId], references: [id])
  reviewItems   ReviewItem[]
}
```

### 2.16 ReviewItem（復習アイテム）

復習セッション内の個別の問題を管理します。

```prisma
model ReviewItem {
  id               String     @id @default(cuid())
  reviewSessionId  String
  questionId       String
  status           String     @default("pending") // "pending", "skipped", "completed"
  answeredCorrectly Boolean?  // 復習時に正解したかどうか
  reviewedAt       DateTime?
  
  // リレーション
  reviewSession    ReviewSession @relation(fields: [reviewSessionId], references: [id])
  question         Question      @relation(fields: [questionId], references: [id])
}
```

## 3. スキーマ図

```
User 1--* UserProgress
User 1--* UserAchievement
User 1--* Streak
User 1--* UserFollowing (follower)
User 1--* UserFollowing (following)
User 1--* UserExpertise
User 1--* UserRanking
User 1--* UserAnswer
User 1--* ReviewSession

Course 1--* Lesson
Course 1--* UserProgress
Course 1--* Achievement
Course 1--* UserRanking
Course 1--* UserExpertise
Course 1--* CoursePrerequisite (prerequisite)
Course 1--* CoursePrerequisite (followup)

Lesson 1--* Question
Lesson 1--* UserProgress

Question 1--* Answer
Question 1--* UserAnswer
Question 1--* ReviewItem

Answer 1--* UserAnswer

Achievement 1--* UserAchievement

ReviewSession 1--* ReviewItem
```

## 4. インデックス設計

効率的なクエリパフォーマンスのため、以下のインデックスを作成します：

1. UserProgress: [userId, courseId]（ユーザーのコース進捗を取得）
2. UserProgress: [courseId]（コース別の進捗状況集計）
3. Lesson: [courseId, order]（コース内のレッスン順序での取得）
4. Question: [lessonId, order]（レッスン内の問題順序での取得）
5. UserAnswer: [userId, questionId]（ユーザーの特定問題への回答取得）
6. UserRanking: [courseId, score DESC]（コース別ランキングの表示）
7. UserAchievement: [userId]（ユーザーの獲得バッジ一覧取得）
8. Streak: [userId, date DESC]（ユーザーの最新ストリーク取得）

## 5. 拡張性への考慮

1. コンテンツ拡張に備え、Course, Lesson, Questionなどは柔軟な構造を持たせています。
2. メタデータやタグ付けのための追加フィールドは、必要に応じて導入可能です。
3. ソーシャル機能拡張のため、通知、コメント、フィードバックなどのエンティティを追加できます。
4. 将来的なデータ分析のために、学習行動ログの詳細記録も検討できます。

## 6. コンテンツ管理と公開ワークフロー

`isPublished` フィールドは、コンテンツの作成と公開を分離するために使用されます。これにより、以下のようなワークフローが可能になります：

### 6.1 コンテンツ作成ワークフロー

1. **作成フェーズ**: 管理者またはコンテンツ作成者が新しいコース/レッスンを作成します。この時点では `isPublished = false` であり、一般ユーザーには表示されません。

2. **レビューフェーズ**: コンテンツは内部でレビューされ、必要に応じて修正されます。このフェーズでは、特定の管理者やテスターのみがアクセスできます。

3. **公開フェーズ**: コンテンツが完成し、品質基準を満たしたら、`isPublished = true` に設定され、一般ユーザーに公開されます。

### 6.2 isPublishedの活用方法

- **段階的なコンテンツリリース**: 新しいコースを作成し、すべてのレッスンを準備しながらも、レッスンごとに段階的に公開できます。

- **シーズナルコンテンツ**: 特定の期間だけ公開したいコンテンツ（例：クリスマス特別レッスン）を一時的に非公開/公開することができます。

- **メンテナンスモード**: 内容の大幅な更新中に一時的に非公開にすることができます。

- **ベータテスト**: 特定のユーザーグループに対してのみ新コンテンツを公開してフィードバックを集めることができます。

### 6.3 実装上の考慮事項

- API エンドポイントやクエリでは、一般ユーザー向けには常に `isPublished = true` の条件を含める必要があります。
- 管理者向けインターフェースでは、公開/非公開状態の切り替えボタンを提供します。
- レッスンは非公開でも、そのレッスンに含まれる問題は作成・編集できるようにします。
- コースが非公開の場合、そのコースに属するすべてのレッスンは（`isPublished`の値に関わらず）ユーザーには表示されません。
- 統計やレポートを生成する際は、公開状態のコンテンツのみをカウントするようにします。

## 7. コンテンツ公開の粒度について

### 7.1 Question（問題）に isPublished が不要な理由

「問題」モデルには `isPublished` フラグを設けていません。その理由は以下の通りです：

1. **レッスンの公開粒度で十分**: 
   - ユーザーはレッスン単位で学習を進めるため、レッスン全体の公開/非公開の管理で十分です。
   - レッスンが公開されていれば、そのレッスンに属するすべての問題が利用可能になります。

2. **コンテンツの一貫性の維持**:
   - 一部の問題だけが公開され、他の問題が非公開というシナリオは、ユーザー体験を混乱させる可能性があります。
   - 特に5分で完了する短いレッスン内で問題ごとに公開状態が異なると、学習の流れが不自然になります。

3. **管理の複雑さの回避**:
   - 問題ごとに公開状態を管理すると、コンテンツ管理の複雑さが増します。
   - レッスン内の問題が部分的に公開されている状態の扱いが難しくなります（例：進捗計算、完了条件など）。

4. **実装のシンプル化**:
   - レッスンレベルの公開制御により、API実装とクエリが単純化されます。
   - `Lesson.isPublished` を確認するだけで、関連するすべての問題の表示/非表示を制御できます。

ただし、特定のニーズが発生した場合は、以下のような代替アプローチが考えられます：

- 問題に `isDraft` や `isActive` のようなフラグを追加し、レッスン内で表示する問題のサブセットを制御する
- レッスンに `minRequiredQuestions` のようなフィールドを追加し、公開状態に関係なく最小限必要な問題数を指定する

現在の設計では、コンテンツ管理のシンプルさと一貫性を優先し、レッスンレベルでの公開制御を採用しています。

## 8. 復習機能の実装

ユーザーが間違えた問題を効果的に復習できるように、以下のような機能を実装します：

### 8.1 間違えた問題のマーキング

- ユーザーが問題に誤答した場合、自動的に `UserAnswer.isCorrect = false` として記録します
- ユーザーは特定の問題を明示的に復習マーク (`UserAnswer.reviewStatus = "marked"`) することもできます

### 8.2 復習セッションの生成

以下の条件で復習セッションを生成できます：

1. **自動生成**: 
   - 一定数の誤答が溜まったとき
   - スペーシング効果（間隔反復）に基づく最適なタイミングで
   - コース完了後の総復習として

2. **手動生成**:
   - ユーザーが「復習する」ボタンを押したとき
   - 特定のレッスンやコースの復習を選択したとき

### 8.3 復習アルゴリズム

効果的な学習のために、以下のアルゴリズムを採用します：

1. **優先順位付け**:
   - 複数回間違えた問題を優先
   - 最近間違えた問題を優先
   - ユーザーが明示的にマークした問題を優先

2. **間隔反復**:
   - 科学的に証明された最適な間隔で問題を再提示
   - 初回復習: 1日後
   - 2回目: 3日後
   - 3回目: 7日後
   - 以降: 2週間、1ヶ月、3ヶ月

### 8.4 復習体験の最適化

- 元のレッスンコンテキストを表示して記憶の定着を促進
- 解説の強化（詳細な説明、関連コンセプトへのリンク）
- 類似問題の提示による概念の強化

## 9. Question と ReviewItem の関係性解説

### 9.1 基本的な関係

Question（問題）と ReviewItem（復習アイテム）の関係は「1対多」の関係です：
- 1つの Question は複数の ReviewItem から参照されることがあります
- 各 ReviewItem は必ず1つの Question を参照します

```
Question 1--* ReviewItem
```

### 9.2 概念的な違い

- **Question（問題）**:
  - レッスン内の恒久的な学習コンテンツ
  - レッスンに属し、全ユーザーに共通
  - 問題文、選択肢、解説などのコンテンツを格納

- **ReviewItem（復習アイテム）**:
  - 特定ユーザーの復習セッション内での一時的なインスタンス
  - 復習セッションに属し、特定ユーザーに紐づく
  - 復習の状態や進捗を追跡（例: 復習済み、正解/不正解）

### 9.3 利用シナリオ

**シナリオ例**:
1. ユーザーAが問題Xに初めて回答し、不正解だった（UserAnswer.isCorrect = false）
2. 数日後、システムがユーザーAのために復習セッションを作成
3. 問題Xを含む復習アイテムが復習セッションに追加される
4. ユーザーAが復習セッションで問題Xを再度解く
5. 復習アイテムの状態（status）と正誤（answeredCorrectly）が更新される

この流れでは、問題X（Question）は変わらず、それに関連する復習アイテム（ReviewItem）が復習のたびに作成されます。

### 9.4 データの流れ

```
Question → UserAnswer → ReviewItem の選定 → ReviewSession
```

1. ユーザーが問題（Question）に回答する
2. 回答が記録される（UserAnswer）
3. 間違えた問題や復習が必要な問題が選定される
4. 選定された問題が復習セッション（ReviewSession）内の復習アイテム（ReviewItem）として提示される

### 9.5 実装上のポイント

- ReviewItem は Question の内容をそのまま複製せず、参照するだけ（データ重複を避ける）
- 同じ Question が複数の復習セッションに登場することがある（繰り返し学習の原則に基づく）
- ReviewItem は復習の履歴としても機能（いつ、どの問題を、どのような結果で復習したか）
- 復習アルゴリズムは主に UserAnswer データを分析し、復習すべき Question を特定して ReviewItem を生成
