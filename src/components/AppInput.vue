<template>
    <div class="app-input" :class="{ 'has-icon': $slots.inputIcon }">
        <label v-if="label">{{ label }}</label>
        <div class="input-container">
            <input
                ref="input"
                :type="type"
                :value="value"
                :placeholder="placeholder ? placeholder : label"
                :min="min"
                :max="max"
                :maxlength="maxLength"
                :step="step"
                :disabled="disabled"
                :autocomplete="autoComplete"
                @input="updateValue()"
                @focus="focus()"
                @blur="blur()"
                @keyup="keyup"
                @keydown.enter="keydown"
            />
            <div class="icon-container">
                <slot name="inputIcon"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},

    props: {
        type: {
            type: String,
            default: "text",
        },

        label: {
            type: String,
        },

        placeholder: {
            type: String,
        },

        value: {
            type: [String, Number],
        },

        min: {
            type: [String, Number],
        },

        max: {
            type: [String, Number],
        },

        step: {
            type: String,
            default: "1",
        },

        maxLength: {
            type: Number,
        },

        disabled: {
            type: Boolean,
        },

        autoComplete: {
            type: String,
            default: "on",
        },
    },

    data() {
        return {};
    },

    methods: {
        updateValue() {
            this.$emit("input", this.$refs.input.value);
        },

        focus() {
            this.$emit("focus");
        },

        keyup(e) {
            this.$emit("keyup", e);
        },

        blur() {
            this.$emit("blur");
        },

        keydown(event) {
            this.$emit("keydown:enter", event.target.value);
        },
    },
};
</script>

<style>
.app-input {
    position: relative;
}

.app-input .input-container {
    position: relative;
}

.app-input input::placeholder {
    color: #cac6cb;
}

.app-input input {
    background: #fafafa;
    font: normal 16px/1em "Roboto";
    width: 100%;
    border: 1px solid #cac6cb;
    padding: 8px 16px;
    border-radius: 20px;
    color: #382153;
    outline: none;
}

.app-input input:hover {
    border-color: #877d88;
    background-color: #fff;
    border: solid #cac6cb;
    border-width: 2px;
    padding: 7px 15px;
}

.app-input input:active,
.app-input input:focus {
    border: solid #18aeff;
    background-color: #fff;
    border-width: 2px;
    padding: 7px 15px;
}

.app-input label {
    display: block;
    font: 500 16px/1em "Roboto";
    margin-bottom: 7px;
    color: #382153;
}

.app-input .icon-container {
    display: none;
    right: 8px;
    top: 12px;
    width: 20px;
    height: 20px;
}

.app-input.has-icon .icon-container {
    display: block;
}

.app-input .icon-container svg {
    width: 20px;
    height: 20px;
    width: 100%;
}

.app-input.has-icon .input-container .icon-container {
    position: absolute;
    top: 8px;
}

.app-input.has-icon input {
    padding-right: 35px;
}
</style>
