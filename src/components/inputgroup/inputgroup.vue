<template>
    <div class='container'>
        <button @click='toggleMarkers'
            v-bind:style='{background: showMarkers ? ALLOW_COLOR : DENY_COLOR}'
        >
            show markers: <b>{{showMarkers}}</b>
        </button>
        <button @click='togglePath'
            v-bind:style='{background: showPath ? ALLOW_COLOR : DENY_COLOR}'
        >
            show markers: <b>{{showPath}}</b>
        </button>
        <button @click='toggleSelectPath'
            v-bind:style='{background: selectPath ? ALLOW_COLOR : DENY_COLOR}'
        >
            select path: <b>{{selectPath}}</b>
        </button>
        <button @click='toggleAddMarker'
            v-bind:style='{background: addMarker ? ALLOW_COLOR : DENY_COLOR}'
        >
            add marker: <b>{{addMarker}}</b>
        </button>
        <button @click='toggleMoveMarker'
            v-bind:style='{background: moveMarker ? ALLOW_COLOR : DENY_COLOR}'
        >
            move marker: <b>{{moveMarker}}</b>
        </button>



<!--         <Button
            :label='"move marker"'
            :status='moveMarker'
            @toggle='toggleMoveMarker'
        />
 -->
<!--         <div v-for='(b, index) in btns' :key='index'>
            <Button
                :label='b.label'
                :status='b.status'
                @toggle='b.toggle'
            />
        </div> -->

    </div>
</template>

<script>
import store from '../../store.js';
//import Button from './button.vue';

export default {
    components: {
        //Button
    },
    data() {
        return {
            ALLOW_COLOR: '#4CD261',
            DENY_COLOR: '#F73830',
/*             btns: [
                {label: 'move marker', status: 'moveMarker', toggle: this.toggleMoveMarker},
                {label: 'show markers', status: 'showMarkers', toggle: this.toggleMarkers },
                {label: 'show path', status: 'showPath', toggle: this.togglePath },
                {label: 'select path', status: 'selectPath', toggle: this.toggleSelectPath },
                {label: 'add marker', status: 'addMarker', toggle: this.toggleAddMarker }
            ] */
        }
    },
    computed: {
        showMarkers: {
            get() {
                return store.state.showPoints;
            }
        },
        showPath: {
            get() {
                return store.state.drawPath;   
            }
        },
        selectPath: {
            get() {
                return store.state.selectPath;
            }
        },
        addMarker: {
            get() {
                return store.state.addMarker;
            }
        },
        moveMarker: {
            get() {
                return store.state.moveMarker;
            }
        }
    },
    methods: {
        testClick() {
            console.log('toggle test');
        },
        toggleMarkers() {
            store.state.showPoints = !store.state.showPoints;
        },
        togglePath() {
            store.state.drawPath = !store.state.drawPath;
        },
        toggleSelectPath() {
            store.state.selectPath = !store.state.selectPath;
        },
        toggleAddMarker() {
            store.state.addMarker = !store.state.addMarker;
        },
        toggleMoveMarker() {
            store.state.moveMarker = !store.state.moveMarker;
        }
    }
}
</script>

<style scoped>
.container {
    position: absolute;
    z-index: 1000;
    bottom: 0;
    width: auto;
    padding: 10px;
    background: rgba(40, 40, 40, 0.8);
    color: #fff;
}
button {
    padding: 5px;
    margin: 2px
}
</style>
