<template>
  <h1 class="p-4 text-xl border-b">
    <RouterLink to="/me">
      <el-icon class="relative top-px">
        <ArrowLeftBold></ArrowLeftBold>
      </el-icon>
    </RouterLink>
    我的投票
  </h1>

  <div class="divide-y w-full">
    <div class="" v-for="(vote, idx) of myVotes" :key="vote.id">
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
import { useVoteStore } from '@/stores/vote'
import { useRoute, useRouter } from 'vue-router'
import { useLogin, useSelectOne } from '../hooks'

var isLogin = useLogin()
var myVotes = ref([])

if (isLogin) {
var res = await axios.get('/vote')

  myVotes.value = res.data.result
}


var [selectedIdx, setIdx] = useSelectOne()

</script>
