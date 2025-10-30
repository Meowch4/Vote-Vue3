<template>
  <div>创建投票界面</div>
  <input
    type="text"
    class="border rounded outline-none focus:ring m-2 text-lg"
    placeholder="投票标题"
  />
  <input
    type="text"
    class="border rounded outline-none focus:ring m-2"
    placeholder="补充描述（选填）"
  />
  <input type="text" class="border rounded outline-none focus:ring m-2" placeholder="选项" />
  <input type="text" class="border rounded outline-none focus:ring m-2" placeholder="选项" />
  <button>添加选项</button>
  <div>
    截止日期
    <input type="date" class="rounded border" />
  </div>
  <div>
    匿名投票
    <input type="checkbox" name="" id="" />
  </div>
</template>
