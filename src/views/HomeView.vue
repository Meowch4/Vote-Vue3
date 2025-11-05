<template>
  <main class="flex flex-col h-[100vh] overflow-hidden">
    <!-- <SelectCreate v-if="activeIdx == 0"></SelectCreate>
    <Me v-else></Me> -->

    <!-- <component :is="comps[activeIdx]"></component> -->

    <RouterView/>
    <div>
      <Tabbar route v-model="activeIdx">
        <TabbarItem to="/select-create" icon="plus">
            <span>新建</span>
        </TabbarItem>
        <TabbarItem to="/me" icon="user-circle-o">
            <span>我的</span>
        </TabbarItem>
      </Tabbar>
    </div>
    <!-- <div class="h-18 flex justify-center bg-white border-t">
      <RouterLink
        to="/select-create"
        class="text-black-500 [&.router-link-active]:text-green-500 basis-0 grow flex flex-col items-center"
      >
        <span>➕</span>
        <span>新建</span>
      </RouterLink>
      <RouterLink
        to="/me"
        class="text-black-500 [&.router-link-active]:text-green-500 basis-0 grow flex flex-col items-center"
      >
        <span>🧑</span>
        <span>我的</span>
      </RouterLink>
    </div> -->
  </main>
</template>

<!-- router-link-active 前端路由地址以某个地址开头 -->
<!-- router-link-exact-active 前端路由地址就是某个路由地址 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useVoteStore } from '@/stores/vote'
import { Tabbar, TabbarItem } from 'vant'
import SelectCreate from './SelectCreate.vue'
import Me from './Me.vue'

var voteStore = useVoteStore()
var activeIdx = ref(0)
var comps:any = ref({
  0: SelectCreate,
  1: Me,
})

</script>
