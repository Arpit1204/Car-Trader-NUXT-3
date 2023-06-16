<template>
    <div>
        <CarCards v-if="cars.length" :cars="cars"/>
        <h1 class="text-red-600" v-else>No Cars Found in {{ route.params.city }} !!</h1>
    </div>
</template>

<script setup>
const route = useRoute()
const {data:cars} = await useFetchCars(route.params.city, {
    minPrice:route.query.minPrice,
    maxPrice:route.query.maxPrice,
    make:route.params.make
})

watch(()=>
    route.query, ()=>{window.location.reload(true)}
)
</script>