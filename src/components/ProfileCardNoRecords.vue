<template>
    <div class="profile-no-records" :class="{ 'dark-theme': darkTheme }">
        <img class="no-records-svg" :src="require(`@/assets/images/no-records.png`)" />
        <h1 v-if="hasTitle">{{ title }}</h1>
        <div class="content">{{ content }}</div>
    </div>
</template>

<script>
export default {
    components: {},

    props: {
        content: {
            type: String,
            default: "Please type a name to search for a user",
        },

        hasTitle: {
            type: Boolean,
            default: true,
        },

        title: {
            type: String,
            default: "No Record Found",
        },

        imgFilename: {
            type: String,
            default: "no-records.svg",
        },

        darkTheme: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style>
.profile-no-records {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px;
    margin: 15px 10px;
    text-align: center;
    background: #fff;
    border-radius: 12px;
}

.profile-no-records .no-records-svg {
    margin-bottom: 25px;
}

.profile-no-records .content {
    margin-bottom: 25px;
    color: #877d88;
}
.profile-no-records .no-records-btns div {
    display: flex;
    justify-content: center;
}

.profile-no-records .btn {
    padding: 10px 25px;
    margin: 0 10px;
    font-size: 14px;
    line-height: 17px;
    font-weight: 500;
    background-color: #18aeff;
}

.profile-no-records .app-glossy-button {
    margin: 0 10px;
}

.profile-no-records .transparent-btn {
    border: 2px solid #cac6cb;
    background: transparent;
    color: #382153;
}

.profile-no-records .transparent-btn:hover {
    background: #e9e9ef;
}

.profile-no-records .transparent-btn svg {
    fill: #382153;
    margin-left: 10px;
    max-height: 15px;
}

.profile-no-records .secondary-btn {
    border: 2px solid #18aeff;
    background: transparent;
    color: #18aeff;
}

.profile-no-records .secondary-btn:hover {
    background: #18aeff;
    color: #fff;
}

.profile-no-records .secondary-btn svg {
    fill: #382153;
    margin-left: 10px;
    max-height: 15px;
}

.profile-no-records.dark-theme {
    background-color: rgb(10, 52, 202);
}
</style>
