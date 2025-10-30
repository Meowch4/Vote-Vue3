<template>
  <div>创建{{ type }}投票</div>
  <el-input v-model="title" style="width: 240px" placeholder="投票标题" />
  <input
    type="text"
    class="border rounded outline-none focus:ring m-2 text-lg"
    placeholder="投票标题"
  />
  <input
    type="text"
    class="border rounded outline-none focus:ring m-2"
    placeholder="补充描述（选填）"
  />
  <input type="text" class="border rounded outline-none focus:ring m-2" placeholder="选项" />
  <input type="text" class="border rounded outline-none focus:ring m-2" placeholder="选项" />
  <button>添加选项</button>
  <div>
    截止日期
    <el-date-picker v-model="deadline" type="datetime" placeholder="Select date and time" />
  </div>
  <div>
    匿名投票
    <input type="checkbox" name="" id="" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

var route = useRoute()
var type = computed(() => (route.query.type == 'single' ? '单选' : '多选'))

var deadline = ref(null)
var title = ref('')
</script>
