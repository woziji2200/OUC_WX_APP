// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const key = '5817c0ca2f8e4ecbb3a29780bcdd800c';
let that: any;
Page({
    data: {
        city: 'loading...',
        weather: {
            "obsTime": "--",
            "temp": "--",
            "feelsLike": "--",
            "icon": "--",
            "text": "--",
            "wind360": "--",
            "windDir": "--",
            "windScale": "--",
            "windSpeed": "--",
            "humidity": "--",
            "precip": "--",
            "pressure": "--",
            "vis": "--",
            "cloud": "--",
            "dew": "--"
        },
        weatherToday: {
            "fxDate": "--",
            "sunrise": "--",
            "sunset": "--",
            "moonrise": "--",
            "moonset": "--",
            "moonPhase": "--",
            "moonPhaseIcon": "--",
            "tempMax": "--",
            "tempMin": "--",
            "iconDay": "--",
            "textDay": "--",
            "iconNight": "--",
            "textNight": "--",
            "wind360Day": "--",
            "windDirDay": "--",
            "windScaleDay": "--",
            "windSpeedDay": "--",
            "wind360Night": "--",
            "windDirNight": "--",
            "windScaleNight": "--",
            "windSpeedNight": "--",
            "humidity": "--",
            "precip": "--",
            "pressure": "--",
            "vis": "--",
            "cloud": "--",
            "uvIndex": "--"
        },
        lat: 0,
        lon: 0,
        air: {
            "pubTime": "--",
            "aqi": "--",
            "level": "--",
            "category": "--",
            "primary": "NA",
            "pm10": "--",
            "pm2p5": "--",
            "no2": "--",
            "so2": "--",
            "co": "--",
            "o3": "--"
        },
        code: 0,
    },

    methods: {
        getWeather: (refresh: boolean = false, needLocation: boolean = true) => {
            function getw() {
                wx.request({
                    method: 'GET',
                    url: 'https://geoapi.qweather.com/v2/city/lookup',
                    data: {
                        key,
                        location: that.data.code || `${that.data.lon},${that.data.lat}`
                    },
                    success: (res) => {
                        that.setData({
                            city: `${(res.data as any).location[0].name} ${(res.data as any).location[0].adm2} ${(res.data as any).location[0].adm1}`,
                        })
                        console.log(that.data.city);
                    },
                })

                wx.request({
                    method: 'GET',
                    url: 'https://devapi.qweather.com/v7/weather/now',
                    data: {
                        key,
                        location: that.data.code || `${that.data.lon},${that.data.lat}`
                    },
                    success: (res) => {
                        that.setData({
                            weather: (res.data as any).now
                        })
                    },
                })

                wx.request({
                    method: 'GET',
                    url: 'https://devapi.qweather.com/v7/air/now',
                    data: {
                        key,
                        location: that.data.code || `${that.data.lon},${that.data.lat}`
                    },
                    success: (res) => {
                        that.setData({
                            air: (res.data as any).now
                        })
                    },
                })


                wx.request({
                    method: 'GET',
                    url: 'https://devapi.qweather.com/v7/weather/3d',
                    data: {
                        key,
                        location: that.data.code || `${that.data.lon},${that.data.lat}`
                    },
                    success: (res) => {
                        that.setData({
                            weatherToday: (res.data as any).daily[0]
                        })
                        if (refresh) {
                            wx.showToast({
                                title: '刷新成功',
                                icon: 'success',
                                duration: 2000
                            })
                            wx.stopPullDownRefresh();

                        }
                    },
                })
            }
            if (needLocation) {
                wx.getLocation({
                    success: (res) => {
                        that.setData({
                            lat: res.latitude,
                            lon: res.longitude
                        })
                        console.log(that.data.lat, that.data.lon);
                        getw()

                    },
                    fail: (err) => {
                        console.error(err);
                    }
                })
            }else {
                getw()
                wx.showToast({
                    title: '获取成功',
                    icon: 'success',
                    duration: 2000
                })
            }

        },

    },
    onLoad() {
        this.methods.getWeather();
        that = this;
    },
    onPullDownRefresh() {
        this.methods.getWeather(true);
    },

    getUserProvince: (e: any) => {
        console.log(e);
        let city = e.detail.value[2]
        wx.request({
            method: 'GET',
            url: 'https://geoapi.qweather.com/v2/city/lookup',
            data: {
                key,
                location: city
            },
            success: (res) => {
                that.setData({
                    lon: (res.data as any).location[0].lon,
                    lat: (res.data as any).location[0].lat,
                })
                that.methods.getWeather(false, false);
            },
        })
        //    that.setData({
        //           city: e.detail.value.reverse().join(' '),
        //           code: e.detail.code[2]
        //     })
        //     that.methods.getWeather();
    }
})
