<template>
  <div class="bg-gray-200 h-[100dvh] flex flex-col">
    <div class="bg-white">
      <h1 class="font-bold text-xl mt-2">
        <RouterLink to="/">
          <el-icon class="relative top-px">
            <ArrowLeftBold></ArrowLeftBold>
          </el-icon>
        </RouterLink>
        创建{{ type }}投票
      </h1>

      <div class="flex flex-col px-4">
        <input
          type="text"
          v-model="title"
          class="border-b my-1 p-2 rounded outline-none focus:ring m-2 text-lg font-bold"
          placeholder="投票标题"
        />
        <input
          type="text"
          v-model="desc"
          class="border-b my-1 p-2 rounded outline-none focus:ring m-2"
          placeholder="补充描述（选填）"
        />
        <div
          v-for="(option, idx) of options"
          @click="deleteOption(idx)"
          :key="idx"
          class="flex gap-2 items-center"
        >
          <span
            class="font-bold cursor-pointer shrink-0 w-5 h-5 ml-4 bg-red-500 rounded-full flex justify-center items-center text-white"
          >
            <el-icon :size="12">
              <Minus></Minus>
            </el-icon>
          </span>
          <input
            type="text"
            v-model="options[idx]"
            class="w-full m-2 p-2 border-b outline-none focus:ring my-2"
            placeholder="选项"
          />
        </div>

        <div @click="addOption" class="flex gap-2 items-center">
          <span
            class="cursor-pointer shrink-0 w-5 h-5 ml-4 bg-sky-500 rounded-full flex justify-center items-center text-white"
          >
            <el-icon :size="12">
              <Plus></Plus>
            </el-icon>
          </span>
          <input
            type="text"
            class="placeholder-sky-400 w-full m-2 p-2 outline-none focus:ring my-2"
            placeholder="添加选项"
          />
        </div>
      </div>
    </div>

    <div class="bg-white mt-4 px-4">
      <div class="m-2 p-2 pt-3 border-b flex justify-between">
        截止日期
        <el-date-picker
          format="YYYY-MM-DD HH:mm"
          v-model="deadline"
          type="datetime"
          placeholder="请选择截止日期和时间"
        />
      </div>
      <div class="m-2 p-2 flex justify-between">
        匿名投票
        <el-switch v-model="anonymous" />
      </div>
      <div class="hidden m-2 p-2 border-b flex justify-between">
        限制传播
        <el-switch v-model="value1" />
      </div>
    </div>

    <button class="m-4 py-3 px-6 bg-sky-500 rounded text-white">完成</button>
  </div>
</template>

<script setup>
import { useVoteStore } from '@/stores/vote'
import { Minus, Plus } from '@element-plus/icons-vue'
import axios from 'axios'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

var voteStore = useVoteStore()
var router = useRouter()
var route = useRoute()
var type = computed(() => (route.query.type == 'single' ? '单选' : '多选'))

if (voteStore.user == null) {
  router.replace('/login?next=' + route.fullPath)
}

var title = ref('')
var desc = ref('')
var deadline = ref(new Date(Date.now() + 86400000 * 3))
var anonymous = ref('')
var multiple = type.value == '多选'
var options = ref(['', ''])

function addOption() {
  options.value.push('')
}
function deleteOption(idx) {
  options.value.splice(idx, 1)
}
function create() {
  var voteInfo = {
    title: title.value,
    desc: desc.value,
    deadline: deadline.value,
    anonymous: anonymous.value,
    multiple: multiple.value,
    options: options.value,
  }
  axios.post('/vote', voteInfo)
  console.log(res)
}
</script>

<!-- POST /vote
{
  title: string
  desc: string
  deadline: timestring
  anonymous: true/false
  multiple: true/false
  options: ['苹果', '樱桃',]
}
用当前登陆身份创建投票 -->
