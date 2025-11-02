<template>
    <h1 class="p-4 text-xl border-b">
    <RouterLink to="/">
      <el-icon class="relative top-px">
        <ArrowLeftBold></ArrowLeftBold>
      </el-icon>
    </RouterLink>
    返回
  </h1>
  <div class="flex justify-center flex-col">
    <input 
    type="text" 
    placeholder="用户名"
    class="p-4 m-4 text-lg outline-none focus:ring rounded border" v-model="name" name="" />
    <input 
    type="password" 
    placeholder="密码"
    class="p-4 m-4 text-lg outline-none focus:ring rounded border" v-model="password" name="" />
  </div>
  <button class="mx-auto rounded p-4 block w-2/3 border border-blue-500 text-lg " @click="login">登陆</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useVoteStore } from '@/stores/vote'
import { useRoute, useRouter } from 'vue-router'

var name = ref('')
var password = ref('')

var voteStore = useVoteStore()

var route = useRoute()
var router = useRouter()
var next = (route.query.next ?? '/') as string

async function login() {
  try {
    var user = await axios.post('/account/login', {
      name: name.value,
      password: password.value,
    })

    voteStore.user = user.data.result
    router.replace(next)
  } catch (e) {
    alert('登录失败')
  }
}
</script>
