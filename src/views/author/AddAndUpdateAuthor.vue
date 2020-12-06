<template>
  <div id="add-and-update-author">
    <el-dialog :title="title" :visible="addAndUpdateVisible" :close-on-click-modal="false" :before-close="handleClose">
      <el-form :model="authorData" status-icon ref="authorData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id">
          <el-input type="text" v-model="authorData.id" auto-complete="off" disabled/>
        </el-form-item>
        <el-form-item label="作者名" prop="type_name">
          <el-input type="text" v-model="authorData.name" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="作者信息" prop="type_info">
          <el-input type="text" v-model="authorData.introduce" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="作者近照" prop="icon_url">
          <el-input type="text" v-model="authorData.aPhoto" auto-complete="off"/>
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
  import {AddOne, UpdateOne, FindById} from "../../axios/index.js";

  export default {
    name: "AddAndUpdateAuthor",
    props: ['addAndUpdateVisible', 'authorId'],
    data() {
      return {
        authorData: {},
        title: ""
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
        console.log(this.authorData.id);
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

      async getOneById(item) {//通过id获取
        await FindById({aId: item}).then((res) => {
          console.log(res);
          this.authorData = res;
        }).catch((err) => {
          console.log(err);
        })
      },

      async addOne(item) {
        await AddOne({name: item.name, introduce: item.introduce, aPhoto: item.aPhoto}).then((res) => {
          if (res !== null || res !== "") {
            console.log(res);
            this.$notify({
              message: '添加成功',
              type: 'success'
            });
            window.location.reload()
          }
        }).catch((err) => {
          console.log(err);
        })
      },

      async updateOne(item) {
        await UpdateOne({id: item.id, name: item.name, introduce: item.introduce, aPhoto: item.aPhoto}).then((res) => {
          if (res !== null || res !== "") {
            this.$notify({
              message: '修改成功',
              type: 'success'
            });
            window.location.reload()
          }
        }).catch((err) => {
          console.log(err);
        })
      },


    },

    watch: {
      authorId(newValue, oldValue) {
        console.log(newValue);
        if (newValue !== undefined) {
          this.title = "修改";
          this.getOneById(newValue);
        } else {
          this.title = "添加";
          this.authorData = {};
        }
        // window.location.reload()
      }
    }

  }
</script>

<style scoped>

</style>