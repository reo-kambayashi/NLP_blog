---
title: "The Llama 3 Herd of Models (2024)"
date: "2025-06-07"
---

## arXiv
https://arxiv.org/abs/2407.21783

## 要約
- Llama-3に関する研究開発
- 15.6Tトークンで学習された8B,70B,405Bのdense Transformer
- 128Kトークンのコンテクストウィンドウ
- **DPO！！！**
- 4oとかClaude3.5とかに匹敵するレベル
- Llama-2 70BとLlama-3 8Bが同じぐらいの性能

## 学習方法
1. 教師なし学習により、大量のテキストコーパスから学習
2. 現在のモデルでプリファレンスデータ（出力を人手で比較評価したやつ）を作成し、報酬モデリングを実施
3. 現在のモデル＋報酬モデルSFT用のデータを作成し、ベースモデルをチューニング
4. プリファレンスデータをLLMにマッチさせるようにDPOでベストモデルを更新

## 開発における3つの主要要素
### データ
- 事前、事後両方の学習でのデータの質と量が向上
- データミックスは、一般知識50％、数学的推論25％、コード17％、多言語トークン8％
- 安全性のためのデータフィルタリング
### スケール
- Llama 2の最大verより約50倍の計算量でモデルを訓練
### 複雑性の管理
- 標準のdense Transformerのアーキテクチャを採用
- MoEは複雑だから避けて安定性重視
	- MoEってなんですかの人はこちら
	- https://www.ibm.com/jp-ja/think/topics/mixture-of-experts

## Llama 2からの変更点
### PPO → DPO
- ここで出てきますねDPO
### データ量
- 1.8兆tokens → 15兆tokens
### モデルアーキテクチャの微変更
- Grouped Query Attention(GQA)の採用
	- GQAのGemini解説: https://g.co/gemini/share/5a3c1c47f73d
	- 推論速度向上
	- デコード中のキャッシュサイズ削減
- トークンボキャブラリの拡張
	- tiktokenトークナイザの100K+非英語言語用の28Kトークン
	- 英語データの圧縮率が3.17文字/token から3.94文字/token に向上
		- 同じ計算量でいっぱい読める
	- RoPEベースの周波数ハイパラが増加
		- RoPEは位置情報を位置の加算じゃなくて回転するやつ
		- 500,000に増加(何が嬉しいのかよくわからなかった)

## 感想
- もうDPOしか頭に入ってこなかった
- RoPEのところの話があんまり理解できなかった
- やっぱりLlamaは安全性にすごい気を使っていそう

