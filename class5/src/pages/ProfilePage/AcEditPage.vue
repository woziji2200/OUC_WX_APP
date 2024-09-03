<template>
    <view class="form">
        <!-- {
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
        "content": "哈哈哈",
        "description": "这是简介简介简介11111111",
        "created_at": "2024-03-18T23:18:49.583494",
        "updated_at": "2024-03-18T23:18:49.583521",
        "start_time": null,
        "end_time": null,
        "Author": 2
    } -->
        <uni-forms ref="form" label-width="150rpx">
            <uni-forms-item label="活动标题" required>
                <uni-easyinput v-model="ac.title" placeholder="请输入活动标题"></uni-easyinput>
            </uni-forms-item>
            <uni-forms-item label="活动简介" required>
                <uni-easyinput v-model="ac.description" placeholder="请输入活动简介"></uni-easyinput>
            </uni-forms-item>
            <uni-forms-item label="活动时间" required>
                <uni-datetime-picker v-model="ac.start_time" placeholder="请选择活动开始时间"></uni-datetime-picker>
                <uni-datetime-picker v-model="ac.end_time" placeholder="请选择活动结束时间"></uni-datetime-picker>
            </uni-forms-item>
            <uni-forms-item label="活动内容" required>
                <textarea :maxlength="-1" class="textarea" v-model="ac.content"></textarea>
                <!-- <uni-easyinput v-model="ac.content" placeholder="请输入活动内容"></uni-easyinput> -->
            </uni-forms-item>

            <uni-forms-item label="活动图片" required>
                <uni-file-picker file-mediatype="image" limit="6" :sizeType="['compressed']" @select="selectImage"
                    @delete="deleteImage" v-model="image"></uni-file-picker>
            </uni-forms-item>
            <button class="submit" @click="submit">提交</button>
        </uni-forms>



    </view>
</template>
<script>
import { request, BaseUrl } from '../../js/request';

export default {
    data() {
        return {
            BaseUrl,
            method: 'create',
            ac: {},
            image: [],
        }
    },
    onLoad(options) {
        if (options.method == 'create') {
            uni.setNavigationBarTitle({
                title: '发布活动'
            })
            this.method = 'create'
        } else {
            uni.setNavigationBarTitle({
                title: '编辑活动'
            })
            this.method = 'edit'
            request(`/api/news/activity/${options.id}/`, 'GET', { id: options.id }).then(res => {
                res.data.photos = res.data.photos.map(i => {
                    return {
                        url: BaseUrl + i.picture
                    }
                })
                this.image = res.data.photos
                this.ac = res.data
            })
        }
    },
    methods: {
        submit() {
            const fd = require('../../js/formdata.js')
            const formdata = new fd()
            if (this.method == 'edit') {
                formdata.append('title', this.ac.title)
                formdata.append('description', this.ac.description)
                formdata.append('content', this.ac.content)
                formdata.append('start_time', this.ac.start_time)
                formdata.append('end_time', this.ac.end_time)
                formdata.append('Author', 2)
                let successNum = 0
                for (let i = 0; i < this.image.length; i++) {
                    uni.downloadFile({
                        url: this.image[i].url,
                        success: ({ tempFilePath, statusCode }) => {
                            formdata.appendFile('photos', tempFilePath)
                            successNum++
                            if (successNum === this.image.length) {
                                let data = formdata.getData()
                                request(`/api/news/activity/${this.ac.id}/`, 'PUT', data.buffer, { "content-type": data.contentType }).then(res => {
                                    uni.showToast({
                                        title: '修改成功',
                                        icon: 'success'
                                    })
                                    uni.navigateBack()
                                })
                            }
                        },
                        fail: (error) => { }
                    })
                }
            }else if(this.method == 'create'){
                formdata.append('title', this.ac.title)
                formdata.append('description', this.ac.description)
                formdata.append('content', this.ac.content)
                formdata.append('start_time', this.ac.start_time)
                formdata.append('end_time', this.ac.end_time)
                formdata.append('Author', 2)
                let successNum = 0
                for (let i = 0; i < this.image.length; i++) {
                    uni.downloadFile({
                        url: this.image[i].url,
                        success: ({ tempFilePath, statusCode }) => {
                            formdata.appendFile('photos', tempFilePath)
                            successNum++
                            if (successNum === this.image.length) {
                                let data = formdata.getData()
                                request(`/api/news/activity/`, 'POST', data.buffer, { "content-type": data.contentType }).then(res => {
                                    uni.showToast({
                                        title: '发布成功',
                                        icon: 'success'
                                    })
                                    uni.navigateBack()
                                })
                            }
                        },
                        fail: (error) => { }
                    })
                }
            }
        },
        selectImage(e) {
            console.log(e);
            // tempFilePaths[0]
            for (let item of e.tempFilePaths) {
                this.image.push({
                    url: item
                })
            }
            console.log(this.image);

        },
        async deleteImage(e) {
            // this.image = this.image.filter((item) => {
            //     return item !== e.tempFile.path
            // });
            console.log(this.image);
        }

    }
}
</script>
<style scoped>
.submit {
    width: 400rpx;
    height: 80rpx;
    background-color: #155fff;
    color: #fff;
    border-radius: 999rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form{
    padding: 20rpx;
}
</style>