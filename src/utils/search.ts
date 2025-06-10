import Fuse from 'fuse.js';
import type { CollectionEntry } from 'astro:content';

type Paper = CollectionEntry<'papers'>;

export interface SearchablePaper {
  id: string;
  title: string;
  date: string;
  year: number;
  content: string;
  slug: string;
  paper: Paper;
}

/**
 * 論文データを検索可能な形式に変換
 */
export function preparePapersForSearch(papers: Paper[]): SearchablePaper[] {
  return papers.map((paper) => ({
    id: paper.id,
    title: paper.data.title,
    date: paper.data.date,
    year: new Date(paper.data.date).getFullYear(),
    content: paper.body, // Markdownコンテンツ
    slug: paper.slug,
    paper: paper,
  }));
}

/**
 * Fuse.jsの設定オプション
 */
const fuseOptions = {
  // 検索対象のフィールド
  keys: [
    {
      name: 'title' as keyof SearchablePaper,
      weight: 0.7, // タイトルを最も重視
    },
    {
      name: 'content' as keyof SearchablePaper,
      weight: 0.3, // コンテンツは補助的
    },
  ],
  // 検索精度の設定
  threshold: 0.3, // 0.0（完全一致）〜1.0（何でもマッチ）
  distance: 100, // 検索文字列の位置的近さ
  minMatchCharLength: 2, // 最小マッチ文字数
  includeScore: true, // スコアを含める
  includeMatches: true, // マッチした部分を含める
  ignoreLocation: false, // 位置を考慮する
  findAllMatches: true, // 全てのマッチを見つける
};

/**
 * ファジー検索を実行する関数
 */
export function createPaperSearch(papers: SearchablePaper[]) {
  const fuse = new Fuse(papers, fuseOptions);
  
  return {
    /**
     * 検索実行
     */
    search: (query: string): SearchablePaper[] => {
      if (!query.trim()) {
        return papers; // 空の場合は全件返す
      }
      
      const results = fuse.search(query);
      return results.map(result => result.item);
    },
    
    /**
     * 年でフィルタリング
     */
    filterByYear: (papers: SearchablePaper[], year?: string): SearchablePaper[] => {
      if (!year) {
        return papers;
      }
      return papers.filter(paper => paper.year.toString() === year);
    },
    
    /**
     * 検索とフィルタリングを組み合わせ
     */
    searchAndFilter: (query: string, year?: string): SearchablePaper[] => {
      let results = query ? fuse.search(query).map(result => result.item) : papers;
      
      if (year) {
        results = results.filter(paper => paper.year.toString() === year);
      }
      
      return results;
    }
  };
}

/**
 /**
 * 検索結果のハイライト用にマッチした部分を取得
 */
export function highlightMatches(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * 検索統計を取得
 */
export function getSearchStats(allPapers: SearchablePaper[], filteredPapers: SearchablePaper[]) {
  return {
    total: allPapers.length,
    filtered: filteredPapers.length,
    hidden: allPapers.length - filteredPapers.length,
  };
}
