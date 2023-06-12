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
const {toTitleCase}  = useUtilities()
const {cars} = useCars()

const car = computed(()=>{
return cars.find((e)=>{
  return e.id === parseInt(route.params.id)
})
})
useHead({
  title: `${toTitleCase(route.params.name)}`,
});

definePageMeta({
  layout: "custom",
});

</script>