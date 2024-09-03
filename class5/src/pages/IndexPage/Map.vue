<template>
    <view>


        <view v-if="isFly">
            <view class="emap" style="width:750rpx; height:520rpx">
                <l-echart ref="chartRef" @finished="init"></l-echart>
            </view>
            <view class="emap-ghost"></view>
        </view>


        <!-- <view v-if="isBless">
            <view class="bless">
                <view class="bless-title">百年校庆</view>
                <view class="bless-close" @click="isBless = false">
                    <uni-icons type="closeempty" color="#fff" size="32" />
                </view>
                <view class="bless-text2">
                    <view class="bless-text2-1">您是</view>
                    <view class="bless-text2-2">第{{ Rank }}位</view>
                    <view class="bless-text2-1 bless-text2-3">云回家的校友</view>
                </view>
                <image class="bless-img1" src="https://funny233.xyz/static/yunhuijia/bless1.webp" mode="aspectFit" />
                <view class="bless-qwq">
                    <image class="bless-avatar"
                        :src="userdata.avatar ? BaseUrl + userdata.avatar : 'https://funny233.xyz/static/profile/default.webp'"
                        mode="aspectFit" />
                    <image class="bless-img2" src="https://funny233.xyz/static/yunhuijia/bless2.webp" mode="aspectFit" />
                    <view class="bless-text">{{ Bless }}</view>
                </view>
                <button open-type="share" class="bless-share">
                    <image src="https://funny233.xyz/static/yunhuijia/share.webp" mode="aspectFit" />
                </button>
            </view>
            <view class="emap-ghost"></view>
        </view> -->

        <view v-if="isBless">
            <view class="bless">
                <view class="bless-close" @click="isBless = false">
                    <uni-icons type="closeempty" color="#fff" size="32" />
                </view>
                <view class="bless-text2">
                    <view class="bless-avatar">
                        <image
                            :src="userdata.avatar ? BaseUrl + userdata.avatar : 'https://funny233.xyz/static/profile/default.webp'"
                            mode="aspectFit" />
                    </view>
                    <view class="bless-text3">
                        <view class="bless-text2-1">您是</view>
                        <view class="bless-text2-2">第{{ Rank }}位</view>
                    </view>
                    <view class="bless-text2-3">云回家的校友</view>
                </view>
                <image class="bless-img1" src="../../static/yunhuijia/bless3.png" mode="aspectFit" />
                <button open-type="share" class="bless-share">
                    <image src="https://funny233.xyz/static/yunhuijia/share.webp" mode="aspectFit" />
                </button>
            </view>
            <view class="emap-ghost"></view>
        </view>

        <!-- <button @click="fly()">起飞</button> -->
        <!-- <button @click="test()">test</button> -->

        <image class="bg" src="https://funny233.xyz/static/yunhuijia/bg.webp" mode="aspectFill" />
        <image class="logo" src="https://funny233.xyz/static/yunhuijia/logo.webp" mode="aspectFit" @click="isBless = true" />
        <view class="change-button" @click="mode = mode == 'cn' ? 'world' : 'cn'">
            <image
                :src="mode == 'cn' ? 'https://funny233.xyz/static/yunhuijia/cn.webp' : 'https://funny233.xyz/static/yunhuijia/world.webp'"
                mode="scaleToFill" />
        </view>
        <view class="map">
            <l-echart v-show="!isBless && !isFly" ref="chartRef2" @finished="init2"></l-echart>
        </view>
        <view class="times">
            <view class="times-text">已回家：</view>
            <view class="times-num">
                <view class="times-num-1">
                    <image src="https://funny233.xyz/static/yunhuijia/Square Button.webp" mode="scaleToFill" />
                    <view>{{ (RankTotal / 1000).toFixed(0) }}</view>
                </view>
                <view class="times-num-1">
                    <image src="https://funny233.xyz/static/yunhuijia/Square Button.webp" mode="scaleToFill" />
                    <view>{{ (RankTotal % 1000 / 100).toFixed(0) }}</view>
                </view>
                <view class="times-num-1">
                    <image src="https://funny233.xyz/static/yunhuijia/Square Button.webp" mode="scaleToFill" />
                    <view>{{ ((RankTotal % 1000 % 100) / 10).toFixed(0) }}</view>
                </view>
                <view class="times-num-1">
                    <image src="https://funny233.xyz/static/yunhuijia/Square Button.webp" mode="scaleToFill" />
                    <view>{{ RankTotal % 1000 % 100 % 10 }}</view>
                </view>
            </view>
        </view>

        <view class="home-button" @click="fly()">
            <image src="https://funny233.xyz/static/yunhuijia/homebutton.webp" mode="scaleToFit" />
        </view>

        <view class="more" @click="NavTo('/pages/IndexPage/Rank')" v-show="true">
            <view>地区</view>
            <view>排名</view>
        </view>



        <uni-popup style="z-index: 2000;" ref="share" type="share" safeArea backgroundColor="#fff">
            <!-- <uni-popup-share></uni-popup-share> -->
            <button>123</button>
        </uni-popup>
    </view>
