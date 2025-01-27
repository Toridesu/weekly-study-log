import { useState } from "react";
import { INITIAL_LOGS } from "./constants";
import { StudyLog } from "./types";
import StudyLogList from "./components/StudyLogList";
import TotalAnalytics from "./components/TotalAnalytics";

function App() {
  // 学習ログの状態管理
  const [logs, setLogs] = useState<StudyLog[]>(INITIAL_LOGS);

  const addLog = (log: Omit<StudyLog, "id">) => {
    setLogs((prev) => [
      ...prev,
      {
        ...log,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const deleteLog = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  return (
    <>
      <div className="min-h-screen  pt-16 pb-8 space-y-12 px-16 bg-gradient-to-br from-blue-100 to-green-100">
        {/* header */}
        <header className="space-y-8 flex flex-col items-center">
          <h1 className="text-5xl font-bold">Weekly Study Log</h1>
          <p className="text-gray-700 text-center">
            １週間の学習結果をグラフで可視化します！
            <br />
            日々の学習内容・作業時間を、記録してください。
          </p>
        </header>
        <main className="flex gap-12">
          <div className="w-3/4 h-full space-y-6">
            {/* 3つのカード */}
            {/* グラフ */}
            <TotalAnalytics logs={logs} />
            <StudyLogList logs={logs} onDelete={deleteLog} />
          </div>
          <div className="w-1/4 h-full">
            {/* ログ入力フォーム */}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;