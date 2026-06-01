# 任务协作实验室 Task Collaboration Lab

一个静态产品原型，用来展示“任务发布、筛选、详情、交付记录、质量规则”的完整页面结构。项目由原概念页重构而来，弱化玩梗表达，更适合作为作品集中的产品型前端项目。

## 在线演示

[访问项目](https://aur0ra333.github.io/ai-hire-humans/)

## 功能

- 任务池：展示任务标题、分类、城市、预算、截止时间、状态和技能标签
- 筛选搜索：按任务类型和关键词筛选
- 任务详情：弹窗展示任务说明、预算、截止时间和交付要求
- 交付记录：展示已完成任务的成果摘要和审核状态
- 操作反馈：发布任务、申请认领等交互使用 toast 反馈
- 响应式布局：适配桌面和移动端浏览

## 技术点

- HTML5 语义化结构
- CSS Grid / Flexbox 响应式布局
- 原生 JavaScript 数据渲染、筛选和弹窗状态管理
- 静态产品原型的交互闭环设计

## 本地运行

```bash
git clone https://github.com/aur0ra333/ai-hire-humans.git
cd ai-hire-humans
python -m http.server 8080
```

然后访问 `http://localhost:8080`。
