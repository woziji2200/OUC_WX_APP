<template>
    <view>
        <view class="ac" v-for="(i, index) in ac" @click="NavTo(`/pages/ActivitivesPage/AcDetailPage?id=${i.id}`)" :key="i.id">
            <view class="ac-image">
                <image :src="BaseUrl + i.photos[i.photos.length - 1].picture" mode="aspectFill" />
            </view>
            <view class="ac-right">
                <view class="ac-title">{{ i.title }}</view>
                <view class="ac-desc">{{ i.description }}</view>
                <view class="ac-msg">
                    <view class="ac-time">{{ new Date(i.start_time).getFullYear() }}/{{ new
                        Date(i.start_time).getMonth() }}/{{ new Date(i.start_time).getDate() }}</view>
                    <!-- <view class="ac-author">发布人：{{ i.author }}</view> -->
                </view>
            </view>
        </view>
        <view v-if="!ac.length" style="text-align: center;margin-top: 50rpx;">
            暂无收藏
        </view>
    </view>
</template>

<script>
import { request, BaseUrl } from '../../js/request';
export default {
    data() {
        return {
            ac: [],
            acid: [],
            BaseUrl
        }
    },
    async onShow() {
        let ac = (uni.getStorageSync('loved') || {})
        this.acid = []
        for (let i in ac) {
            if (ac[i]) {
                this.acid.push(i)
            }
        }
        this.ac = (await request('/api/news/activity/', "GET")).data.filter((i) => {
            return this.acid.find(j => j == 'm-' + i.id)
        })
        
        // this.$forceUpdate()

    },
    async onPullDownRefresh(){
        let ac = (uni.getStorageSync('loved') || {})
        this.acid = []

        for (let i in ac) {
            if (ac[i]) {
                this.acid.push(i)
            }
        }
        this.ac = (await request('/api/news/activity/', "GET")).data.filter((i) => {
            return this.acid.find(j => j == 'm-' + i.id)
        })
        console.log(this.ac);
        
        uni.stopPullDownRefresh()
    },
    methods: {
        NavTo(url) {
            uni.navigateTo({ url })
        },
    }
}
</script>

<style scoped>
.ac {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
    display: flex;
    padding: 28rpx;
    margin-bottom: 24rpx;
    margin: 40rpx;
}

.ac-image image {
    width: 200rpx;
    height: 200rpx;
}

.ac-right {
    margin-left: 28rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.ac-title {
    font-size: 32rpx;
    color: #4A4A4A;
    font-family: 'dakai';
}

.ac-desc {
    font-size: 24rpx;
    color: #858585;
    height: 120rpx;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}


.ac-msg {
    display: flex;
    justify-content: space-between;
    font-family: 'dakai';

}

.ac-time {
    font-size: 20rpx;
    color: #4A4A4A;
}
</style>