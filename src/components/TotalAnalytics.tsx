import { useMemo } from "react";
import { MOTIVATION_VARIANTS, WEEK_DAY_LABELS } from "../constants";
import type { StudyLog } from "../types";
import { summarizeLogs } from "../utils";

type TotalAnalyticsProps = {
  logs: StudyLog[];
};

const TotalAnalytics = ({ logs }: TotalAnalyticsProps) => {
  const summary = useMemo(() => summarizeLogs(logs), [logs]);
  const maximumMinutes = Math.max(...Object.values(summary.minutesByDay), 1);

  return (
    <section className="card space-y-6 p-6">
      <div className="grid gap-6 border-b border-slate-200 pb-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-sm font-semibold text-slate-600">週間合計</h2>
          <p className="mt-2 text-4xl font-bold">
            {summary.totalMinutes}
            <span className="ml-1 text-sm font-medium text-slate-500">分</span>
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-600">自己評価</h2>
          <div className="mt-3 flex justify-between">
            {MOTIVATION_VARIANTS.map(({ rank, label, Icon, color }) => (
              <div className="flex flex-col items-center gap-1" key={rank}>
                <Icon aria-label={label} className={`h-7 w-7 ${color}`} />
                <span className="text-sm font-semibold">{summary.countByMotivation[rank]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div aria-label="曜日別学習時間グラフ">
        <div className="grid h-60 grid-cols-7 items-end gap-2 sm:gap-4">
          {WEEK_DAY_LABELS.map((day) => {
            const minutes = summary.minutesByDay[day];
            const height = `${Math.max((minutes / maximumMinutes) * 100, minutes ? 4 : 0)}%`;

            return (
              <div className="flex h-full flex-col justify-end gap-2 text-center" key={day}>
                <span className="text-xs font-medium text-slate-500">{minutes || ""}</span>
                <div
                  aria-label={`${day}曜日 ${minutes}分`}
                  className="min-h-0 rounded-t-md bg-blue-600 transition-[height]"
                  style={{ height }}
                />
                <span className="text-sm font-medium text-slate-600">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TotalAnalytics;
