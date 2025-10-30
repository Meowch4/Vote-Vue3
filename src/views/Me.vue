<template>
  <div class="flex items-center gap-2">
    <img class="w-20 h-20 rounded-full" src="https://www.dummyimage.com/600x400/6c6dc7/ffffff"></img>
    <span>名字</span>
  </div>
  <div class="flex flex-col">
    <RouterLink to="/my-votes">我的投票</RouterLink>
    <RouterLink to="/">个人设置</RouterLink>
    <RouterLink to="/">反馈建议</RouterLink>
  </div>
</template>