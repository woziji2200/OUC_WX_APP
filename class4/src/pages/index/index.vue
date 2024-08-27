<template>
    <view>
        <view class="video">
            <video id="myVideo" :src="videoNow" enable-danmu danmu-btn controls></video>
        </view>

        <view class="danmu">
            <input v-model="danmu" placeholder="发射弹幕~" />
            <button @click="sendDanmu">发送</button>
        </view>

        <view>
            <view :class="item.videoUrl == videoNow ? 'video-item-select' : ''" class="video-item" v-for="item in list"
                :key="item.id" @click="videoNow = item.videoUrl">
                {{ item.title }}
            </view>
        </view>
    </view>

</template>

<script setup>
import { ref, watch } from 'vue'
import { onReady } from '@dcloudio/uni-app';
let videoCtx = null;
const danmu = ref('')
const list = ref([{
    id: '1001',
    title: '杨国宜先生口述校史实录',
    videoUrl: 'http://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4'
}, {
    id: '1002',
    title: '唐成伦先生口述校史实录',
    videoUrl: 'http://arch.ahnu.edu.cn/__local/E/31/EB/2F368A265E6C842BB6A63EE5F97_425ABEDD_7167F22.mp4?e=.mp4'
}, {
    id: '1003',
    title: '倪光明先生口述校史实录',
    videoUrl: 'http://arch.ahnu.edu.cn/__local/9/DC/3B/35687573BA2145023FDAEBAFE67_AAD8D222_925F3FF.mp4?e=.mp4'
}, {
    id: '1004',
    title: '吴仪兴先生口述校史实录',
    videoUrl: 'http://arch.ahnu.edu.cn/__local/5/DA/BD/7A27865731CF2B096E90B522005_A29CB142_6525BCF.mp4?e=.mp4'
}])
const videoNow = ref(list.value[0].videoUrl)
onReady(() => {
    videoCtx = uni.createVideoContext('myVideo');
})
watch(videoNow, (newVal, oldVal) => {
    videoCtx.src = newVal;
    videoCtx.play();
})

function sendDanmu() {
    videoCtx.sendDanmu({
        text: danmu.value,
        color: getRandomColor()
    })
    danmu.value = ''
}

function getRandomColor() {
    const rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}
</script>
<style>
page {
    background-color: #F8F8F8;
}
</style>
<style scoped lang="scss">
.video {
    width: 100%;
    height: 400rpx;

    video {
        width: 100%;
        height: 100%;
    }
}

.video-item {
    padding: 20rpx;
    background-color: #fff;
    margin: 20rpx;
    border-radius: 10rpx;
}

.video-item-select {
    background-color: #3d71ff;
    color: #fff;
}

.danmu {
    display: flex;
    margin: 20rpx;

    input {
        flex: 1;
        height: 68rpx;
        padding: 0 20rpx;
        border: 1px solid #3d71ff;
        border-radius: 10rpx;
    }

    button {
        height: 70rpx;
        width: 150rpx;
        background-color: #3d71ff;
        color: #fff;
        border-radius: 0rpx;
        line-height: 70rpx;
    }
}
</style>
