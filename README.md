# React + TypeScript 学習プロジェクト

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646cff)](https://vitejs.dev/)

## 🔧 開発環境

- Node.js: 22.10.0
- パッケージマネージャー: npm
- エディタ: Cursor

### 使用している主要パッケージ

- react: 18.3.1
- typescript: 5.6.2
- vite: 6.0.5
- eslint: 9.17.0

## 📖 参考にした資料
- Vite TailwindCSS
https://tailwindcss.com/docs/guides/vite
- shadcn/ui
https://ui.shadcn.com/docs/installation/vite

## 💡 学びのポイント
  # Windows側で作業中の変更を一時保存
  git stash

  # Mac側で
  git pull  # 最新を取得
  git stash pop  # 保存した作業を復元

## 📚 学習メモ

- 2025/01/02 11:30~
  - 公式ドキュメントだとcontent: ["./src/**/*.{html,js}"],だがcontent: ['./index.html', './src//*.{js,ts,jsx,tsx}'],こうした方がいいかも。TS使うし。
  - TailwindCSS Vite用のじゃないやつでインストールしてしまったので再作成。だから↑のcontentになってたのか......
  - vite.configのimport react from '@vitejs/plugin-react-swc';ここ公式だとswcないからエラーだったすぐ気づけて良かった。
  - vite tailwind shadcnの流れ慣れてきた
  - npx shadcn@latest add
  - 環境構築での初期エラー
  tsconfig.app .node にエラー。
  "incremental": true, // この行を追加 これで対処した。
  "noUncheckedSideEffectImports": true ここでエラー出てた。 削除して対処した。
