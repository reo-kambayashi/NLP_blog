---
title: "The Illusion of Thinking:  Understanding the Strengths and Limitations of Reasoning Models  via the Lens of Problem Complexity (2025)"
date: "2025-06-10"
---
## 論文ページ
https://ml-site.cdn-apple.com/papers/the-illusion-of-thinking.pdf

## 著者
Parshin Shojaee, Iman Mirzadeh,  Keivan Alizadeh, Maxwell Horton, Samy Bengio, Mehrdad Farajtabar

## 要約
- リーズニングモデル(LRM)が問題が複雑になるとどのような挙動を示すか
	- 低複雑度: 標準的なLLMがLRMを上回る
	- 中複雑度: LRMが優位に立つ
	- 高複雑度: 両方のモデルが機能しなくなる(Accuracyがほぼゼロ)
- LRMは単純な問題には考えすぎるし、複雑な問題は完全に放棄する

## 問題の複雑さをどう制御するか
- 4つのパズル
	- Tower of Hanoi
	- Checker Jumping
	- River Crossing
	- Blocks World
- 問題のサイズ$N$を変更して制御

## タスクの複雑さによる挙動
### 低複雑度
- リーズニングじゃない方が性能もいいしトークン消費も少ない
### 中複雑度
- LRMが優位に
### 高複雑度
- ある複雑度の閾値を超えると両モデルで正解率がゼロに
- 性能の崩壊

## 複雑なタスクにおけるLRMの思考放棄
- 問題が複雑になるとより多くのトークンを思考に費やすようになる
- 性能が崩壊する臨界点に近づくと、逆に思考に費やすトークンが減少
	- まだトークン上限に達しそうになくてもしこうするのをやめちゃう
	- LRMの推論能力に根本的な限界

## 真の推論能力を持っているのか
- Tower of Hanoiにおいて、解法となるアルゴリズムをプロンプトで与えても、臨界点(正解率がゼロになる複雑度)がほぼ変化しなかった。
- モデルが論理的なアルゴリズムを忠実に実行するのに限界がある

## パズル間での推論能力の差
- Tower of Hanoiでは31手必要でも解ける
- River Crossingは11手でも解けない
- 学習データにハノイがいっぱいあってそこでみた解法をトレースしてるだけでは？

## 感想
- リーズニングモデルの現在の枠組みでの限界を感じた
- 人間の思考が及ばないところまで考えてほしいのに途中で放棄されてしまうと、シンギュラリティ的なものが期待できなくなってしまいそう
- サボり癖まで学習してるとかだったらむしろ面白いかも