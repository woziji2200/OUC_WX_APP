<template>
    <view>

        <view class="is-auth" style="display: none;">
            <uni-icons type="info-filled" color="#2ec4ff" size="120" />
            <view>您的认证信息正在审核中</view>
        </view>

        <view class="is-auth" v-if="hasAuth">
            <uni-icons type="checkbox-filled" color="#2ec4ff" size="120" />
            <view>您已通过认证审核</view>
        </view>

        <view class="auth" v-if="!hasAuth">
            <!-- <uni-section title="校友认证" type="line"> -->
            <uni-segmented-control :current="CurrentMethod" :values="['学生认证', '教职工认证']" styleType="text"
                @clickItem="onClickItem">
            </uni-segmented-control>
            <view class="forms" v-if="CurrentMethod === 0">
                <uni-forms ref="form" label-width="150rpx">
                    <uni-forms-item required label="姓名" name="user">
                        <uni-easyinput placeholder="请输入姓名" v-model="student.user"></uni-easyinput>
                    </uni-forms-item>
                    <uni-forms-item required label="学历" name="degree">
                        <uni-data-select v-model="student.degree"
                            :localdata="[{ text: '专科生', value: '1' }, { text: '本科生', value: '2' }, { text: '联培本科', value: '3' }, { text: '硕士研究生', value: '4' }, { text: '联培硕士', value: '5' }, { text: '博士研究生', value: '6' }, { text: '联培博士', value: '7' }, { text: '博士后', value: '8' }, { text: '继续教育和培训', value: '9' }]"></uni-data-select>
                    </uni-forms-item>
                    <uni-forms-item required label="专业" name="professional">
                        <uni-easyinput placeholder="请输入专业" v-model="student.professional"></uni-easyinput>
                    </uni-forms-item>
                    <uni-forms-item required label="状态" name="state">
                        <uni-data-checkbox v-model="student.state"
                            :localdata="[{ text: '已毕业', value: '2' }, { text: '在校', value: '1' }]" />
                    </uni-forms-item>
                    <uni-forms-item required label="入学时间" name="start_time">
                        <uni-datetime-picker type="date" return-type="string" placeholder="选择入学时间"
                            v-model="student.start_time" />
                    </uni-forms-item>
                    <uni-forms-item required label="毕业时间" name="end_time" v-if="student.state == '2'">
                        <uni-datetime-picker type="date" return-type="string" placeholder="选择毕业时间"
                            v-model="student.end_time" />
                    </uni-forms-item>
                    <uni-forms-item required :label="student.state == 2 ? '学位证' : '学生证'" name="Degree_certificate">
                        <uni-file-picker file-mediatype="image" limit="1" :sizeType="['compressed']"
                            @select="selectImageDegree" @delete="deleteImageDegree"></uni-file-picker>
                    </uni-forms-item>
                    <uni-forms-item required label="毕业证" name="Diploma" v-if="student.state == '2'">
                        <uni-file-picker file-mediatype="image" limit="1" :sizeType="['compressed']"
                            @select="selectImageDiploma" @delete="deleteImageDiploma"></uni-file-picker>
                    </uni-forms-item>
                    <view class="remark" style="color: #393939;">
                        如果您的相关证件已丢失，也可上传其他有效的证明材料或联系客服
                    </view>

                    <button class="submit" @click="submitStu">提交</button>
                </uni-forms>
            </view>

            <view class="forms" v-if="CurrentMethod === 1">
                <uni-forms ref="form2" label-width="150rpx">
                    <uni-forms-item required label="姓名" name="user">
                        <uni-easyinput placeholder="请输入姓名" v-model="teacher.user"></uni-easyinput>
                    </uni-forms-item>
                    <uni-forms-item required label="状态" name="state">
                        <uni-data-checkbox v-model="teacher.state"
                            :localdata="[{ text: '已离职', value: '2' }, { text: '在职', value: '1' }]" />
                    </uni-forms-item>
                    <uni-forms-item required label="工作时间" name="start_time">
                        <uni-datetime-picker type="date" return-type="string" placeholder="选择工作时间"
                            v-model="teacher.start_time" />
                    </uni-forms-item>
                    <uni-forms-item required label="离职时间" name="end_time" v-if="teacher.state == '2'">
                        <uni-datetime-picker type="date" return-type="string" placeholder="选择离职时间"
                            v-model="teacher.end_time" />
                    </uni-forms-item>
                    <uni-forms-item required label="工作部门" name="user">
                        <uni-easyinput placeholder="请输入工作部门" v-model="teacher.department"></uni-easyinput>
                    </uni-forms-item>

                    <uni-forms-item required label="工作证件" name="work_certificate">
                        <uni-file-picker file-mediatype="image" limit="1" :sizeType="['compressed']"
                            @select="selectImageWork" @delete="deleteImageWork"></uni-file-picker>
                    </uni-forms-item>
                    <uni-forms-item label="备注" name="user">
                        <uni-easyinput placeholder="请输入备注" v-model="teacher.remark"></uni-easyinput>
                    </uni-forms-item>

                    <button class="submit" @click="submitTea">提交</button>
                </uni-forms>
            </view>



            <!-- </uni-section> -->

        </view>
    </view>

