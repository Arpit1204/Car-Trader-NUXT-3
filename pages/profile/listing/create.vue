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
                <CarAddTextarea title="DesCription *" name="description"
                    placeholder="Description" @change-input="onChangeInput" />

                <CarAddImage @change-input="onChangeInput"/>
            </div>

        </div>
        {{ info.year }}
        {{ info.model }}
        {{ info.seats }}
        {{ info.city }}
        {{ info.miles }}
        {{ info.features }}
        {{ info.description }}{{ info.image }}

    </div>
</template>

<script setup>
const { makes } = useCars()
definePageMeta({
    layout: 'custom'
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
        image: null,
    }
})

const onChangeInput = (data, name) => {
    info.value[name] = data
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
        title: "Miles *",
        name: "miles",
        placeholder: "Miles",
    },
    {
        id: 4,
        title: "City *",
        name: "city",
        placeholder: "City!!",
    },
    {
        id: 5,
        title: "Number of Seats *",
        name: "seats",
        placeholder: "Seats",
    },
    {
        id: 6,
        title: "Features *",
        name: "features",
        placeholder: "e.g:- Leather Interior, No Accidents",
    },
];
</script>

