---
title: "Attention Is All You Need"
date: "2024-01-15"
---

## 背景

Recurrent Neural Networks (RNN) や Convolutional Neural Networks (CNN) はsequence modelingにおいて主流でしたが、以下の課題がありました：

- **並列化の困難**: RNNは逐次処理のため並列化が困難
- **長距離依存関係**: 長いsequenceでの情報伝達が困難
- **計算効率**: 学習・推論に時間がかかる

## 提案手法

### Transformer アーキテクチャ

本論文では、**attention機構のみ**を使用した新しいアーキテクチャ「Transformer」を提案しました。

#### 主要コンポーネント

1. **Multi-Head Attention**
   - 複数の注意ヘッドで異なる部分空間の情報を捉える
   - Self-attentionでsequence内の全ての位置間の関係を直接モデル化

2. **Position Encoding**
   - Sinusoidal関数を使用してposition情報を埋め込み
   - RNNなしでsequenceの順序情報を保持

3. **Feed-Forward Networks**
   - 各位置に独立して適用される全結合層
   - ReLU活性化関数を使用

### 数式

Self-Attentionの計算式：

```
Attention(Q, K, V) = softmax(QK^T / √d_k)V
```

Multi-Head Attentionの計算式：

```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h)W^O
where head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
```

## 実験結果

### 機械翻訳タスク

- **WMT 2014 English-to-German**: BLEU score 28.4 (従来手法より+2.0)
- **WMT 2014 English-to-French**: BLEU score 41.8 (新記録)

### 学習効率

- **学習時間**: 従来モデルの1/3以下
- **パラメータ数**: 効率的な設計で少ないパラメータで高性能

## 影響と応用

この論文以降、Transformerは様々な分野で応用されています：

- **BERT**: 双方向Transformer for言語理解
- **GPT**: 生成的Transformer for言語生成
- **Vision Transformer**: 画像認識への応用
- **CLIP**: マルチモーダルな表現学習

## 個人的な考察

この論文は機械学習史上最も影響力のある論文の一つです。特に以下の点が革命的でした：

1. **パラダイムシフト**: RNN/CNNからattention-onlyへ
2. **スケーラビリティ**: 大規模並列処理が可能
3. **汎用性**: NLP以外の分野にも応用可能

現在のLarge Language Models (LLMs) の基礎となっており、ChatGPTやGPT-4などの成功もこの論文なしには考えられません。

## 今後の研究課題

- **効率性の改善**: O(n²)の計算量を削減する手法
- **長文書処理**: より長いsequenceを効率的に処理
- **解釈性**: attention patternの意味理解
