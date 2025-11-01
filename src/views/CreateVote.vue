<template>
  <div class="bg-gray-200 h-[100dvh] flex flex-col">
    <div class="bg-white pt-2 space-y-1">
      <h1 class="font-bold text-xl p-4">
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
          class="transition border-b my-1 p-2 rounded outline-none focus:ring m-2 text-xl font-bold"
          placeholder="投票标题"
        />
        <input
          type="text"
          v-model="desc"
          class="transition border-b my-1 p-2 rounded outline-none focus:ring m-2"
          placeholder="补充描述（选填）"
        />
        <div v-for="(option, idx) of options" :key="idx" class="flex gap-2 items-center">
          <span
            @click="deleteOption(idx)"
            class="font-bold cursor-pointer shrink-0 w-5 h-5 ml-4 bg-red-500 rounded-full flex justify-center items-center text-white"
          >
            <el-icon :size="12">
              <Minus></Minus>
            </el-icon>
          </span>
          <input
            type="text"
            v-model="options[idx]"
            class="transition w-full m-2 p-2 rounded border-b outline-none focus:ring my-2"
            placeholder="选项"
          />
        </div>

        <div class="flex gap-2 items-center">
          <span
            @click="addOption"
            class="cursor-pointer shrink-0 w-5 h-5 ml-4 bg-sky-500 rounded-full flex justify-center items-center text-white"
          >
            <el-icon :size="12">
              <Plus></Plus>
            </el-icon>
          </span>
          <button
            type="text"
            @click="addOption"
            class="cursor-pointer text-sky-400 m-2 p-2 outline-none my-2"
          >
            添加选项
          </button>
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
        <el-switch />
      </div>
    </div>

    <button @click="create" class="m-4 py-3 px-6 bg-sky-500 rounded text-white">完成</button>
  </div>
</template>

<script setup>
import { useVoteStore } from '@/stores/vote'
import { Minus, Plus } from '@element-plus/icons-vue'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

var voteStore = useVoteStore()
var router = useRouter()
var route = useRoute()
var type = computed(() => (route.query.type == 'single' ? '单选' : '多选'))

onMounted(() => {
  if (voteStore.user == null) {
    router.replace('/login?next=' + route.fullPath)
  }
})

var title = ref('')
var desc = ref('')
var deadline = ref(new Date(Date.now() + 86400000 * 3))
var anonymous = ref(false)
var multiple = computed(() => type.value == '多选')
var options = ref(['', ''])

function addOption() {
  options.value.push('')
}
function deleteOption(idx) {
  options.value.splice(idx, 1)
}
async function create() {
  var voteInfo = {
    title: title.value,
    desc: desc.value,
    deadline: deadline.value,
    anonymous: anonymous.value,
    multiple: multiple.value,
    options: options.value,
  }
  var res = await axios.post('/vote', voteInfo)
  console.log(res)
  if (res.data.code == 0) {
    var id = res.data.result.voteId
    router.push('/vote/' + id)
  } else {
    voteStore.user = null
    router.push('/login?next=' + route.fullPath)
  }
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
