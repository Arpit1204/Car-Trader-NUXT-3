<template>
  <div class="w-full">
    <ClientOnly>
    <CarCard
      :favored="car.id in favorite"
      v-for="car in cars"
      :key="car.id"
      :car="car"
      @favor="handleFavorite"
    />
  </ClientOnly>

  </div>
</template>

<script setup>
const props = defineProps({
  cars:Array
})


const favorite = useLocalStorage("favorite", {});

const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true,
    };
  }
};
</script>