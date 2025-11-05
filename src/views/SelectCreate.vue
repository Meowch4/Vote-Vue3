<template>
  <div class="h-full bg-gray-100">
    <!-- <h1 class="py-2 text-xl bg-gray-100 font-bold flex justify-center">腾讯投票</h1> -->
    
    <NavBar title="腾讯投票" backgroud="#f3f4f6"></NavBar>

    <div class="h-full space-y-4">
      <RouterLink
        to="/create?type=single"
        class="mt-1 bg-white shadow py-2 h-2/5 w-full justify-center items-center flex flex-col"
      >
        <span class="text-[80px]">📚</span>
        <span class="px-12 py-2 bg-sky-600 text-white rounded">创建单选</span>
      </RouterLink>

      <RouterLink
        to="/create?type=multiple"
        class="bg-white shadow py-2 h-2/5 w-full justify-center items-center flex flex-col"
      >
        <span class="text-[80px]">📚</span>
        <span class="px-12 py-2 bg-sky-600 text-white rounded">创建多选</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavBar } from 'vant';
</script>