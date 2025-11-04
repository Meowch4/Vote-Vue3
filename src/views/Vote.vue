<template>
  <div class="bg-gray-100 flex flex-col h-[100vh]">
    <h1 class="py-4 p-4 text-xl">
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
        class=""
        v-for="(option, idx) in voteInfo.options"
        :key="idx"
      >
        <div 
        class="bg-white shadow px-4 "
        :class="{
          'hover:bg-blue-300 cursor-pointer': !pastDeadline,
          'cursor-default opacity-70': pastDeadline
        }"
        @click="!pastDeadline && handleOptionClick(option.optionId)"
        >
          <div class="relative flex items-center h-16">
            {{ option.content }}

            <span
              v-if="isVoting && option.optionId == lastVotedIndex"
              class="flex items-center align-center pl-2 animate-spin"
            >
              <el-icon><Loading /></el-icon>
            </span>
            <span v-else class="pl-2">{{ optionChecked[option.optionId] ? '✔️' : '' }}</span>

            <span class="ml-auto mr-2">{{ optionVotes[option.optionId].length }} 票</span>
            <span class="w-14 text-right">{{ optionPercentage[option.optionId] }}</span>
            <div
              class="transition-all absolute bottom-0 bg-sky-500 h-[2px]"
              :style="{ width: optionPercentage[option.optionId] }"
            ></div>
          </div>
        </div>
        <div 
        v-if="!voteInfo.vote.anonymous && visibleAvatars(idx).length > 0"
        ref="avatarContainer"
        class="flex flex-wrap gap-2 px-4 pt-2 mt-2">
          <img
            class="inline-block align-top w-8 h-8 rounded-full border border-slate-500"
            v-for="user in visibleAvatars(idx)"
            :src="user.avatar"
            alt=""
          />
          <el-icon 
          class="cursor-pointer inline-block align-top !w-8 !h-8 rounded-full border border-slate-500"
          @click="eachOptionAvatarDisplay[idx]=true"
          ><More /></el-icon>
        </div>
      </li>
    </ul>
    <div class="flex justify-between items-center m-4 h-12 text-base">
      <span class="text-slate-500">投票截止:{{ localDate }}</span>
      <span class="text-slate-500"> 吐个槽 | 举报投票 </span>
    </div>
    <button
      @click="submit"
      v-if="showCompleteButton"
      :disabled="selectedOptionId.length == 0"
      class="disabled:bg-gray-500 bg-blue-500 text-white rounded m-4 p-2 flex justify-center text-lg"
    >
      完成
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { useVoteStore } from '@/stores/vote'
import { useWindowSize } from '@/hooks'
import { useElementSize } from '@vueuse/core'

var route = useRoute()
var id = route.params.id
var voteStore = useVoteStore()

var res = await axios.get('/vote/' + id)
var voteInfo = reactive(res.data.result)

var iso = voteInfo.vote.deadline
const localDate = new Date(iso).toLocaleString()

var displayType = computed(() => (voteInfo.vote.multiple ? '[多选]' : '[单选]'))

