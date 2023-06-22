<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input v-model="message.name" type="text" class="border p-1" placeholder="Name" />
      <input v-model="message.email" type="text" class="border p-1" placeholder="Email" />
      <input v-model="message.phone" type="text" class="border p-1" placeholder="Phone" />
    </div>
    <div class="flex mt-4 w-[600px]">
      <textarea v-model="message.message" class="border p-1 w-full" placeholder="Message"></textarea>
    </div>
    <button @click="onSubmit" :disabled="disabledButton" class="bg-blue-400 text-white px-10 py-3 rounded mt-4">
      Submit!!!
    </button>
    <p v-if="mess.errorMess" class="mt-3 text-red-400">{{ mess.errorMess }}</p>
    <p v-if="mess.successMess" class="mt-3 text-green-400">{{ mess.successMess }}</p>

  </div>
</template>

<script setup>
const route = useRoute()
const mess = ref({
  successMess:'',
  errorMess:''
})
const message = ref({
  name: "",
    email: "",
    phone: "",
    message: ""
})
  
   
  
const disabledButton = computed(()=>{
  for(let key in message.value){
    if(!message.value[key]){
      return true
    }

  }
  return false
})

const onSubmit = async() =>{
  const body = {
        ...message.value,
  };

    try {
        const res =  await $fetch(`/api/car/listings/${route.params.id}/message`,{
            method:"post",
            body
        })
        mess.value.errorMess = ''
        message.value = {
          name: "",
    email: "",
    phone: "",
    message: ""
        }
        mess.value.successMess = 'Message Sent!!'

    } catch (err) {
       mess.value.errorMess = err.statusMessage 
    }

}
</script>