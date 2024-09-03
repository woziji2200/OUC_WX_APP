<!--
此文件为开发者工具生成，生成时间: 2024/2/18下午3:01:35
使用方法：
在 E:\Code_project\uniapp\xiaoqing\dist\dev\mp-weixin\pages\IndexPage\IndexPage.wxml 引入模板

```
<import src="IndexPage.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 E:\Code_project\uniapp\xiaoqing\dist\dev\mp-weixin\pages\IndexPage\IndexPage.wxss 中引入样式
```
@import "./IndexPage.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
    <view class="sk-container">
        <view class="data-v-fc64e86c data-v-fc64e86c">
            <image class="banner data-v-fc64e86c sk-image" mode="widthFix" style="height: 199.949px;"></image>
            <view class="module module data-v-fc64e86c data-v-fc64e86c">
                <view class="buttons buttons data-v-fc64e86c data-v-fc64e86c">
                    <view class="buttons-button buttons-button data-v-fc64e86c data-v-fc64e86c">
                        <image class="data-v-fc64e86c sk-image" mode="aspectFit"></image>
                        <label class="_span data-v-fc64e86c sk-transparent sk-text-14-2857-860 sk-text">云回家</label>
                    </view>
                    <view class="buttons-button buttons-button data-v-fc64e86c data-v-fc64e86c">
                        <image class="data-v-fc64e86c sk-image" mode="aspectFit"></image>
                        <label class="_span data-v-fc64e86c sk-transparent sk-text-14-2857-419 sk-text">云祝福</label>
                    </view>
                    <view class="buttons-button buttons-button data-v-fc64e86c data-v-fc64e86c">
                        <image class="data-v-fc64e86c sk-image" mode="aspectFit"></image>
                        <label class="_span data-v-fc64e86c sk-transparent sk-text-14-2857-188 sk-text">云游览</label>
                    </view>
                    <view class="buttons-button buttons-button data-v-fc64e86c data-v-fc64e86c">
                        <image class="data-v-fc64e86c sk-image" mode="aspectFit"></image>
                        <label class="_span data-v-fc64e86c sk-transparent sk-text-14-2857-506 sk-text">海大文创</label>
                    </view>
                </view>
            </view>
            <view class="module module-bg data-v-fc64e86c sk-image">
                <view class="module-title module-title data-v-fc64e86c data-v-fc64e86c">
                    <view class="module-title-qwq module-title-qwq data-v-fc64e86c data-v-fc64e86c">
                        <image class="data-v-fc64e86c sk-image" mode="aspectFit"></image>
                        <view class="data-v-fc64e86c sk-transparent sk-text-14-2857-843 sk-text">新闻</view>
                    </view>
                    <view class="module-title-qaq module-title-qaq data-v-fc64e86c data-v-fc64e86c"
                        data-event-opts="tap,SwitchTab,/pages/NewsPage/NewsPage"
                        style="border: none;">
                        <image class="data-v-fc64e86c sk-image" mode="aspectFit"></image>
                        <view class="data-v-fc64e86c sk-transparent sk-text-14-2857-280 sk-text">查看更多</view>
                    </view>
                </view>
                <view 
                    class="data-v-fc64e86c data-v-fc64e86c">
                    <view class="uni-swiper__warp dot--uni-swiper__warp">
                        <swiper autoplay="false" circular="true"
                            class="swiper-box swiper-box data-v-fc64e86c data-v-fc64e86c"
                            data-event-opts="change,NewsChange,$event" duration="300" interval="6000" current="0">
                            <swiper-item class="swiper-item swiper-item data-v-fc64e86c data-v-fc64e86c"
                                style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
                                <image class="data-v-fc64e86c sk-image" mode="aspectFill"></image>
                                <view class="swiper-item-ghost data-v-fc64e86c sk-image"></view>
                                <view class="swiper-item-title swiper-item-title data-v-fc64e86c data-v-fc64e86c">
                                    <view
                                        class="swiper-item-title-time data-v-fc64e86c sk-transparent sk-text-14-2857-100 sk-text">
                                        2021/1/1</view>
                                    <view
                                        class="swiper-item-title-content data-v-fc64e86c sk-transparent sk-text-14-2857-37 sk-text">
                                        内容超出上限哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</view>
                                </view>
                            </swiper-item>
                            <swiper-item class="swiper-item swiper-item data-v-fc64e86c data-v-fc64e86c"
                                style="position: absolute; width: 100%; height: 100%; transform: translate(100%, 0px) translateZ(0px);">
                                <image class="data-v-fc64e86c sk-image" mode="aspectFill"></image>
                                <view class="swiper-item-ghost data-v-fc64e86c sk-image"></view>
                                <view class="swiper-item-title swiper-item-title data-v-fc64e86c data-v-fc64e86c">
                                    <view
                                        class="swiper-item-title-time data-v-fc64e86c sk-transparent sk-text-14-2857-749 sk-text">
                                        2021/3/3</view>
                                    <view
                                        class="swiper-item-title-content data-v-fc64e86c sk-transparent sk-text-14-2857-347 sk-text">
                                        内容 B</view>
                                </view>
                            </swiper-item>
                        </swiper>
                        <view class="uni-swiper__dots-box dot--uni-swiper__dots-box" style="bottom:10px;">
                            <view
                                class="uni-swiper__dots-item dot--uni-swiper__dots-item uni-swiper__dots-long dot--uni-swiper__dots-long"
                                data-event-opts="tap,clickItem,0"
                                style="width:18px;height:6px;background-color:#2699FB;border:1px solid #2699FB;"></view>
                            <view class="uni-swiper__dots-item dot--uni-swiper__dots-item false dot--false"
                                data-event-opts="tap,clickItem,1"
                                style="width:6px;height:6px;background-color:#fff;border:1px solid #fff;"></view>
                            <view class="uni-swiper__dots-item dot--uni-swiper__dots-item false dot--false"
                                data-event-opts="tap,clickItem,2"
                                style="width:6px;height:6px;background-color:#fff;border:1px solid #fff;"></view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="module module-bg data-v-fc64e86c sk-image">
                <view class="module-title module-title data-v-fc64e86c data-v-fc64e86c">
                    <view class="module-title-qwq module-title-qwq data-v-fc64e86c data-v-fc64e86c">
                        <image class="data-v-fc64e86c sk-image" mode="aspectFit"></image>
                        <view class="data-v-fc64e86c sk-transparent sk-text-14-2857-250 sk-text">活动</view>
                    </view>
                    <view class="module-title-qaq module-title-qaq data-v-fc64e86c data-v-fc64e86c"
                        style="border: none;"
                        data-event-opts="tap,SwitchTab,/pages/ActivitivesPage/ActivitivesPage">
                        <image class="data-v-fc64e86c sk-image" mode="aspectFit"></image>
                        <view class="data-v-fc64e86c sk-transparent sk-text-14-2857-527 sk-text">前往报名</view>
                    </view>
                </view>
                <view 
                    class="data-v-fc64e86c data-v-fc64e86c">
                    <view class="uni-swiper__warp dot--uni-swiper__warp">
                        <swiper autoplay="false" circular="true"
                            class="swiper-box swiper-box data-v-fc64e86c data-v-fc64e86c"
                            data-event-opts="change,ActivitivesChange,$event" duration="300" interval="6000" current="0">
                            <swiper-item class="swiper-item swiper-item data-v-fc64e86c data-v-fc64e86c"
                                style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
                                <image class="data-v-fc64e86c sk-image" mode="aspectFill"></image>
                                <view class="swiper-item-ghost data-v-fc64e86c sk-image"></view>
                            </swiper-item>
                            <swiper-item class="swiper-item swiper-item data-v-fc64e86c data-v-fc64e86c"
                                style="position: absolute; width: 100%; height: 100%; transform: translate(100%, 0px) translateZ(0px);">
                                <image class="data-v-fc64e86c sk-image" mode="aspectFill"></image>
                                <view class="swiper-item-ghost data-v-fc64e86c sk-image"></view>
                            </swiper-item>
                        </swiper>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<style scoped>
