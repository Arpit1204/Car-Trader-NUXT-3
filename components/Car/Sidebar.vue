<template>
    <div class="shadow border w-96 mr-10 z-30 h-[190px]">
      <!-- Location -->
      <div class="py-5 px-2 w-48 flex justify-between relative cursor-pointer border-b">
        <h3>Location</h3>
        <h3 @click="updateModal('location')" class="text-blue-400 capitalize">{{ route.params.city }}</h3>
        <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
              <input v-model="city" type="text" class="border p-1 rounded" />
              <button @click="onChangeLocation" class="bg-blue-400 w-full mt-2 rounded text-white p-1">
                Apply
              </button>
            </div>
      </div>
      <!-- Location Ends -->

      <!-- Make Start -->
      <div class="p-5 flex justify-between relative cursor-pointer border-b">
        <h3>Make</h3>
        <h3 @click="updateModal('make')" class="text-blue-400 capitalize">{{ route.params.make || 'Any' }}</h3>
        <div
        v-if="modal.make"
        class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white">
        <h4 @click="onChangemake(make)" v-for="make in makes" :key="make" class="w-1/3" >
        {{ make }}
        </h4>
      </div>
      </div>
      <!-- Make Ends -->

      <!-- Price Start -->
      <div class="p-5 flex justify-between relative cursor-pointer border-b">
        <h3>Price</h3>
        <h3 @click="updateModal('price')" class="text-blue-400 capitalize">{{ priceRangeText }}</h3>
        <div v-if="modal.price" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
          <input class="border p-1 rounded" type="number" placeholder="Min" v-model="priceRange.min">
          
          
          <input class="border p-1 rounded" type="number" placeholder="Max" v-model="priceRange.max">
          <h3 class="text-rose-700">{{ priceError }}</h3>
          <button @click="onChangePrice" class="bg-blue-400 w-full mt-2 rounded text-white p-1">
                Apply
              </button>
          </div>
      </div>
      <!-- Price ends -->
    </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const priceError = ref('')
const priceRange = ref({
  max:"",
  min:""
})
const priceRangeText = computed(()=>{
  const minPrice = route.query.minPrice
  const maxPrice = route.query.maxPrice

  if(!maxPrice && !minPrice){
    return "Any"
  } 
  else if(!minPrice && maxPrice){
    return `< $${maxPrice}`
  }
  else if(minPrice && !maxPrice){
    return `> $${minPrice}`
  }
  else{
    return `$${minPrice}-${maxPrice}`
  }
})
const {makes} = useCars()
const city = ref('')
const modal = ref({
  location:false,
  make:false,
  price:false
})

const updateModal = (key) => {
    modal.value[key] = !modal.value[key] 
}

const onChangeLocation = ()=>{
  if(!city.value){
    return
  }
  if(!isNaN(parseInt(city.value))){
    throw createError({
      statusCode:400,
      message:'Invalid City Format!'
    })
  }
  console.log(city);
  updateModal('location')
  navigateTo(`/city/${city.value}/car/${route.params.make}`)
  city.value = ''
}

const onChangemake = (make) =>{
updateModal("make")
navigateTo(`/city/${route.params.city}/car/${make}`)
}

const onChangePrice = () =>{

  if(priceRange.value.max && priceRange.value.min){
    if(priceRange.value.min > priceRange.value.max){
      priceError.value = "Min Price can't be greater!"
      return;
  }
  }
  router.push({
    query:{
      minPrice:priceRange.value.min,
      maxPrice:priceRange.value.max
    }
  })
  updateModal('price')
  priceError.value = ''

 
}

</script>