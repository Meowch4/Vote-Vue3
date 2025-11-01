<template>
  <div>
    用户名：
    <input type="text" class="border" v-model="name" name="" />
    密码：
    <input type="text" class="border" v-model="password" name="" />
  </div>
  <button @click="login">登陆</button>
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
    debugger
    router.replace(next)
  } catch (e) {
    alert('登录失败')
  }
}
</script>
