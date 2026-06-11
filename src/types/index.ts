import {
  CATEGORY_VARIANTS,
  MOTIVATION_VARIANTS,
  WEEK_DAY_LABELS,
} from "../constants";

export type WeekDay = (typeof WEEK_DAY_LABELS)[number];
export type Category = (typeof CATEGORY_VARIANTS)[number]["category"];
export type Motivation = (typeof MOTIVATION_VARIANTS)[number]["rank"];

export type StudyLog = {
  id: string;
  date: string;
  category: Category;
  minutes: number;
  memo: string;
  motivation: Motivation;
};

export type NewStudyLog = Omit<StudyLog, "id">;
