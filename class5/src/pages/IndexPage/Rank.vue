<template>
    <view>

        <view class="title">
            <uni-icons type="arrow-left" color="#0327F9" size="32" @click="NavPre()" />
            <image src="https://funny233.xyz/static/bless/logo.webp" mode="scaleToFill" />
        </view>
        <image src="https://funny233.xyz/static/yunhuijia/title.webp" mode="aspectFit" class="title-img" />

        <view class="rank">
            <uni-collapse ref="collapse">
                <uni-collapse-item title-border="none" :show-arrow="false" v-for="(i, index1) in rank">
                    <template v-slot:title>
                        <view class="item-title" @click="OpenItem(i)">
                            <view class="item-title-left">
                                <image src="https://funny233.xyz/static/yunhuijia/left.webp" mode="scaleToFill" />
                                <view>{{ (index1 + 1 < 10 ? '0' : '') + (index1 + 1) }}</view>
                                </view>
                                <view class="item-title-right">
                                    <view>{{ i.nation }} {{ i.value - 9 }}</view>
                                    <image src="https://funny233.xyz/static/yunhuijia/more.webp" mode="scaleToFill"
                                        :class="!i.show ? '' : 'transform'" />
                                </view>
                            </view>
                    </template>
                    <view class="content" v-for="(j, index2) in i.city">
                        <view class="item-title content-item-title">
                            <view class="item-title-left">
                                <image style="width: 40rpx; height: 40rpx;" src="https://funny233.xyz/static/yunhuijia/left2.webp"
                                    mode="scaleToFit" />
                                <view style="font-size: 34rpx;">{{ (index2 + 1 < 10 ? '0' : '') + (index2 + 1)
                                        }}</view>
                                </view>
                                <view class="item-title-right">
                                    <view style="font-size: 34rpx;">{{ j.name }} {{ j.value - 9 }}</view>
                                </view>
                            </view>
                        </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="total">
            总人次：{{ TotalRank }}
        </view>

    </view>
</template>

<script>
import { request } from '../../js/request'
export default {
    data() {
        return {
            rank: [],
            TotalRank: 0
        }
    },
    methods: {
        OpenItem(i) {
            i.show = !i.show
        },
        GetItem() {
            request('/api/map/rank/', 'GET', {}, {}, false).then(res => {
                res.data.forEach((i, index) => {
                    i.show = false
                    this.TotalRank += i.value - 9
                })
                res.data.sort((a, b) => b.value - a.value)
                res.data.forEach((i, index) => {
                    i.city.sort((a, b) => b.value - a.value)
                })
                this.rank = res.data
            })
        },
        NavPre() {
            uni.navigateBack({ delta: 1 })
        }
    },
    onLoad(options) {
        this.GetItem()
    }
}
</script>

<style scoped>
.item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(0, 0, 0, 0.16);
    padding: 0rpx 20rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
}

.item-title image {
    width: 60rpx;
    height: 60rpx;
    transition: all 0.3s;
}

.item-title view {
    /* font-family: 'zhihuibiantaoti'; */
    font-weight: 400;
    font-size: 36rpx;
    color: #007FEB;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
}

.transform {
    transform: rotate(90deg);
}

.item-title-right {
    display: flex;
    justify-content: right;
    align-items: center;
}

.item-title-right view {
    margin-right: 40rpx;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rpx 40rpx;
    margin-top: 40rpx;
}

.title image {
    width: 268rpx;
    height: 62rpx;
}

.title-img {
    width: 100%;
    height: 180rpx;
}

.rank {
    width: auto;
    margin-left: 56rpx;
    padding-left: 64rpx;
    padding-right: 30rpx;
    height: calc(100vh - 180rpx - 62rpx - 280rpx);
    border: solid #0327F9 4rpx;
    border-right: none;
    border-top-left-radius: 46rpx;
    border-bottom-left-radius: 46rpx;
    overflow: scroll;
}

.item-title-left {
    display: flex;
    justify-content: left;
    align-items: center;
}

.item-title-left view {
    margin-left: 20rpx;
}

.content-item-title {
    margin-left: 40rpx;
    height: 74rpx;
}

.content-item-title .item-title-right view {
    margin-right: 10rpx;
    text-align: right;
    /* marl */
}

.total {
    font-family: 'zhihuibiantaoti';
    font-weight: 400;
    font-size: 70rpx;
    color: #0327F9;
    text-align: right;
    margin-right: 40rpx;
    margin-top: 20rpx;
}
</style>