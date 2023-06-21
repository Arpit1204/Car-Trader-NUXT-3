<template>
  <div class="mt-10 flex w-full justify-between">
    <div class="text-center" w-full>
      <h1 class="text-5xl font-bold mb-7">Google Login!!</h1>
      <button
        @click="login('google')"
        class="bg-red-400 p-3 rounded text-white font-bold"
      >
        Login With Google
      </button>
    </div>
    <div class="text-center" w-full>
      <h1 class="text-5xl font-bold mb-7">Github Login!!</h1>
      <button
        @click="login('github')"
        class="bg-red-400 p-3 rounded text-white font-bold"
      >
        Login With Github
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});

const supabase = useSupabaseClient();

const login = async (provider) => {
  const { error } = supabase.auth.signInWithOAuth({
    provider: provider,
  });

  if (error) {
    console.log(error);
  }
};
</script>