</template>
<script>
import { onLoad } from '@dcloudio/uni-app'
import { request } from '../../js/request'
export default {
    data() {
        return {
            hasAuth: false,
            CurrentMethod: 0,
            student: {
                start_time: '',
                end_time: '',
                user: '',
                degree: '',
                professional: '',
                state: '2',
            },
            Degree_certificate: [],
            Diploma: [],
            teacher: {
                start_time: '',
                end_time: '',
                user: '',
                state: '2',
                department: '',
                remark: ''
            },
            Work_certificate: []
        }
    },
    methods: {
        onClickItem(e) {
            if (this.CurrentMethod !== e.currentIndex) {
                this.CurrentMethod = e.currentIndex
            }
        },
        submitStu() {
            if (this.student.user == "" || this.student.degree == "" || this.student.professional == "" || this.student.start_time == "") {
                uni.showToast({
                    title: '请填写完整信息',
                    icon: 'none'
                })
                return
            }
            if (this.student.state == '2' && this.student.end_time == "") {
                uni.showToast({
                    title: '请填写完整信息',
                    icon: 'none'
                })
                return
            }
            if ((this.student.state == '2' && this.Degree_certificate == "") || (this.student.state == '2' && this.Diploma == "")) {
                uni.showToast({
                    title: '请填写完整信息',
                    icon: 'none'
                })
                return
            }
            const fd = require('../../js/formdata.js')
            const formdata = new fd()
            formdata.append('name', this.student.user)
            formdata.append('degree', this.student.degree)
            formdata.append('professional', this.student.professional)
            formdata.append('status', this.student.state)
            formdata.append('start_time', this.student.start_time)
            formdata.append('end_time', this.student.end_time)
            if (this.Degree_certificate != "") {
                formdata.appendFile('Degree_certificate', this.Degree_certificate)
            }
            if (this.Diploma.length != "") {
                formdata.appendFile('Diploma', this.Diploma)
            }
            let data = formdata.getData()
            request('/api/authentication/student/', 'POST', data.buffer, { "content-type": data.contentType }).then(res => {
                uni.showToast({
                    title: '提交成功',
                    icon: 'success'
                })
            }).catch(err => {
                uni.showToast({
                    title: err.data.msg,
                    icon: 'none'
                })
            })


        },
        selectImageDegree(e) {
            this.Degree_certificate = e.tempFilePaths[0]
        },
        deleteImageDegree(e) {
            this.Degree_certificate = []
        },
        selectImageDiploma(e) {
            this.Diploma = e.tempFilePaths[0]
        },
        deleteImageDiploma(e) {
            this.Diploma = []
        },
        selectImageWork(e) {
            this.Work_certificate = e.tempFilePaths[0]
        },
        deleteImageWork(e) {
            this.Work_certificate = []
        },
        submitTea() {
            if (this.teacher.user == "" || this.teacher.start_time == "" || this.teacher.department == "" || this.Work_certificate == "") {
                uni.showToast({
                    title: '请填写完整信息',
                    icon: 'none'
                })
                return
            }
            if (this.teacher.state == '2' && this.teacher.end_time == "") {
                uni.showToast({
                    title: '请填写完整信息',
                    icon: 'none'
                })
                return
            }
            const fd = require('../../js/formdata.js')
            const formdata = new fd()
            formdata.append('name', this.teacher.user)
            formdata.append('status', this.teacher.state)
            formdata.append('start_time', this.teacher.start_time)
            formdata.append('end_time', this.teacher.end_time)
            formdata.append('department', this.teacher.department)
            formdata.append('remark', this.teacher.remark)
            if (this.Work_certificate != "") {
                formdata.appendFile('work_certificate', this.Work_certificate)
            }
            let data = formdata.getData()
            request('/api/authentication/teacher/', 'POST', data.buffer, { "content-type": data.contentType }).then(res => {
                uni.showToast({
                    title: '提交成功',
                    icon: 'success'
                })
            }).catch(err => {
                uni.showToast({
                    title: err.data.msg,
                    icon: 'none'
                })
            })
        },
    },
    onLoad(data) {
        if (data.authentication_status == 3) {
            this.hasAuth = true
        }
    }
}
</script>
<style scoped>
.is-auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #393939;
}

.is-auth uni-icons {
    margin-bottom: 40rpx;
}

.is-auth view {
    margin-bottom: 400rpx;
}

.forms {
    margin: 20rpx;
}

.submit {
    width: 100%;
    height: 80rpx;
    background-color: #2081ff;
    color: #ffffff;
    border-radius: 10rpx;
    margin-top: 40rpx;
    font-size: 32rpx;
    line-height: 80rpx;
    text-align: center;
}
</style>