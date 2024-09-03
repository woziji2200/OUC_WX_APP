<template>
    <view
        style="background: linear-gradient( 180deg, #FFFFFF 0%, #F29C9F 100%);height: 100vh; width: 100vw;position: relative;">
        <!-- <image src="https://funny233.xyz/static/bless/top.webp" style="width: 100%;"/>
		 -->
        <view class="top">
            <image src="https://funny233.xyz/static/bless/icon.webp" style="height: 170rpx;width: 240rpx;" />
            <view class="title">云祝福</view>
            <image src="https://funny233.xyz/static/bless/door.webp" class="door" />
        </view>
        <view class="body">
            <image src="https://funny233.xyz/static/bless/tree.webp" class="tree" />
            <!-- <view class="text">信息科学与工程学部</view> -->
        </view>
        <view class="footer">
            <image src="https://funny233.xyz/static/bless/foot.webp" style="width: 150rpx;height: 150rpx;" class="top-left" />
            <image src="https://funny233.xyz/static/bless/foot.webp" style="width: 150rpx;height: 150rpx;" class="bottom-right" />
            <view class="area">
                <view class="bless"><text class="text">祝福树</text></view>
                <view class="discuss" @click="Navto('/pages/BlessPage/DiscussPage')"><text class="text">讨论区</text>
                </view>
            </view>
        </view>
        <view class="send" @click="zhufu">
            <image src="https://funny233.xyz/static/bless/message.webp" style="width: 80rpx;height: 80rpx;" />
            <view class="text">点击送祝福</view>
            <image src="https://funny233.xyz/static/bless/蒙版组 13.webp" class="bg" />
            <image src="https://funny233.xyz/static/bless/蒙版组 14.webp" class="bg" />
        </view>
        <view v-if="open_zhufu" class="bless-model" @click="close_zhufu">
            <view class="model" @click.stop>
                <view class="title">为海大送祝福</view>
                <view class="bg-100">100</view>
                <image src="https://funny233.xyz/static/bless/right.webp" class="right-sakura" />
                <view class="input">
                    <view class="prompt">亲爱的海大：</view>
                    <view class="input">
                        <textarea class="content" maxlength=50 placeholder='请输入对海大的祝福...' @input="input"
                            placeholder-style="color:#F4C8C9;" :value="bless"></textarea>
                    </view>
                </view>
                <!-- <view class="red-packet" @click.stop>
                    <view class="prompt" @click="check_hongbao">
                        <radio :checked="hongbao" color="#d42727" />
                        <view class="text">包个红包：</view>
                    </view>
                    <view class="money">
                        {{ money }}元
                    </view>
                </view> -->
                <view class="send" @click="send">
                    <view class="content">
                        <view class="text">发送祝福</view>
                        <image src="https://funny233.xyz/static/bless/foot.webp" class="top-left" />
                        <image src="https://funny233.xyz/static/bless/foot.webp" class="right-bottom" />
                    </view>
                </view>
                <image src="https://funny233.xyz/static/bless/door.webp" class="door" @click="close_zhufu" />
            </view>
        </view>
    </view>
</template>

<script>
import { request } from '../../js/request.js'
export default {
    data() {
        return {
            bless: '',
            money: 8.88,
            open_zhufu: false,
            hongbao: true
        }
    },
    methods: {
        Navto(url) {
            uni.navigateTo({ url });
        },
        input(e) {
            this.bless = e.detail.value
        },
        zhufu() {
            this.open_zhufu = true
        },
        close_zhufu(e) {
            this.open_zhufu = false
        },
        check_hongbao() {
            this.hongbao = !this.hongbao
        },
        send() {
            request('/api/bless/bless/', 'POST', {content: this.bless}, {}, true).then(res => {
                    let success = res.data.msg == '上传成功';
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'success',
                        duration: 2000
                    })
                    success && (this.open_zhufu = false)
            })
        }
    }
}
</script>

<style>
.top {
    position: relative;
}

.top .title {
    height: 100rpx;
    font-family: dakai;
    font-weight: 400;
    font-size: 100rpx;
    color: #D42727;
    line-height: 0rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
    position: absolute;
    top: 120rpx;
    left: 135rpx;
    z-index: 1;
}

.top .door {
    position: absolute;
    top: -20rpx;
    right: 20rpx;
}

.body {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100vw;
    position: relative;
}

.body .tree {
    width: 100%;
    height: 1200rpx;
    transform: translateX(-40rpx);
}

/* .body .text {
    width: 513px;
    font-family: dakai;
    font-weight: 200;
    font-size: 60rpx;
    color: #FFFFFF;
    line-height: 0rpx;
    text-stroke: 0px #F29C9F;
    text-align: center;
    letter-spacing: 10rpx;
    font-style: normal;
    text-transform: none;
    transform: rotate(90deg) translateY(-50%);
    -webkit-text-stroke: 0px #F29C9F;
    position: fixed;
    right: -280rpx;
    top: calc(50% + 60rpx);
    z-index: 999;
} */

