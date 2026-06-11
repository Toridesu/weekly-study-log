import {
  CATEGORY_VARIANTS,
  MOTIVATION_VARIANTS,
  WEEK_DAY_LABELS,
} from "../constants";
import type {
  Category,
  Motivation,
  StudyLog,
  WeekDay,
} from "../types";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isIsoDate = (value: string): boolean => {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  return toIsoDate(parseIsoDate(value)) === value;
};

export const toIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseIsoDate = (value: string): Date => {
  return new Date(`${value}T00:00:00`);
};

export const getToday = (): string => toIsoDate(new Date());

export const shiftDate = (value: string, days: number): string => {
  const date = parseIsoDate(value);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
};

export const getWeekStart = (value: string): string => {
  const date = parseIsoDate(value);
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  return toIsoDate(date);
};

export const formatDate = (value: string): string => {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).format(parseIsoDate(value));
};

export const formatWeekRange = (weekStart: string): string => {
  return `${formatDate(weekStart)} - ${formatDate(shiftDate(weekStart, 6))}`;
};

export const getWeekDay = (value: string): WeekDay => {
  const sundayFirstIndex = parseIsoDate(value).getDay();
  return WEEK_DAY_LABELS[(sundayFirstIndex + 6) % 7];
};

export const isDateInWeek = (date: string, weekStart: string): boolean => {
  return date >= weekStart && date < shiftDate(weekStart, 7);
};

export const getCategoryVariant = (category: Category) => {
  return CATEGORY_VARIANTS.find((variant) => variant.category === category);
};

export const getMotivationVariant = (motivation: Motivation) => {
  return MOTIVATION_VARIANTS.find((variant) => variant.rank === motivation);
};

export const summarizeLogs = (logs: StudyLog[]) => {
  const minutesByDay = Object.fromEntries(
    WEEK_DAY_LABELS.map((day) => [day, 0]),
  ) as Record<WeekDay, number>;
  const minutesByCategory = Object.fromEntries(
    CATEGORY_VARIANTS.map(({ category }) => [category, 0]),
  ) as Record<Category, number>;
  const countByMotivation = Object.fromEntries(
    MOTIVATION_VARIANTS.map(({ rank }) => [rank, 0]),
  ) as Record<Motivation, number>;

  let totalMinutes = 0;

  for (const log of logs) {
    totalMinutes += log.minutes;
    minutesByDay[getWeekDay(log.date)] += log.minutes;
    minutesByCategory[log.category] += log.minutes;
    countByMotivation[log.motivation] += 1;
  }

  return { totalMinutes, minutesByDay, minutesByCategory, countByMotivation };
};

export const isStudyLog = (value: unknown): value is StudyLog => {
  if (!value || typeof value !== "object") return false;

  const log = value as Record<string, unknown>;
  return (
    typeof log.id === "string" &&
    typeof log.date === "string" &&
    isIsoDate(log.date) &&
    CATEGORY_VARIANTS.some(({ category }) => category === log.category) &&
    typeof log.minutes === "number" &&
    Number.isFinite(log.minutes) &&
    log.minutes > 0 &&
    typeof log.memo === "string" &&
    MOTIVATION_VARIANTS.some(({ rank }) => rank === log.motivation)
  );
};

export const parseStoredLogs = (value: string | null): StudyLog[] => {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(isStudyLog) : [];
  } catch {
    return [];
  }
};
