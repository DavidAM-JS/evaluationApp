<template>
    <v-app>
        <v-main>
            <github-app-view />
        </v-main>
    </v-app>
</template>

<script>
import GithubAppView from "./views/GithubAppView.vue";

export default {
    name: "App",

    components: {
        "github-app-view": GithubAppView,
    },

    data: () => ({
        //
    }),
};
</script>
