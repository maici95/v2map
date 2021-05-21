<template>
    <LMarker />
</template>

<script>
import { LMarker } from 'vue2-leaflet';
export default {
    components: {
        LMarker
    },
    beforeMount() {
        console.log('marker mounted');
    }
}
</script>
