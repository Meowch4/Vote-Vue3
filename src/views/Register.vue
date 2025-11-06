<template>
  <div class="flex items-center h-12 border border-rounded">
    <input type="text" v-model="name" placeholder="用户名" />
  </div>
  <div class="flex items-center h-12 border border-rounded">
    <input type="password" v-model="password" placeholder="密码" />
  </div>
  <div class="flex items-center h-12 border border-rounded">
    <input type="text" v-model="email" placeholder="邮箱" />
  </div>
  <div class="flex items-center h-12 border border-rounded"><input type="file" ref="avatar" /></div>
  <div class="flex items-center h-12 border border-rounded">
    <button @click="register" type="button" :disabled="!avatarUrl">注册</button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

var avatar = ref<null | HTMLInputElement>(null)
var avatarUrl = ref('')

onMounted(() => {
  avatar.value!.addEventListener('change', async (e) => {
    var file = avatar.value!.files![0]
    if (!file) return
    var fd = new FormData()
    fd.append('avatar', file)
    var urls = await fetch('/upload', {
      method: 'post',
      body: fd,
    }).then((it) => it.json())
    avatarUrl.value = urls[0]
  })
})

var name = ref('')
var password = ref('')
var email = ref('')

function register() {
  axios.post('/account/register', {
    name: name.value,
    password: password.value,
    avatar: avatarUrl.value,
    email: 'test@qq.com',
  })
}
</script>
