---
title: "Do Music Generation Models Encode Music Theory?"
date: "2025-06-28"
---
## arXiv
https://arxiv.org/abs/2410.00872

## 著者
[Megan Wei](https://arxiv.org/search/cs?searchtype=author&query=Wei,+M), [Michael Freeman](https://arxiv.org/search/cs?searchtype=author&query=Freeman,+M), [Chris Donahue](https://arxiv.org/search/cs?searchtype=author&query=Donahue,+C), [Chen Sun](https://arxiv.org/search/cs?searchtype=author&query=Sun,+C)

##  ざっくり
- 音楽生成モデルが音楽理論をエンコードしてるのかを、概念ごと(コード、テンポ、スケールとか)にデータセットを用意して確認しよう
	- エンコードしている = probe modelが内部表現から音楽理論の概念をデコードできる
- SynTheory
	- データセット
	- Tempo(テンポ), Time Signature(拍子), Notes(音符？音階？), Intervals(インターバル), Scales(スケール), Chords(コード), Chord Progressions(コード進行)の7つそれぞれ
- 結果
	- 人手の特徴量よりprobe modelのスコアが高い
	- エンコードできてるっぽい

## models & features
### Jukebox
- 音楽生成モデル
- VQ-VAEモデルとTransformer decoder で構成
- 音声波形を離散的なコードに符号化して、decoderがコード化された音声を出力
### MusicGen
- 音楽生成モデル
- 事前学習済みの畳み込みオートエンコーダー(EnCodec)、事前学習済みT5テキストエンコーダー(未使用)、音響トランスフォーマーデコーダーからなる
- MusicGen Audio Codec
	- EnCodec部分
	- 音声を再構築する役割
- MusicGen Decoder LM(S,M,L)
	- 音響トランスフォーマーデコーダー部分

### Features
- Mel Spectrogram
- MFCC
- Constant-Q Chromagram
- Aggregate Hand-crafted (上の三つ合わせたもの)

## probe model
- 線形と2-layerのMLP(512 hidden, ReLU)
- 目的関数
	- Tempo: MSE回帰, 指標 $R^2$
	- Others: Cross-Entropy, 指標 Accuracy
- データは70/15/15でスプリット
- probeの精度でその層のベクトルにそれだけ音楽的概念が表れているかを測る

## SynTheory
- 完全合成かつ著作権フリー
- 音楽理論の7概念を1つずつ切り出し、概念の混ざりを解消
### リズム系
- Tempo
- Time Signature
- クリック音とリバーブ差分
### 調性系
- Notes
- Intervals
- Scales
- Chords
- Chord Progressions
- すべて4拍子, BPM120、ピッチ関連のみ変化

### 結果
![img|500](https://i.gyazo.com/6af93cb5155e7a6bc3778cd320236c75.png)
- y軸は各概念の評価の平均

![img](https://i.gyazo.com/6b949f9a565d799c684344cf30a4b78d.png)
- 各モデル/特徴量の概念ごとのprobe結果(最高スコアの1層を採用)
- Jukebox LMが一番いい
	- 上のグラフだと最後下がっているのが気になるところ
- MusicGenはなぜかサイズが小さい方がAverageが高い
	- 詳細分析はなかった

## 結論
- モデルは音楽理論をエンコードしてるっぽい
- 特徴量よりもいい感じにエンコードしてるっぽい

## 感想
- 論文に音楽の用語が出てくるだけで興奮できる
- probing scoreの最高スコアの層を採用しているのが、最終的な出力と関係ない感じがして疑問
- 音楽関連のベンチマークとかモデルとかにも詳しくなっていきたい