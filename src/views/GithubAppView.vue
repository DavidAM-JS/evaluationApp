<template>
    <div class="github-app-view" :class="{ 'dark-theme': darkTheme }">
        <profle-card :darkTheme="darkTheme" @toogle-theme="toogleTheme" />
    </div>
</template>

<script>
import ProfileCard from "../components/ProfileCard.vue";

export default {
    components: {
        "profle-card": ProfileCard,
    },

    data: () => ({
        darkTheme: false,
    }),

    methods: {
        toogleTheme(data) {
            this.darkTheme = data;
        },
    },
};
</script>

<style>
.github-app-view {
    height: 100%;
    overflow: auto;
}

.github-app-view.dark-theme {
    background: linear-gradient(to right, #434343 0%, black 100%);
}
</style>
