---
title: "Text-to-LoRA: Instant Transformer Adaption (2025)"
date: "2025-06-19"
---
## arXiv
https://arxiv.org/abs/2506.06105

## 著者
[Rujikorn Charakorn](https://arxiv.org/search/cs?searchtype=author&query=Charakorn,+R), [Edoardo Cetin](https://arxiv.org/search/cs?searchtype=author&query=Cetin,+E), [Yujin Tang](https://arxiv.org/search/cs?searchtype=author&query=Tang,+Y), [Robert Tjarko Lange](https://arxiv.org/search/cs?searchtype=author&query=Lange,+R+T)

## 要約
- 基盤モデルは汎用的でタスク固有の適応が必要
	- 従来はデータセットを使ってファインチューニングしていた
	- 時間とお金がかかるしハイパラ設定に依存
- Text-to-LoRA(T2L)
	- 自然言語によるタスクの説明から単一の前向き計算だけでLoRAアダプタを生成
- 事前学習済みのLoRAアダプタでT2Lを訓練
	- 固有アダプタと同等の性能
	- 全く未知のタスクにもゼロショットで一般化
- 基盤モデルのタスク適応を民主化する第一歩

## 用語
### LoRA
- 重み分割したやつ
### Hypernetworks
- 別のニューラルネットワークのパラメータを生成するネットワーク
$$
W_l = h_\theta (\phi_l)
$$
- $\theta$: Hypernetworkのパラメータ
- $\phi_l$: 生成したい層$l$に関する記述(どの層の重みを生成するかの指示ベクトルてきな)
- $W_l$: ベースネットの第$l$層の重み

## T2Lアーキテクチャ
$$
\Delta W_{m,l}^{(i)} \;=\; h_{\theta}\!\bigl(\operatorname{concat}\bigl[f(z_{i}),\,E[m],\,E[l]\bigr]\bigr)
$$
- $f(z_i)$: タスク記述, $E[m]$: モジュール埋め込み, $E[l]$: 層埋め込み

## ざっくり学習について
### LoRA再構成学習
- 正解LoRAと同じようなものを生成するようにL1誤差で学習
- 圧縮できて軽くて速い
- ゼロショットには弱い

### 下流タスクで直接SFT
- 入力→LoRA生成→タスク解く→ロス計算→学習
- 重いけど未知タスクにも強い

## 感想
- 論文の表を見る限りだと個別タスクごとのLoRAとほんとに同じ性能がでていてびっくり。未来を感じる。
- 各ベンチマークの詳細を調べてないからなんとも言えないかも(時間がない)
- 今度ベンチマークまとめ的な記事を作ってみようかなとも思ったり
- ゼロショット性能はちょっと弱いらしい
- Accepted at ICML 2025←ガチじゃん

