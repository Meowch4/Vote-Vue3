<template>
  <div>投票{{ id }}界面</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
var route = useRoute()
var id = route.params.id
</script>
