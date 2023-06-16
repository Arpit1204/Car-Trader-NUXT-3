<template>
    <div class="mt-10">
       
        <h1 class="text-5xl font-bold mb-7">Log In!!!</h1>
            <button @click="login" class="bg-red-400 p-3 rounded text-white font-bold">
                Login With Google
            </button>

            <h1 class="text-5xl font-bold mb-7">Log In!!!</h1>
            <button @click="logina" class="bg-red-400 p-3 rounded text-white font-bold">
                Login With Github
            </button>
        
    </div>
</template>

<script setup>
definePageMeta({
    layout:'custom'
})

const supabase = useSupabaseClient()

const user = useSupabaseUser()

const login = async() =>{
const {error} = supabase.auth.signInWithOAuth({
    provider:"google"
})

if(error){
    console.log(error);
}
}

const logina = async() =>{
const {error} = supabase.auth.signInWithOAuth({
    provider:"github"
})

if(error){
    console.log(error);
}
}


</script>
