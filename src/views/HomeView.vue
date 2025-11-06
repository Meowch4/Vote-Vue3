<template>
  <main class="flex flex-col h-[100vh] overflow-hidden">


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
  </main>
</template>



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
