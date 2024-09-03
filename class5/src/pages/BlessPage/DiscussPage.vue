<template>
    <view style="position: relative;">
        <view
            style="background: linear-gradient( 180deg, #FFFFFF 0%, #F29C9F 100%);height: 100vh; width: 100vw;position: fixed;">
        </view>
        <!-- <image src="https://funny233.xyz/static/bless/top.webp" style="width: 100%;"/>
		 -->
        <view class="top">
            <image src="https://funny233.xyz/static/bless/logo.webp" class="logo" />
            <image src="https://funny233.xyz/static/bless/door.webp" class="door" />
            <image src="https://funny233.xyz/static/bless/icon.webp" class="left icon" />
            <image src="https://funny233.xyz/static/bless/icon.webp" class="right icon" />
        </view>
        <view class="body" style="overflow: hidden;margin-top: 20rpx;">
            <view class="bar"></view>
            <view class="header-title">海大说</view>
            <view class="speak" style="padding: 36rpx 54rpx;">
                <image src="https://funny233.xyz/static/bless/蒙版组 118.webp" class="bg" mode="scaleToFill" />
                <view class="title-row">
                    <view style="display: flex;justify-content: center;align-items: center;">
                        <image src="https://funny233.xyz/static/bless/tx.webp"
                            style="width: 60rpx;height: 60rpx;border-radius: 30rpx;" />
                        <view class="title">海大说</view>
                    </view>
                    <view>
                        <view class="text"></view>
                    </view>
                </view>
                <view class="button" @click="NavTo('/pages/BlessPage/AddDiscussPage')">
                    <view class="image">
                        <image src="https://funny233.xyz/static/bless/Hexagon.webp" />
                        <image src="https://funny233.xyz/static/bless/+.webp" />
                    </view>
                    <view class="text">
                        <view>海大说</view>
                        <view>我来说</view>
                    </view>
                </view>
            </view>
            <view v-for="(item, id) in discusstion" v-key="item.id" class="discusstions"
                style="padding: 36rpx 54rpx;margin: 18rpx 0;">
                <image src="https://funny233.xyz/static/bless/蒙版组 118.webp" class="bg" mode="scaleToFill" />
                <view class="title-row">
                    <view style="display: flex;justify-content: center;align-items: center;">
                        <image :src="item.avatar" style="width: 60rpx;height: 60rpx;border-radius: 30rpx;" />
                        <view class="title">{{ item.name }}</view>
                    </view>
                    <view>
                        <view class="text">{{ item.time }}</view>
                    </view>
                </view>
                <view class="content" style="width: 100%;">
                    <view style="padding: 10rpx;">{{ item.content }}</view>
                    <!-- <view
                        style="width: 100%;display: flex;flex-direction: row;justify-content: flex-start;flex-wrap: wrap;">
                        <image v-for="img in item.pics" :src="img"
                            style="width: 160rpx;height:160rpx;aspect-ratio: 1 / 1;margin-top: 20rpx;margin-left: 20rpx;"
                            mode="scaleToFill" />
                    </view> -->
                    <view class="comments-images">
                        <uni-grid :column="3" :showBorder="false" :square="true">
                            <uni-grid-item :index="imageIndex" class="comments-images-image"
                                v-for="(image, imageIndex) in item.pics ? item.pics.slice(0, 6) : 0">
                                <image @tap="preview(id, imageIndex)" :src="image" mode="aspectFill"></image>
                            </uni-grid-item>
                        </uni-grid>
                    </view>
                </view>
                <view class="operation">
                    <view class="left">
                        <uni-icons @tap="add_like(item)" type="heart-filled" size="18"
                            :color="item.liked ? 'red' : '#2699FB'"></uni-icons>
                        <text>{{ item.like || 0 }}</text>
                        <image @tap="comment(item)" src="https://funny233.xyz/static/bless/Mnius.webp" />
                        <text>{{ item.comment_count || 0 }}</text>
                    </view>
                    <view class="right">
                        <!-- <image src="https://funny233.xyz/static/bless/Share.webp" />
                        <text>分享</text> -->
                    </view>
                </view>
                <view v-if="item.comments && item.comments.length > 0" class="comments">
                    <view v-for="comment in item.comments" class="comment">
                        <view class="name">{{ comment.name }}:</view>
                        <view class="content">{{ comment.content }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="footer">
            <image src="https://funny233.xyz/static/bless/foot.webp" style="width: 150rpx;height: 150rpx;" class="top-left" />
            <image src="https://funny233.xyz/static/bless/foot.webp" style="width: 150rpx;height: 150rpx;" class="bottom-right" />
            <view class="area">
                <view class="bless" @click="back()"><text class="text">祝福树</text></view>
                <view class="discuss"><text class="text">讨论区</text></view>
            </view>
        </view>
        <view>
            <uni-popup ref="commentView" type="dialog">
                <uni-popup-dialog ref="inputClose" mode="input" title="评论" placeholder="请输入评论"
                    @confirm="comment_submit"></uni-popup-dialog>
            </uni-popup>
        </view>
    </view>
</template>

<script>
import { request, BaseUrl } from '../../js/request'
export default {
    data() {
        return {
            discusstion: [],
            cur_comment_id: 0,
        }
    },
    methods: {
        NavTo(url) {
            uni.navigateTo({ url })
        },
        comment_submit(val) {
            function comment_request(val, id) {
                return request("/api/bless/comment/", 'POST', { discuss_id: id, content: val }, {}, true);
            }
            function update_comment(id, _this) {
                request(`/api/bless/comment/?discuss_id=${id}`, 'GET').then(res => {
                    let e = _this.discusstion.find(e => e.id == id);
                    e.comments = res.data.map(e => {
                        e.name = e.username || '匿名用户'
                        e.content = e.content || ''
                        return e;
                    })
                    e.comment_count++;
                })
            }
            comment_request(val, this.cur_comment_id).then(res => {
                if (res.data.msg == '评论成功') {
                    // this.getDiscusstions();
                    update_comment(this.cur_comment_id, this);
                }
                uni.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            })
        },
        comment(item) {
            this.cur_comment_id = item.id;
            this.$refs.commentView.open()
        },
        add_like(item) {
            let method = !item.liked ? 'POST' : 'DELETE';
            request("/api/bless/like/", method, { id: item.id }, {}, true).then(res => {
                let success = res.data.msg == '点赞成功' || res.data.msg == '取消点赞成功';
                if (success) {
                    item.like += item.liked ? -1 : 1;
                }
                item.liked = !item.liked;
                uni.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })

            })
        },
        back() {
            uni.navigateBack({
                delta: -1,
                success: () => {
                    let pages = getCurrentPages();
                    let beforePage = pages[pages.length - 2];
                    beforePage.getDiscusstions();
                }
            })
        },
        preview(id, index) {
            uni.previewImage({
                urls: this.discusstion[id].pics,
                current: this.discusstion[id].pics[index]
            })
        },
        async getDiscusstions() {
            function handleData(data) {
                return data.map((e) => {
                    return {
                        id: e.id,
                        name: e.username || '匿名用户',
                        avatar: BaseUrl + e.avatar || 'https://funny233.xyz/static/bless/tx.webp',
                        time: e.create_time.split('T')[0],
                        content: e.content,
                        pics: e.image.map((e) => {
                            return BaseUrl + e.image;
                        }),
                        like: e.like,
                        liked: e.is_like,
                        comment_count: e.comment_count,
                        comments: []
                    }
                })
            }
            await request('/api/bless/discuss/', 'GET').then(async (res) => {
                this.discusstion = handleData(res.data)
                this.discusstion.forEach((e) => {
                    console.log(e)
                    request(`/api/bless/comment/?discuss_id=${e.id}`, 'GET').then(res => {
                        e.comments = res.data.map(e => {
                            e.name = e.username || '匿名用户'
                            e.content = e.content || ''
                            return e;
                        })
                    })
                })
            })
        }
    },
    onLoad() {
        this.getDiscusstions()
    },
    async onPullDownRefresh() {
        await this.getDiscusstions().then(()=>{
            uni.stopPullDownRefresh();
            uni.showToast({
                title: '刷新成功',
                icon: 'success'
            })
        })
    }
}
</script>

