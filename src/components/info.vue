<template>
    <div class='info-panel'>
        lat: {{mapCenter.lat}}
        <br>
        lng: {{mapCenter.lng}}
    </div>
</template>

<script>
import store from '../store.js';

export default {
    data() {
        return {

        }
    },
    computed: {
        mapCenter: {
            get() {
                return store.state.map.center
            }
        }
    }
    
}
</script>

<style scoped>
.info-panel {
    position: absolute;
    z-index: 1000;
    text-align: center;
    width: auto;
    font-size: 20px;
    background: rgba(40, 40, 40, 0.9);
    color: #fff;
    padding: 10px;
    padding-left: 100px;
}
</style>
