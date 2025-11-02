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
        @click="handleOptionClick"
      >
        {{ option.content }}
        <span class="pl-2">{{ isVotedByCurrentUser[option.optionId] ? '✔️' : '' }}</span>
        <span class="ml-auto mr-2">{{ optionVotes[option.optionId].length }} 票</span>
        <span>{{ optionPercentage[option.optionId] }}</span>
        <div 
        class="absolute bottom-0 left-4 right-4 bg-sky-500 h-[2px]"
        :style="{width: optionPercentage[option.optionId]}"
        ></div>
      </li>
    </ul>
    <div class="flex justify-between items-center mx-4 h-12 text-base">
      <span class="">{{ voteInfo.vote.deadline }}</span>
      <span> 吐个槽 | 举报投票 </span>
    </div>
    <button 
    v-if="showCompleteButton"
    class="bg-blue-500 text-white rounded m-4 p-2 flex justify-center text-lg"
    >
    完成</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { computed, reactive, ref, watchEffect } from 'vue'
import { useVoteStore } from '@/stores/vote'

var route = useRoute()
var id = route.params.id
var voteStore = useVoteStore()

var res = await axios.get('/vote/' + id)
var voteInfo = reactive(res.data.result)

var displayType = computed(() => (voteInfo.vote.multiple ? '[多选]' : '[单选]'))

// 形如{选项1: [用户1，用户2]， 选项2:[用户2， 用户3]}
var optionVotes = computed(() => {
  var eachVoteCountOfOption:any = {}
  
  for (var option of voteInfo.options) {
    // vote是一张票，其voteID代表它是投给哪个选项的
    eachVoteCountOfOption[option.optionId] = voteInfo.userVotes.filter((vote: any) => vote.optionId == option.optionId)
  }
  return eachVoteCountOfOption
})

// 每个选项的百分比
// {53:66%, 54: 33%...}
var optionPercentage = computed(() => {
  var totalUsers = new Set(voteInfo.userVotes.map((it: any) => it.userId)).size
  var eachOptionPercentage: any = {}

  for (let optionId in optionVotes.value) {
    var thisOptionVoteCount = optionVotes.value[optionId]
    eachOptionPercentage[optionId] = 
    thisOptionVoteCount.length > 0 ?
    (thisOptionVoteCount.length / totalUsers * 100).toFixed(1) + '%' : 0 + '%'
  }
  return eachOptionPercentage
})

// 计算当前登录用户对每个选项有无投票
var isVotedByCurrentUser = computed(() => {
  var result: any = {}
  for (let optionId in optionVotes.value) {
    var votes = optionVotes.value[optionId]
    if (votes.some((it: any) => it.userId == voteStore.user?.userId)) {
      result[optionId] = true
    } else {
      result[optionId] = false
    }
  }
  return result
})

var showCompleteButton = computed(() => {
  if (!voteInfo.vote.anonymous) {
    return false
  } 
  var d = new Date().toISOString()
  if (d > voteInfo.vote.deadline) {
    return false
  }
  // 匿名投票                     用户在任意一个投票上投过票
  if (voteInfo.vote.anonymous && Object.values(isVotedByCurrentUser.value).some((it:any) => it == true)) {
    return false
  }
})


function handleOptionClick(optionId: number) {
  // 非匿名，点击即发起请求
  if (!voteInfo.anonymous) {
    axios.post(`/vote/${voteInfo.vote.voteId}`, {
      optionIds: [optionId]
    })
  } else {
    // 匿名投票点击只是选中该选项，点提交才发送请求，且不能再发送了


  }
}


</script>
