---
title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
date: "2024-01-20"
---

## 導入

BERT (Bidirectional Encoder Representations from Transformers) は、Google AI Language チームによって開発された画期的な言語モデルです。従来の言語モデルが一方向（左から右、または右から左）の文脈しか見ないのに対し、BERTは**双方向**の文脈を同時に考慮できる点が革新的でした。

## 背景と動機

### 従来手法の限界

1. **ELMo**: 双方向だが、left-to-right と right-to-left を独立に学習
2. **GPT**: 強力だが一方向のみ（left-to-right）
3. **従来の転移学習**: タスク固有のアーキテクチャが必要

### BERTの目標

- **双方向文脈**: 両方向の情報を同時に活用
- **タスク非依存**: 様々なNLPタスクに適用可能
- **ファインチューニング**: 少ない追加パラメータで高性能

## 手法

### 1. 事前学習タスク

#### Masked Language Model (MLM)
- 入力の15%のトークンをマスク
- マスクされたトークンを予測
- 双方向の文脈を学習可能

```
Input:  [CLS] my dog is [MASK] [SEP]
Target: [CLS] my dog is cute [SEP]
```

#### Next Sentence Prediction (NSP)
- 二つの文が連続しているかを予測
- 文レベルの関係性を学習

```
Input:  [CLS] The man went to the store. [SEP] He bought milk. [SEP]
Label:  IsNext

Input:  [CLS] The man went to the store. [SEP] Penguins are flightless. [SEP]
Label:  NotNext
```

### 2. アーキテクチャ

- **Base**: L=12, H=768, A=12, Total Parameters=110M
- **Large**: L=24, H=1024, A=16, Total Parameters=340M

Where:
- L = Transformer layers数
- H = Hidden size
- A = Attention heads数

### 3. ファインチューニング

各タスクに応じて出力層を追加し、エンドツーエンドでファインチューニング：

- **分類タスク**: [CLS]トークンの表現を使用
- **系列ラベリング**: 各トークンの表現を使用
- **質問応答**: スパン予測のための出力層

## 実験結果

### GLUE Benchmark

| Task | Metric | BERT-Base | BERT-Large | Previous SOTA |
|------|--------|-----------|------------|---------------|
| MNLI | Accuracy | 84.6 | 86.7 | 86.3 |
| QQP | Accuracy | 89.2 | 89.3 | 86.1 |
| QNLI | Accuracy | 90.5 | 92.7 | 87.4 |
| SST-2 | Accuracy | 93.5 | 94.9 | 95.8 |

### SQuAD 1.1

- **BERT-Large**: F1 93.2, EM 87.4
- **Previous SOTA**: F1 91.8, EM 85.8

### SQuAD 2.0

- **BERT-Large**: F1 83.1, EM 80.0
- **Previous SOTA**: F1 76.3, EM 73.7

## アブレーション研究

### NSPの効果
- NSPありのBERT: 84.4% (MNLI)
- NSPなしのBERT: 84.0% (MNLI)
- → NSPは小さいが一定の効果

### 双方向性の重要性
- 双方向BERT: 84.4% (MNLI)
- Left-to-Right: 81.4% (MNLI)
- Left-to-Right + Right-to-Left: 82.1% (MNLI)

### モデルサイズの影響
- より大きなモデルほど性能向上
- 事前学習データが豊富なら、大きなモデルが有効

## 影響と応用

BERTの登場により、NLP分野は大きく変化しました：

### 後続モデル
- **RoBERTa**: BERTの改良版、NSPを除去
- **ALBERT**: パラメータ共有による軽量化
- **DistilBERT**: 知識蒸留による高速化
- **ELECTRA**: より効率的な事前学習

### 応用分野
- **検索エンジン**: Google検索でBERTを活用
- **チャットボット**: 文脈理解の向上
- **翻訳**: より自然な翻訳
- **要約**: 文書要約の精度向上

## 個人的な感想

BERTは「事前学習 + ファインチューニング」のパラダイムを確立し、現在のLLMブームの基礎を築きました。特に印象的なのは：

1. **シンプルさ**: 複雑なタスク固有アーキテクチャが不要
2. **汎用性**: 一つのモデルで多様なタスクに対応
3. **性能**: 大幅な性能向上を実現

ただし、計算コストの高さや、より大きなモデルでのスケーリング特性については、当時は十分に議論されていませんでした。

## 今後の課題

BERTから学んだ教訓と今後の方向性：

- **効率性**: より少ない計算で同等の性能
- **長文書処理**: 512トークンの制限を超える処理
- **マルチモーダル**: テキスト以外のデータとの統合
- **解釈性**: モデルの判断根拠の理解
