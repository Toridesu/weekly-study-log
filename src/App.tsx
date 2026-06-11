import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import CategoryData from "./components/CategoryData";
import StudyForm from "./components/StudyLogForm";
import StudyLogList from "./components/StudyLogList";
import TotalAnalytics from "./components/TotalAnalytics";
import { useStudyLogs } from "./hooks/useStudyLogs";
import {
  formatWeekRange,
  getToday,
  getWeekStart,
  isDateInWeek,
  shiftDate,
} from "./utils";

function App() {
  const { logs, addLog, deleteLog } = useStudyLogs();
  const currentWeekStart = getWeekStart(getToday());
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);

  const selectedLogs = useMemo(
    () => logs.filter((log) => isDateInWeek(log.date, selectedWeekStart)),
    [logs, selectedWeekStart],
  );
  const previousWeekLogs = useMemo(() => {
    const previousWeekStart = shiftDate(selectedWeekStart, -7);
    return logs.filter((log) => isDateInWeek(log.date, previousWeekStart));
  }, [logs, selectedWeekStart]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Weekly Review
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Weekly Study Log
            </h1>
            <p className="mt-2 text-slate-600">
              学習時間と振り返りを、週単位で記録・可視化します。
            </p>
          </div>

          <div className="flex items-center gap-2" aria-label="表示する週を選択">
            <button
              aria-label="前の週"
              className="icon-button"
              onClick={() => setSelectedWeekStart((date) => shiftDate(date, -7))}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="min-w-48 text-center">
              <p className="text-sm font-semibold">{formatWeekRange(selectedWeekStart)}</p>
              {selectedWeekStart !== currentWeekStart && (
                <button
                  className="mt-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedWeekStart(currentWeekStart)}
                  type="button"
                >
                  今週に戻る
                </button>
              )}
            </div>
            <button
              aria-label="次の週"
              className="icon-button"
              onClick={() => setSelectedWeekStart((date) => shiftDate(date, 7))}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          <CategoryData logs={selectedLogs} previousWeekLogs={previousWeekLogs} />
          <TotalAnalytics logs={selectedLogs} />
          <StudyLogList logs={selectedLogs} onDelete={deleteLog} />
        </div>
        <aside className="lg:sticky lg:top-6">
          <StudyForm defaultDate={selectedWeekStart} onSubmit={addLog} />
        </aside>
      </main>
    </div>
  );
}

export default App;
