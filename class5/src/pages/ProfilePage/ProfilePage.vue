<template>
    <view>

        <view class="profile" v-show="!ShowSkeleton">
            <view class="card">
                <view class="card-profile" @click="isLogin?Navto('/pages/ProfilePage/SettingPage') : Login()">
                    <view class="card-image">
                        <image :src="isLogin ? UserData.avatar : 'https://funny233.xyz/static/profile/default.webp'"
                            mode="scaleToFill" />
                    </view>
                    <view class="card-det">
                        <view class="card-username">{{ isLogin ? (UserData.username || '微信用户') + (
            UserData.authentication_status == 3 ? "（已认证）" : "（未认证）") : '登录后查看' }}</view>
                        <view class="card-det2">{{ isLogin ? UserData.description || '暂未设置个人简介' : '登录后查看个人信息' }}</view>
                    </view>
                </view>
                <image src="https://funny233.xyz/static/profile/card.webp" mode="widthFix" />
            </view>

            <view class="setting nologin" v-show="!isLogin">
                <image src="https://funny233.xyz/static/profile/nologin.webp" mode="widthFix" />
                <view class="login" @click="Login()">登录</view>

            </view>

            <view class="setting" v-show="isLogin">
                <view class="setting-option" @click="Navto('/pages/ProfilePage/SettingPage')">
                    <view class="setting-option-text">
                        <image src="https://funny233.xyz/static/profile/1.webp" mode="scaleToFill" />
                        <view>基本信息</view>
                    </view>
                    <image src="https://funny233.xyz/static/profile/Arrow Right.webp" mode="scaleToFill" />
                </view>
                <!-- <view class="setting-option">
                    <view class="setting-option-text">
                        <image src="https://funny233.xyz/static/profile/Tag.webp" mode="scaleToFill" />
                        <view>我的活动</view>
                    </view>
                    <image src="https://funny233.xyz/static/profile/Arrow Right.webp" mode="scaleToFill" />
                </view> -->
                <view class="setting-option" @click="Navto('/pages/ProfilePage/AcPage')" v-if="UserData.roles == 2">
                    <view class="setting-option-text">
                        <image src="https://funny233.xyz/static/profile/Pencil.webp" mode="scaleToFill" />
                        <view>我的发布</view>
                    </view>
                    <image src="https://funny233.xyz/static/profile/Arrow Right.webp" mode="scaleToFill" />
                </view>
                <view class="setting-option" 
                    @click="Navto('/pages/ProfilePage/AuthorizationPage?authentication_status=' + UserData.authentication_status)">
                    <view class="setting-option-text">
                        <image src="https://funny233.xyz/static/profile/Mail.webp" mode="scaleToFill" />
                        <view>校友认证</view>
                    </view>
                    <image src="https://funny233.xyz/static/profile/Arrow Right.webp" mode="scaleToFill" />
                </view>
                <view class="setting-option" @click="Navto('/pages/ProfilePage/AuthorizationPage2')" v-if="UserData.roles == 2">
                    <view class="setting-option-text">
                        <image src="https://funny233.xyz/static/profile/Mail.webp" mode="scaleToFill" />
                        <view>认证审核</view>
                    </view>
                    <image src="https://funny233.xyz/static/profile/Arrow Right.webp" mode="scaleToFill" />
                </view>

                <view class="setting-option" @click="Navto('/pages/ProfilePage/LovedPage')" v-if="UserData.roles == 2">
                    <view class="setting-option-text">
                        <image src="https://funny233.xyz/static/profile/Mail.webp" mode="scaleToFill" />
                        <view>我的收藏</view>
                    </view>
                    <image src="https://funny233.xyz/static/profile/Arrow Right.webp" mode="scaleToFill" />
                </view>

                <view class="setting-option" @click="Logout()">
                    <view class="setting-option-text">
                        <image src="https://funny233.xyz/static/profile/Export.webp" mode="scaleToFill" />
                        <view>退出登录</view>
                    </view>
                    <image src="https://funny233.xyz/static/profile/Arrow Right.webp" mode="scaleToFill" />
                </view>
                <image src="https://funny233.xyz/static/index/1.webp" mode="aspectFill" class="setting-bg" />

            </view>

        </view>

        <ProfilePage v-show="ShowSkeleton"></ProfilePage>

    </view>