.footer {
    width: 532rpx;
    height: 122rpx;
    background: #FFFFFF;
    border-radius: 62rpx 62rpx 62rpx 62rpx;
    margin-left: 110rpx;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateY(-100rpx) translateX(-75%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer .top-left {
    position: absolute;
    top: -80rpx;
    left: -70rpx;
}

.footer .bottom-right {
    position: absolute;
    bottom: -70rpx;
    right: -70rpx;
}

.footer .area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 491rpx;
    height: 74rpx;
    background: #FDEEF4;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
}

.footer .area .bless {
    width: 245rpx;
    height: 74rpx;
    background: #F29C9F;
    border-radius: 38rpx 38rpx 36rpx 38rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer .area text {
    font-family: dakai;
    font-weight: 400;
    font-size: 40rpx;
    color: #FFFFFF;
    line-height: 0rpx;
    /* letter-spacing: 100px; */
    text-stroke: 0px #F29C9F;
    text-align: center;
    font-style: normal;
    text-transform: none;
}

.footer .area .discuss {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer .area .discuss text {
    color: #F29C9F;
}

.send {
    width: 300rpx;
    height: 80rpx;
    background: #FFFFFF;
    border-radius: 54rpx 54rpx 54rpx 54rpx;
    border: 4rpx solid #F29C9F;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 460rpx;
    right: 70rpx;
}

.send .text {
    font-family: dakai;
    font-weight: 400;
    font-size: 40rpx;
    color: #FDEEF4;
    line-height: 0rpx;
    text-shadow: 4px 4px 0px rgba(224, 116, 120, 0.77);
    text-stroke: 0px #E07478;
    text-align: center;
    font-style: normal;
    text-transform: none;
    -webkit-text-stroke: 0px #E07478;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.send .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.bless-model {
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6rpx);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 3;
}


.bless-model .model {
    width: 642rpx;
    height: 866rpx;
    background: #F29C9F;
    border-radius: 40rpx 40rpx 40rpx 40rpx;
    /* transform: translateX(-40rpx); */
    top: calc(50% - 373rpx);
    left: calc(50% - 321rpx);
    position: absolute;
}

.bless-model .model .title {
    width: 416rpx;
    height: 64rpx;
    font-family: dakai;
    font-weight: 400;
    font-size: 64rpx;
    color: #FFFFFF;
    line-height: 0rpx;
    text-shadow: 4px 4px 0px rgba(224, 116, 120, 0.49);
    text-stroke: 0px #F29C9F;
    text-align: center;
    font-style: normal;
    text-transform: none;
    -webkit-text-stroke: 0px #F29C9F;
    margin-left: 40rpx;
    transform: translateY(114rpx);
    z-index: 6;
}

.bless-model .model .bg-100 {
    width: 200rpx;
    height: 144rpx;
    font-family: zihunbiantaoti, zihunbiantaoti;
    font-weight: 400;
    font-size: 120rpx;
    font-style: italic;
    color: rgba(240, 181, 183, 1);
    line-height: 0rpx;
    text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.16);
    text-align: center;
    text-transform: none;

}

.bless-model .model .right-sakura {
    width: 205rpx;
    height: 200rpx;
    position: absolute;
    right: 40rpx;
    top: -40rpx;
}

.bless-model .model .input {
    padding-left: 34rpx;
}

.bless-model .model .input .input {
    height: 600rpx;
}

.bless-model .model .input .prompt {
    width: 208rpx;
    height: 36rpx;
    font-family: dakai;
    font-weight: 400;
    font-size: 36rpx;
    color: #F8F8F8;
    line-height: 0rpx;
    text-stroke: 0px #F29C9F;
    text-align: center;
    font-style: normal;
    text-transform: none;
    -webkit-text-stroke: 0px #F29C9F;
}


.bless-model .model .input .input .content {
    font-family: dakai;
    font-weight: 400;
    font-size: 36rpx;
    color: white;
    line-height: 0rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    line-height: 1.5;
    text-decoration: underline;
}

/* .bless-model .model .red-packet {
    width: 500rpx;
    height: 92rpx;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    opacity: 0.8;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;
    position: absolute;
    bottom: 310rpx;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}

.bless-model .model .red-packet .prompt {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.bless-model .model .red-packet .prompt .text {
    font-family: dakai;
    font-weight: 400;
    font-size: 40rpx;
    color: #F29C9F;
    line-height: 0rpx;
    text-stroke: 0px #F29C9F;
    text-align: center;
    font-style: normal;
    text-transform: none;
    -webkit-text-stroke: 0px #F29C9F;
}

.bless-model .model .red-packet .money {
    font-family: dakai;
    font-weight: 400;
    font-size: 48rpx;
    color: #E07478;
    text-align: center;
    font-style: normal;
    text-transform: none;
} */

.bless-model .model .door {
    width: 480rpx;
    height: 339rpx;
    position: absolute;
    bottom: -90rpx;
    left: calc(50% - 240rpx);
}

.bless-model .model .send {
    width: 560rpx;
    height: 90rpx;
    background: #E07478;
    /* background: #FFFFFF; */
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    opacity: 0.8;
    position: absolute;
    bottom: 202rpx;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}

.bless-model .model .send .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    position: relative;
}

.bless-model .model .send text {
    width: 266rpx;
    height: 56rpx;
    font-family: dakai;
    font-weight: 400;
    font-size: 56rpx;
    color: #FFFFFF;
    line-height: 0rpx;
    letter-spacing: 250px;
    text-stroke: 0px #F29C9F;
    text-align: right;
    font-style: normal;
    text-transform: none;
    -webkit-text-stroke: 0px #F29C9F;
    letter-spacing: 20rpx;
}

.bless-model .model .send .top-left {
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-75%) translateX(-50%);
}

.bless-model .model .send .right-bottom {
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(75%) translateX(50%);
}
</style>