</template>
<script>
// 全量包  二选一
import { request, BaseUrl } from '../../js/request'
import * as echarts from '@/js/echarts.min4.js'
import lEchart from '@/components/l-echart/l-echart.vue'
import zhongguo from '@/js/china.json'
import world from '@/js/world.json'
import Rank from './Rank.vue'
// const world = import('http://funny233.xyz/world.json')

let OUCPosition = [120.49918, 36.161232]
export default {
    components: {
        lEchart
    },
    data() {
        return {
            BaseUrl: BaseUrl,
            fly233: '起飞',
            planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
            option: {
                // 背景颜色
                backgroundColor: "#404a59",
                // 地图配置
                geo: {
                    map: "china",
                    selectedMode: false,
                    silent: true,
                    label: {
                        // 通常状态下的样式
                        normal: {
                            show: false,
                            textStyle: {
                                color: "#fff",
                            },
                        },
                        // 鼠标放上去的样式
                        emphasis: {
                            textStyle: {
                                color: "#fff",
                            },
                        },
                    },
                    center: [104.547569, 36.395305],
                    zoom: 1.2,
                    // 地图区域的样式设置
                    itemStyle: {
                        normal: {
                            borderColor: "rgba(147, 235, 248, 1)",
                            borderWidth: 1,
                            areaColor: {
                                type: "radial",
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺省为 false
                            },
                            shadowColor: "rgba(128, 217, 248, 1)",
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10,
                        },
                    },
                },
                series: [{
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [
                        {
                            name: '中国海洋大学',
                            value: [120.49918, 36.161232]    // value的前两项是经纬度坐标，第三项为污染度数据
                        }

                    ],
                    symbolSize: 3, // 控制散点的大小
                    label: {
                        normal: {
                            show: true,
                            position: 'bottom',
                            formatter: '{b}',
                            textStyle: {
                                color: '#fff',
                                fontSize: 10
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fff', // 标点颜色
                            boxShadow: "0 0 100px #fff"
                        }
                    },
                }
                ]
            },
            option2: {
                backgroundColor: "transparent",
                geo: {
                    map: "china",
                    selectedMode: false,
                    silent: true,
                    center: [104.547569, 36.395305],
                    zoom: 1.2,
                    itemStyle: {
                        normal: {
                            borderColor: "rgb(212,180,68)",
                            borderWidth: 1,
                            areaColor: {
                                type: "radial",
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{ offset: 1, color: "#EBE5CC" }],
                                globalCoord: false,
                            },
                        },
                    },
                },
                series: [{
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: (value, params) => { return value[2] },
                    symbol: "path://M25.6 0L33 9.4l10-1.2c0.9-0.1 1.3 1.1 0.6 1.7l-7.5 6.9 1.8 10c0.1 0.9-0.8 1.6-1.6 1.2L25 25.6l-9.3 4.6c-0.8 0.4-1.7-0.3-1.6-1.2l1.8-10-7.5-6.9c-0.7-0.6-0.3-1.8 0.6-1.7l10 1.2L22.4 0c0.6-0.9 1.8-0.9 2.4 0z",
                    itemStyle: { normal: { color: '#ff5214' } },
                    rippleEffect: { brushType: "stroke", color: '#ff5214' }
                }]
            },
            option2world: {
                backgroundColor: "transparent",
                geo: {
                    map: "world",
                    selectedMode: false,
                    silent: true,
                    center: [0, 20],
                    zoom: 1.2,
                    itemStyle: {
                        normal: {
                            borderColor: "rgb(212,180,68)",
                            borderWidth: 1,
                            areaColor: {
                                type: "radial",
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{ offset: 1, color: "#EBE5CC" }],
                                globalCoord: false,
                            },
                        },
                    },
                },
                series: [{
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: (value, params) => { return value[2] / 2 },
                    symbol: "path://M25.6 0L33 9.4l10-1.2c0.9-0.1 1.3 1.1 0.6 1.7l-7.5 6.9 1.8 10c0.1 0.9-0.8 1.6-1.6 1.2L25 25.6l-9.3 4.6c-0.8 0.4-1.7-0.3-1.6-1.2l1.8-10-7.5-6.9c-0.7-0.6-0.3-1.8 0.6-1.7l10 1.2L22.4 0c0.6-0.9 1.8-0.9 2.4 0z",
                    itemStyle: { normal: { color: '#ff5214' } },
                    rippleEffect: { brushType: "stroke", color: '#ff5214' }
                }]
            },

            isFly: false,
            isBless: false,
            mode: 'cn',
            userdata: undefined,

            RankTotal: 0,
            Rank: 0,

            Bless: '万事胜意'
        };
    },
    // 组件能被调用必须是组件的节点已经被渲染到页面上
    methods: {
        async init() {
            // chart 图表实例不能存在data里
            const chart = await this.$refs.chartRef.init(echarts);
            echarts.registerMap("china", zhongguo)
            chart.setOption(this.option)
        },
        async init2() {
            const chart = await this.$refs.chartRef2.init(echarts)
            echarts.registerMap('china', zhongguo)
            echarts.registerMap('world', world)
            chart.setOption(this.option2)
        },
        async fly(to = [1, 1], zoom = 1) {
            this.userdata = (await request('/api/user/info/', 'GET')).data
            if (this.userdata == undefined) {
                uni.showToast({ title: '请等待完成用户鉴权', icon: 'none' })
                return
            }
            // console.log(this.userdata.authentication_status, this.userdata);
            if (this.userdata.authentication_status != 3) {
                uni.showToast({ title: '您需要先完成校友认证', icon: 'none' })
                return
            }
            this.isFly = true
            uni.getLocation({
                type: 'wgs84',
                success: async (res) => {
                    console.log('当前位置的经度：' + res.longitude);
                    console.log('当前位置的纬度：' + res.latitude);

                    request('/api/map/light/', 'POST', { lon: res.longitude, lat: res.latitude }).then(res => {
                        this.Rank = res.data.rank
                    })

                    to = [res.longitude, res.latitude]
                    const chart = this.$refs.chartRef.chart

                    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

                    this.option.geo.center = [(to[0] + OUCPosition[0]) / 2, (to[1] + OUCPosition[1]) / 2]
                    let distance = Math.sqrt(Math.pow(to[0] - OUCPosition[0], 2) + Math.pow(to[1] - OUCPosition[1], 2))
                    this.option.geo.zoom = 33.01 * Math.pow(distance, -1.003)
                    chart.setOption(this.option)
                    await sleep(2000)
                    this.option.series[1] = {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: [{
                            name: '您的位置',
                            value: to    // value的前两项是经纬度坐标，第三项为污染度数据
                        }],
                        symbolSize: 10, // 控制散点的大小
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                formatter: '{b}',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 10
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#fff', // 标点颜色
                                boxShadow: "0 0 100px #fff"
                            },
                            emphasis: {
                                color: '#fff', // 鼠标悬停时的标点颜色,
                                boxShadow: "0 0 100px #fff"
                            }
                        },
                    }

                    await sleep(1000)

                    this.option.series[2] = {
                        type: 'lines',//用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
                        zlevel: 1,
                        effect: {//线特效的配置
                            loop: false,
                            show: true,
                            period: 3,//特效动画的时间
                            trailLength: 0.5,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
                            color: '#fff',
                            symbolSize: 3,//特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
                        },
                        lineStyle: {
                            normal: {
                                type: 'solid',
                                color: '#fff',
                                width: 1,
                                period: 2,//特效动画的时间
                                curveness: 0.2,//边的曲度，支持从 0 到 1 的值，值越大曲度越大
                            },
                            curveness: 0.2
                        },
                        data: [{ coords: [to, OUCPosition] }]
                    }
                    this.option.series[3] = {
                        type: 'lines',
                        zlevel: 2,
                        loop: false,
                        symbolSize: 10,
                        effect: {
                            loop: false,
                            show: true,
                            period: 3,
                            trailLength: 0,
                            symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
                            symbolSize: 10
                        },
                        lineStyle: {
                            normal: {
                                color: '#fff',
                                width: 1,
                                opacity: 0.6,
                                curveness: 0.2
                            }
                        },
                        data: [{ coords: [to, OUCPosition] }]
                    }
                    chart.setOption(this.option)
                    await sleep(7000)

                    this.isFly = false
                    this.Bless = ['事事顺心', '一帆风顺', '五福临门', '大展鸿图', '如意吉祥', '和顺如意', '心想事成', '百事亨通', '幸福安康', '万事胜意'][Math.floor(Math.random() * 10)]
                    this.isBless = true
                },
                fail: (res) => {
                    uni.showToast({
                        title: '获取位置失败，请检查是否开启定位权限',
                        icon: 'none',
                    })
                    const that = this
                    setTimeout(() => {
                        this.isFly = false
                    }, 2000);
                    console.log(res);
                }
            });


        },
        async test() {
            const chart = this.$refs.chartRef.chart
            this.option.geo.center = [104.547569, 36.395305]
            this.option.geo.zoom = 1.2
            let data = []
            for (let i = -5; i < 5; i++) {
                for (let j = -5; j < 5; j++) {
                    data.push([104.547569 + i * 0.8, 36.395305 + j * 0.8, 0.1])
                }
            }
            this.option.series[0].data = data
            chart.setOption(this.option)
            // chart.setOption(this.optionBak)
        },
        async bless() {
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

        },
        NavTo(url) {
            uni.navigateTo({ url })
        },
        OpenShare() {
            this.$refs.share.open()
        }
    },
    onLoad() {
        request('/api/map/light/', 'GET', {}, {}, false).then(res => {
            for (let i of res.data) {
                i.value[2] = i.value[2] / 3
            }
            this.option2.series[0].data = res.data
            this.option2world.series[0].data = res.data
            console.log(JSON.stringify(this.option2.series[0].data));
            if (this.mode == 'cn') this.$refs.chartRef2.chart.setOption(this.option2)
            else if (this.mode == 'world') this.$refs.chartRef2.chart.setOption(this.option2world)
        })
        request('/api/map/count/', 'GET', {}, {}, false).then(res => {
            this.RankTotal = res.data.number
        })
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {// 来自页面内分享按钮
            console.log(res.target)
        }
        return {
            title: `中国海洋大学信息科学与工程学部-我是第${this.Rank}个云回家的校友`,
            path: '/pages/IndexPage/IndexPage'
        }
    },
    onShareTimeline() {
        return {
            title: `中国海洋大学信息科学与工程学部-我是第${this.Rank}个云回家的校友`,
            path: '/pages/IndexPage/IndexPage'
        }
    },
    watch: {
        mode(newval, oldval) {
            if (newval == oldval) return
            console.log(newval);
            const chart = this.$refs.chartRef2.chart
            if (newval == 'cn') {
                chart.setOption(this.option2)
            } else if (newval == 'world') {
                chart.setOption(this.option2world)
            }
        }
    },
}
</script>

