<template>
    <v-app>
        <v-main>
            <profle-card />
        </v-main>
    </v-app>
</template>

<script>
import ProfileCard from "./components/ProfileCard.vue";

export default {
    name: "App",

    components: {
        "profle-card": ProfileCard,
    },

    data: () => ({
        //
    }),
};
</script>
