<template>
  <main class="flex flex-col h-[100vh]">
    <div class="grow">
      <RouterView></RouterView>
    </div>
    <div class="h-12 flex justify-center">
      <RouterLink
        to="/select-create"
        class="text-black-500 [&.router-link-active]:text-green-500 basis-0 grow flex flex-col items-center"
      >
        <span>➕</span>
        <span>新建</span>
      </RouterLink>
      <RouterLink
        to="/me"
        class="text-black-500 [&.router-link-active]:text-green-500 basis-0 grow flex flex-col items-center"
      >
        <span>🧑</span>
        <span>我的</span>
      </RouterLink>
      <!-- router-link-active 前端路由地址以某个地址开头 -->
      <!-- router-link-exact-active 前端路由地址就是某个路由地址 -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'
import { useVoteStore } from '@/stores/vote'

var voteStore = useVoteStore()

onMounted(async () => {})
</script>
