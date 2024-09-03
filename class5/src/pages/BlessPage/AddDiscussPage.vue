<template>
    <view class="main">
        <view class="detail">
            <textarea v-model="detail" placeholder-style="font-size:30rpx" placeholder="请输入内容..."></textarea>
        </view>

        <view class="picker">

            <view class="example-body">
                <uni-file-picker file-mediatype="image" ref="files" :value="image" limit="9" title="最多选择9张图片"
                    :sizeType="['compressed']" @select="selectImage" @delete="deleteImage"></uni-file-picker>
            </view>

        </view>

        <view class="upload">
            <button style="background-color: #389FFF; font-weight: bold; letter-spacing: 20rpx;" @click="upload()"
                type="primary" :loading="isUploading">提交</button>
        </view>
    </view>
</template>

<script>
import { request, BaseUrl } from '../../js/request.js'
export default {
    data() {
        return {
            type: '',
            detail: "",
            image: [],
            imageUploaded: [],
            isUploading: false
        }
    },
    methods: {
        async upload() {
            if (this.isUploading) return
            else this.isUploading = true
            if (this.detail == '') {
                uni.showToast({ icon: 'none', title: '请输入讨论内容' })
                this.isUploading = false
                return
            }
            // debugger;
            // if (this.imageUploaded.length == 0) {
            //     uni.showToast({ icon: 'none', title: '请上传至少一张图片' })
            //     this.isUploading = false
            //     return
            // }
            async function send(val, photos, _this) {
                let uploadText = await request('/api/bless/discuss/', "POST", {
                    content: val,
                    photos: photos,
                },{
                    'Content-Type': 'application/x-www-form-urlencoded'
                })

                if (uploadText.statusCode == 200) {
                    uni.showToast({ icon: 'success', title: '上传成功' })
                    _this.isUploading = false
                    setTimeout(() => { uni.navigateBack({ delta: 1 }) }, 2000)
                } else {
                    uni.showToast({ icon: 'error', title: '上传失败' })
                    _this.isUploading = false
                }
            }
            let haveSend = this.imageUploaded.length > 0; 
            let successUploadedImageId = []
            for (let item of this.imageUploaded) {
                // this.$refs.files.setProgressByCustomUplaod(item, 0)
                await uni.compressImage({
                    src: item,
                    quality: 80,
                    success: (imageCompressed) => {

                        // this.$refs.files.setProgressByCustomUplaod(item, 30)
                        uni.uploadFile({
                            url: BaseUrl + '/api/bless/image/', //仅为示例，非真实的接口地址
                            filePath: imageCompressed.tempFilePath,
                            name: 'photo',
                            header: {
                                "Authorization": 'Bearer ' + uni.getStorageSync('login').access_token
                            },
                            success: async (uploadFileRes) => {
                                // console.log(uploadFileRes.data, uploadFileRes.data.image_name, typeof (uploadFileRes.data));
                                successUploadedImageId.push(JSON.parse(uploadFileRes.data).id)
                                // this.$refs.files.setProgressByCustomUplaod(item, 100)
                                // console.log(successUploadedImage, this.imageUploaded.length);
                                if (successUploadedImageId.length == this.imageUploaded.length) {
                                    send(this.detail, successUploadedImageId, this)
                                    // let uploadText = await request('/api/bless/discuss/', "POST", {
                                    //     content: this.detail,
                                    //     images: successUploadedImageId,
                                    // })

                                    // if (uploadText.statusCode == 200) {
                                    //     uni.showToast({ icon: 'success', title: '上传成功' })
                                    //     this.isUploading = false
                                    //     setTimeout(() => { uni.navigateBack({ delta: 1 }) }, 2000)
                                    // } else {
                                    //     uni.showToast({ icon: 'error', title: '上传失败' })
                                    //     this.isUploading = false
                                    // }
                                }

                            },
                            fail: () => {
                                this.isUploading = false
                                uni.showToast({ icon: 'error', title: '上传失败' })
                            }
                        });
                    },
                    fail: () => {
                        this.isUploading = false
                        uni.showToast({ icon: 'error', title: '上传失败' })
                    }
                })
            }
            if(!haveSend){
                send(this.detail, successUploadedImageId, this)
            }

        },
        selectImage(e) {
            // console.log(e);
            for (let item of e.tempFilePaths) {
                this.imageUploaded.push(item)
            }
            // console.log(this.imageUploaded);

        },
        async deleteImage(e) {
            this.imageUploaded = this.imageUploaded.filter((item) => {
                return item !== e.tempFile.path
            });
        }
    },
    async onLoad(res) {
        this.type = res.type
        // console.log((await request('wx/report', 'GET')).data);

    },
    watch: {
        isUploading(newValue, oldValue) {
            if (newValue) {

            }
        }
    },

}
</script>

<style scoped>
.main {
    padding: 50rpx;
}

.title {
    font-size: 42rpx;
}

.phone {
    margin-top: 30rpx;
}

.detail {
    margin-top: 30rpx;
}

.picker {
    margin-top: 30rpx;
}

.upload {
    width: 100%;
    display: flex;
    justify-content: center;
}

.upload button {
    width: 80%;
    position: absolute;
    bottom: 80rpx;
}

textarea {
    font-size: 30rpx !important;
    border: 1px solid rgb(225, 225, 225);
    padding: 20rpx;
    width: calc(100% - 40rpx);
}
</style>