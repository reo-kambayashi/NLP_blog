/**
 * 日付関連のユーティリティ関数
 */

/**
 * 日付文字列を日本語形式でフォーマット
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ja-JP");
}

/**
 * 現在の年を取得
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * 現在の月を取得（1-12）
 */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

/**
 * 指定された年の論文数を取得
 */
export function getPapersFromYear(papers: { data: { date: string } }[], year: number): { data: { date: string } }[] {
  return papers.filter(
    (paper) => new Date(paper.data.date).getFullYear() === year
  );
}

/**
 * 指定された年月の論文数を取得
 */
export function getPapersFromYearMonth(papers: { data: { date: string } }[], year: number, month: number): { data: { date: string } }[] {
  return papers.filter((paper) => {
    const paperDate = new Date(paper.data.date);
    return (
      paperDate.getFullYear() === year &&
      paperDate.getMonth() + 1 === month
    );
  });
}
