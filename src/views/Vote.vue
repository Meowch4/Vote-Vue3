<template>
  <div class="bg-gray-100 flex flex-col h-[100vh]">
    <h1 class="py-2 text-xl">
      <RouterLink to="/">
        <el-icon><House /></el-icon>
      </RouterLink>
      腾讯投票
    </h1>

    <div class="relative">
      <span
        class="cursor-pointer bg-blue-500 text-white rounded-full w-10 h-10 absolute top-0 right-4 p-4 flex justify-center items-center"
      >
        <el-icon :size="24"><Share /></el-icon>
      </span>

      <h2 class="ml-4 my-2 text-2xl font-bold">{{ voteInfo.vote.title }}</h2>
      <h3 class="my-2 py-1">
        <span class="ml-4">{{ voteInfo.vote.desc }}</span>
        <span class="text-blue-500 text-base">{{ displayType }}</span>
      </h3>
    </div>

    <ul class="space-y-3">
      <li
        class="relative px-4 flex items-center bg-white shadow h-16"
        v-for="(option, idx) in voteInfo.options"
        :key="idx"
      >
        {{ option.content }}
        <span>✔️</span>
        <span class="ml-auto mr-2">4票</span>
        <span>27.3%</span>
        <div class="absolute bottom-0 bg-sky-500 w-1/3 h-[2px]"></div>
      </li>
    </ul>
    <div class="flex justify-between items-center mx-4 h-12 text-base">
      <span class="">{{ voteInfo.vote.deadline }}</span>
      <span> 吐个槽 | 举报投票 </span>
    </div>
    <button class="bg-blue-500 text-white rounded m-4 p-2 flex justify-center text-lg">完成</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { computed, reactive, ref } from 'vue'

var route = useRoute()
var id = route.params.id

var res = await axios.get('/vote/' + id)
var voteInfo = reactive(res.data.result)

var displayType = computed(() => (voteInfo.vote.multiple ? '[多选]' : '[单选]'))
</script>
