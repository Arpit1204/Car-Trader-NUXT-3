<template>
    <div>
        <div class="mt-24">
            <h1 class="text-xl">
                Create a New Listing
            </h1>
            <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
                <CarAddSelect title="Make *" :options="makes" name="make" @change-input="onChangeInput" />
                <CarAddInput v-for="input in inputs" :key="input.id" :title="input.title" :name="input.name"
                    :placeholder="input.placeholder" @change-input="onChangeInput" />
                <CarAddTextarea title="DesCription *" name="description" placeholder="Description"
                    @change-input="onChangeInput" />

                <CarAddImage @change-input="onChangeInput" />
                
                <button @click="handleSubmit" :disabled="isButtonDisabled"  class="bg-blue-400 text-white rounded py-2 px-7 mt-3">Submit</button>
                <p v-if="errorMessage" class="mt-3 text-red-400">{{ errorMessage }}</p>
            </div>
        </div>


    </div>
</template>

<script setup>
const { makes } = useCars()
const user = useSupabaseUser()
definePageMeta({
    layout: 'custom',
    middleware: [
        "auth"
    ]
})

const info = useState('addInfo', () => {
    return {
        make: "",
        model: "",
        year: "",
        miles: "",
        price: "",
        city: "",
        seats: "",
        features: "",
        description: "",
        image: "image",
    }
})

const errorMessage = ref('')

const onChangeInput = (data, name) => {
    info.value[name] = data
    console.log(info.value.image);
}


const handleSubmit = async() =>{
    const body = {
        ...info.value,
        features: info.value.features.split(", "),
        city:info.value.city.toLowerCase(),
        numberOfSeats:parseInt(info.value.seats),
        miles:parseInt(info.value.miles),
        price:parseInt(info.value.price),
        year:parseInt(info.value.year),
        name:`${info.value.make} ${info.value.model}`,
        listerId:user.value.id
    };

    delete body.seats;

    try {
        const res =  await $fetch("/api/car/listings",{
            method:"post",
            body
        })
        navigateTo('/profile/listing')
    } catch (err) {
       errorMessage.value = err.statusMessage 
    }
}
const inputs = [
    {
        id: 1,
        title: "Model *",
        name: "model",
        placeholder: "Model",
    },
    {
        id: 2,
        title: "Year *",
        name: "year",
        placeholder: "Year",
    },
    {
        id: 3,
        title: "Price *",
        name: "price",
        placeholder: "Price",
    },
    {
        id: 4,
        title: "Miles *",
        name: "miles",
        placeholder: "Miles",
    },
    {
        id: 5,
        title: "City *",
        name: "city",
        placeholder: "City!!",
    },
    {
        id: 6,
        title: "Number of Seats *",
        name: "seats",
        placeholder: "Seats",
    },
    {
        id: 7,
        title: "Features *",
        name: "features",
        placeholder: "e.g:- Leather Interior, No Accidents",
    },
];

const isButtonDisabled = computed(() => {
    for (let key in info.value) {
        if (!info.value[key]) {
            return true
        }
    }
    return false
})


</script>

