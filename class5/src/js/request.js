// export const BaseUrl = "http://121.36.67.169:7878"
export const BaseUrl = "http://127.0.0.1:8000"

const UrlWhiteList = [

    '/api/user/login/',
    '/api/news/news/',
    '/api/news/activity/',
    '/api/map/rank/',
    '/api/map/count/',
    '/api/map/light/'
].map((item) => BaseUrl + item)

export function request(requestUrl, method, data = {}, header = {}, auth = true) {
    return new Promise((resolve, reject) => {
        const authHeader = auth ? { Authorization: "Bearer " + uni.getStorageSync('login').access_token } : {};
        uni.request({
            url: BaseUrl + requestUrl,
            data,
            method,
            header: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...authHeader,
                ...header
            },
            success: (res) => {
                if ((res.statusCode / 100).toFixed() == '2') resolve(res);
                else reject(res)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

export function isInExp(accessOrRefresh) {
    try {
        if (!uni.getStorageSync('login')) {
            return false
        }
        let Base64 = require('js-base64').Base64
        let token = null
        if (accessOrRefresh == 'access') {
            token = JSON.parse(Base64.decode(uni.getStorageSync('login').access_token.split('.')[1]))
        } else {
            token = JSON.parse(Base64.decode(uni.getStorageSync('login').refresh_token.split('.')[1]))
        }
        if (Date.now() / 1000 < token.exp)
            return true
        else
            return false
    } catch {
        return false
    }
}


export function addInterceptor(list) {
    for (let item of list) {
        uni.addInterceptor(item, {
            invoke(args) {
                console.log(UrlWhiteList.indexOf(args.url), args.url);
                // return new Promise(async (resolve, reject) => {
                const isMatchingUrlPattern = /^.*?\/api\/news\/(activity|news)\/(?:\d+\/)?$/.test(args.url);
                // console.log(isMatchingUrlPattern, args.url);
                if (UrlWhiteList.indexOf(args.url) == -1 && !isMatchingUrlPattern) { // 不在白名单里
                    if (!isInExp('access')) {
                        console.log('需要登录');
                        uni.navigateTo({ url: '/pages/LoginPage/OneKeyLoginPage' })
                    }
                    // resolve(args)
                }
                // });
            },
            complete(args) {
                // console.log('complete', args);
            }
        })
    }
}