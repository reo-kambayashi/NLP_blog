import type { Paper } from '../types/paper';

export const samplePapers: Paper[] = [
  {
    id: '1',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit'],
    venue: 'NIPS',
    year: 2017,
    url: 'https://arxiv.org/abs/1706.03762',
    readDate: '2024-01-15',
    rating: 5,
    tags: ['Transformer', 'Attention', 'NLP', 'Architecture'],
    summary: 'Transformerアーキテクチャを提案した革命的な論文。RNNやCNNを使わずに、注意機構のみでsequence-to-sequenceモデルを構築。',
    keyFindings: [
      'Self-attentionのみでsequence transductionが可能',
      'RNN/CNNより高速で並列化可能',
      '機械翻訳で最高性能を達成'
    ],
    methodology: 'Encoder-Decoderアーキテクチャにマルチヘッド注意機構を適用。位置エンコーディングでsequence情報を保持。',
    strengths: [
      '並列化可能で高速',
      '長距離依存関係を効率的に捉える',
      'シンプルなアーキテクチャ'
    ],
    weaknesses: [
      '計算量がsequence長の二乗に比例',
      'メモリ使用量が大きい'
    ],
    futureWork: 'より効率的な注意機構の開発、長いsequenceへの対応',
    personalNotes: '現在のLLMの基礎となった重要な論文。実装も比較的シンプルで理解しやすい。'
  },
  {
    id: '2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
    venue: 'NAACL',
    year: 2019,
    url: 'https://arxiv.org/abs/1810.04805',
    readDate: '2024-01-20',
    rating: 5,
    tags: ['BERT', 'Pre-training', 'Bidirectional', 'Transfer Learning'],
    summary: '双方向Transformerを用いた事前学習言語モデル。Masked Language ModelingとNext Sentence Predictionで学習。',
    keyFindings: [
      '双方向の文脈を活用することで性能向上',
      '事前学習+ファインチューニングが効果的',
      '多くのNLPタスクでSOTA達成'
    ],
    methodology: 'Masked Language Modeling (MLM) と Next Sentence Prediction (NSP) による事前学習',
    strengths: [
      '双方向の文脈理解',
      '転移学習の効果が高い',
      '多様なタスクに適用可能'
    ],
    weaknesses: [
      '事前学習に大量の計算資源が必要',
      'NSPの効果に疑問の声もある'
    ],
    futureWork: 'より効率的な事前学習手法、マルチモーダル拡張',
    personalNotes: 'NLP分野を大きく変えた論文。事前学習の重要性を示した。'
  }
];

// ローカルストレージからデータを読み込む関数（ブラウザ環境でのみ利用）
export function loadPapersFromStorage(): Paper[] {
  if (typeof localStorage === 'undefined') {
    return samplePapers;
  }
  
  const stored = localStorage.getItem('papers');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return samplePapers;
    }
  }
  return samplePapers;
}

// ローカルストレージにデータを保存する関数
export function savePapersToStorage(papers: Paper[]): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('papers', JSON.stringify(papers));
  }
}

// 新しい論文を追加する関数
export function addPaper(paper: Omit<Paper, 'id'>): Paper {
  const newPaper: Paper = {
    ...paper,
    id: Date.now().toString()
  };
  
  const papers = loadPapersFromStorage();
  papers.unshift(newPaper);
  savePapersToStorage(papers);
  
  return newPaper;
}

// 論文を更新する関数
export function updatePaper(id: string, updates: Partial<Paper>): void {
  const papers = loadPapersFromStorage();
  const index = papers.findIndex(p => p.id === id);
  if (index !== -1) {
    papers[index] = { ...papers[index], ...updates };
    savePapersToStorage(papers);
  }
}

// 論文を削除する関数
export function deletePaper(id: string): void {
  const papers = loadPapersFromStorage();
  const filtered = papers.filter(p => p.id !== id);
  savePapersToStorage(filtered);
}