<style scoped>
.bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -100;
}

.logo {
    width: 260rpx;
    height: 110rpx;
    margin-top: 70rpx;
    margin-left: 40rpx;
}

.emap-ghost {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    z-index: 100;
    /* backdrop-filter: blur(10px); */

}

.emap {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 90;
}

.map {
    width: 750rpx;
    height: 520rpx;
    /* background-color: aliceblue; */
    /* opacity: 0.1; */
}

.change-button image {
    width: 231rpx;
    height: 66rpx;
}

.change-button {
    margin-left: 40rpx;
    margin-top: 90rpx;
}

.times {
    margin-left: 40rpx;
    margin-top: 0rpx;
}

.times-num {
    display: flex;
    margin-top: 15rpx;
}

.times-text {
    font-family: 'dakai';
    font-weight: 400;
    font-size: 58rpx;
    color: #FFB969;
}

.times-num-1 {
    display: flex;
    width: 82rpx;
    height: 74rpx;
    justify-content: center;
    align-items: center;
}

.times-num-1 image {
    width: 82rpx;
    height: 74rpx;
    position: absolute;
}

.times-num-1 view {
    font-weight: bold;
    font-size: 36rpx;
    color: #FFB969;
}

.home-button image {
    width: 180rpx;
    height: 180rpx;
}

