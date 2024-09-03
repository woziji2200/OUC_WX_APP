<template>
    <view>
        <image src="https://funny233.xyz/static/profile/setting/bg.webp" mode="scaleToFill" class="bg" />
        <view class="body">

            <image src="https://funny233.xyz/static/bless/logo.webp" />
            <view class="login" @click="login">
                微信一键登录
            </view>
            <view class="policy">
                 <switch type="checkbox" color="#2699FB" :checked="readPolicy" @change="accept_policy"/>
                 <view class="text">同意并接受<view class="policy-text">《用户协议》</view></view>
            </view>
        </view>
    </view>
</template>
<script>
import { request,BaseUrl } from '../../js/request'
export default {
    data() {
        return {
            readPolicy: false,
        }
    },
    methods: {
        accept_policy(){
            this.readPolicy = !this.readPolicy; 
        },
        login(){
            if(!this.readPolicy){
                uni.showToast({ title: '请先阅读并同意用户协议', icon: 'none', mask: true })
                return
            }
            uni.login({
                provider: 'weixin',
                onlyAuthorize: true,
                success: (result) => {
                    // console.log("WEIXIN CODE", result); 
                    request('/api/user/login/', 'POST', {
                        code: result.code
                    }, {}, false).then((res) => {
                        // console.log("LOGIN", res);
                        if (res.statusCode === 200) {
                            uni.setStorageSync('login', res.data)
                            uni.showToast({ title: '登录成功', icon: 'success', mask: true })
                            this.isLogin = true
                            // this.GetUserData()
                            setTimeout(() => {
                                uni.navigateBack({ delta: 1 })
                            }, 3000);
                        }
                    }).catch(() => {
                        uni.showToast({ title: '登录失败', icon: 'none', mask: true })
                    })
                },
                fail: (error) => {
                    uni.showToast({ title: '登录失败', icon: 'none', mask: true })
                }
            })
        }
    },
}
</script>
<style>
.body {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-85%);
    height: 400rpx;
}

image {
    width: 500rpx;
    height: 120rpx;
}

.login {
    width: 500rpx;
    height: 80rpx;
    background: #2699FB;
    border-radius: 40rpx;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: MiSans, MiSans;
    font-weight: bold;
    font-size: 28rpx;
    color: #FFFFFF;
    line-height: 48rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;

    margin-top: 150rpx;
}

.bg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -100;
}

.body .policy {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
}

.body .policy switch{
    color: #2699FB;
} 

.body .policy .text{
    padding-left: 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.body .policy .text .policy-text{
    color: #2699FB;
}
</style>