import { BookOpen, Code2, Frown, Languages, Laugh, Meh } from "lucide-react";

export const STORAGE_KEY = "weekly-study-log:logs";

export const WEEK_DAY_LABELS = ["月", "火", "水", "木", "金", "土", "日"] as const;

export const CATEGORY_VARIANTS = [
  {
    category: "プログラミング",
    Icon: Code2,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  {
    category: "読書",
    Icon: BookOpen,
    color: "text-amber-600",
    background: "bg-amber-50",
  },
  {
    category: "英語",
    Icon: Languages,
    color: "text-emerald-600",
    background: "bg-emerald-50",
  },
] as const;

export const MOTIVATION_VARIANTS = [
  {
    rank: "negative",
    label: "低め",
    Icon: Frown,
    color: "text-slate-400",
  },
  {
    rank: "normal",
    label: "普通",
    Icon: Meh,
    color: "text-amber-500",
  },
  {
    rank: "positive",
    label: "高め",
    Icon: Laugh,
    color: "text-blue-600",
  },
] as const;
