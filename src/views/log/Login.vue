<template>
  <div id="login">
    <div class="head">
      <div class="head-ch1">
        <div class="head-ch1-ch1">
          <div class="title">WEDO后台</div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="账号" prop="name">
              <el-input v-model.number="ruleForm.name"/>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"/>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Admin} from "../../axios/index"

  export default {
    name: "Login",
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (value === '') {
            callback(new Error('请输入账号'));
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };

      return {
        ruleForm: {
          pass: '',
          name: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          name: [
            {validator: checkName, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      async submitForm(formName) {

        if (this.ruleForm.name === '' || this.ruleForm.pass === '') {
          this.$notify({
            message: "输入为空,请重新输入!!!",
            type: "error"
          });
          return;
        }

        await Admin({adminName: this.ruleForm.name, password: this.ruleForm.pass}).then((res) => {
          console.log(res);
          if (res !== "啥也没有") {
            this.$notify({
              message: "登录成功",
              type: "success"
            });

            sessionStorage.setItem("WD_TOKEN", res.WD_TOKEN);
            // console.log(sessionStorage.getItem("WD_TOKEN"));
            const form = res.WD_TOKEN;
            this.$store.dispatch("form", form);
            this.$router.replace("/index/mains")

          }else{
            this.$notify({
              message: "登录失败",
              type: "error"
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  #login {
    margin: 0;
    padding: 0;
    background-color: #fff;
  }

  .head {
    width: 40%;
    margin-left: 30%;
    margin-top: 12%;

  }

  .head-ch1 {
    width: 80%;
    margin-left: 10%;
    background-color: #8EC5FC;
    box-shadow: 5px 5px 10px #8EC5FC;
    border-radius: 0.7em;
  }

  .title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 10%;
    margin-left: 10%;
  }

  .head-ch1-ch1 {
    width: 70%;
    padding-top: 10%;
    margin-left: 10%;
    padding-bottom: 5%;
  }

</style>