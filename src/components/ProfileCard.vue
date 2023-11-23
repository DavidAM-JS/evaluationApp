<template>
    <v-card class="github-profile-card mx-auto my-12 px-5 py-5" :loading="loading" max-width="600" outlined elevation="5">
        <v-card-title>Evaluation App</v-card-title>
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
        <div class="profile-container">
            <v-expand-transition>
                <div v-if="profileInfo && !error">
                    <v-divider></v-divider>
                    <div class="profile-content">
                        <div class="profile-name">
                            <div>{{ profileInfo.loginName }}</div>
                        </div>
                        <div class="profile-img">
                            <img :src="profileInfo.profileImageUrl" />
                        </div>
                        <div class="field">
                            <label>Name:</label>
                            <span>{{ profileInfo.name }}</span>
                        </div>
                        <div class="field email">
                            <label>Email:</label>
                            <span>{{ `${profileInfo.email ? profileInfo.email : "No email"}` }}</span>
                        </div>
                        <div class="field">
                            <label>Company:</label>
                            <span>{{ `${profileInfo.company ? profileInfo.company : "No Company"}` }}</span>
                        </div>
                        <div class="field">
                            <label>Profile Url:</label>
                            <a :href="profileInfo.profileUrl" target="_blank">{{ profileInfo.profileUrl }}</a>
                        </div>
                        <div class="field">
                            <label>No. Repositories:</label>
                            <span>{{ profileInfo.numOfRepos }}</span>
                        </div>
                        <div class="field">
                            <label>Followers:</label>
                            <span>{{ profileInfo.followers }}</span>
                        </div>
                        <div class="field">
                            <label>Following:</label>
                            <span>{{ profileInfo.following }}</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="no-records">
                        <profile-card-no-records :has-title="hasEmptyStateTitle" />
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

export default {
    components: {
        "app-input": AppInput,
        "search-svg": SearchSvg,
        "profile-card-no-records": ProfileCardNoRecords,
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
    },
};
</script>
<style>
.github-profile-card .input-container {
    margin-bottom: 24px;
}

.github-profile-card .app-input {
    max-width: 300px;
    padding: 0 16px;
}

.github-profile-card .app-input label {
    font-size: 14px;
}

.github-profile-card .profile-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
    align-items: center;
}

.github-profile-card .profile-name {
    font-size: 24px;
    font-weight: bold;
}

.github-profile-card .field {
    display: flex;
    gap: 5px;
}

.github-profile-card .field label {
    font-weight: bold;
}

.github-profile-card .profile-img {
    margin: auto;
    width: 150px;
}

.github-profile-card .profile-img img {
    border-radius: 20px;
    width: 100%;
}

.github-profile-card .no-records-svg {
    width: 100px;
    opacity: 0.5;
}
</style>
