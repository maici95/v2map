<template>
    <div style="height: 100vh; width: 100vw">

        <LMap
            v-if="showMap"
            :zoom="zoom"
            :center="mapCenter"
            :options="mapOptions"
            style="height: 100%"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
            @click="mapClicked"
            ref="mapel"
        >

            <l-tile-layer :url="url" :attribution="attribution" />


            <div v-if='showMarkers'>
                <LLayerGroup v-for='(m, index) in markers' :key='index'>
                    <LMarker :latLng='m.latlng' :icon='m.selected ? selectedIcon : icon' :draggable='moveMarker' @click='markerClick(index)' @dragend='(evt) => updateMarker(evt, index)' />
                </LLayerGroup>
            </div>

            <div v-if='drawPath'>
                <LLayerGroup>
                    <LPolyline :latLngs='markers.map(e => e.latlng)' :weight=6 />
                </LLayerGroup>
            </div>

            <div v-if='drawPath'>
                <LLayerGroup>
                    <LPolyline :latLngs='customPath.filter(e => markers[e] && markers[e].latlng).map(e => markers[e].latlng)' :weight=3 color='red' />
                </LLayerGroup>
            </div>

        </LMap>


    </div>
</template>

<script>
import { icon, latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LLayerGroup, LPolyline } from "vue2-leaflet";
import store from '../../store.js';

import "leaflet/dist/leaflet.css";

const keysDown = new Set();

window.addEventListener('keydown', (evt) => {
    keysDown.add(evt.key);
});
window.addEventListener('keyup', (evt) => {
    keysDown.delete(evt.key);
});

export default {
    components: {
        LPolyline,
        LMap,
        LTileLayer,
        LMarker,
        LLayerGroup
    },
    mounted() {
        this.markers = store.state.markers;
    },
    data() {
        return {
            zoom: 13,
            center: latLng(62.601017, 29.763573),
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            currentZoom: 13,
            currentCenter: latLng(62.601017, 29.763573),
            showParagraph: false,
            mapOptions: {
                zoomSnap: 0.5
            },
            //showMarkers: store.state.showPoints,
            customPath: [],
            markers: [

            ],
            selectedIndex: null,
            selectedIcon:
                icon({
                    iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
                    iconSize: [64, 74],
                    iconAnchor: [32, 74]
                }),
            icon:
                icon({
                    iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
                    iconSize: [32, 37],
                    iconAnchor: [16, 37]
                }),
            showMap: true,
        };
    },
    computed: {
        showMarkers() {
            return store.state.showPoints;
        },
        drawPath() {
            return store.state.drawPath;
        },
        selectPath() {
            return store.state.selectPath;
        },
        addMarker() {
            return store.state.addMarker;
        },
        moveMarker() {
            return store.state.moveMarker;
        },
        mapCenter() {
            return store.state.map.center
        }
    },
    methods: {
        zoomUpdate(zoom) {
            this.zoom = zoom;
        },
        centerUpdate(center) {
            this.currentCenter = center;
            this.center = center;
            store.commit('setCenter', center);
        },
        showLongText() {
            this.showParagraph = !this.showParagraph;
        },
        gorandom() {
            this.centerUpdate(latLng(47.41322, -1.219482));
        },
        mapClicked(evt) {
            console.log(this.selectedIndex);
            if (this.addMarker) {
                if (this.selectedIndex !== null) {
                    console.log('put here ', this.selectedIndex);

                    const start = this.markers;
                    const end = start.splice(this.selectedIndex + 1);
                    const tmp = [
                        ...start,
                        {
                            latlng: evt.latlng,
                            selected: false
                        },
                        ...end
                    ];
                    this.markers = tmp;
                    this.markers[this.selectedIndex].selected = false;
                    this.selectedIndex = null;
                    store.state.markers = this.markers;
                    return;
                }

                this.markers = [
                    ...this.markers,
                    {
                        latlng: evt.latlng,
                        selected: false
                    }
                ];
                store.state.markers = this.markers;
            }
        },
        updateMarker(evt, index) {
            // not the greatest one
            const tmp = this.markers;
            tmp[index].latlng = evt.target._latlng;
            this.markers = tmp;
            store.state.markers = this.markers;
        },
        markerClick(index) {
            const tmp = this.markers;

            if (this.selectPath) {
                this.customPath = [
                    ...this.customPath, index
                ];

                store.state.customPath = this.customPath;
            }

            if (keysDown.has('Shift')) {
                if (this.selectedIndex !== null) {
                    const tmp = this.markers;
                    const tmpMarker = this.markers[index];
                    tmp[this.selectedIndex].selected = false;
                    tmp[index] = tmp[this.selectedIndex];
                    tmp[this.selectedIndex] = tmpMarker;
                    this.markers = tmp;
                    this.selectedIndex = null;
                }
                return;
            }

            if (keysDown.has('Control')) {
                const tmp = this.markers;
                tmp.splice(index, 1);
                this.markers = tmp;
                return;
            }


            if (this.selectedIndex !== null) {
                tmp[this.selectedIndex].selected = false;
            }

            if (this.selectedIndex === index) {
                tmp[this.selectedIndex].selected = false;
                this.markers = tmp;
                this.selectedIndex = null;
                return;
            }

            tmp[index].selected = true;
            this.selectedIndex = index;
            this.markers = tmp;
        }
    },
};
</script>
