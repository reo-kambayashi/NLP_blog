import type { CollectionEntry } from "astro:content";

/**
 * 論文データの型定義
 */
export type Paper = CollectionEntry<"papers">;

/**
 * 論文のフロントマターデータの型定義
 */
export interface PaperData {
  title: string;
  date: string;
}

/**
 * 統計情報の型定義
 */
export interface PaperStats {
  total: number;
  thisYear: number;
  thisMonth: number;
}

/**
 * フィルター条件の型定義
 */
export interface FilterOptions {
  searchTerm?: string;
  year?: number;
}
