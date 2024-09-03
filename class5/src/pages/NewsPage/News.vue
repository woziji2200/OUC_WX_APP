<template>
    <view class="main">
        <view class="title">{{ newsDataTitle }}</view>
        <web-view :src="newsDataContent" />
        <!-- <rich-text :nodes="newsDataContent" space="nbsp"></rich-text> -->
    </view>
</template>
<script>
import { request } from '../../js/request';

export default{
    data(){
        return{
            newsDataTitle: "",
            newsDataContent: ""
        }
    },
    onLoad(options) {
        console.log('onLoad', options);
        request(`/api/news/news/${options.id}`, 'GET',{},{},false).then(res => {
            this.newsDataTitle = res.data.title;
            const regex = new RegExp('<img', 'gi');
            this.newsDataContent = res.data.content
            
        })
    }
}
</script>
<style scoped>
.main{
    padding: 20px;
}
.title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}
</style>