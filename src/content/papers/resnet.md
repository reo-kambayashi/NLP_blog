---
title: "ResNet: Deep Residual Learning for Image Recognition"
date: "2023-12-10"
---

## はじめに

ResNet（Residual Network）は、2016年にMicrosoft Researchから発表された深層畳み込みニューラルネットワークのアーキテクチャです。この研究は、深層学習における最も重要なブレークスルーの一つとして認識されています。

## 背景と動機

### 深いネットワークの課題

従来の深層ニューラルネットワークでは、以下の問題が指摘されていました：

1. **勾配消失問題**: ネットワークが深くなるほど、逆伝播時に勾配が小さくなってしまう
2. **最適化の困難**: 深いネットワークの学習は非常に困難
3. **性能の飽和**: 一定の深さを超えると性能が向上しない、または悪化する

### 重要な観察

著者らは重要な観察を行いました：

> 理論的には、より深いネットワークは浅いネットワークの性能を下回ることはないはずである（浅いネットワークの構造を含むため）

しかし実際には、深いネットワークの方が性能が悪くなることが多く観察されていました。

## 残差学習の提案

### 残差ブロックの設計

ResNetの核心的アイデアは、**残差学習（Residual Learning）**です：

```
H(x) = F(x) + x
```

ここで：
- `H(x)`: 理想的なマッピング
- `F(x)`: 残差関数（学習対象）
- `x`: 入力

### Skip Connection

![ResNet Block Architecture]

残差ブロックは以下の要素から構成されます：

1. **メインパス**: 畳み込み層、バッチ正規化、活性化関数
2. **ショートカット接続**: 入力を出力に直接加算
3. **最終活性化**: 残差と入力の和に対する活性化関数

```python
def residual_block(x):
    # メインパス
    F_x = conv_bn_relu(x)
    F_x = conv_bn(F_x)
    
    # ショートカット接続
    H_x = F_x + x
    
    # 最終活性化
    return relu(H_x)
```

## アーキテクチャの詳細

### ResNet-50の構造

| 層 | 出力サイズ | 残差ブロック |
|---|-----------|-------------|
| conv1 | 112×112 | 7×7, 64, stride 2 |
| conv2_x | 56×56 | 3×3 max pool, stride 2<br>[1×1, 64; 3×3, 64; 1×1, 256] × 3 |
| conv3_x | 28×28 | [1×1, 128; 3×3, 128; 1×1, 512] × 4 |
| conv4_x | 14×14 | [1×1, 256; 3×3, 256; 1×1, 1024] × 6 |
| conv5_x | 7×7 | [1×1, 512; 3×3, 512; 1×1, 2048] × 3 |
| - | 1×1 | average pool, 1000-d fc, softmax |

### ボトルネック設計

深いネットワーク（ResNet-50/101/152）では、計算効率のためボトルネック設計を採用：

- **1×1 conv**: チャンネル数を削減
- **3×3 conv**: 特徴抽出
- **1×1 conv**: チャンネル数を復元

## 実験結果

### ImageNet分類

| Model | Top-1 Error | Top-5 Error | Parameters |
|-------|-------------|-------------|------------|
| VGG-16 | - | 7.3% | 138M |
| ResNet-50 | 24.7% | 7.8% | 25.6M |
| ResNet-101 | 23.6% | 7.1% | 44.5M |
| ResNet-152 | 23.0% | **6.7%** | 60.2M |

### 他のタスクでの性能

1. **CIFAR-10**: エラー率6.43%
2. **Pascal VOC 2007**: mAP 76.4%
3. **MS COCO**: 様々な検出タスクで最高性能

## 技術的詳細

### 実装のポイント

1. **初期化**: Heの初期化を使用
2. **バッチ正規化**: 各畳み込み層の後に適用
3. **学習率スケジューリング**: エポック数に応じて学習率を調整
4. **データ拡張**: ランダムクロッピング、水平反転など

### 学習戦略

```python
# 学習設定例
optimizer = SGD(lr=0.1, momentum=0.9, weight_decay=1e-4)
scheduler = MultiStepLR(optimizer, milestones=[30, 60, 90], gamma=0.1)
```

## 理論的解析

### 勾配の流れ

残差接続により、勾配は以下のように流れます：

```
∂loss/∂x = ∂loss/∂H(x) × (1 + ∂F(x)/∂x)
```

これにより、勾配消失が防がれます。

### 最適化の観点

残差学習は、恒等写像の学習を容易にします：
- もし恒等写像が最適なら、`F(x) = 0`を学習すれば良い
- これは通常の学習よりも簡単

## 影響と応用

### 後続研究への影響

ResNetの登場により、以下の研究が活発化：

1. **DenseNet**: より密な接続構造
2. **Highway Networks**: ゲート機構付きの skip connection
3. **ResNeXt**: 複数パスの残差学習
4. **SE-Net**: チャンネル注意機構の導入

### 実用的応用

- **コンピュータビジョン**: 画像分類、物体検出、セグメンテーション
- **医療画像解析**: 診断支援システム
- **自動運転**: 画像認識システム
- **産業応用**: 品質検査、異常検知

## 実装例

### PyTorchでの基本的な実装

```python
import torch
import torch.nn as nn

class BasicBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super(BasicBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, 
                              kernel_size=3, stride=stride, padding=1)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.conv2 = nn.Conv2d(out_channels, out_channels, 
                              kernel_size=3, stride=1, padding=1)
        self.bn2 = nn.BatchNorm2d(out_channels)
        
        self.shortcut = nn.Sequential()
        if stride != 1 or in_channels != out_channels:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, 
                         kernel_size=1, stride=stride),
                nn.BatchNorm2d(out_channels)
            )
    
    def forward(self, x):
        residual = self.shortcut(x)
        out = torch.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += residual
        out = torch.relu(out)
        return out
```

## 個人的考察

ResNetは、深層学習の発展において真のパラダイムシフトをもたらしました。単純ながら効果的なアイデアにより、それまで不可能だった極めて深いネットワークの学習を実現し、コンピュータビジョンタスクの性能を大幅に向上させました。

特に印象的なのは、**シンプルさと効果の両立**です。skip connectionという直観的なアイデアが、勾配消失という根本的な問題を解決し、深層学習の実用性を飛躍的に高めました。

この研究により、現在に至るまで深層ニューラルネットワークの標準的な構成要素として残差接続が広く使われており、AIの実用化に大きく貢献しています。

## 参考文献

1. He, K., Zhang, X., Ren, S., & Sun, J. (2016). Deep residual learning for image recognition. CVPR.
2. He, K., Zhang, X., Ren, S., & Sun, J. (2016). Identity mappings in deep residual networks. ECCV.
3. Szegedy, C., et al. (2017). Inception-v4, inception-resnet and the impact of residual connections on learning. AAAI.
