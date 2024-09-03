<template>
    <view>
        <AcDetailPage v-if="show"></AcDetailPage>
        <swiper indicator-dots autoplay circular class="swiper">
            <swiper-item v-for="i in ac.photos">
                <image :src="BaseUrl + i.picture" mode="aspectFill" @click="previewImage(ac.photos.indexOf(i))" />
            </swiper-item>
        </swiper>

        <view class="title">
            {{ ac.title }}
        </view>
        <view class="time">
            {{ start_time }} - {{ end_time }}
        </view>

        <view class="content">
            <rich-text :nodes="ac.content"></rich-text>
        </view>

        <view class="love" v-if="!loved['m-' +id]" @click="loved2(1)">
            ❤ 收藏
        </view>
        <view class="love" v-if="loved['m-' +id]"  @click="loved2(2)">
            ❤️ 已收藏
        </view>
        <view style="height: 100rpx;"></view>

    </view>
</template>
<script>
import { request, BaseUrl } from '../../js/request';
import { AcDetailPage } from '../../components/skeleton/AcdetailPage.vue'
export default {
    components: {
        AcDetailPage
    },
    data() {
        return {
            ac: {
                title: ''
            },
            BaseUrl,
            start_time: '',
            end_time: '',
            show: true,
            id: null,
            loved: null
        }
    },
    onLoad(options) {
        this.id = options.id
        this.loved = uni.getStorageSync('loved')
        if(!this.loved){
            this.loved = {}
        }
        request(`/api/news/activity/${options.id}/`, 'GET', {}, {}, false).then(res => {
            this.ac = res.data
            this.start_time = this.ac.start_time.split('T')[0]
            this.end_time = this.ac.end_time.split('T')[0]
            this.show = false
        })

    },
    methods: {
        previewImage(index) {
            uni.previewImage({
                urls: this.ac.photos.map(i => BaseUrl + i.picture),
                current: index
            })
        },
        loved2(type){
            // console.log(this.loved);
            if(type == 1){
                this.loved['m-' + this.id] = true
                this.$forceUpdate()
                uni.setStorageSync('loved', this.loved)
            } else {
                this.loved['m-' + this.id] = false
                this.$forceUpdate()
                uni.setStorageSync('loved', this.loved)
            }
        }
    },
}
</script>
<style scoped>
.swiper {
    height: 500rpx;
}

.swiper image {
    width: 100%;
    height: 100%;
}

.title {
    font-size: 48rpx;
    text-align: center;
    margin-top: 30rpx;
    font-weight: bold;
}

.time {
    font-size: 28rpx;
    text-align: center;
    margin-top: 30rpx;
}

.love{
    font-size: 28rpx;
    margin: 20rpx;
    margin-right: 80rpx;
    text-align: right;
    line-height: 40rpx;
    margin-bottom: 100rpx;
}

.content {
    margin-top: 20rpx;
    padding: 40rpx;
    margin-bottom: 100rpx;
}
</style>