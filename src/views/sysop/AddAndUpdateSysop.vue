<template>
  <div id="add-and-update-author">
    <el-dialog :title="title" :visible="addAndUpdateVisible" :close-on-click-modal="false" :before-close="handleClose">
      <el-form :model="authorData" status-icon ref="authorData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" :class="ok === true ? 'display' : 'none'">
          <el-input type="text" v-model="authorData.id" auto-complete="off"  :disabled="true" />
        </el-form-item>
        <el-form-item label="管理员账号" prop="type_name" :class="ok === true ? 'none' : 'display'">
          <el-input type="text" v-model="authorData.username" auto-complete="off" :disabled="ok"/>
        </el-form-item>
        <el-form-item label="管理员密码" prop="type_info">
          <el-input type="text" v-model="authorData.password" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="重新输入密码" prop="type_info" :class="ok === true ? 'display' : 'none'">
          <el-input type="text" v-model="authorData.newpassword" auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取 消</el-button>
          <!--          <el-button @click="resetForm('categoryData')">重置</el-button>-->
          <el-button type="primary" @click="submitForm('authorData')">{{title}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {AddAdmin, UpdateAdmin} from "../../axios/index"

  export default {
    name: "AddAndUpdateSysop",
    props: ['addAndUpdateVisible', 'authorId'],
    data() {
      return {
        authorData: {
          id: 0,
          username: "",
          password: "",
          newpassword: ""
        },
        title: "",
        ok: false,
      };
    },
    methods: {

      handleClose(done) {
        this.$emit("update:addAndUpdateVisible", false);
      },

      cancel() {
        this.$emit("update:addAndUpdateVisible", false);
      },

      submitForm(formName) {
        console.log(this.authorData);
        if (this.authorData.id === undefined) {
          this.addOne(this.authorData)
        } else {
          this.updateOne(this.authorData)
        }
        this.$emit("update:addAndUpdateVisible", false);

      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      /* async getOneById(item) {//通过id获取
         await FindById({aId: item}).then((res) => {
           console.log(res);
           this.authorData = res;
         }).catch((err) => {
           console.log(err);
         })
       },*/

      async addOne(item) {
        /*console.log(sessionStorage.getItem("WD_TOKEN"));
        console.log(item);*/
        await AddAdmin({
          token: sessionStorage.getItem("WD_TOKEN"),
          adminName: item.username,
          password: item.password
        }).then((res) => {
          if (res !== null || res !== "") {
            console.log(res);

            /*this.$notify({
              message: '删除成功',
              type: 'success'
            });*/
            window.location.reload()
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      async updateOne(item) {
        console.log(item);
        if (item.password !== item.newpassword) {
          this.$notify({
            message: '两次密码不一致,请重新输入',
            type: 'error'
          });
          return
        }
        console.log("ccccccccccccccccc");
        await UpdateAdmin({id: item.id, password: item.password}).then((res) => {
          // if (res !== null || res !== "") {
            this.$notify({
              message: '修改成功',
              type: 'success'
            });
            window.location.reload()
          // }
        }).catch((err) => {
          console.log(err);
        })
      },

    },

    watch: {
      authorId(newValue, oldValue) {
        if (newValue !== undefined) {
          this.title = "修改";
          this.ok = true;
          console.log(newValue);
          this.authorData.id = newValue;
          this.authorData.password = "******";
          this.authorData.newpassword = "******";
        } else {
          this.ok = false;
          this.title = "添加";
          this.authorData = {};
        }
        // window.location.reload()
      }
    }

  }
</script>

<style scoped>
  .block {
    display: block;
  }

  .none {
    display: none;
  }


</style>