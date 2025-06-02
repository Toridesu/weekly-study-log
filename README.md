![Image](https://github.com/user-attachments/assets/619a71fa-c433-4ab5-b267-1d7a341c8fa1)

# 週間学習記録アプリ

**日々の学習内容と時間を記録し、週ごとに振り返るための Web アプリケーションです。**

このプロジェクトでは、学習の習慣化と進捗の可視化を目的として、週間学習記録アプリを構築しました。

## ✨ 主な機能

- **学習記録の入力:** 学習した内容と時間を記録できます。
- **カテゴリ別集計:** 学習内容をカテゴリ別に分類し、それぞれの学習時間を集計・表示します。
- **週間レポート:** 週ごとの学習時間や達成度をグラフなどで可視化します。
- **目標設定:** 週ごとの学習目標を設定し、進捗を確認できます。（予定）

## 🚀 技術スタック

- **ビルドツール:** Vite
- **フレームワーク/ライブラリ:** React
- **言語:** TypeScript
- **スタイリング:** Tailwind CSS
- **UI コンポーネント:** shadcn/ui (lucide-react, class-variance-authority, clsx, tailwind-merge を利用)

## 🛠️ 開発環境のセットアップ

1. **リポジトリをクローン:**
   ```bash
   git clone https://github.com/あなたのユーザー名/weekly-study-log.git # ご自身のプロジェクト名に変更してください
   cd weekly-study-log
   ```
2. **依存パッケージのインストール:**
   ```bash
   npm install
   # または
   # yarn install
   # または
   # pnpm install
   ```
3. **開発サーバーの起動:**
   ```bash
   npm run dev
   # または
   # yarn dev
   # または
   # pnpm dev
   ```
   ブラウザで `http://localhost:5173` (Vite のデフォルトポート) を開きます。

## 📁 プロジェクト構成 (src ディレクトリ)

```
src
├── App.tsx              # アプリケーションのメインコンポーネント
├── components/          # 再利用可能なUIコンポーネント群
│   ├── StudyLogForm.tsx   # 学習記録フォーム
│   ├── CategoryData.tsx   # カテゴリ別集計データ表示
│   ├── StudyLogList.tsx   # 学習記録リスト表示
│   └── TotalAnalytics.tsx # 全体的な学習分析表示
├── last-week-data.json  # 先週の学習データ（仮）
├── utils/               # 汎用的なユーティリティ関数
│   └── index.ts
├── constants/           # アプリケーション全体で使われる定数
│   └── index.ts
├── types/               # TypeScriptの型定義
│   └── index.ts
├── lib/                 # 外部ライブラリの設定やユーティリティ
│   └── utils.ts         # shadcn/ui のユーティリティ関数 (cnなど)
├── index.css            # グローバルなCSSスタイル
├── main.tsx             # アプリケーションのエントリーポイント
└── vite-env.d.ts        # Vite環境の型定義
```

---