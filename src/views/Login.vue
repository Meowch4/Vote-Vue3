<template>
  <div>
    用户名：
    <input type="text" v-model="username" name="" />
    密码：
    <input type="text" v-model="password" name="" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
var username = ref('')
var password = ref('')
</script>
