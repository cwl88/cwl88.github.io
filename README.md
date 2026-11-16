# 万里长城 · 数字大本营

把散落的知识、作品与思考，一块一块垒进这座城。永久存放，随时调用。

访问地址：<https://cwl88.github.io>

## 站点结构

| 文件 | 栏目 | 用途 |
| --- | --- | --- |
| `index.html` | 首页 | 星空首屏 + 城中五处总览 + 关于 |
| `brick.html` | 万里砖 | 干货、作品 |
| `beacon.html` | 烽火台 | 深度长文、思考 |
| `tower.html` | 眺望塔 | 常用工具、资源导航 |
| `notes.html` | 青砖录 | 随笔、日记 |
| `letter.html` | 飞鸽传书 | 联系方式、留言 |
| `assets/style.css` | —— | 全站样式 |
| `assets/site.js` | —— | 星空、滚动、年度进度条 |

## 往里填内容

每个栏目页里都有虚线「空位（.slot）」模板，把 `<div class="slot">…</div>`
替换成 `<article class="tile">…</article>` 即可（每页底部有可展开的代码示例）。

## 更新发布

```bash
git add .
git commit -m "更新内容"
git push
```

推送到 `main` 分支后，GitHub Pages 约 1 分钟后自动重新部署。
