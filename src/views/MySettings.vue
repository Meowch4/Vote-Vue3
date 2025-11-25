<template>
  <div class="h-[100vh] bg-gray-100">
    <h1 class="p-4 text-xl border-b">
      <RouterLink to="/me">
        <el-icon class="relative top-px">
          <ArrowLeftBold></ArrowLeftBold>
        </el-icon>
      </RouterLink>
      我的设置
    </h1>
  
  
      <div class="flex items-center justify-center gap-4 p-12">
        <img class="w-20 h-20 rounded-full" :src="userInfo?.avatar"></img>
      </div>
      <RouterLink 
      to="/" 
      class="cursor-pointer relative px-4 bg-white h-20 flex items-center text-base">
        <span class="font-bold">昵称</span>
        <span class="flex items-center gap-2 ml-auto text-slate-400">
          {{ userInfo?.name }}
          <el-icon><ArrowRightBold /></el-icon>
        </span>
      </RouterLink>
  
    <button 
      @click="logout"
      class="bg-white mx-auto my-20 w-2/3 px-4 rounded border text-blue-500 text-lg font-bold border-blue-500 flex justify-center items-center h-12" 
      to="/my-votes">
        退出登录
    </button>

  </div>

</template>

<script setup lang="ts">
import axios from 'axios';
import { useVoteStore } from '@/stores/vote';
import { useRoute, useRouter } from 'vue-router';
import { useLogin } from '@/hooks';

var voteStore = useVoteStore()
var route = useRoute()
var router = useRouter()
var userInfo = voteStore.user

async function logout() {
  await axios.get('/account/logout')
  voteStore.user = null
  router.replace('/')
}
useLogin()
</script>