## 著者(多すぎ)
[Aaron Grattafiori](https://arxiv.org/search/cs?searchtype=author&query=Grattafiori,+A), [Abhimanyu Dubey](https://arxiv.org/search/cs?searchtype=author&query=Dubey,+A), [Abhinav Jauhri](https://arxiv.org/search/cs?searchtype=author&query=Jauhri,+A), [Abhinav Pandey](https://arxiv.org/search/cs?searchtype=author&query=Pandey,+A), [Abhishek Kadian](https://arxiv.org/search/cs?searchtype=author&query=Kadian,+A), [Ahmad Al-Dahle](https://arxiv.org/search/cs?searchtype=author&query=Al-Dahle,+A), [Aiesha Letman](https://arxiv.org/search/cs?searchtype=author&query=Letman,+A), [Akhil Mathur](https://arxiv.org/search/cs?searchtype=author&query=Mathur,+A), [Alan Schelten](https://arxiv.org/search/cs?searchtype=author&query=Schelten,+A), [Alex Vaughan](https://arxiv.org/search/cs?searchtype=author&query=Vaughan,+A), [Amy Yang](https://arxiv.org/search/cs?searchtype=author&query=Yang,+A), [Angela Fan](https://arxiv.org/search/cs?searchtype=author&query=Fan,+A), [Anirudh Goyal](https://arxiv.org/search/cs?searchtype=author&query=Goyal,+A), [Anthony Hartshorn](https://arxiv.org/search/cs?searchtype=author&query=Hartshorn,+A), [Aobo Yang](https://arxiv.org/search/cs?searchtype=author&query=Yang,+A), [Archi Mitra](https://arxiv.org/search/cs?searchtype=author&query=Mitra,+A), [Archie Sravankumar](https://arxiv.org/search/cs?searchtype=author&query=Archie), [Artem Korenev](https://arxiv.org/search/cs?searchtype=author&query=Korenev,+A), [Arthur Hinsvark](https://arxiv.org/search/cs?searchtype=author&query=Hinsvark,+A), [Arun Rao](https://arxiv.org/search/cs?searchtype=author&query=Rao,+A), [Aston Zhang](https://arxiv.org/search/cs?searchtype=author&query=Zhang,+A), [Aurelien Rodriguez](https://arxiv.org/search/cs?searchtype=author&query=Rodriguez,+A), [Austen Gregerson](https://arxiv.org/search/cs?searchtype=author&query=Gregerson,+A), [Ava Spataru](https://arxiv.org/search/cs?searchtype=author&query=Spataru,+A), [Baptiste Roziere](https://arxiv.org/search/cs?searchtype=author&query=Roziere,+B), [Bethany Biron](https://arxiv.org/search/cs?searchtype=author&query=Biron,+B), [Binh Tang](https://arxiv.org/search/cs?searchtype=author&query=Tang,+B), [Bobbie Chern](https://arxiv.org/search/cs?searchtype=author&query=Chern,+B), [Charlotte Caucheteux](https://arxiv.org/search/cs?searchtype=author&query=Caucheteux,+C), [Chaya Nayak](https://arxiv.org/search/cs?searchtype=author&query=Nayak,+C), [Chloe Bi](https://arxiv.org/search/cs?searchtype=author&query=Bi,+C), [Chris Marra](https://arxiv.org/search/cs?searchtype=author&query=Marra,+C), [Chris McConnell](https://arxiv.org/search/cs?searchtype=author&query=McConnell,+C), [Christian Keller](https://arxiv.org/search/cs?searchtype=author&query=Keller,+C), [Christophe Touret](https://arxiv.org/search/cs?searchtype=author&query=Touret,+C), [Chunyang Wu](https://arxiv.org/search/cs?searchtype=author&query=Wu,+C), [Corinne Wong](https://arxiv.org/search/cs?searchtype=author&query=Wong,+C), [Cristian Canton Ferrer](https://arxiv.org/search/cs?searchtype=author&query=Ferrer,+C+C), [Cyrus Nikolaidis](https://arxiv.org/search/cs?searchtype=author&query=Nikolaidis,+C), [Damien Allonsius](https://arxiv.org/search/cs?searchtype=author&query=Allonsius,+D), [Daniel Song](https://arxiv.org/search/cs?searchtype=author&query=Song,+D), [Danielle Pintz](https://arxiv.org/search/cs?searchtype=author&query=Pintz,+D), [Danny Livshits](https://arxiv.org/search/cs?searchtype=author&query=Livshits,+D), [Danny Wyatt](https://arxiv.org/search/cs?searchtype=author&query=Wyatt,+D), [David Esiobu](https://arxiv.org/search/cs?searchtype=author&query=Esiobu,+D), [Dhruv Choudhary](https://arxiv.org/search/cs?searchtype=author&query=Choudhary,+D), [Dhruv Mahajan](https://arxiv.org/search/cs?searchtype=author&query=Mahajan,+D), [Diego Garcia-Olano](https://arxiv.org/search/cs?searchtype=author&query=Garcia-Olano,+D), [Diego Perino](https://arxiv.org/search/cs?searchtype=author&query=Perino,+D), [Dieuwke Hupkes](https://arxiv.org/search/cs?searchtype=author&query=Hupkes,+D), [Egor Lakomkin](https://arxiv.org/search/cs?searchtype=author&query=Lakomkin,+E), [Ehab AlBadawy](https://arxiv.org/search/cs?searchtype=author&query=AlBadawy,+E), [Elina Lobanova](https://arxiv.org/search/cs?searchtype=author&query=Lobanova,+E), [Emily Dinan](https://arxiv.org/search/cs?searchtype=author&query=Dinan,+E), [Eric Michael Smith](https://arxiv.org/search/cs?searchtype=author&query=Smith,+E+M), [Filip Radenovic](https://arxiv.org/search/cs?searchtype=author&query=Radenovic,+F), [Francisco Guzmán](https://arxiv.org/search/cs?searchtype=author&query=Guzm%C3%A1n,+F), [Frank Zhang](https://arxiv.org/search/cs?searchtype=author&query=Zhang,+F), [Gabriel Synnaeve](https://arxiv.org/search/cs?searchtype=author&query=Synnaeve,+G), [Gabrielle Lee](https://arxiv.org/search/cs?searchtype=author&query=Lee,+G), [Georgia Lewis Anderson](https://arxiv.org/search/cs?searchtype=author&query=Anderson,+G+L), [Govind Thattai](https://arxiv.org/search/cs?searchtype=author&query=Thattai,+G), [Graeme Nail](https://arxiv.org/search/cs?searchtype=author&query=Nail,+G), [Gregoire Mialon](https://arxiv.org/search/cs?searchtype=author&query=Mialon,+G), [Guan Pang](https://arxiv.org/search/cs?searchtype=author&query=Pang,+G), [Guillem Cucurell](https://arxiv.org/search/cs?searchtype=author&query=Cucurell,+G), [Hailey Nguyen](https://arxiv.org/search/cs?searchtype=author&query=Nguyen,+H), [Hannah Korevaar](https://arxiv.org/search/cs?searchtype=author&query=Korevaar,+H), [Hu Xu](https://arxiv.org/search/cs?searchtype=author&query=Xu,+H), [Hugo Touvron](https://arxiv.org/search/cs?searchtype=author&query=Touvron,+H), [Iliyan Zarov](https://arxiv.org/search/cs?searchtype=author&query=Zarov,+I), [Imanol Arrieta Ibarra](https://arxiv.org/search/cs?searchtype=author&query=Ibarra,+I+A), [Isabel Kloumann](https://arxiv.org/search/cs?searchtype=author&query=Kloumann,+I), [Ishan Misra](https://arxiv.org/search/cs?searchtype=author&query=Misra,+I), [Ivan Evtimov](https://arxiv.org/search/cs?searchtype=author&query=Evtimov,+I), [Jack Zhang](https://arxiv.org/search/cs?searchtype=author&query=Zhang,+J), [Jade Copet](https://arxiv.org/search/cs?searchtype=author&query=Copet,+J), [Jaewon Lee](https://arxiv.org/search/cs?searchtype=author&query=Lee,+J), [Jan Geffert](https://arxiv.org/search/cs?searchtype=author&query=Geffert,+J), [Jana Vranes](https://arxiv.org/search/cs?searchtype=author&query=Vranes,+J), [Jason Park](https://arxiv.org/search/cs?searchtype=author&query=Park,+J), [Jay Mahadeokar](https://arxiv.org/search/cs?searchtype=author&query=Mahadeokar,+J), [Jeet Shah](https://arxiv.org/search/cs?searchtype=author&query=Shah,+J), [Jelmer van der Linde](https://arxiv.org/search/cs?searchtype=author&query=van+der+Linde,+J), [Jennifer Billock](https://arxiv.org/search/cs?searchtype=author&query=Billock,+J), [Jenny Hong](https://arxiv.org/search/cs?searchtype=author&query=Hong,+J), [Jenya Lee](https://arxiv.org/search/cs?searchtype=author&query=Lee,+J), [Jeremy Fu](https://arxiv.org/search/cs?searchtype=author&query=Fu,+J), [Jianfeng Chi](https://arxiv.org/search/cs?searchtype=author&query=Chi,+J), [Jianyu Huang](https://arxiv.org/search/cs?searchtype=author&query=Huang,+J), [Jiawen Liu](https://arxiv.org/search/cs?searchtype=author&query=Liu,+J), [Jie Wang](https://arxiv.org/search/cs?searchtype=author&query=Wang,+J), [Jiecao Yu](https://arxiv.org/search/cs?searchtype=author&query=Yu,+J), [Joanna Bitton](https://arxiv.org/search/cs?searchtype=author&query=Bitton,+J), [Joe Spisak](https://arxiv.org/search/cs?searchtype=author&query=Spisak,+J), [Jongsoo Park](https://arxiv.org/search/cs?searchtype=author&query=Park,+J), [Joseph Rocca](https://arxiv.org/search/cs?searchtype=author&query=Rocca,+J), [Joshua Johnstun](https://arxiv.org/search/cs?searchtype=author&query=Johnstun,+J), [Joshua Saxe](https://arxiv.org/search/cs?searchtype=author&query=Saxe,+J), [Junteng Jia](https://arxiv.org/search/cs?searchtype=author&query=Jia,+J) et al. (460 additional authors not shown)