<template>
    <div>
        <Info />
        <Map />
        <InputGroup />
        <List :header="'Route : Points'">
            <div v-for='(m, index) in getMarkers' :key='index'
                v-bind:style='{background: m.selected ? "tomato" : "#555"}'
                @click='itemClick(m.latlng)'
            >
                <div v-bind:style='{padding: "10px", borderBottom: "2px solid #222"}'>
                    <div># marker {{ index }}</div>
                    <div class='small'>lat: {{ m.latlng.lat }} </div>
                    <div class='small'>lng: {{ m.latlng.lng }} </div>
                </div>
            </div>
        </List>
    </div>
</template>

<script>
import { List, Map, Info, InputGroup } from './components/index.js';
import store from './store.js';

export default {
    components: {
        List,
        Map,
        Info,
        InputGroup
    },
    computed: {
        getMarkers() {
            console.log(store.state.markers);
            return store.state.markers;
        }
    },
    methods: {
        itemClick(latlng) {
            console.log(latlng.lat);
            store.state.map.center = latlng;
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
body {
    font-family: Arial;
}
hr {
    border: 0.1px dashed red;
    margin: 2px 0;
}
.small {
    font-size: 12px;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>