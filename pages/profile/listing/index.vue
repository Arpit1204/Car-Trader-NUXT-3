<template>
    <div>
<div class="flex justify-between mt-24 items-center">
<h1 class="text-6xl">My Listings!</h1>
<NuxtLink to="/profile/listing/create" class="w-8 h-8 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer">+</NuxtLink>
</div>
    <div class="shadow rounded p-3 mt-5">
        <CarListingCard v-for="list in listings" :key="list.id" :listing="list"/>
    </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout:'custom'
})

const {listings} = useCars()
</script>

