<template>
    <div>
     
        <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink to="/" class="text-3xl font-mono" >Car Traders</NuxtLink>
  <div class="flex" v-if="user">
  <NuxtLink class="mr-12" to="/profile/listing">Profile</NuxtLink>
<p class="cursor-pointer" @click="logout">{{ user.user_metadata.name }}</p>
</div>
<NuxtLink  v-else to="/login">Login</NuxtLink>
  </header>
    </div>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async() =>{
const  { error } = supabase.auth.signOut()


if(error){
  console.log(error);
}
navigateTo('/')
}


</script>