// 形如{选项1: [用户1，用户2]， 选项2:[用户2， 用户3]}
var optionVotes = computed(() => {
  var eachVoteCountOfOption: any = {}

  for (var option of voteInfo.options) {
    // vote是一张票，其voteID代表它是投给哪个选项的
    eachVoteCountOfOption[option.optionId] = voteInfo.userVotes.filter(
      (vote: any) => vote.optionId == option.optionId,
    )
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
      thisOptionVoteCount.length > 0
        ? ((thisOptionVoteCount.length / totalUsers) * 100).toFixed(1) + '%'
        : 0 + '%'
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

var pastDeadline = computed(() => {
  var d = new Date().toISOString()
  if (d > voteInfo.vote.deadline) {
    return true
  }
  return false
})

// 实名，直接点击即可投票
// 匿名，需要选择选项后再点击完成按钮
var showCompleteButton = computed(() => {
  // 实名投票不显示完成按钮（点击即可切换选项）
  if (!voteInfo.vote.anonymous) {
    return false
  }
  // 过期不显示完成按钮
  if (pastDeadline) {
    return false
  }
  // 匿名投票
  // 且用户在任意一个投票上投过票 不显示完成按钮
  if (
    voteInfo.vote.anonymous &&
    Object.values(isVotedByCurrentUser.value).some((it: any) => it == true)
  ) {
    return false
  }
  return true
})

var selectedOptionId = ref<number[]>([])

// 返回对象，因为对勾的表达式是
// isVotedByCurrentUser[option.optionId] ? '✔️' : ''
var optionChecked = computed(() => {
  // 在未投票的时候选中哪个选项哪个选项打勾
  // 需要把selectedOptionId（数组）转换成对象
  if (showCompleteButton.value) {
    let result: any = {}
    for (let optionId of selectedOptionId.value) {
      result[optionId] = true
    }
    return result
  }
  // 在投过票之后才通过isVoted来决定在哪个选项显示对勾
  return isVotedByCurrentUser.value
})

// 使用了VueUse
// 计算的是元素尺寸，所以pc端也没问题
var avatarContainer = ref(null)
// 上面这个ref可能传给了多个元素所以可能是数组
// 只要ref用在v-for里的就都是数组，不管长度多少
var firstAvatarContainer = computed(() => {
  return avatarContainer.value?.[0] 
})
var { width } = useElementSize(firstAvatarContainer)
var avatarCount2 = computed(() => {
  return Math.floor(((width.value) + 8) / 40)
})

// 根据窗口宽度计算可以显示的头像个数
// 在pc浏览器上可能会有问题，因为pc浏览器有滚动条
var size = useWindowSize()
var avatarCount = computed(() => {
  return Math.floor(((size.value.width - 32) + 8) / 40)
})

// 创建与选项数量等长的填满false的数组
var eachOptionAvatarDisplay = ref<boolean[]>(new Array(voteInfo.options.length).fill(false))

function visibleAvatars(optionIdx: number) {
  // 解构出当前选项的optionId
  let {optionId} = voteInfo.options[optionIdx]
  // 如果当前选项头像展开为true
  if (eachOptionAvatarDisplay.value[optionIdx]) {
    return optionVotes.value[optionId]
  } else {
    // 如果没展开就要slice
    return optionVotes.value[optionId].slice(0, avatarCount2.value - 1)
  }
}


var isVoting = ref(false) // 是否正在发送请求，用来显示loading
var lastVotedIndex = ref(-1) // 最后一次投票的id，用来显示loading

function handleOptionClick(optionId: number) {
  // 非匿名，点击即发起请求
  if (!voteInfo.vote.anonymous) {
    if (showCompleteButton.value) {
      isVoting.value = true
      lastVotedIndex.value = optionId
  
      axios
        .post(`/vote/${voteInfo.vote.voteId}`, {
          optionIds: [optionId],
        })
        .then((res) => {
          // console.log(res.data.result)
          isVoting.value = false
          voteInfo.userVotes = res.data.result.userVotes
        })
    }
  } else {
    if (showCompleteButton.value) {
      // 匿名投票点击只是选中该选项，点提交才发送请求，且不能再发送了
      if (selectedOptionId.value.includes(optionId)) {
        var idx = selectedOptionId.value.indexOf(optionId)
        selectedOptionId.value.splice(idx, 1)
      } else {
        if (!voteInfo.vote.multiple) {
          // 单选时只能选一项，所以一定是数组中只有一个元素
          selectedOptionId.value = [optionId]
        } else {
          selectedOptionId.value.push(optionId)
        }
      }
    } else {
      alert('已投过票！')
    }
  }
}

function submit() {
  axios
    .post(`/vote/${voteInfo.vote.voteId}`, {
      optionIds: selectedOptionId.value,
    })
    .then((res) => {
      // console.log(res.data.result)
      voteInfo.userVotes = res.data.result.userVotes
    })
}

onMounted(() => {
  var ws = new WebSocket(`ws://${location.host}/realtime-voteinfo/${id}`)
  ws.onmessage = (e) => {
    var userVotes = JSON.parse(e.data)
    voteInfo.userVotes = userVotes
  }
})
</script>
