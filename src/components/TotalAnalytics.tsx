import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StudyLog } from "../types";
import {
  getTotalCountByMotivation,
  getTotalMinutes,
  getTotalMinutesByDay,
} from "../utils";
import { MOTIVATION_VARIANTS, WEEK_DAYS } from "../constants";

type TotalAnalyticsProps = {
  logs: StudyLog[];
};

const TotalAnalytics = ({ logs }: TotalAnalyticsProps) => {
  const dailyData = WEEK_DAYS.map((day) => ({
    day,
    minutes: getTotalMinutesByDay(logs, day),
  }));
  const weeklyTotal = getTotalMinutes(logs);
  const motivationCount = getTotalCountByMotivation(logs);

  return (
    <div className="p-6 bg-white/50 border border-gray-400 rounded-xl  backdrop-blur-sm space-y-6">
      <div className="pb-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b">
        <div className="space-y-2 col-span-2">
          <span className="font-semibold">今週の合計学習時間</span>
          <h3 className="text-3xl font-bold">
            {weeklyTotal} <span className="text-sm text-gray-500">分</span>
          </h3>
        </div>
        <div className="">
          <h3 className="font-semibold mb-2">自己評価</h3>
          <div className="flex justify-between items-center mt-2">
            {MOTIVATION_VARIANTS.map(({ rank, Icon, color }) => (
              <div
                key={rank}
                className={`flex flex-col items-center text-lg font-bold ${color}`}
              >
                <Icon className="w-8 h-8" />
                <span className="text-sm text-gray-500">
                  {motivationCount[rank] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutes" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalAnalytics;