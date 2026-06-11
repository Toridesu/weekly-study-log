# Weekly Study Log

学習時間と簡単な振り返りを記録し、週単位で確認するブラウザアプリです。

データはサーバーへ送信せず、利用中のブラウザの `localStorage` に保存します。

## Features

- 日付、カテゴリ、学習時間、自己評価、メモを記録
- 選択した週の合計時間、曜日別時間、カテゴリ別時間を集計
- カテゴリ別学習時間を前週と比較
- 前後の週へ移動して過去の記録を確認
- 保存済みデータを読み込む際に不正なレコードを除外
- モバイルとデスクトップに対応

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- Lucide React

グラフは7日分の単純な棒グラフであるため、チャートライブラリを使わず CSS で実装しています。

## Getting Started

前提環境:

- Node.js 22
- npm

```bash
git clone https://github.com/Toridesu/weekly-study-log.git
cd weekly-study-log
npm ci
npm run dev
```

開発サーバーのURLは、起動時に Vite が表示します。

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run lint` | ESLint を実行 |
| `npm run test` | ユニットテストを実行 |
| `npm run build` | 型チェック後に本番ビルド |
| `npm run check` | lint、test、build を順番に実行 |
| `npm run preview` | 本番ビルドをローカルで確認 |

## Architecture

```text
src/
├── components/       # 入力フォームと表示コンポーネント
├── constants/        # カテゴリ・自己評価などのドメイン定数
├── hooks/            # ログの状態管理と localStorage 永続化
├── types/            # 定数から導出したドメイン型
├── utils/            # 日付処理、集計、保存データ検証
├── App.tsx           # 週選択と画面構成
└── main.tsx          # React エントリーポイント
```

ドメインロジックは UI から分離し、`src/utils/index.test.ts` で日付計算・週間集計・保存データ検証をテストしています。

## Data Storage

ログは `weekly-study-log:logs` キーで `localStorage` に保存されます。

- 同じブラウザ・同じオリジン内でのみ利用できます。
- ブラウザデータを削除するとログも削除されます。
- 端末間同期、認証、クラウドバックアップはありません。

## Deployment

`main` ブランチへの push で GitHub Actions が `npm run check` を実行し、成功したビルドを GitHub Pages へデプロイします。
