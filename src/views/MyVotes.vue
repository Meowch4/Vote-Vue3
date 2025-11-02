<template>
  <h1 class="p-4 text-xl border-b">
    <RouterLink to="/me">
      <el-icon class="relative top-px">
        <ArrowLeftBold></ArrowLeftBold>
      </el-icon>
    </RouterLink>
    我的投票
  </h1>

  <div class="divide-y mb-16">
    <div class="" v-for="(vote, idx) of myVotes" :key="vote.voteId">
      <div
        @click="setIdx(idx)"
        class="px-4 hover:bg-green-100 flex items-center justify-between h-16"
      >
        <span>{{ vote.title }}</span>
        <span>30</span>
      </div>

      <div :class="{ hidden: selectedIdx !== idx }" class="flex items-center">
        <RouterLink
          :to="`/vote/${vote.voteId}`"
          class="hover:bg-green-100 py-2 h-16 cursor-pointer flex flex-col basis-0 grow items-center justify-center border"
          ><span>📚</span>查看</RouterLink
        >
        <span
          class="hover:bg-green-100 py-2 h-16 cursor-pointer flex flex-col basis-0 grow items-center justify-center border"
          ><span>📚</span>分享</span
        >
        <span
          class="hover:bg-green-100 py-2 h-16 cursor-pointer flex flex-col basis-0 grow items-center justify-center border"
          ><span>📚</span>删除</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useLogin, useSelectOne } from '../hooks'

type VoteInfo = {
  voteId: number,
  userId: number,
  title: string, 
  desc: string,
  deadline: string,
  anonymous: number | boolean,
  multiple: number | boolean
}

var isLogin = useLogin()
var myVotes = ref<VoteInfo[]>([])

try {
  var res = await axios.get('/vote') // 如果没登陆，可能请求失败
  myVotes.value = res.data.result as VoteInfo[]
} catch (e) {
  myVotes.value = []
  useLogin()
}


var [selectedIdx, setIdx] = useSelectOne()

</script>
