import type { CollectionEntry } from "astro:content";
import { getCurrentYear, getCurrentMonth, getPapersFromYear, getPapersFromYearMonth } from "./date";

type Paper = CollectionEntry<"papers">;

/**
 * 統計情報の型定義
 */
export interface PaperStats {
  total: number;
  thisYear: number;
  thisMonth: number;
}

/**
 * 論文リストを日付でソート（新しい順）
 */
export function sortPapersByDate(papers: Paper[]): Paper[] {
  return papers.sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

/**
 * 論文の統計情報を計算
 */
export function calculatePaperStats(papers: Paper[]): PaperStats {
  const currentYear = getCurrentYear();
  const currentMonth = getCurrentMonth();
  
  return {
    total: papers.length,
    thisYear: getPapersFromYear(papers, currentYear).length,
    thisMonth: getPapersFromYearMonth(papers, currentYear, currentMonth).length,
  };
}

/**
 * 論文から一意の年のリストを取得
 */
export function getUniqueYears(papers: Paper[]): number[] {
  const years = papers.map(paper => new Date(paper.data.date).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
}
