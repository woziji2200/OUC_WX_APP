<template>
    <view style="padding: 45rpx 0;">
        <view class="bg"></view>
        <view v-for="item in culture" class="item">
            <image :src="item.image" class="image" />
            <view style="position: relative;width: calc(100% - 292rpx);">
                <view class="title">{{ item.title }}</view>
                <view class="buy">
                    <text>购买</text>
                    <image src="https://funny233.xyz/static/culture/Bookmark.webp" />
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            culture: [
                {
                    image: 'http://mcd.ouc.edu.cn/FileResources/Summernote/2022-06-10/05438121dd2b4262827c5db3a129f7c5.jpg',
                    title: '《海洋文化创意系列丛书》'
                },
                {
                    image: 'http://mcd.ouc.edu.cn/FileResources/Summernote/2022-06-10/05438121dd2b4262827c5db3a129f7c5.jpg',
                    title: '《海洋文化创意系列丛书》'
                },
                {
                    image: 'http://mcd.ouc.edu.cn/FileResources/Summernote/2022-06-10/05438121dd2b4262827c5db3a129f7c5.jpg',
                    title: '《海洋文化创意系列丛书》'
                },
                {
                    image: 'http://mcd.ouc.edu.cn/FileResources/Summernote/2022-06-10/05438121dd2b4262827c5db3a129f7c5.jpg',
                    title: '《海洋文化创意系列丛书》'
                },
                {
                    image: 'http://mcd.ouc.edu.cn/FileResources/Summernote/2022-06-10/05438121dd2b4262827c5db3a129f7c5.jpg',
                    title: '《海洋文化创意系列丛书》'
                },
                {
                    image: 'http://mcd.ouc.edu.cn/FileResources/Summernote/2022-06-10/05438121dd2b4262827c5db3a129f7c5.jpg',
                    title: '《海洋文化创意系列丛书》'
                },
                {
                    image: 'http://mcd.ouc.edu.cn/FileResources/Summernote/2022-06-10/05438121dd2b4262827c5db3a129f7c5.jpg',
                    title: '《海洋文化创意系列丛书》'
                }
                
            ]
        }
    },
}
</script>
<style>
.bg {
    width: 750rpx;
    height: 160rpx;
    background: #2699FB;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    position: fixed;
    z-index: -1;
    top: 0;
}

.item {
    height: 292rpx;
    width: calc(100% - 64rpx);
    margin-left: 32rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
    border-radius: 24rpx;
    margin-top: 24rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.item image {
    height: 292rpx;
    width: 292rpx;
    margin: 0 46rpx;
}

.item .title {
    font-family: MiSans, MiSans;
    font-weight: bold;
    font-size: 28rpx;
    line-height: 40rpx;
    color: #1D2129;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-top: 50rpx;
    word-wrap: break-word;
    word-break: break-all;
    max-height: calc(40rpx * 3);
    overflow: hidden;
}

.item .buy {
    width: 153rpx;
    height: 64rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 127, 235, 0.09);
    border-radius: 28rpx 28rpx 28rpx 28rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 16rpx;
    right: 24rpx;
}

.item .buy text {
    font-family: MiSans, MiSans;
    font-weight: 500;
    font-size: 32rpx;
    color: #2699FB;
    text-align: right;
    font-style: normal;
    text-decoration-line: underline;
    text-transform: none;
}

.item .buy image {
    width: 24rpx;
    height: 32rpx;
    margin: 0;
    margin-left: 20rpx;
}
</style>