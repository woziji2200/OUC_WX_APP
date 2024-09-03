<template>
    <view class="title">
        第{{ id }}关
    </view>

    <canvas class="canvas" canvas-id="game"></canvas>

    <view class="pos">
        <button class="pos-undo" @click="undo">撤销</button>

        <button class="pos-t" @click="up">↑</button>
        <view class="pos-b">
            <button @click="left">←</button>
            <button @click="down">↓</button>
            <button @click="right">→</button>
        </view>
    </view>

    <button class="remake" @click="remake">重新开始</button>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import maps from '../../js/map';
const id = ref(0);
onLoad((options) => {
    id.value = options.id;
    initMap(id.value - 1)
    drawCanvas()
});
let row = 0, col = 0
let map = new Array(8).fill(0).map(() => new Array(8).fill(0))
let box = new Array(8).fill(0).map(() => new Array(8).fill(0))
let w = 40
const initMap = (id) => {
    let mapData = maps[id]
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            box[i][j] = 0
            map[i][j] = mapData[i][j]
            if (mapData[i][j] == 4) {
                box[i][j] = 4
                map[i][j] = 2
            } else if (mapData[i][j] == 5) {
                map[i][j] = 2
                row = i
                col = j
            }
        }
    }
}
const drawCanvas = () => {
    let ctx = uni.createCanvasContext('game')
    ctx.clearRect(0, 0, 320, 320)
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let img = 'ice'
            if (map[i][j] == 1) {
                img = 'stone'
            } else if (map[i][j] == 3) {
                img = 'pig'
            }

            ctx.drawImage(`/static/${img}.png`, j * w, i * w, w, w)
            if (box[i][j] == 4) {
                ctx.drawImage('/static/box.png', j * w, i * w, w, w)
            }
        }
    }
    ctx.drawImage(`/static/bird.png`, col * w, row * w, w, w)
    ctx.draw()
    isWin()
}
const isWin = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (map[i][j] != 3 && box[i][j] == 4) {
                return false
            }
        }
    }
    uni.showModal({
        title: '提示',
        content: '恭喜你，通关成功！',
        showCancel: false,
    })
}

const up = () => {
    if (row > 0 && map[row - 1][col] != 1) {
        if (box[row - 1][col] == 4) {
            if (row > 1 && map[row - 2][col] != 1 && box[row - 2][col] != 4) {
                history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
                box[row - 2][col] = 4
                box[row - 1][col] = 0
                row--
            }
        } else {
            history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
            row--
        }
    }
    drawCanvas()
}
const down = () => {
    if (row < 7 && map[row + 1][col] != 1) {
        if (box[row + 1][col] == 4) {
            if (row < 6 && map[row + 2][col] != 1 && box[row + 2][col] != 4) {
                history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
                box[row + 2][col] = 4
                box[row + 1][col] = 0
                row++
            }
        } else {
            row++
        }
    }
    drawCanvas()
}
const left = () => {
    history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
    if (col > 0 && map[row][col - 1] != 1) {
        if (box[row][col - 1] == 4) {
            if (col > 1 && map[row][col - 2] != 1 && box[row][col - 2] != 4) {
                history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
                box[row][col - 2] = 4
                box[row][col - 1] = 0
                col--
            }
        } else {
            history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
            col--
        }
    }
    drawCanvas()
}
const right = () => {
    history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
    if (col < 7 && map[row][col + 1] != 1) {
        if (box[row][col + 1] == 4) {
            if (col < 6 && map[row][col + 2] != 1 && box[row][col + 2] != 4) {
                history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
                box[row][col + 2] = 4
                box[row][col + 1] = 0
                col++
            }
        } else {
            history.push({ row, col, map: structuredClone(map), box: structuredClone(box) })
            col++
        }
    }
    drawCanvas()
}

const remake = () => {
    row = 0, col = 0
    map = new Array(8).fill(0).map(() => new Array(8).fill(0))
    box = new Array(8).fill(0).map(() => new Array(8).fill(0))
    initMap(id.value - 1)
    history = []
    drawCanvas()
}
let history = []
const undo = () => {
    if (history.length > 0) {
        let last = history.pop()
        row = last.row
        col = last.col
        map = last.map
        box = last.box
        drawCanvas()
    }
}
const structuredClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}


</script>

<style lang="scss" scoped>
.title {
    font-size: 30rpx;
    text-align: center;
    margin-top: 30rpx;
}

.canvas {
    width: 80vw;
    height: 80vw;
    border: solid 1rpx #696969;
    margin: 0 auto;
    margin-top: 30rpx;
}

.pos {
    display: flex;
    position: fixed;
    bottom: 160rpx;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 30rpx;
    flex-direction: column;

    button {
        line-height: 100rpx;
    }

    .pos-t {
        width: 100rpx;
        height: 100rpx;
        font-size: 30rpx;
        border-radius: 50%;
        background-color: rgb(0, 110, 255);
        color: #fff;
    }

    .pos-b {
        display: flex;
        flex-wrap: wrap;
        gap: 10rpx;
        margin-top: 10rpx;

        button {
            width: 100rpx;
            height: 100rpx;
            font-size: 30rpx;
            border-radius: 50%;
            background-color: rgb(0, 110, 255);
            color: #fff;
        }
    }

    .pos-undo {
        width: 200rpx;
        height: 100rpx;
        font-size: 30rpx;
        background-color: rgb(0, 110, 255);
        margin-bottom: 30rpx;
        color: #fff;
    }
}

.remake {
    width: 100%;
    height: 100rpx;
    font-size: 30rpx;
    background-color: rgb(0, 110, 255);
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>