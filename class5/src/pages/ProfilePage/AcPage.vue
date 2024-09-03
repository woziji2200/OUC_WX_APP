<template>
    <view>
        <!-- [
            {
                "id": 1,
                "photos": [
                    {
                        "id": 1,
                        "picture": "/media/message/3_2.jpg",
                        "news": null,
                        "activity": 1
                    },
                    {
                        "id": 2,
                        "picture": "/media/message/3.jpg",
                        "news": null,
                        "activity": 1
                    },
                    {
                        "id": 3,
                        "picture": "/media/message/5cf0b8f6acb15c6051e57e31503fb3d3ad945f96.jpg",
                        "news": null,
                        "activity": 1
                    }
                ],
                "title": "测试活动1",
                "description": "这是简介简介简介11111111",
                "created_at": "2024-03-18T23:18:49.583494",
                "updated_at": "2024-03-18T23:18:49.583521",
                "start_time": null,
                "end_time": null,
                "Author": 2
            }
        ] -->
        <view class="ac-item" v-for="i in ac">
            <view class="ac-item-title">{{i.title}}</view>
            <view class="ac-item-det">{{i.description}}</view>
            <view class="ac-item-img" >
                <image v-for="j in i.photos" :src="BaseUrl + j.picture" mode="widthFit" />
            </view>
            <view class="ac-item-button">
                <button class="delete" @click="deleteAc(i.id)">删除</button>
                <button class="edit" @click="Navto(`/pages/ProfilePage/AcEditPage?id=${i.id}&method=edit`)">编辑</button>
            </view>
        </view>
        <button class="create" @click="Navto('/pages/ProfilePage/AcEditPage?method=create')">发布活动</button>
    </view>
</template>

<script>
import { request, BaseUrl } from '../../js/request';
export default{
    data() {
        return {
            ac:[],
            BaseUrl,

        }
    },
    onLoad(options) {
        request('/api/news/activity/', 'GET').then(res => {
            this.ac = res.data
        })
    },
    onPullDownRefresh() {
        request('/api/news/activity/', 'GET').then(res => {
            this.ac = res.data
            uni.stopPullDownRefresh()
        })
    },
    methods: {
        Navto(url){
            uni.navigateTo({
                url: url
            })
        },
        deleteAc(id){
            uni.showModal({
                title: '提示',
                content: '确定要删除此活动吗',
                showCancel: true,
                success: ({ confirm, cancel }) => {
                    if (confirm) {
                        request(`/api/news/activity/${id}/`, 'DELETE').then(res => {
                            uni.showToast({
                                title: '删除成功',
                                icon: 'success'
                            })
                            this.ac = this.ac.filter(i => i.id != id)
                        })
                    }
                }
            })
        }
    },
}
</script>

<style scoped>
.create{
    width: 400rpx;
    height: 80rpx;
    background-color: #155fff;
    color: #fff;
    border-radius: 999rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ac-item{
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0 0 20rpx #00000020;
}
.ac-item-title{
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}
.ac-item-det{
    font-size: 30rpx;
    color: #666;
    margin-bottom: 20rpx;
}
.ac-item-img{
    margin-bottom: 20rpx;
    display: flex;

}
.ac-item-img image{
    width: 230rpx;
    height: 230rpx;
    border-radius: 20rpx;
}
.ac-item-button{
    display: flex;
    justify-content: flex-start;
    /* justify-content: space-between; */
}
.ac-item-button button{
    width: 200rpx;
    height: 60rpx;
    border-radius: 10rpx;
    background-color: #155fff;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ac-item-button button.delete{
    background-color: #ff4d4d;
}
.ac-item-button button.edit{
    background-color: #155fff;
}


</style>