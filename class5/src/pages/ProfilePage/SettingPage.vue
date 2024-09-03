<template>
    <view>
        <image class="bg" src="https://funny233.xyz/static/profile/setting/bg.webp" mode="aspectFill" />
        <view style="height: 60rpx;"></view>
        <view class="item">
            <view>昵称</view>
            <input type="nickname" v-model="UserData.username" placeholder="微信用户"
                @input="UserDataChange.username = true">
        </view>
        <view class="item">
            <view>头像</view>
            <view style="display: flex; align-items: center;">
                <image class="item-avatar" :src="UserData.avatar"
                    mode="scaleToFill" />
                <button class="item-right" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                    <uni-icons type="right" size="24" />
                </button>
            </view>
        </view>
        <view class="item">
            <view>简介</view>
            <input type="text" v-model="UserData.description" placeholder="输入用户简介（可选）"
                @input="UserDataChange.description = true">
        </view>
        <view class="item">
            <view>邮箱</view>
            <input type="text" v-model="UserData.email" placeholder="输入邮箱（可选）" @input="UserDataChange.email = true">
        </view>
        <view class="item">
            <view>联系电话</view>
            <input type="text" v-model="UserData.phone" placeholder="输入联系电话（可选）" @input="UserDataChange.phone = true">
        </view>
        <!-- <view class="item">
            <view>微信/QQ</view>
            <input type="text" v-model="UserData.description" placeholder="输入联系方式" @input="UserDataChange.description = true">
        </view> -->

        <button class="userinfo-change" @click="change">保存</button>
    </view>
</template>
<script>
import { request, isInExp, BaseUrl } from '@/js/request.js'
export default {
    data() {
        return {
            isLogin: false,
            UserData: {
                username: '',
                avatar: '',
                description: '',
                email: '',
                phone: ''
            },
            UserDataChange: {
                username: false,
                avatar: false,
                description: false,
                email: false,
                phone: false
            }
        }
    },
    onLoad() {
        this.isLogin = true
        uni.showLoading({
            title: '加载中'
        });
        request('/api/user/info/', 'GET').then(res => {
            this.UserData = res.data
            this.UserData.avatar = this.UserData.avatar ? BaseUrl + this.UserData.avatar : 'https://funny233.xyz/static/profile/setting/avatar.webp'
            uni.hideLoading()
        })
    },
    methods: {
        onChooseAvatar(e) {
            this.UserData.avatar = e.detail.avatarUrl
            console.log(this.UserData.avatar);
            this.$forceUpdate()
            this.UserDataChange.avatar = true
        },
        change() {
            let RequestAll = 0, RequestFinish = 0
            for (let i in this.UserDataChange) {
                if (this.UserDataChange[i]) {
                    RequestAll++
                }
            }
            if (this.UserDataChange.username) {
                request('/api/user/nickname/', 'POST', {
                    nickname: this.UserData.username
                }).then(res => {
                    console.log(res);
                    RequestFinish++
                    if (RequestAll === RequestFinish) {
                        uni.showToast({ title: '修改成功', icon: 'success', mask: true })
                    }
                })
            }
            if (this.UserDataChange.avatar) {
                uni.uploadFile({
                    url: BaseUrl + '/api/user/avatar/',
                    fileType: 'image',
                    filePath: this.UserData.avatar,
                    name: 'avatar',
                    header: {
                        "Authorization": 'Bearer ' + uni.getStorageSync('login').access_token
                    },
                    success: ({ data, statusCode }) => {
                        RequestFinish++
                        if (RequestAll === RequestFinish) {
                            uni.showToast({ title: '修改成功', icon: 'success', mask: true })
                        }
                    },
                    fail: (error) => { }
                })
            }
            if (this.UserDataChange.description) {
                request('/api/user/description/', 'POST', {
                    description: this.UserData.description
                }).then(res => {
                    console.log(res);
                    RequestFinish++
                    if (RequestAll === RequestFinish) {
                        uni.showToast({ title: '修改成功', icon: 'success', mask: true })
                    }
                })
            }
            if (this.UserDataChange.email) {
                request('/api/user/email/', 'POST', {
                    email: this.UserData.email
                }).then(res => {
                    console.log(res);
                    RequestFinish++
                    if (RequestAll === RequestFinish) {
                        uni.showToast({ title: '修改成功', icon: 'success', mask: true })
                    }
                })
            }
            if (this.UserDataChange.phone) {
                request('/api/user/phone/', 'POST', {
                    phone: this.UserData.phone
                }).then(res => {
                    console.log(res);
                    RequestFinish++
                    if (RequestAll === RequestFinish) {
                        uni.showToast({ title: '修改成功', icon: 'success', mask: true })
                    }
                })
            }
        }
    },

}
</script>
<style scoped>
.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -100;
}

.item {
    height: 50rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 30rpx;
    background-color: white;
    margin-top: 20rpx;
    box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    font-size: 30rpx;
    color: #666;
    margin: 5rpx 30rpx;
}

.item input {
    font-size: 30rpx;
    color: #666;
    border: none;
    outline: none;
    background-color: white;
    width: 60%;
    text-align: right;
}

.item-right {
    background-color: white;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50rpx;
    width: 30rpx;
    margin: 0;
}

.item-right::after {
    border: none;
}

.item-avatar {
    width: 50rpx;
    height: 50rpx;
    margin-right: 20rpx;
}

.userinfo-change {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10rpx 30rpx;
    background-color: rgb(72, 161, 255);
    margin-top: 40rpx;
    box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    font-size: 30rpx;
    color: #ffffff;
    margin: 5rpx 30rpx;
}
</style>