<template>
    <view>
        <ProfilePage2 v-show="isLoading"></ProfilePage2>

        <image src="https://funny233.xyz/static/profile/setting/bg.webp" mode="scaleToFill" class="bg" />
        <view class="name">
            <image :src="avatar ? (BaseUrl + avatar) : 'https://funny233.xyz/static/tabbar/Profile2.webp'" />
            <view class="title">
                <text>{{ name || '匿名用户' }}</text>
                <text>{{ description || 'Ta还没有个人简介哦' }}</text>
            </view>
            <!-- <view class="edit" v-if="id == 1">
                编辑
            </view> -->
        </view>
        <view class="profile">
            <view class="phone line">
                <image src="https://funny233.xyz/static/profile/Mail.webp" />
                <view class="content">
                    <text>{{ phone || 'Ta没有填写电话' }}</text>
                    <text>电话</text>
                </view>
            </view>
            <!-- email -->
            <view class="email line">
                <image src="https://funny233.xyz/static/profile/Mail.webp" />
                <view class="content">
                    <text>{{ email|| 'Ta没有填写邮箱' }}</text>
                    <text>邮箱</text>
                </view>
            </view>
            <view class="chat line">
                <image src="https://funny233.xyz/static/bless/Mnius.webp" />
                <view class="content">
                    <text>{{ chat }}</text>
                    <text>微信 / QQ</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { request, BaseUrl } from '../../js/request';
import ProfilePage2 from '../../components/skeleton/ProfilePage2.vue'

export default {
    components: {
        ProfilePage2
    },
    data() {
        return {
            id: 1,
            name: '李华',
            description: '暂无自我介绍1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            phone: '+86 1234567890',
            email: 'lihua@ouc.edu.cn',
            chat: 'lihua123',
            avatar: '',
            BaseUrl,

            isLoading: true
        }
    },
    methods: {
        NavBack() {
            uni.navigateBack({
                delta: 1
            })
        }
    },
    onLoad(options) {
        request('/api/book/info/', "GET", { id: options.id }).then(res => {
            this.id = res.data.id
            this.name = res.data.name
            this.description = res.data.description
            this.phone = res.data.phone
            this.email = res.data.email
            this.avatar = res.data.avatar
            this.isLoading = false
            // this.chat = res.data.

        }).catch(() => {
            uni.showToast({ title: '获取信息失败', icon: 'none', mask: true })
            this.isLoading = false


        })
    }
}
</script>

<style>
.bg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -100;
}

.name {
    display: flex;
    flex-direction: row;
    padding: 60rpx 32rpx;
    position: relative;
}

.name image:nth-child(1) {
    width: 80rpx;
    height: 80rpx;
    /* padding: 24rpx; */
    
    background: #FFFFFF;
    border-radius: 80rpx;
}

.name .title {
    display: flex;
    flex-direction: column;
    padding: 6rpx 24rpx;
}

.name .title text:nth-child(1) {
    font-family: MiSans, MiSans;
    font-weight: 600;
    font-size: 28rpx;
    color: #2699FB;
    text-align: left;
    font-style: normal;
    text-transform: none;
}

.name .title text:nth-child(2) {
    font-family: MiSans, MiSans;
    font-weight: 400;
    font-size: 20rpx;
    color: #2699FB;
    text-align: left;
    font-style: normal;
    text-transform: none;

    width: 550rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* .name .edit {
    width: 192rpx;
    height: 80rpx;
    background: #4217E6;
    border-radius: 8rpx 8rpx 8rpx 8rpx;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: MiSans, MiSans;
    font-weight: 600;
    font-size: 28rpx;
    color: #FFFFFF;
    line-height: 48rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;

    position: absolute;
    right: 32rpx;
} */

.profile {
    width: calc(100% - 64rpx);
    height: 484rpx;
    margin-left: 32rpx;
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.profile .line {
    display: flex;
    flex-direction: row;
    height: 64rpx;
    padding: 48rpx 0;
    border-bottom: 2rpx solid #F1F9FF;
}

.profile .line:nth-last-child(1) {
    border-bottom: none;
}

.profile image {
    width: 32rpx;
    height: 32rpx;
}

.profile .content {
    display: flex;
    flex-direction: column;
}

.profile .content text {
    font-family: Arial, Arial;
    font-weight: 400;
    font-size: 28rpx;
    color: #2699FB;
    text-align: left;
    font-style: normal;
    text-transform: none;
}

.profile .content text:nth-child(2) {
    font-size: 20rpx;
}

.profile .line image {
    margin: 16rpx 48rpx;
}
</style>
