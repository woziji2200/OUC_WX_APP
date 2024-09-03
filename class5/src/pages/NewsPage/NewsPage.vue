<template>
    <view>
        <view class="toolbar">
            <view class="back-button" @click="SwitchTab('/pages/IndexPage/IndexPage')">
                <image src="https://funny233.xyz/static/activities/back.webp" mode="aspectFill" class="back-img" />
            </view>
            <view class="logo">
                <image src="https://funny233.xyz/static/activities/logo.webp" mode="aspectFill" class="logo-img" />
                <view class="text">
                    <image src="https://funny233.xyz/static/activities/信息科学与工程学部.webp" mode="aspectFill"
                        style="height: 34rpx; width: 206rpx;" />
                    <image src="https://funny233.xyz/static/activities/eng.webp" mode="aspectFill"
                        style="height: 12rpx; width: 206rpx;" />
                </view>
            </view>
        </view>
        <view class="body">
            <view class="title">
                <view class="title-bar"></view>
                <view class="title-content">新闻中心</view>
            </view>
            <view class="search">
                <view class="text">搜索</view>
                <view class="bar"></view>
                <view class="input">
                    <input class="weui-input" auto-focus placeholder="请输入内容" inputmode="search" @input="input"/>
                    <icon class="icon-small" type="search" size="18" color="#2699FB"></icon>
                </view>
            </view>
            <view class="content">
                <view class="activity" v-for="(item, index) in filteredActivitives" :key="index" @click="NavTo(`/pages/NewsPage/News?id=${item.id}`)">
                    <image :src="item.img" mode="aspectFill" class="activity-bg"/>
                    <view class="description">
                        <view class="title">{{ item.title }}</view>
                        <view class="desc">发布时间：{{ item.time }}</view>
                    </view>
                    <!-- <view class="baoming">
                        <view class="text" >报名</view>
                        <view class="add">
                            <image src="https://funny233.xyz/static/activities/add.webp" mode="aspectFill" class="add-img" />
                        </view>
                    </view> -->
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { request, BaseUrl } from '../../js/request'
export default {
    data() {
        return {
            Activitives: [],
            filteredActivitives: [],
            keyword: ''
        }
    },
    methods: {
        input(e){
            this.keyword = e.target.value;
            this.filteredActivitives = this.Activitives.filter(item => item.title.includes(this.keyword))
        },
        NavTo(url) {
            uni.navigateTo({ url })
        },
        SwitchTab(url) {
            uni.switchTab({ url })
        },
        getActivities() {
            function handleData(data){
                return data.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        time: new Date(item.published).getFullYear() + "/" +
            (new
                Date(item.published).getMonth() + 1) + "/" + new Date(item.published).getDate(),
                        img: item.image || "https://funny233.xyz/static/news/default.webp"
                    }
                })
            }
            request('/api/news/news/', 'GET', {}, {}, false).then((res) => {
                if (res.statusCode === 200) {
                    this.Activitives = handleData(res.data);
                    this.filteredActivitives = this.Activitives;
                }
            }).catch(() => {
                uni.showToast({ title: '获取活动失败', icon: 'none', mask: true })
            })
        }
    },
    mounted() {
        this.getActivities()
    },
    
}
</script>

<style scoped>
.toolbar {
    height: 50px;
    width: 100%;
    position: sticky;
    top: 0;
    background-color: #FFFFFF;
    z-index: 9999;
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.back-button {
    width: 42rpx;
    height: 42rpx;
    margin-left: 20rpx;
}

.back-img {
    height: 42rpx;
    width: 100%;
}

.toolbar .logo {
    display: flex;
    flex-direction: row;
    margin-right: 20rpx;
}

.toolbar .logo .logo-img {
    height: 60rpx;
    width: 60rpx;
}

.toolbar .logo .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10rpx;
}

.body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    padding: 40rpx 0;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title .title-bar {
    width: 40px;
    height: 3px;
    background: #007FEB;
}

.title .title-content {
    display: inline-block;
    height: 54rpx;
    font-family: MiSans, MiSans;
    font-weight: 600;
    font-size: 40rpx;
    color: #007FEB;
    line-height: 40rpx;
    letter-spacing: 4px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    padding-top: 6px;
}

.search {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20rpx;
    height: 96rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    border: 2rpx solid #BCE0FD;
    margin: 14rpx 20rpx;
}

.search .text {
    font-family: MiSans, MiSans;
    font-weight: 600;
    font-size: 28rpx;
    color: #2699FB;
    line-height: 40rpx;
    letter-spacing: 4rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-left: 32rpx;
    margin-right: 12rpx;
}

.search .bar {
    width: 3rpx;
    height: 44rpx;
    background: #2699FB;
}

.search .input {
    margin-left: 20rpx;
    margin-right: 40rpx;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.content .activity {
    height: 320rpx;
    width: calc(100% - 40rpx);
    margin-left: 20rpx;
    margin-top: 15rpx;
    position: relative;
}

.content .activity::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.1));
}

.content .activity .description {
    position: relative;
    top: 20rpx;
    left: 20rpx;
    width: calc(100% - 20rpx);
    height: 100%;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.content .activity .description .title {
    font-family: MiSans, MiSans;
    font-weight: 600;
    font-size: 28rpx;
    color: #F8F8F8;
    line-height: 40rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 6rpx;
}

.content .activity .description .desc {
    font-size: 26rpx;
    color: #F8F8F8;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    bottom: 66rpx;
}

/* .content .activity .baoming {
    position: absolute;
    bottom: 20rpx;
    right: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120rpx;
    height: 60rpx;
    background-color: #F8F8F8;
    border-radius: 50rpx;
    border: 6rpx solid #2699FB;
    padding-left: 28rpx;
}

.content .activity .baoming .text {
    font-weight: 600;
    font-size: 24rpx;
    color: #2699FB;
    letter-spacing: 2rpx;
    line-height: 40rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin-right: 12rpx;
}

.content .activity .baoming .add {
    background-color: #2699FB;
    width: 60rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30rpx;
}


.content .activity .baoming .add .add-img {
    height: 20rpx;
    width: 20rpx;
    filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(0deg);
}
*/ 
.activity-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    filter: brightness(50%);
}
</style>