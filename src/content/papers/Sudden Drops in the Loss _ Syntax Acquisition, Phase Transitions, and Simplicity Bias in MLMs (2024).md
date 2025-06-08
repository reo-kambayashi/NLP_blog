---
title: "Sudden Drops in the Loss: Syntax Acquisition, Phase Transitions, and Simplicity Bias in MLMs (2024)"
date: "2025-06-08"
---

## arXiv
https://arxiv.org/abs/2309.07311

## 著者
[Angelica Chen](https://openreview.net/profile?id=~Angelica_Chen1), [Ravid Shwartz-Ziv](https://openreview.net/profile?id=~Ravid_Shwartz-Ziv2), [Kyunghyun Cho](https://openreview.net/profile?id=~Kyunghyun_Cho1), [Matthew L Leavitt](https://openreview.net/profile?id=~Matthew_L_Leavitt1), [Naomi Saphra](https://openreview.net/profile?id=~Naomi_Saphra1)

## 要約
- BERTとかのMLMの学習過程で、短い期間でSASを獲得する傾向がある
- SASを獲得すると損失が急激に低下し、言語能力の獲得を促進
- SASは訓練中に操作可能
	- 抑制すると複雑な言語能力の出現が妨げられる
	- 初期段階で一時的に抑制するとモデルの品質向上、収束の加速が見られた

## 用語とか
### MLM (Masked Language Model)
- 文章中の一部の単語を隠して、その隠された単語を予測させるタスクを通じて言語を学習するモデル
- BERTなど
- 文の前後両方の文脈を同時に考慮できる
### SAS(Syntactic Attention Structure)
- モデルが特定の構文的な依存関係に注目したアテンションヘッドを形成する傾向
- MLMの学習時に明示的な帰納バイアスなしに自然発生
- SASの発現を制御→MLMの内部構造の特性と外的な能力の関係を観察
![SASの概念図](/images/スクリーンショット%202025-06-08%2021.04.25.png)

### UAS(unlabeld attatchment score)
- SASの定量化
- 言語モデルが構文解析の結果と同じように単語にアテンションを当てられているか
- 構文解析の結果と比較して予測が成功した割合を計算
### 相転移
- 非連続的な過程
- 知識の発見はスケーリング則に従わず唐突な変化を見せる

## SASを調整する手法
$$
L(x) = L_{MLM}(x) + \lambda \sum^{|x|}_{i=1} \sum_{x_{j} \in D(x_i)} \gamma(x_i, x_j)
$$
- 構文性スコア$\gamma(x_i, x_j)$を用いた正則化項を$\lambda$でスケーリング
	- $\lambda < 0$: SASを促進
	- $\lambda > 0$: SASを抑制
- $\gamma(x_i, x_j)$: 構文的に関係のある単語$i,j$間の最大アテンションの重み

## SASを初期段階で抑制するとモデル品質が向上する理由
- 代替戦略の獲得
	- ざっくりSASじゃない戦略のこと
	- 長距離の文脈を利用する戦略
- SASをよりよく学ぶための踏み台的な

## 結論
### 単純性バイアスとの関係
- モデルは学習初期でSASのような解釈しやすく単純な回を好む傾向があり
- これに固執すると長期的な性能向上を妨げる可能性
### 学習の臨界点
- フェーズ遷移(損失が急落するところ)が起きている最中に学習方法を変更するとモデルの性能が最も下がる
- 臨界点は非常に不安定

## 感想
- 学習過程での構文の獲得過程みたいなものが見れておもろい
- 最初はSASを抑制した方がいいみたいなのはwarmupとかと繋がるのかな？
- 長期的に性能をあげるための工夫が大事

