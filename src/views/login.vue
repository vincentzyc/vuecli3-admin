<template>
  <div class="login-wrap">
    <div class="login-bg"></div>
    <div class="login-form animated zoomIn fast">
      <h1 class="title">管理系统</h1>
      <div class="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
          <el-form-item prop="userName">
            <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input type="password" placeholder="请输入密码" v-model="ruleForm.passWord" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <p style="color:#999;font-size:12px;margin:-5px 0 10px 0">用户名密码随意输入即可</p>
          <div class="login-btn-wrap">
            <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      nextUrl: "",
      ruleForm: {
        userName: "",
        passWord: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(11111);
          this.$util.setLStorage("userInfo", { username: this.ruleForm.userName }, "decode");
          this.$router.push("/home");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    let userInfo = this.$util.getLStorage("userInfo", "decode");
    if (userInfo) {
      this.ruleForm.userName = userInfo.username;
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.login-bg {
  z-index: -99;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #324157;
}
.login-form {
  z-index: 99;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.title {
  text-align: center;
  font-size: 50px;
  color: #fff;
  margin-bottom: 30px;
  background-image: -webkit-linear-gradient(92deg, #d1451a, #ff9300);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form {
  width: 360px;
  padding: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
}

.login-btn-wrap {
  text-align: center;
}

.login-btn {
  width: 100%;
  height: 36px;
}
</style>