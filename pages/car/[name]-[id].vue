<template>
  <div v-if="car">
    <CarDetailHero :car="car"/>
    <CarDetailAttributes :features="car.features"/>
    <CarDetailDescription :description="car.description" />
    <CarDetailContact />
  </div>
</template>

<script setup>

const route = useRoute();
const { data : car} = await useFetchCar(route.params.id)
const {toTitleCase}  = useUtilities()




if(!car.value){
  throw createError({
    statusCode:404,
    message: `Car with ID ${route.params.id} does not exist.`
  })
}
useHead({
  title: `${toTitleCase(route.params.name)}`,
});

definePageMeta({
  layout: "custom",
});

</script>