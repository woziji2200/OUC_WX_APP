<template>
    <view>
        <view class="title">游戏选关</view>
        <view class="game">
            <view class="game-item" @click="navTo('/pages/profile/profile?id=1')">
                <image src="/static/level01.png"></image>
                <span>第一关</span>
            </view>
            <view class="game-item" @click="navTo('/pages/profile/profile?id=2')">
                <image src="/static/level02.png"></image>
                <span>第二关</span>
            </view>
            <view class="game-item" @click="navTo('/pages/profile/profile?id=3')">
                <image src="/static/level03.png"></image>
                <span>第三关</span>
            </view>
            <view class="game-item" @click="navTo('/pages/profile/profile?id=4')">
                <image src="/static/level04.png"></image>
                <span>第四关</span>
            </view>
        </view>
    </view>

</template>

<script setup>
import { ref, watch } from 'vue'
import { onReady } from '@dcloudio/uni-app';

function navTo(url){
    uni.navigateTo({
        url: url
    });
}
</script>
<style>
page {
    background-color: #F8F8F8;
}
</style>
<style scoped lang="scss">
.title{
    font-size: 40rpx;
    color: #333;
    padding: 40rpx;
    text-align: center;
}

.game{
    display: grid;
    grid-template-columns: 1fr 1fr;
    // grid-template-rows: 1fr 1fr;
    gap: 40rpx;
    padding: 60rpx;

    .game-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-radius: 10rpx;
        box-shadow: 0 0 10rpx rgba(0,0,0,0.1);
        padding:20rpx;
        image{
            width: 220rpx;
            height: 220rpx;
            // height: 200rpx;
            border-radius: 10rpx;
        }
        span{
            font-size: 32rpx;
            color: #333;
            margin-top: 40rpx;
        }
    }
}

</style>
