<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(false)
//整个用于提交的form对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
//整个表单的检验规则
// 1.非空检验 required:true message消息提示   trigger触发校验的时机 blur change
// 2.长度校验 min:xxx max:xxx
// 3.正则检验 pattern:正则规则 \S 非空字符
// 4.自定义校验  => 校验函数
//  validator: (rule, value, callback)
//  rule 当前检验规则相关的信息
//  value校验的表单元素目前的表单值
//  callback  无论成功还是失败都要callback回调
//    - callback()检验成功
//    - callback(new Error(错误信息)) 校验失败
//

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 5,
      max: 10,
      message: '用户名 5-10 位字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // value和当前收集的是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback() //检验成功也需要callback
        }
      }
    }
  ]
}

const form = ref()
const register = async () => {
  //注册成功之前西安进行校验 成功->请求  失败->自动提示
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value = false
}

//切换重置表单内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}
</script>

<template>
  <!--
  1.结构相关
   el-row 表示一行 一行分为24份
  el-col表示列
  1. :span="12" 表示占12分(50%)
  2.:span="6" 一行占6分 (25%)
  3. :offset 表示margin的份数

  el-form表单组件
  el-form-item 表单的一行(一个表单域)
  el-input  表单元素(输入框)
  2.校验相关
  el-form =>   :model="ruleForm" 绑定的form整个数据对象 {xxx,xxx,xxx}
  el-form=>   :rules="rules" 绑定的是整个rules规则对象  {xxx,xxx,xxx}
  表单元素  => v-model="rulesForm.xxx" 给表单元素 绑定form的子属性
  el-form-item => prop配置生效的那个校验规则(和rules字段相关)
-->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录相关 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: 
    // url('@/assets/logo.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