/*
此文件为开发者工具生成，生成时间: 2024/2/18下午3:01:35

在 E:\Code_project\uniapp\xiaoqing\dist\dev\mp-weixin\pages\IndexPage\IndexPage.wxss 中引入样式
```
@import "./IndexPage.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
    color: transparent !important;
}

.sk-text-14-2857-860 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.7991rpx;
    position: relative !important;
}

.sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
}

.sk-text-14-2857-419 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.7991rpx;
    position: relative !important;
}

.sk-text-14-2857-188 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.7991rpx;
    position: relative !important;
}

.sk-text-14-2857-506 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.7991rpx;
    position: relative !important;
}

.sk-text-14-2857-843 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.7991rpx;
    position: relative !important;
}

.sk-text-14-2857-280 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 31.8925rpx;
    position: relative !important;
}

.sk-text-14-2857-100 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 31.8925rpx;
    position: relative !important;
}

.sk-text-14-2857-37 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 34.3458rpx;
    position: relative !important;
}

.sk-text-14-2857-749 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 31.8925rpx;
    position: relative !important;
}

.sk-text-14-2857-347 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 34.3458rpx;
    position: relative !important;
}

.sk-text-14-2857-250 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.7991rpx;
    position: relative !important;
}

.sk-text-14-2857-527 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 31.8925rpx;
    position: relative !important;
}

.sk-image {
    background: #EFEFEF !important;
}

.sk-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
}</style>