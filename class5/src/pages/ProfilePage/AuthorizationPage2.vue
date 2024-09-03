<template>
    <view>
        <uni-segmented-control :current="CurrentMethod" :values="['学生认证', '教职工认证']" styleType="text"
            @clickItem="onClickItem">
        </uni-segmented-control>
        <view v-if="CurrentMethod == 0">
            <view v-show="(AuthData.students || []).length == 0" class="noauth">暂无认证信息</view>
            <view class="auth-item" v-for="(i, index) in AuthData.students">
                <view class="auth-item-title">学生认证{{ index + 1 }}</view>
                <view class="auth-item-image">
                    <view class="auth-item-content">
                        <view>学历证书</view>
                        <image :src="BaseUrl + i.Degree_certificate" @click="previewImage(BaseUrl + i.Degree_certificate)" mode="widthFix" />
                    </view>
                    <view class="auth-item-content">
                        <view>学位证书</view>
                        <image :src="BaseUrl + i.Diploma" @click="previewImage(BaseUrl + i.Diploma)"  mode="widthFix" />
                    </view>
                </view>
                <view class="auth-item-content">
                    <!-- { text: '专科生', value: '1' }, { text: '本科生', value: '2' }, { text: '联培本科', value: '3' }, { text: '硕士研究生', value: '4' }, { text: '联培硕士', value: '5' }, { text: '博士研究生', value: '6' }, { text: '联培博士', value: '7' }, { text: '博士后', value: '8' }, { text: '继续教育和培训', value: '9' } -->
                    <view>学历：{{ ['专科生', "本科生", "联培本科", "硕士研究生", '联培硕士', '博士研究生', '联培博士', '博士后', '继续教育和培训'][i.degree - 1]
                        }}
                    </view>
                </view>
                <view class="auth-item-content">
                    <view>专业：{{ i.professional }}</view>
                </view>
                <view class="auth-item-content">
                    <view>入学时间：{{ i.start_time }}</view>
                </view>
                <view class="auth-item-content" v-if="i.end_time">
                    <view>毕业时间：{{ i.end_time }}</view>
                </view>
                <view class="auth-item-content">
                    <view>状态：{{ ["认证失败", "认证中", "认证成功"][i.status - 1] }}</view>
                </view>
                <view class="auth-item-button">
                    <button @click="auth('student', i.id, 3, i.user)">通过审核</button>
                    <button @click="auth('student', i.id, 1, i.user)">拒绝审核</button>
                </view>
            </view>
        </view>
        <view v-if="CurrentMethod == 1">
            <view v-show="(AuthData.teachers || []).length == 0" class="noauth">暂无认证信息</view>
            <view class="auth-item" v-for="(i, index) in AuthData.teachers">
                <!-- department: "123"
end_time: "2024-03-15"
id: 1
name: "123"
remark: ""
start_time: "2024-03-13"
status: "2"
user: 2
work_certificate: "/media/teacher/3ebRXDoHrPBo8d289482677ae9865515fc03ecd1aa5e.jpg" -->
                <view class="auth-item-title">教职工认证{{ index + 1 }}</view>
                <view class="auth-item-image">
                    <view class="auth-item-content">
                        <view>工作证明</view>
                        <image :src="BaseUrl + i.work_certificate" @click="previewImage(BaseUrl + i.work_certificate)" mode="widthFix" />
                    </view>
                </view>
                <view class="auth-item-content">
                    <view>部门：{{ i.department }}</view>
                </view>
                <view class="auth-item-content">
                    <view>入职时间：{{ i.start_time }}</view>
                </view>
                <view class="auth-item-content" v-if="i.end_time">
                    <view>离职时间：{{ i.end_time }}</view>
                </view>
                <view class="auth-item-content" v-if="i.remark">
                    <view>备注：{{ i.remark || '无' }}</view>
                </view>
                <view class="auth-item-content">
                    <view>状态：{{ ["认证失败", "认证中", "认证成功"][i.status - 1] }}</view>
                </view>
                <view class="auth-item-button">
                    <button @click="auth('teacher', i.id, 3, i.user)">通过审核</button>
                    <button @click="auth('teacher', i.id, 1, i.user)">拒绝审核</button>
                </view>

            </view>
        </view>

    </view>
</template>
<script>
import { request, BaseUrl } from '../../js/request'
export default {
    data() {
        return {
            BaseUrl: BaseUrl,
            AuthData: {},
            CurrentMethod: 0
        }
    },
    onLoad() {
        uni.showLoading({
            title: '加载中'
        });
        request('/api/authentication/verification/', 'GET').then(res => {
            this.AuthData = res.data
            uni.hideLoading()
        }).catch(err => {
            uni.showToast({ title: '无权限', icon: 'none', mask: true })
        })
    },
    methods: {
        onClickItem(e) {
            if (this.CurrentMethod !== e.currentIndex) {
                this.CurrentMethod = e.currentIndex
            }
        },
        auth(form_type, id, status, user) {
            request('/api/authentication/verification/', 'POST', { form_id: id, form_type, id: user, status }).then(res => {
                uni.showToast({ title: res.data.msg, icon: 'success', mask: true })
                this.onLoad()
            }).catch(err => {
                uni.showToast({ title: err.data.msg, icon: 'none', mask: true })
            })
        },
        previewImage(url) {
            uni.previewImage({
                urls: [url],
                current: 0
            })
        }
    },
}
</script>
<style scoped>
.auth-item {
    padding: 20rpx;
    background-color: #fff;
    margin-top: 20rpx;
}

.auth-item-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.auth-item-content {
    margin-bottom: 20rpx;
}

.auth-item-content view {
    font-size: 28rpx;
}

.auth-item-content image {
    width: 320rpx;
    max-height: 300rpx;
}

.auth-item-image {
    display: flex;
    gap: 20rpx;
}

.auth-item-button {
    display: flex;
    gap: 20rpx;
    justify-content: flex-end;
}

.auth-item-button button {
    background-color: #079cff;
    color: #fff;
    border: none;
}
.noauth{
    text-align: center;
    padding: 20rpx;
    font-size: 32rpx;
    color: #999;
}
</style>