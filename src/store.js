import Vue from 'vue';
import Vuex from 'vuex';
import { latLng } from 'leaflet';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        map: {
            center: latLng(62.601017, 29.763573),
            zoom: 12
        },
        showPoints: true,
        drawPath: true,
        selectPath: false,
        addMarker: false,
        moveMarker: false,
        test: 0,
        markers: [
            {latlng: latLng(62.601017, 29.763573), selected: false },
            {latlng: latLng(62.605017, 29.763573), selected: false },
            {latlng: latLng(62.604017, 29.774273), selected: false }
        ],
        customPath: []
    },
    mutations: {
        test() {
            console.log(store);
        },
        setCenter(state, latlng) {
            state.map.center = latlng;
        }
    },
    getters: {
        moveMarker: state => {
            return state.moveMarker;
        }
    }
});

export default store;
