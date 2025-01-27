export type StudyLog = {
  id: string;
  day: "月" | "火" | "水" | "木" | "金" | "土" | "日";
  category: "プログラミング" | "読書" | "英語";
  minutes: number;
  memo?: string;
  motivation: "negative" | "normal" | "positive";
};

