<template>
    <view>
        <image src="https://funny233.xyz/static/connect/bg.webp" mode="scaleToFill" class="bg" />
        <view class="title">校友联络</view>
        <view class="search">
            <input type="text" placeholder="搜索" placeholder-style="color: #BCE0FD" v-model="SearchValue">
            <uni-icons type="search" color="#2699FB" size="30" />
        </view>


        <view class="info" v-if="!isAuth">
            请完成登录/校友认证后可查看校友信息
        </view>

        <view class="list">
            <!-- @touchstart="Touchstart()" @touchmove.stop.prevent="Touchmove()" @touchend="Touchend()" -->
            <view class="index">
                <view v-for="(item, index) in ListShow" :id="item.label + 'Tag'" @click="ClickTag(item.label)">
                    {{ item.label == '_SHARP' ? '#' : item.label }}
                </view>
            </view>
            <view v-for="(item, index) in ListShow" :key="index" class="member">
                <view class="member-title" :id="item.label">{{ item.label == '_SHARP' ? '#' : item.label }}</view>
                <view class="member-member">
                    <view class="member-member-desc" v-for="(member, index) in item.members" :key="index"
                        @click="Navto(JSON.parse(JSON.stringify(member)))">
                        <image :src="member.avatar ? BaseUrl + member.avatar : 'https://funny233.xyz/static/tabbar/Profile2.webp'"
                            mode="aspectFill" />
                        <view>{{ member.name }}</view>
                    </view>
                </view>
            </view>
        </view>

        <view style="height: 30rpx;"></view>
    </view>
</template>
<script>
import { isInExp, request, BaseUrl } from '../../js/request'
import pinyin from './pinyin'
export default {
    data() {
        return {
            isAuth: true,
            list: [],
            ListAll: [],
            ListShow: [],

            IndexPositionList: [],
            IndexTouchStart: false,
            IndexCurrent: 'sharp',

            SearchValue: '',

            BaseUrl,

        }
    },
    watch: {
        SearchValue() {
            if (this.SearchValue) {
                this.ListShow = this.ListAll.map(item => {
                    return {
                        label: item.label,
                        members: item.members.filter(member => member.name.includes(this.SearchValue))
                    }
                }).filter(item => item.members.length)
            } else {
                this.ListShow = this.ListAll
            }
        }
    },
    onLoad() {
        this.load()
    },
    onReady() {

    },
    onPullDownRefresh() {
        this.load()
        setTimeout(() => {
            uni.stopPullDownRefresh()
        }, 2000);
    },
    methods: {
        load() {
            request('/api/user/info/', 'GET').then((res) => {
                if (res.data.authentication_status != 3) {
                    uni.showToast({
                        title: '请完成校友认证后查看',
                        icon: 'none',
                        mask: true
                    })
                    this.isAuth = false
                } else {
                    this.GetList()
                    this.isAuth = true
                }
            }).catch(() => {
                uni.showToast({
                    title: '请登录后查看',
                    icon: 'none',
                    mask: true
                })
                this.isAuth = false
            })
        },
        GetList() {
            this.ListAll = []
            request('/api/book/address/', "GET").then(res => {
                let list = res.data.data
                list.forEach(item => {
                    let firstLetter = pinyin.chineseToPinYinFirst(item.name).toUpperCase()
                    let index = this.ListAll.findIndex(letter => letter.label === firstLetter)
                    if (index === -1) {
                        this.ListAll.push({ label: firstLetter, members: [item] })
                    } else {
                        this.ListAll[index].members.push(JSON.parse(JSON.stringify(item)))
                    }
                })
                this.ListAll.sort((a, b) => a.label.charCodeAt(0) - b.label.charCodeAt(0))
                this.ListAll.forEach(item => {
                    item.members.sort((a, b) => a.name.localeCompare(b.name, "zh"))
                })
                this.ListShow = JSON.parse(JSON.stringify(this.ListAll))
            })

        },
        ClickTag(tag) {
            console.log(tag);
            uni.pageScrollTo({ selector: '#' + tag, duration: 0 })
        },
        Navto(id) {
            uni.navigateTo({
                url: '/pages/ConnectPage/ProfilePage?id=' + id.id
            })
        }


        // Touchmove(e) {
        //     // uni.pageScrollTo({ selector: '#' + i, duration: 0})
        //     this.FromPositionGetIndex(e.touches[0].pageY)
        //     uni.pageScrollTo({ selector: '#' + this.IndexCurrent, duration: 0 })
        //     console.log(this.IndexCurrent, 'move');
        // },
        // Touchend(e) {
        //     // uni.pageScrollTo({ selector: '#' + i, duration: 0 })
        // },
        // Touchstart(e) {
        //     // console.log(e.touches[0].pageY, 'start');
        //     this.IndexTouchStart = true
        //     this.FromPositionGetIndex(e.touches[0].pageY)
        //     uni.pageScrollTo({ selector: '#' + this.IndexCurrent, duration: 0 })
        // },


    },
}
</script>

<style scoped>
.title {
    font-size: 32rpx;
    font-weight: bold;
    color: #4217E6;
    width: 100%;
    text-align: center;
    height: 96rpx;
    line-height: 96rpx;
    margin-top: 40rpx;
}

.search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 32rpx;
    padding-right: 28rpx;
    height: 96rpx;
    border: 1px solid #2699FB;
    margin: 40rpx 32rpx;
    background-color: white;
}

.search input {
    font-size: 28rpx;
    font-family: MiSans, MiSans;
    font-weight: 400;
    color: #2699FB;
    width: calc(100% - 32rpx);
}

.list {
    padding-left: 32rpx;
    padding-right: 64rpx;
}

.member {}

.member-title {
    font-size: 24rpx;
    font-family: Arial, Arial;
    font-weight: bold;
    color: #2699FB;
    margin-bottom: 32rpx;
    margin-top: 32rpx;
}

.member-member {
    /* display: flex;
    flex-wrap: wrap; */
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32rpx;
}

.member-member-desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 208rpx;
    height: 208rpx;
    background: #f1f9ffa7;
    backdrop-filter: blur(60rpx);
}

.member-member-desc image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}

.member-member-desc view {
    font-size: 24rpx;
    color: #2699FB;
    text-align: center;
    font-size: 28rpx;
    font-weight: 600;
    color: #2699FB;
    margin-top: 12rpx;
}

.index {
    position: fixed;
    top: 50%;
    right: 10rpx;
    transform: translateY(-50%);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    font-weight: bold;
    color: #2699FB;
    background-color: #eaeaea6e;
    padding: 10rpx;
    border-radius: 9999rpx;
}

.index view {
    /* margin-bottom: 5rpx;
    margin-top: 5rpx; */
}

.bg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -100;
    opacity: 0.5;
}

.info {
    font-size: 32rpx;
    font-weight: bold;
    color: #2699FB;
    text-align: center;
    margin-top: 40rpx;
}
</style>