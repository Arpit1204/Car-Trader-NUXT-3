<template>
    <div class="even:bg-gray-100 p-4">
      <h1 class="font-fold text-2xl">{{ mess.name }}</h1>
      <p class="text-gray-700">
        {{ mess.message }}
      </p>
      <div class="flex items-center mt-4">
        <p class="text-green-700 mr-10">{{ mess.email }}</p>
        <p class="text-blue-500">{{ mess.phone }}</p>
      </div>
    </div>
  </template>

  <script setup>
  const props = defineProps(['mess'])
</script>