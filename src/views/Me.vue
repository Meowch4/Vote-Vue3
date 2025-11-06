<template>
  <h1 class="py-2 text-xl bg-gray-100 font-bold flex justify-center">我的</h1>

  <div class="bg-gray-100 min-h-full">

    <div class="flex items-center ml-16 py-8 gap-2">
      <img class="w-20 h-20 rounded-full" :src="userInfo!.avatar"></img>
      <span class="mx-8 text-xl font-bold">{{ userInfo!.name }}</span>
    </div>

    <div class="bg-white flex flex-col  text-lg devide-y">
      <RouterLink class="px-4 border-y flex justify-between items-center h-20" 
      to="/my-votes">
        <span>我的投票</span>
        <el-icon><ArrowRightBold /></el-icon>
      </RouterLink>
      <RouterLink class="px-4 border-y flex justify-between items-center h-20" 
      to="/my-settings">
        <span>个人设置</span>
        <el-icon><ArrowRightBold /></el-icon>
      </RouterLink>
      <RouterLink class="px-4 border-y flex justify-between items-center h-20" 
      to="/">
        <span>反馈建议</span>
        <el-icon><ArrowRightBold /></el-icon>
      </RouterLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote';
import { useLogin } from '../hooks'

useLogin()
var votestore = useVoteStore()
var userInfo = votestore.user
</script>