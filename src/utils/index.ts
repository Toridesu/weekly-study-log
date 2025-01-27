import { CATEGORIE_VARIANTS, MOTIVATION_VARIANTS } from "../constants";

// カテゴリー固有の絵文字を取得する関数
export const getCategoryIcon = (category: string): string => {
  const categoryObject = CATEGORIE_VARIANTS.find(
    (c) => c.category === category
  );
  return categoryObject?.emoji || "✏️";
};

// モチベーション固有のアイコンデータを取得する関数
export const getMotivationObject = (motivation: string) => {
  const motivationObject = MOTIVATION_VARIANTS.find(
    (r) => r.rank === motivation
  );
  return motivationObject;
};