import { Trash2 } from "lucide-react";
import type { StudyLog } from "../types";
import {
  formatDate,
  getCategoryVariant,
  getMotivationVariant,
} from "../utils";

type StudyLogListProps = {
  logs: StudyLog[];
  onDelete: (id: string) => void;
};

function StudyLogList({ logs, onDelete }: StudyLogListProps) {
  const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="card p-6">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">学習ログ</h2>
        <span className="text-sm text-slate-500">{logs.length}件</span>
      </div>

      {sortedLogs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 px-4 py-12 text-center">
          <p className="font-medium text-slate-700">この週の学習ログはまだありません</p>
          <p className="mt-1 text-sm text-slate-500">右のフォームから最初の記録を追加できます。</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {sortedLogs.map((log) => {
            const category = getCategoryVariant(log.category);
            const motivation = getMotivationVariant(log.motivation);
            const CategoryIcon = category?.Icon;
            const MotivationIcon = motivation?.Icon;

            return (
              <article className="flex items-start gap-4 py-4 first:pt-0 last:pb-0" key={log.id}>
                <span className={`rounded-lg p-2.5 ${category?.background ?? "bg-slate-100"}`}>
                  {CategoryIcon && (
                    <CategoryIcon aria-hidden="true" className={`h-5 w-5 ${category.color}`} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-semibold">{log.category}</h3>
                    <span className="text-sm text-slate-500">{formatDate(log.date)}</span>
                  </div>
                  {log.memo && <p className="mt-1 break-words text-sm text-slate-600">{log.memo}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {MotivationIcon && (
                    <MotivationIcon aria-label={motivation.label} className={`h-4 w-4 ${motivation.color}`} />
                  )}
                  <span className="text-sm font-semibold">{log.minutes}分</span>
                  <button
                    aria-label={`${formatDate(log.date)}の${log.category}ログを削除`}
                    className="icon-button text-rose-600 hover:bg-rose-50"
                    onClick={() => onDelete(log.id)}
                    type="button"
                  >
                    <Trash2 aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default StudyLogList;
