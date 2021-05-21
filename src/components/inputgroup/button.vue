<template>
    <button
        @click='btnClick'
        v-bind:style='{background: getStatus ? "#4CD261" : "#F73830", border: "none", borderRadius: "5px", fontWeight: "bold"}'
    >
        {{ label }}
    </button>
</template>

<script>
import store from '../../store.js';

export default {
    props: {
        label: {
            default: 'button',
            type: String
        },
        status: String
    },
    computed: {
        getStatus() {
            //store.getters[this.status] = !store.getters[this.status];
            console.log(store.getters[this.status]);
            return store.getters[this.status];
        }
    },
    methods: {
        btnClick() {
            this.$emit('toggle');
        }
    }

}
</script>
