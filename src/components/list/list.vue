<template>
    <div
        draggable="true"
        class='container'
        v-bind:style='{left: x+"px", top: y+"px"}'
        @dragend='updateXY'
        @dragstart='calcStart'
    >
        <h4>{{header}}</h4>
        <div v-if='show'
            v-bind:style='{maxHeight: "300px", overflow: "auto"}'
        >
            <slot></slot>
        </div>
        <div>
            <button @click='toggle'>
                <span>{{ show ? 'close' : 'open' }}</span>
            </button>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        header: {
            type: String,
            default: 'header'
        }
    },
    data() {
        return {
            startX: 0,
            startY: 0,
            x: 100,
            y: 100,
            show: true
        }
    },
    methods: {
        toggle() {
            this.show = !this.show;
        },
        calcStart(evt) {
            this.startX = evt.clientX - this.x;
            this.startY = evt.clientY - this.y;
            console.log('start : ', this.startX, this.startY);
        },
        updateXY(evt) {
            this.x = evt.clientX - this.startX;
            this.y = evt.clientY - this.startY;
        }
    }
}
</script>

<style scoped>
.container {
    position: absolute;
    z-index: 1000;
    width: 400px;
    padding: 10px;
    background: rgba(40, 40, 40, 0.95);
    color: #fff;

}
button {
    margin-top: 20px;
    padding: 10px;
}
</style>
