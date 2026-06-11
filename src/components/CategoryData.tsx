import { useMemo } from "react";
import { CATEGORY_VARIANTS } from "../constants";
import type { StudyLog } from "../types";
import { summarizeLogs } from "../utils";

type CategoryDataProps = {
  logs: StudyLog[];
  previousWeekLogs: StudyLog[];
};

const CategoryData = ({ logs, previousWeekLogs }: CategoryDataProps) => {
  const current = useMemo(() => summarizeLogs(logs), [logs]);
  const previous = useMemo(() => summarizeLogs(previousWeekLogs), [previousWeekLogs]);

  return (
    <section aria-label="カテゴリ別学習時間" className="grid gap-4 md:grid-cols-3">
      {CATEGORY_VARIANTS.map(({ category, Icon, color, background }) => {
        const currentMinutes = current.minutesByCategory[category];
        const difference = currentMinutes - previous.minutesByCategory[category];

        return (
          <article className="card p-5" key={category}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-600">{category}</h2>
                <p className="mt-2 text-3xl font-bold">
                  {currentMinutes}
                  <span className="ml-1 text-sm font-medium text-slate-500">分</span>
                </p>
              </div>
              <span className={`rounded-xl p-3 ${background}`}>
                <Icon aria-hidden="true" className={`h-6 w-6 ${color}`} />
              </span>
            </div>
            <p className={`mt-3 text-xs font-medium ${difference >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
              前週比 {difference >= 0 ? "+" : ""}
              {difference}分
            </p>
          </article>
        );
      })}
    </section>
  );
};

export default CategoryData;