</template>

<script>
import { ProfilePage } from '../../components/skeleton/ProfilePage.vue'
import { BaseUrl, isInExp, request } from '../../js/request'
export default {
    data() {
        return {
            isLogin: false,
            ShowSkeleton: true,
            nologin: {
                filter: 'blur(10px)',
                disabled: 'true',
                // backgroundColor:'red'
            },
            UserData: {}
        }
    },
    components: {
        ProfilePage
    },
    onLoad() {
        // setTimeout(() => {
        //     this.ShowSkeleton = false
        // }, 1000)
    },
    onShow() {
        if (isInExp()) {
            this.isLogin = true
            this.GetUserData()
        } else {
            this.ShowSkeleton = false
        }
        // this.Logout()
    },
    onPullDownRefresh() {
        setTimeout(() => {
            uni.showToast({
                title: '刷新成功',
                icon: 'success',
                mask: true
            })
            uni.stopPullDownRefresh()
        }, 1000)
    },
    methods: {
        Login() {
            uni.navigateTo({ url: '/pages/LoginPage/OneKeyLoginPage' })
        },
        Logout() {
            uni.showModal({
                title: '提示',
                content: '确定要退出登录吗',
                showCancel: true,
                success: ({ confirm, cancel }) => {
                    if (confirm) {
                        uni.removeStorageSync('login')
                        this.isLogin = false
                    }
                }
            })
        },
        GetUserData() {
            request('/api/user/info/', 'GET').then((res) => {
                console.log("USER INFO", res);
                this.UserData = res.data
                this.UserData.avatar = this.UserData.avatar ? BaseUrl + this.UserData.avatar : 'https://funny233.xyz/static/profile/default.webp'
                this.ShowSkeleton = false
            }).catch((err) => {
                this.ShowSkeleton = false
                this.isLogin = false
                console.log("USER INFO ERR", err);
            })
        },
        Navto(url) {
            uni.navigateTo({ url })
        }

    },
}
</script>

<style>
page {
    background-color: #F8F8F8;
}
</style>

<style scoped>
.card {
    width: 100%;
    position: relative;
}

.card image {
    width: 100%;
    /* position: absolute; */
    top: 0;
    left: 0;
}

.card-profile {
    position: absolute;
    bottom: 70rpx;
    left: 80rpx;
    display: flex;
    align-items: center;
}

.card-image image {
    width: 112rpx;
    height: 112rpx;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20rpx;
    /* border: #FFFFFF solid 2rpx; */
}

.card-det {
    margin-left: 12rpx;
    margin-right: 60rpx;
}

.card-username {
    font-size: 28rpx;
    font-weight: 600;
    color: #FFFFFF;
    margin-bottom: 8rpx;
}

.card-det2 {
    font-size: 20rpx;
    font-weight: 500;
    color: #F8F8F8;
}

.setting {
    /* width: 100%; */
    background-color: #ffffff;
    flex: 1;
    margin: 0 30rpx;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
    padding: 42rpx 50rpx;
    overflow: hidden;
    position: relative;
}

.profile {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.setting-option image {
    width: 32rpx;
    height: 32rpx;
}

.setting-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
}

.setting-option-text {
    display: flex;
    align-items: center;
}

.setting-option-text view {
    margin-left: 40rpx;
    color: #4A4A4A;
}

.nologin image {
    width: 100%;
}

.nologin {
    position: relative;
}

.login {
    width: 140rpx;
    height: 60rpx;
    border: 2rpx solid #2699FB;
    text-align: center;
    line-height: 60rpx;
    position: absolute;
    background-color: #ffffff;
    color: #2699FB;
    border-radius: 10rpx;
    top: 200rpx;
    left: 50%;
    transform: translateX(-50%);
}

.setting-bg {
    width: 100%;
    position: absolute;
    bottom: -30rpx;
    left: 0rpx;
    height: 220rpx;
}
</style>