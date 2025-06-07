---
title: "Large Language Models Are Human-Level Prompt Engineers (2023)"
date: "2025-06-06"
---

## 著者
[Yongchao Zhou](https://arxiv.org/search/cs?searchtype=author&query=Zhou,+Y), [Andrei Ioan Muresanu](https://arxiv.org/search/cs?searchtype=author&query=Muresanu,+A+I), [Ziwen Han](https://arxiv.org/search/cs?searchtype=author&query=Han,+Z), [Keiran Paster](https://arxiv.org/search/cs?searchtype=author&query=Paster,+K), [Silviu Pitis](https://arxiv.org/search/cs?searchtype=author&query=Pitis,+S), [Harris Chan](https://arxiv.org/search/cs?searchtype=author&query=Chan,+H), [Jimmy Ba](https://arxiv.org/search/cs?searchtype=author&query=Ba,+J)

## arXivリンク
https://arxiv.org/abs/2211.01910

## 要約
- プロンプトエンジニアリングを自動化する「Automatic Prompt Engineer (APE)」を提案
-  ざっくり**LLMにLLMのプロンプトを考えさせる**手法。
- APEは人間が時間をかけて考えたものと同等かそれ以上の性能を達成
-  APEのステップ
	- LLMに「こういう入力をしたらこういう出力をする」という例を見せて、指示文の候補をいっぱい作らせる
	- 候補を試し、その結果をスコアリング
	- 最も高いスコアの指示を最良のプロンプトとする

## Abstract
- LLMは汎用的でいいけど「人間が望むことをさせる」のって難しいよね
	- →プロンプト大事
- 幅広いプロンプトを試す必要があるけどどの指示がどのモデルでいいのかわからない
- LLMを自然言語でプログラムが指定されるブラックボックスなコンピュータとみなそう
### 提案手法(APE)
ゼロショット学習において24件中24件のInstruction Inductionタスクと21件中17件のBig-Benchタスクで人間レベルの性能を達成

## APEのアルゴリズム(お気持ちベース)
### "提案→評価とフィルタリング→選択"のサイクルを自動化
### 指示候補の提案
- LLMにタスクの入出力例を見せ、タスクの遂行用指示文をいっぱい考えさせる。
- 順方向生成
	- 例を先に提示し、最後にこういう指示でしたと続ける
- 逆方向生成
	- <ここに指示を挿入>的な感じで穴埋め問題にして、その後に例を提示
### 評価・フィルタリング
指示候補を使って、実際に別のLLMにタスクを解かせ、その性能をスコア付け
#### 評価基準
- **実行精度 (Execution accuracy)**: 指示通りにタスクを実行した結果が、想定される正解と一致したかどうかで評価
- **対数尤度 (Log probability)**: どれだけ正解に近い答えを生成できそうかを確率で評価
#### フィルタリング
- 少数の訓練データで候補を評価
- スコアが良かった上位数パーを残して破棄
- 残ったものを別の訓練データで再評価
- これを繰り返して少数の交互に絞る
#### 選択
- フィルタリングで残った候補から最も高いスコアのものを採用

## APEを使った結果
-  ゼロショットで24個のInstruction Inductionタスク全てにおいて、人間が作成したプロンプトと同等かそれ以上の性能を達成
-  フューショットで24タスク中21タスクで性能が向上するか、同等の結果
- 高難易度タスク(BIG-Bench)でも17/21で同等かそれ以上
## いい感じの発見
### Zero-shot Chain-of-Thought
- "Let's think step by step."をAPEが改善
	- "Let's work this out in a step by step way to be sure we have the right answer"のほうがいいらしい
### TruthfulQA
- APEがLLMの応答スタイルを制御して「真実性」と「情報提供性」のトレードオフを発見
	- 真実性をあげるために嘘をつかせないプロンプト(you have no comment→回答を拒否する選択肢をあたえる)をAPEが見つけた

## 結論
人間による入力を最小限にしつつ、最適なプロンプトをみつける方法としてAPEは有用

## 感想
- プロンプト集みたいなのがよくネットに転がってるけどこういうのでちゃんと性能が確認されているのか気になった。
- 人間が直感的にわかりやすいプロンプトと、LLMがいい性能を示すプロンプトがちょっとちがっておもろい
- モデル間でも最適なプロンプトがちがって、InstractGPTで最適なプロンプトをGPT-3で用いるとスコアが下がることがあるらしい←自分が使ってるモデルで最適なのを調べる必要あり
- ↑モデルごと違うならそれこそ自動化とかしないと見つけるの大変そう
