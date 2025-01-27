import { Frown, Laugh, Meh } from "lucide-react";
import { StudyLog } from "../types";

export const WEEK_DAYS = ["月", "火", "水", "木", "金", "土", "日"];

export const CATEGORIE_VARIANTS = [
  {
    category: "プログラミング",
    emoji: "💻",
  },
  {
    category: "読書",
    emoji: "📚",
  },
  {
    category: "英語",
    emoji: "🗽",
  },
];

export const MOTIVATION_VARIANTS = [
  {
    rank: "negative",
    Icon: Frown,
    color: "text-gray-400",
  },
  {
    rank: "normal",
    Icon: Meh,
    color: "text-yellow-500",
  },

  {
    rank: "positive",
    Icon: Laugh,
    color: "text-blue-500",
  },
];

export const INITIAL_LOGS: StudyLog[] = [
  {
    id: "1",
    day: "月",
    category: "読書",
    minutes: 60,
    memo: "１章を読み終えた！",
    motivation: "positive",
  },
  {
    id: "2",
    day: "火",
    category: "プログラミング",
    minutes: 240,
    memo: "開発中のアプリに、機能を2つ追加",
    motivation: "normal",
  },
  {
    id: "3",
    day: "水",
    category: "英語",
    minutes: 120,
    memo: "リスニングを始めた！初日なので、あまり聞き取れなかった",
    motivation: "negative",
  },
];