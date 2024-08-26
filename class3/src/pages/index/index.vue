<template>
    <view class="module">
        <view class="title">垃圾分类搜索</view>
        <view class="search">
            <uni-easyinput class="uni-mt-5" trim="all" v-model="searchValue" placeholder="搜索"></uni-easyinput>
            <button @click="Search">搜索</button>
        </view>
        <button @click="upload">上传图片</button>

        <view v-for="i in data" class="res">
            {{ i.name }} {{ type.find(j => j.id === i.category)?.name }}
        </view>
    </view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onReady } from '@dcloudio/uni-app';
const searchValue = ref('')
const data = ref([])
watch(searchValue, (val) => {
    Search()
})

let type = ref([
    { "_id": "34586bfd6200e313006a0e0572dcaa1b", "id": 1, "name": "可回收垃圾", "add_time": 0 },
    { "_id": "34586bfd6200e313006a0e062b75f01a", "id": 2, "name": "有害垃圾", "add_time": 9 },
    { "_id": "34586bfd6200e313006a0e0731b00621", "id": 4, "name": "厨余垃圾", "add_time": 0 },
    { "_id": "34586bfd6200e313006a0e08487623fc", "id": 8, "name": "干垃圾", "add_time": 0 },
    { "_id": "34586bfd6200e313006a0e0979641a73", "id": 16, "name": "大件垃圾", "add_time": 0 },
])
function Search() {
    if (searchValue.value === '') {
        data.value = []
        return
    }
    uni.request({
        url: 'http://localhost:3000/query',
        data: {
            name: searchValue.value
        },
        success: (res) => {
            // data.value = res.data.data
            data.value = res.data

        }
    })
}


function upload() {
    uni.chooseImage({
        count: 1,
        success: (res) => {
            // res 转base64
            uni.getFileSystemManager().readFile({
                filePath: res.tempFilePaths[0],
                encoding: 'base64',
                success: (res) => {
                    uni.request({
                        url: 'http://localhost:3000/upload',
                        method: 'POST',
                        data: {
                            image: res.data
                        },
                        success: (res) => {
                            data.value = res.data
                            if (data.value.length == 0) {
                                uni.showToast({
                                    title: '识别失败',
                                    icon: 'none'
                                })
                            }
                        }
                    })
                }
            })
        }
    })
}
onReady(() => {

})

</script>
<style>
page {
    background-color: #F8F8F8;
}
</style>
<style scoped lang="scss">
.search {
    padding: 10rpx;
    margin-top: 10rpx;
    display: flex;


}

button {
    height: 70rpx;
    font-size: 30rpx;
    background-color: #0051ff;
    color: #fff;
}

.module {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

    .title {
        position: relative;
        margin-left: 25rpx;
        margin-top: 10rpx;

        &::before {
            content: '';
            position: absolute;
            top: 3rpx;
            left: -20rpx;
            bottom: 3rpx;
            width: 7rpx;
            background: linear-gradient(to top, #9d00ff, #e600ff);
        }
    }

    .res {
        padding: 10rpx;
        border-bottom: 1px solid #f0f0f0;
    }
}
</style>
