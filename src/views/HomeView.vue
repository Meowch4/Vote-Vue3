<script setup lang="ts"></script>

<template>
  <main class="flex flex-col h-[100vh]">
    <div class="grow">
      <RouterView></RouterView>
    </div>
    <div class="h-12 flex justify-center">
      <RouterLink to="/select-create" class="basis-0 grow flex flex-col items-center">
        <span>➕</span>
        <span>新建投票</span>
      </RouterLink>
      <RouterLink to="/me" class="basis-0 grow flex flex-col items-center">
        <span>🧑</span>
        <span>我的</span>
      </RouterLink>
    </div>
  </main>
</template>
