import { StudyLog } from '../types';
import { getCategoryIcon, getTotalMinutesByCategory } from '../utils';
import LastWeekData from '../last-week-data.json';
import { useMemo } from 'react';

type CategoryDataProps = {
  logs: StudyLog[];
};

const CategoryData = ({ logs }: CategoryDataProps) => {
  // 先週のデータをメモ化
  const lastWeekTotals = useMemo(() => {
    console.log('先週のカテゴリ合計の計算');
    const lastWeekLogs = LastWeekData.logs as StudyLog[];
    return {
      プログラミング: getTotalMinutesByCategory(lastWeekLogs, 'プログラミング'),
      読書: getTotalMinutesByCategory(lastWeekLogs, '読書'),
      英語: getTotalMinutesByCategory(lastWeekLogs, '英語'),
    };
  }, []); // 空の依存配列 → 初回レンダリング時のみ実行

  // 今週のデータは毎回計算（logsの変更を反映するため）
  console.log('今週のカテゴリ合計の計算');
  const currentCategoryTotals = {
    プログラミング: getTotalMinutesByCategory(logs, 'プログラミング'),
    読書: getTotalMinutesByCategory(logs, '読書'),
    英語: getTotalMinutesByCategory(logs, '英語'),
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {Object.entries(currentCategoryTotals).map(([category, total]) => (
        <div key={category} className='p-4 border border-gray-400 rounded-xl bg-white/50 backdrop-blur-sm space-y-2'>
          <div className='flex items-center justify-between gap-2'>
            <h3 className='font-semibold text-sm'>{category}</h3>
            <span className='text-3xl'>{getCategoryIcon(category)}</span>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <p className='text-2xl font-bold'>
              {total || 0}
              <span className='text-sm text-gray-500'> 分</span>
            </p>
            <p className='text-gray-500 text-sm'>
              <span className='mr-2 text-gray-300 text-2xl'>/</span>
              {lastWeekTotals[category as keyof typeof lastWeekTotals] || 0}
              分（先週）
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryData;
