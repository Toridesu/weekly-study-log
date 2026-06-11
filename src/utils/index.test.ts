import { describe, expect, it } from "vitest";
import type { StudyLog } from "../types";
import {
  getWeekStart,
  isDateInWeek,
  parseStoredLogs,
  shiftDate,
  summarizeLogs,
} from ".";

const logs: StudyLog[] = [
  {
    id: "1",
    date: "2026-06-08",
    category: "プログラミング",
    minutes: 60,
    memo: "",
    motivation: "positive",
  },
  {
    id: "2",
    date: "2026-06-10",
    category: "読書",
    minutes: 30,
    memo: "第1章",
    motivation: "normal",
  },
];

describe("date utilities", () => {
  it("returns Monday as the start of a week", () => {
    expect(getWeekStart("2026-06-11")).toBe("2026-06-08");
    expect(getWeekStart("2026-06-14")).toBe("2026-06-08");
  });

  it("shifts dates across month boundaries", () => {
    expect(shiftDate("2026-05-30", 7)).toBe("2026-06-06");
  });

  it("checks whether a date belongs to a week", () => {
    expect(isDateInWeek("2026-06-14", "2026-06-08")).toBe(true);
    expect(isDateInWeek("2026-06-15", "2026-06-08")).toBe(false);
  });
});

describe("study log utilities", () => {
  it("summarizes logs by total, weekday, category, and motivation", () => {
    const summary = summarizeLogs(logs);

    expect(summary.totalMinutes).toBe(90);
    expect(summary.minutesByDay.月).toBe(60);
    expect(summary.minutesByDay.水).toBe(30);
    expect(summary.minutesByCategory.プログラミング).toBe(60);
    expect(summary.countByMotivation.positive).toBe(1);
  });

  it("keeps only valid persisted logs", () => {
    const stored = JSON.stringify([
      ...logs,
      { ...logs[0], id: "invalid-date", date: "2026-99-99" },
      { id: "invalid" },
    ]);
    expect(parseStoredLogs(stored)).toEqual(logs);
    expect(parseStoredLogs("not json")).toEqual([]);
  });
});
