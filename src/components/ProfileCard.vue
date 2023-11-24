<template>
    <v-card class="profile-card mx-auto my-12 px-5 py-5" :class="{ 'dark-theme': isDarkTheme }" :loading="loading" max-width="700" outlined elevation="5">
        <div class="card-header">
            <v-card-title class="text-h4 justify-space-between">
                Evaluation App
                <v-switch label="Dark Theme" :value="isDarkTheme" @change="toogleTheme($event)" />
            </v-card-title>
            <v-card-text>Use this app to search for any github profile information.</v-card-text>
            <div class="input container">
                <app-input v-model="username" label="User name" placeholder="Type a github username" @keydown:enter="searchUser">
                    <div slot="inputIcon">
                        <button @click="searchUser">
                            <search-svg />
                        </button>
                    </div>
                </app-input>
            </div>
        </div>
        <v-divider></v-divider>
        <div class="profile-container">
            <v-expand-transition>
                <div v-if="profileInfo && !error">
                    <div class="profile-content">
                        <div class="profile-header">
                            <div class="profile-img">
                                <img :src="profileInfo.profileImageUrl" />
                            </div>
                            <div class="profile-name">
                                <div>{{ profileInfo.loginName }}</div>
                            </div>
                        </div>
                        <div class="profile-general-info">
                            <div v-if="profileInfo.name" class="field name">
                                <user-name-svg />
                                <span>{{ profileInfo.name }}</span>
                            </div>
                            <div v-if="profileInfo.location" class="field name">
                                <user-location-svg />
                                <span>{{ profileInfo.location }}</span>
                            </div>
                            <div v-if="profileInfo.email" class="field email">
                                <user-email-svg />
                                <span>{{ profileInfo.email }}</span>
                            </div>
                            <div v-if="profileInfo.company" class="field">
                                <user-company-svg />
                                <span>{{ profileInfo.company }}</span>
                            </div>
                            <div v-if="profileInfo.profileUrl" class="field">
                                <user-profile-svg />
                                <a :href="profileInfo.profileUrl" target="_blank">{{ profileInfo.loginName }}</a>
                            </div>
                        </div>
                        <div class="profile-analytics">
                            <div class="field">
                                <div class="analytic">{{ profileInfo.numOfRepos }}</div>
                                <label>Repositories</label>
                            </div>
                            <div class="field">
                                <div class="analytic">{{ profileInfo.followers }}</div>
                                <label>Followers</label>
                            </div>
                            <div class="field">
                                <div class="analytic">{{ profileInfo.following }}</div>
                                <label>Following</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="no-records">
                        <profile-card-no-records :dark-theme="isDarkTheme" :has-title="hasEmptyStateTitle" />
                    </div>
                </div>
            </v-expand-transition>
        </div>
    </v-card>
</template>
<script>
import { GithubService } from "../scripts/services/github-service";
import AppInput from "./AppInput.vue";
import ProfileCardNoRecords from "./ProfileCardNoRecords";
import SearchSvg from "./svg/search-svg.vue";
import UserNameSvg from "./svg/user-name-svg.vue";
import UserProfileSvg from "./svg/user-profile-svg.vue";
import UserEmailSvg from "./svg/user-email-svg.vue";
import UserCompanySvg from "./svg/user-company-svg.vue";
import UserLocationSvg from "./svg/user-location-svg.vue";

export default {
    components: {
        "app-input": AppInput,
        "search-svg": SearchSvg,
        "profile-card-no-records": ProfileCardNoRecords,
        "user-name-svg": UserNameSvg,
        "user-profile-svg": UserProfileSvg,
        "user-email-svg": UserEmailSvg,
        "user-company-svg": UserCompanySvg,
        "user-location-svg": UserLocationSvg,
    },

    props: {
        darkTheme: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            username: "",
            loading: false,
            profileInfo: null,
            error: false,
        };
    },

    computed: {
        hasEmptyStateTitle() {
            return !this.profileInfo || !!(this.error && this.username);
        },

        isDarkTheme() {
            return this.darkTheme;
        },
    },

    methods: {
        searchUser() {
            this.loading = true;

            GithubService.getUser(this.username)
                .then(({ data }) => {
                    this.error = false;
                    this.profileInfo = {
                        id: data.id,
                        loginName: data.login,
                        name: data.name,
                        profileImageUrl: data.avatar_url,
                        profileUrl: data.html_url,
                        email: data.email,
                        company: data.company,
                        location: data.location,
                        numOfRepos: data.public_repos,
                        followers: data.followers,
                        following: data.following,
                    };
                })
                .catch(() => {
                    this.error = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        toogleTheme(value) {
            this.$emit("toogle-theme", !!value);
        },
    },
};
</script>
<style>
.profile-card {
    font-family: Gotham Rounded, sans-serif;
}

.profile-card .input-container {
    margin-bottom: 24px;
}

.profile-card .app-input {
    max-width: 300px;
    padding: 0 16px;
    font-size: 14px;
}

.profile-card .profile-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 24px 16px;
    text-align: center;
}

.profile-card .profile-general-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-top: 8px;
}

.profile-card .profile-analytics {
    display: flex;
    justify-content: space-around;
}

.profile-card .profile-general-info .field {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    gap: 8px;
    width: 100%;
}

.profile-card .profile-analytics .analytic {
    font-size: 40px;
    font-weight: 900;
}

.profile-card .profile-name {
    font-size: 24px;
    font-weight: 900;
}

.profile-card .profile-img {
    margin: auto;
    max-width: 150px;
}

.profile-card .profile-img img {
    border-radius: 50%;
    width: 100%;
}

.profile-card .no-records-svg {
    width: 100px;
    opacity: 0.5;
}

.profile-card .profile-general-info svg {
    width: 20px;
    height: 20px;
}

.profile-card .profile-general-info svg path {
    fill: #877d88;
}

.profile-card .profile-general-info a {
    text-decoration: none;
}

/** DARK THEME*/

.profile-card.dark-theme {
    color: white;
    background-color: rgb(10, 52, 202);
    box-shadow: 0 0 30px rgb(16, 42, 202);
}

.profile-card.dark-theme .v-input .v-label {
    color: white;
}
</style>
