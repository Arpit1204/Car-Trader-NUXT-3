<template>
    <div>
        <div class="flex justify-between mt-24 items-center">
            <h1 class="text-6xl">My Listings!</h1>
            <NuxtLink to="/profile/listing/create"
                class="w-8 h-8 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer">
                +</NuxtLink>
        </div>
        <div v-if="listings" class="shadow rounded p-3 mt-5">
            <CarListingCard v-for="list in listings" :key="list.id" :listing="list" 
            @delete-click="handleDelete"/>
        </div>
        <div v-else> Loading...</div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'custom',
    middleware: [
        "auth"
    ]
})

const handleDelete = async(id)=>{
    const res = await $fetch(`/api/car/listings/${id}`,{
        method: "DELETE"
    })

    listings.value = listings.value.filter(listing=> listing.id!=id)
}
const user = useSupabaseUser()
const { data: listings } = useFetch(`/api/car/listings/user/${user.value.id}`)
// const {listings} = useCars()
</script>

