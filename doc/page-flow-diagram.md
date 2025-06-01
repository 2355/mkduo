# MKDuo アプリケーション ページフロー図

## 1. 全体ページフロー

```mermaid
graph TD
    Landing[ランディングページ] --> Login[ログインページ]
    Landing --> Demo[デモ体験]
    
    Login --> Dashboard[ダッシュボード]
    
    Dashboard --> Courses[コース一覧]
    Dashboard --> Profile[プロフィール]
    Dashboard --> Settings[設定]
    Dashboard --> Social[ソーシャルハブ]
    Dashboard --> ContinueLesson[前回の続きから]
    Dashboard --> SkillTree[スキルツリー]
    Dashboard --> References[リファレンス]
    
    Courses --> Lessons[レッスン選択]
    Lessons --> Questions[問題ページ]
    Questions --> Complete[レッスン完了]
    
    Complete --> NextLesson[次のレッスン]
    Complete --> Lessons
    Complete --> Dashboard
    Complete --> Share[SNSシェア]
    
    Profile --> BadgeDetails[バッジ詳細]
    Profile --> Settings
    
    Social --> Friends[フレンド一覧]
    Social --> Leaderboards[ランキング]
    Social --> Experts[専門家を探す]
    Social --> Badges[バッジギャラリー]
    
    Friends --> OtherProfile[他ユーザープロフィール]
    Leaderboards --> OtherProfile
    Experts --> OtherProfile
    Badges --> OtherProfile
    Badges --> BadgeDetails
    
    classDef unauth fill:#663366,stroke:#333,stroke-width:2px,color:#fff;
    classDef auth fill:#336699,stroke:#333,stroke-width:2px,color:#fff;
    classDef learning fill:#336633,stroke:#333,stroke-width:2px,color:#fff;
    classDef social fill:#993366,stroke:#333,stroke-width:2px,color:#fff;
    
    class Landing,Login,Demo unauth;
    class Dashboard,Profile,Settings,SkillTree,References auth;
    class Courses,Lessons,Questions,Complete,NextLesson,Share learning;
    class Social,Friends,Leaderboards,Experts,Badges,OtherProfile,BadgeDetails social;
```

## 2. 認証フロー

```mermaid
graph TD
    Landing[ランディングページ] --> Login[ログインページ/GitHub認証]
    Login --> Dashboard[ダッシュボード]
    
    classDef unauth fill:#663366,stroke:#333,stroke-width:2px,color:#fff;
    classDef auth fill:#336699,stroke:#333,stroke-width:2px,color:#fff;
    
    class Landing,Login unauth;
    class Dashboard auth;
```

## 3. 学習フロー

```mermaid
graph TD
    Dashboard[ダッシュボード] --> Courses[コース一覧]
    Dashboard --> ContinueLesson[前回の続きから]
    
    Courses --> Lessons[レッスン選択]
    ContinueLesson --> Questions[問題ページ]
    
    Lessons --> Questions
    
    Questions --> |全問題完了| Complete[レッスン完了]
    Questions --> |次の問題| Questions
    
    Complete --> NextLesson[次のレッスン]
    Complete --> Lessons
    Complete --> Dashboard
    Complete --> Share[SNSシェア]
    
    NextLesson --> Questions
    
    classDef auth fill:#336699,stroke:#333,stroke-width:2px,color:#fff;
    classDef learning fill:#336633,stroke:#333,stroke-width:2px,color:#fff;
    
    class Dashboard auth;
    class Courses,Lessons,Questions,Complete,NextLesson,ContinueLesson,Share learning;
```

## 4. ソーシャルフロー

```mermaid
graph TD
    Dashboard[ダッシュボード] --> Social[ソーシャルハブ]
    Dashboard --> Profile[プロフィール]
    
    Social --> Friends[フレンド一覧]
    Social --> Leaderboards[ランキング]
    Social --> Experts[専門家を探す]
    Social --> Badges[バッジギャラリー]
    
    Profile --> BadgeDetails[バッジ詳細]
    
    Friends --> OtherProfile[他ユーザープロフィール]
    Leaderboards --> OtherProfile
    Experts --> OtherProfile
    Badges --> OtherProfile
    Badges --> BadgeDetails
    
    OtherProfile --> Follow[フォロー/アンフォロー]
    
    classDef auth fill:#336699,stroke:#333,stroke-width:2px,color:#fff;
    classDef social fill:#993366,stroke:#333,stroke-width:2px,color:#fff;
    
    class Dashboard auth;
    class Social,Friends,Leaderboards,Experts,Badges,OtherProfile,BadgeDetails,Profile,Follow social;
```

