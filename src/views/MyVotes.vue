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
import { ref, reactive } from 'vue'

var res = await axios.get('/vote')
var myVotes = reactive(res.data.result)

function useSelectOne() {
  var selectedIdx = ref(-1)

  function setSelect(idx: number) {
    if (selectedIdx.value == idx) {
      selectedIdx.value = -1
    } else {
      selectedIdx.value = idx
    }
  }

  return [selectedIdx, setSelect] as const // 如果不as const,则这个数组的类型会被推导为(xxx|yyy)[],解构出的第一项就是xxx|yyy
}

var [selectedIdx, setIdx] = useSelectOne()
</script>
