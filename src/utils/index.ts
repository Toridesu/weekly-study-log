import { StudyLog } from '../types';
import { CATEGORIE_VARIANTS, MOTIVATION_VARIANTS } from '../constants';

// カテゴリー固有のアイコンを取得する関数
export const getCategoryIcon = (category: string): string => {
  const categoryObject = CATEGORIE_VARIANTS.find((c) => c.category === category);
  return categoryObject?.emoji || '✏️';
};

// モチベーション固有のアイコンを取得する関数
export const getMotivationObject = (motivation: string) => {
  const motivationObject = MOTIVATION_VARIANTS.find((r) => r.rank === motivation);
  return motivationObject;
};

// logの配列を受け取り、すべての合計時間を算出する関数
export const getTotalMinutes = (logs: StudyLog[]) => {
  return logs.reduce((acc, curr) => acc + curr.minutes, 0);
};

// logの配列を受け取り、モチベーションごとの合計カウントを算出する関数
export const getTotalCountByMotivation = (logs: StudyLog[]) => {
  return logs.reduce((acc, curr) => {
    acc[curr.motivation] = (acc[curr.motivation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

// logの配列と特定の曜日を受け取り、一致する曜日のログのみを抽出する関数
const filterByDay = (logs: StudyLog[], day: string) => {
  return logs.filter((log) => log.day === day);
};

// logの配列と特定の曜日を受け取り、一致する曜日の合計時間を算出する関数
export const getTotalMinutesByDay = (logs: StudyLog[], day: string) => {
  return getTotalMinutes(filterByDay(logs, day));
};

// logの配列とカテゴリーを受け取り、一致するログのみを抽出する関数
const filterByCategory = (logs: StudyLog[], category: string) => {
  return logs.filter((log) => log.category === category);
};

// logの配列とカテゴリーを受け取り、一致するカテゴリーの合計時間を算出する関数
export const getTotalMinutesByCategory = (logs: StudyLog[], category: string) => {
  return getTotalMinutes(filterByCategory(logs, category));
};