## 5. 問題ページ内部フロー (SPA)

```mermaid
graph TD
    Enter[問題ページ開始] --> Q1[問題1表示]
    Q1 --> Answer1[回答選択]
    Answer1 --> Feedback1[即時フィードバック]
    Feedback1 --> Q2[問題2表示]
    Q2 --> Answer2[回答選択]
    Answer2 --> Feedback2[即時フィードバック]
    Feedback2 --> Q3[問題3表示]
    Q3 --> Answer3[回答選択]
    Answer3 --> Feedback3[即時フィードバック]
    Feedback3 --> Q4[問題4表示]
    Q4 --> Answer4[回答選択]
    Answer4 --> Feedback4[即時フィードバック]
    Feedback4 --> Q5[問題5表示]
    Q5 --> Answer5[回答選択]
    Answer5 --> Feedback5[即時フィードバック]
    Feedback5 --> Complete[レッスン完了画面へ遷移]
    
    Answer1 --> |中断| Exit[レッスン選択へ戻る]
    Answer2 --> |中断| Exit
    Answer3 --> |中断| Exit
    Answer4 --> |中断| Exit
    Answer5 --> |中断| Exit
    
    classDef start fill:#339933,stroke:#333,stroke-width:2px,color:#fff;
    classDef question fill:#336633,stroke:#333,stroke-width:2px,color:#fff;
    classDef answer fill:#336699,stroke:#333,stroke-width:2px,color:#fff;
    classDef feedback fill:#993366,stroke:#333,stroke-width:2px,color:#fff;
    classDef exit fill:#993333,stroke:#333,stroke-width:2px,color:#fff;
    
    class Enter start;
    class Q1,Q2,Q3,Q4,Q5 question;
    class Answer1,Answer2,Answer3,Answer4,Answer5 answer;
    class Feedback1,Feedback2,Feedback3,Feedback4,Feedback5 feedback;
    class Complete,Exit exit;
```

## 6. リピートユーザーのサイクル

```mermaid
graph TD
    Login[ログイン] --> Dashboard[ダッシュボード]
    Dashboard --> ContinueLesson[前回の続きから]
    Dashboard --> Courses[新コース選択]
    
    ContinueLesson --> Questions[問題ページ]
    Courses --> Lessons[レッスン選択]
    Lessons --> Questions
    
    Questions --> Complete[レッスン完了]
    Complete --> NextLesson[次のレッスン]
    NextLesson --> Questions
    
    Complete --> Dashboard
    
    Dashboard --> Streak[ストリーク確認/維持]
    Dashboard --> Social[ソーシャル機能]
    
    Social --> Dashboard
    Streak --> |次の日| Login
    
    classDef auth fill:#336699,stroke:#333,stroke-width:2px,color:#fff;
    classDef learning fill:#336633,stroke:#333,stroke-width:2px,color:#fff;
    classDef social fill:#993366,stroke:#333,stroke-width:2px,color:#fff;
    classDef cycle fill:#996633,stroke:#333,stroke-width:4px,stroke-dasharray: 5 5,color:#fff;
    
    class Login,Dashboard,Streak auth;
    class Courses,Lessons,Questions,Complete,NextLesson,ContinueLesson learning;
    class Social social;
    class Login,Dashboard,Questions,Complete,Dashboard,Streak,Login cycle;
```

## 7. 復習フロー

```mermaid
graph TD
    Dashboard[ダッシュボード] --> ReviewList[復習リスト]
    
    ReviewList --> ReviewSession[復習セッション]
    ReviewList --> IndividualReview[個別問題復習]
    
    Questions --> |不正解| MarkForReview[復習用にマーク]
    MarkForReview --> ReviewList
    
    ReviewSession --> ReviewQuestion1[復習問題1]
    ReviewQuestion1 --> ReviewQuestion2[復習問題2]
    ReviewQuestion2 --> ReviewQuestion3[復習問題3]
    ReviewQuestion3 --> ReviewComplete[復習完了]
    
    ReviewComplete --> Dashboard
    ReviewComplete --> NewReviewSession[新しい復習セッション]
    
    classDef auth fill:#336699,stroke:#333,stroke-width:2px,color:#fff;
    classDef review fill:#996633,stroke:#333,stroke-width:2px,color:#fff;
    
    class Dashboard auth;
    class ReviewList,ReviewSession,IndividualReview,MarkForReview,ReviewQuestion1,ReviewQuestion2,ReviewQuestion3,ReviewComplete,NewReviewSession review;
```

注: これらのフロー図はMermaidシンタックスで記述されています。GitHubやその他のMarkdownビューアでレンダリングして確認できます。
