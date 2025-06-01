# テスト計画と品質保証

## 1. テスト階層と種類

### 1.1 単体テスト (Unit Tests)
- **対象**: 個別の関数、コンポーネント、ユーティリティ
- **ツール**: Jest, React Testing Library
- **自動化**: CIパイプラインで自動実行
- **カバレッジ目標**: コードの80%以上

### 1.2 統合テスト (Integration Tests)
- **対象**: 複数のコンポーネントの連携、APIとのインタラクション
- **ツール**: Jest, supertest, MSW (Mock Service Worker)
- **自動化**: CIパイプラインで自動実行
- **重点領域**: ユーザー認証、学習フロー、データ保存

### 1.3 E2Eテスト (End-to-End Tests)
- **対象**: 実際のユーザーフローと主要機能
- **ツール**: Cypress
- **自動化**: 重要な変更時とリリース前に実行
- **テストシナリオ例**:
  - ユーザー登録からレッスン完了までのフロー
  - ソーシャル機能の動作確認
  - 復習システムの一連のフロー

### 1.4 視覚的回帰テスト (Visual Regression Tests)
- **対象**: UIコンポーネントの視覚的一貫性
- **ツール**: Storybook + Chromatic
- **自動化**: UIコンポーネント変更時に実行
- **重点**: ダークモード対応、レスポンシブデザイン

## 2. テスト環境

### 2.1 開発環境
- ローカル開発マシンでの実行
- モックAPIとテスト用データベース

### 2.2 CI環境
- GitHub Actions
- テスト用データベースインスタンス
- レポート自動生成と通知

### 2.3 ステージング環境
- 本番に近い環境での検証
- 実際のデータベースを使用（テストデータ）
- パフォーマンステストも実施

## 3. テスト実装方針

### 3.1 コンポーネントテスト
```typescript
// Buttonコンポーネントのテスト例
describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>テスト</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('テスト');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>無効</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 3.2 APIテスト
```typescript
// ユーザー進捗APIのテスト例
describe('User Progress API', () => {
  it('returns user progress for a course', async () => {
    const response = await request(app)
      .get('/api/user/progress/course-123')
      .set('Authorization', `Bearer ${testToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('completedLessons');
  });

  it('requires authentication', async () => {
    const response = await request(app)
      .get('/api/user/progress/course-123');
    
    expect(response.status).toBe(401);
  });
});
```

### 3.3 E2Eテスト
```typescript
// レッスン完了フローのE2Eテスト例
describe('Lesson Completion Flow', () => {
  beforeEach(() => {
    cy.login(); // カスタムコマンド: ユーザーログイン
    cy.visit('/courses/typescript/lessons/basic-types');
  });

  it('completes a lesson successfully', () => {
    // 問題に回答
    cy.get('[data-testid="question-1"]').within(() => {
      cy.get('[data-testid="option-c"]').click();
      cy.get('[data-testid="submit-button"]').click();
    });

    // フィードバック表示の確認
    cy.get('[data-testid="feedback"]').should('be.visible');
    
    // 次の問題へ進む
    cy.get('[data-testid="next-button"]').click();
    
    // 残りの問題も同様に回答
    // ...

    // レッスン完了画面の表示確認
    cy.get('[data-testid="lesson-complete"]').should('be.visible');
    cy.get('[data-testid="xp-earned"]').should('contain', 'XP');
  });
});
```

## 4. 品質保証プロセス

### 4.1 コードレビュー基準
- 機能要件の充足
- コーディング規約の遵守
- テストカバレッジの確認
- パフォーマンスへの考慮
- セキュリティリスクの確認

### 4.2 リリース前チェックリスト
- 全テスト通過の確認
- パフォーマンス指標の確認
- クロスブラウザテスト結果
- モバイル対応の確認
- アクセシビリティ基準の遵守

### 4.3 バグトリアージとフィードバックループ
- バグの重要度と優先度の定義
- 報告から修正までのワークフロー
- ユーザーフィードバックの収集と分析
- 継続的改善プロセス

## 5. アクセシビリティテスト

### 5.1 自動テスト
- axe-core / jest-axe による自動チェック
- コントラスト比とカラーパレットの検証
- キーボードナビゲーションテスト

### 5.2 手動テスト
- スクリーンリーダー対応確認
- キーボードのみでの操作検証
- 拡大表示時の使いやすさ確認

## 6. パフォーマンステスト

### 6.1 測定指標
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- API応答時間

### 6.2 テスト方法
- Lighthouse自動測定
- WebPageTest詳細分析
- ネットワークスロットリングテスト（低速接続シミュレーション）
- 負荷テスト（重要なAPIエンドポイント）
