---
title: Blogを始めてみた
date: "2019-09-04"
description: "Blogに使った技術とその選定基準の紹介"
---

このブログの作成談。リポジトリは以下。

[https://github.com/yamatatsu/blog](https://github.com/yamatatsu/blog)

## TL;DR

[remark](https://github.com/remarkjs/remark)と[ejs](https://github.com/mde/ejs)で作った

## 歴史

1. まず Gatsby で始めてみた。[これ](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/)
2. AMP 対応してみた
3. Gatsby 余計だな。remark-react で作り直すべ。
4. react 邪魔だな。remark だけ使って作り直すべ。
5. なう

## Gatsby を捨てた理由

- たかが Blog が SPA で出来上がることに違和感があった
- Gatsby は AMP であっても問答無用で SPA 用の js を取ってこようとするので邪魔
  - 生成された html から script タグ消せばできそうだけど、そもそもいらんよな？ってなった

## react を捨てた理由

- 静的コンテンツ生成に React 使うの意味ないよなー、と
- [react-amphtml](https://github.com/dfrankland/react-amphtml)を使うに当たり、`dangerouslySetInnerHTML` って 3 回くらい書いて「？？？」ってなるなどした
- [AMP 公式のテンプレート](https://amp.dev/documentation/templates/)を楽に使いたかった

## 現在の構成

1. markdown ファイルを remark に食べさせてコンテンツ部分の html を手に入れる
2. 出てきた html を ejs テンプレートに与えて html 完成

以上。めっちゃシンプルになった。

remark はカスタマイズしていって amp の tag 吐けるようにしていかないとって感じ。

markdown の yaml header は読めるようにしたので meta 情報を markdown に記載できるようにはなってる。

## ポエム

僕は誰かの Blog を回遊することはないので、自分のブログのストーリーも同じものを意識しようと思った。
こんなストーリー。

1. Google 検索で流入
2. 記事を読む
3. 直帰

検索優位性 > 表示速度 >>>>>>> 回遊性

という優先順位。

なのでこの構成になったと思う。