<style>
.top {
    position: relative;
}

.top .logo {
    position: absolute;
    height: 60rpx;
    width: 266rpx;
    top: 32rpx;
    left: 50%;
    transform: translateX(-50%);

}

.top .door {
    position: absolute;
    height: 340rpx;
    width: 480rpx;
    top: 6rpx;
    left: 50%;
    transform: translateX(-50%);
}

.top .icon {
    position: absolute;
    height: 170rpx;
    width: 240rpx;
}

.top .left {
    top: 0;
    left: -20rpx;
}

.top .right {
    top: 0;
    right: -20rpx;
    transform: rotateY(180deg);
}


.footer {
    width: 532rpx;
    height: 122rpx;
    background: #FFFFFF;
    border-radius: 62rpx 62rpx 62rpx 62rpx;
    margin-left: 110rpx;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateY(-50rpx) translateX(-75%);
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

.footer .area .discuss {
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

.footer .area .bless {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer .area .bless text {
    color: #F29C9F;
}

.body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(290rpx);
    padding-bottom: 210rpx;
}

.body .bar {
    width: 80rpx;
    height: 0rpx;
    border: 10rpx solid #0143E6;
    border-radius: 40rpx;
}

.body .header-title {
    height: 48rpx;
    font-family: dakai;
    font-weight: 400;
    font-size: 48rpx;
    color: #0143E6;
    line-height: 0rpx;
    letter-spacing: 15rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin-top: 35rpx;
    transform: translateX(10rpx);
}

.body .speak,
.body .discusstions {
    width: calc(100vw - 240rpx);
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(255, 181, 181, 0.16);
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    position: relative;
}

.body .speak .bg,
.body .discusstions .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
}

.body .title {
    font-family: dakai;
    font-weight: 400;
    font-size: 32rpx;
    color: #2699FB;
    line-height: 20rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    letter-spacing: 0;
}

.body .title-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.body .title-row .title {
    margin-left: 20rpx;
}

.body .title-row .text {
    font-family: dakai;
    font-weight: 400;
    font-size: 16rpx;
    color: #2699FB;
    line-height: 40rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    text-decoration: underline;
}

.body .speak .button {
    margin-top: 28rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transform: translateX(-50rpx);
}

.body .speak .button .image {
    position: relative;
    width: 151rpx;
    height: 130rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.body .speak .button .image image:nth-child(1) {
    width: 151rpx;
    height: 130rpx;
    position: absolute;
    top: 0;
    left: 0;
}

.body .speak .button .image image:nth-child(2) {
    width: 42rpx;
    height: 42rpx;
    background-color: #FFFFFF;
    border-radius: 300rpx;
    padding: 10rpx;
}

.body .speak .button .text {
    margin-left: 22rpx;
    padding-top: 30rpx;
}

.body .speak .button .text view {
    width: 152rpx;
    height: 48rpx;
    font-family: dakai;
    font-weight: 400;
    font-size: 48rpx;
    color: #AAD7FE;
    line-height: 0rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;

    margin-top: 14rpx;
}

.body .discusstions {
    height: 100%;
}

.body .discusstions .content view:nth-child(1) {
    font-family: MiSans, MiSans;
    font-weight: 500;
    font-size: 30rpx;
    color: #4A4A4A;
    line-height: 36rpx;
    text-align: justify;
    font-style: normal;
    text-transform: none;
    word-wrap: break-word;
    word-break: break-all;
}

.comments-images {
    position: relative;
}

.comments-images-image image {
    width: 100%;
    margin: 10rpx;
    /* height: 100%; */
}

.comments-images-image {
    overflow: hidden;
    position: relative;
}

.discusstions .operation {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
}

.discusstions .operation .left,
.discusstions .operation .right {
    display: flex;
    align-items: center;
    z-index: 999;
}

.discusstions .operation image {
    width: 32rpx;
    height: 32rpx;
    margin-left: 44rpx;
}

.discusstions .operation image:nth-child(1) {
    margin-left: 0;
}

.discusstions .operation text {
    font-weight: 600;
    font-size: 24rpx;
    color: #2699FB;
    line-height: 36rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-left: 10rpx;
}

.discusstions .comments {
    width: 502rpx;
    background: #CBE4FA;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(255, 181, 181, 0.16);
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    margin-top: 20rpx;
    padding: 24rpx;
}

.discusstions .comment {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5rpx 0;
}

.discusstions .comment .name {
    font-family: dakai;
    font-weight: 400;
    font-size: 24rpx;
    color: rgba(38, 153, 251, 1);
    text-align: left;
    font-style: normal;
    text-transform: none;
}

.discusstions .comment .content {
    font-family: MiSans, MiSans;
    font-weight: 400;
    font-size: 20rpx;
    line-height: 26rpx;
    color: #4A4A4A;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-left: 10rpx;
}
</style>
