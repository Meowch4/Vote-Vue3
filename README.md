# Vote-Vue3 – 仿腾讯投票平台

============================

**项目简介**

一个基于 Vue3 + Vite + TypeScript 的投票应用，包含登录、投票创建、投票参与、结果展示等完整业务流程。项目以仿真实际线上投票产品为目标，从交互、逻辑到页面结构都贴合真实业务场景。

**🚀技术栈**

* Vue3 Composition API

* Vite

* TypeScript

* Pinia / Vuex 

* Vue Router

* Axios

* Tailwind / Vant

**🔥功能特性**

* 用户登录 

* 创建投票（多选 / 单选 / 匿名 / 实名）

* 设置投票标题、描述

* 参与投票

* 投票票数占比动态展示

* websocket链接实时更新投票结果

* 投票列表展示，投票编辑/删除/分享功能

**🧠亮点与技术实现**

* 使用 Composition API 进行逻辑组织，更清晰的模块化代码结构

* 使用 Pinia 管理全局状态，避免组件间数据传递混乱

* 利用 cookie 实现简单的登录状态持久化

* 使用 自定义 Hook（useLogin / useSelectOne / useWindowSize） 抽离业务逻辑，使组件高度复用

* 投票进度展示使用动画过渡效果

* 显示投票用户头像（非匿名投票）