.home-button {
    position: absolute;
    bottom: 30rpx;
    left: 30rpx;
}

.more {
    position: absolute;
    width: 130rpx;
    height: 130rpx;
    bottom: 60rpx;
    right: 60rpx;
    font-size: 36rpx;
    color: #fff;
    background: linear-gradient(160deg, #F2821F 0%, #F2BD6D 100%);
    border-radius: 50%;
    font-family: dakai;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.bless-img1 {
    width: 750rpx;
    height: 800rpx;
    position: absolute;
    top: 15%;
    z-index: 110;
}

.bless-img2 {
    height: 300rpx;
    z-index: 111;
}

.bless-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    z-index: 112;
    overflow: hidden;
    /* position: absolute; */
}
.bless-avatar image {
    width: 100%;
    height: 100%;
    background-color: #ec7d7d;
}

.bless-qwq {
    position: absolute;
    top: calc(20% + 440rpx);
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 111;
}

.bless-text {
    font-family: dakai;
    font-weight: 400;
    font-size: 38rpx;
    color: #D81515;
    position: absolute;
    top: 100rpx;
    z-index: 115;
    writing-mode: tb-rl;
    letter-spacing: 10rpx;
}

.bless-text2 {
    position: absolute;
    top: calc(15% + 40rpx);
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 111;
    text-shadow: 0rpx 2rpx 10rpx rgba(0, 0, 0, 0.4);
}

.bless-text2-1 {
    color: rgb(200, 29, 29);
    font-size: 38rpx;
}

.bless-text2-2 {
    color: rgb(255, 239, 156);
    font-size: 38rpx;
    margin-left: 20rpx;
    font-weight: bolder;
}


.bless-text2-3 {
    margin-top: 10rpx;
    font-size: 38rpx;
    color: rgb(200, 29, 29);
}

.bless-text3 {
    display: flex;
    margin-top: 10rpx;
}

.bless-title {
    font-family: zhihuibiantaoti;
    font-weight: 400;
    font-size: 120rpx;
    color: rgba(255, 255, 255, 0.514);
    position: absolute;
    top: calc(20% - 90rpx);
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 108;
}

.bless-share {
    position: absolute;
    top: calc(20% + 800rpx);
    z-index: 115;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}

.bless-share image {
    width: 750rpx;
    height: 70rpx;
}

.bless-close {
    position: absolute;
    top: calc(15% - 90rpx);
    right: 100rpx;
    z-index: 115;
}
</style>