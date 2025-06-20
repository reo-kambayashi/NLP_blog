---
title: "Interpretability of Language Models via Task Spaces"
date: "2025-06-20"
---
## arXiv
https://arxiv.org/abs/2406.06441

## 著者
[Lucas Weber](https://arxiv.org/search/cs?searchtype=author&query=Weber,+L), [Jaap Jumelet](https://arxiv.org/search/cs?searchtype=author&query=Jumelet,+J), [Elia Bruni](https://arxiv.org/search/cs?searchtype=author&query=Bruni,+E), [Dieuwke Hupkes](https://arxiv.org/search/cs?searchtype=author&query=Hupkes,+D)

## 要約
- 入出力のベンチマークじゃない方法でモデルの解釈をしたい
- linguistic task spaces (言語タスク空間)の提案
	- LMが内部的にどのように言語現象を理解・関連付けているかを空間的に表現したもの
	- Transfer-based similarity probing, Gradient-based similarity probingで構築
	- 各タスクがどの程度似ているかを測定して、タスク間の類似性空間みたいなものをつくる
- FTGD (Fine-Tuning via Gradient Difference)
	- 特定の言語現象のみを選択的にFine Tuningする方法の提案
	- 文法的例文と非文法的例文のペアから、勾配差分(Gradient Difference)を用いて差が顕著なパラメータのみを抽出してモデルを更新
- モデルサイズが大きくなるとより抽象的な言語構造の一般化能力が向上
	- 関連するタスク間でのパラメータ共有が増加

## FTGD
- minimal pairをつかう
	- John did not see anything. (文法的)
	- John did see anything. (非文法的)
- この2つの勾配の差はその言語タスクによる学習のみを取り出したと言える
- さらに勾配差分が大きい部分のみを使うことで効率をよくしつつ情報量を保持

## Similarity Probing
- ある言語タスクが他のタスクにどう影響するかを測りたい
- Transfer Probing
	- タスクAでFTGDした時のタスクBの性能変化を見る
- Gradient Probing
	- タスクAとタスクBの勾配のサブスペースを比較
	- ざっくりどのぐらいパラメータの共有があるかという感じ

## 結果
### FTGDは全勾配のfine-tuningと同じぐらいの精度
- 各タスクの精度は保ったまま、Perplexityの増加を抑制
- 目的タスクの改善のみが行えていそう
### タスク空間は語彙ではなく言語構造でクラスタ化
-  より抽象的な言語概念を共有パラメータとしてる説
- モデル規模が大きいほどより抽象概念を一般化

## 感想
- 単純に語彙が似てるからではなく、文法的な現象に着目しているのは興味深い
- 言語分野のタスクのみに着目していたので、汎用的なタスク空間みたいなのをつくれたらおもしろそう