export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  url?: string;
  readDate: string;
  rating: number; // 1-5
  tags: string[];
  summary: string;
  keyFindings: string[];
  methodology: string;
  strengths: string[];
  weaknesses: string[];
  futureWork: string;
  personalNotes: string;
}

export interface PaperFormData {
  title: string;
  authors: string;
  venue: string;
  year: string;
  url: string;
  readDate: string;
  rating: string;
  tags: string;
  summary: string;
  keyFindings: string;
  methodology: string;
  strengths: string;
  weaknesses: string;
  futureWork: string;
  personalNotes: string;
}
