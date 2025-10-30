<template>
  <RouterLink
    to="/create?type=single"
    class="h-1/2 w-full justify-center items-center flex flex-col"
  >
    <span class="text-[80px]">📚</span>
    <span class="px-12 py-2 bg-sky-600 text-white rounded">创建单选</span>
  </RouterLink>
  <RouterLink
    to="/create?type=multiple"
    class="h-1/2 w-full justify-center items-center flex flex-col"
  >
    <span class="text-[80px]">📚</span>
    <span class="px-12 py-2 bg-sky-600 text-white rounded">创建多选</span>
  </RouterLink>
</template>
