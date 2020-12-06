<template>
  <div id="add-and-update">
    <el-dialog :title="title" :visible="addAndUpdateVisible" :close-on-click-modal="false" :before-close="handleClose">
      <el-form :model="categoryData" status-icon ref="categoryData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display: none">
          <el-input type="text" v-model="categoryData.id" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="分类名" prop="type_name">
          <el-input type="text" v-model="categoryData.typeName" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="分类信息" prop="type_info">
          <el-input type="text" v-model="categoryData.typeInfo" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="分类图片" prop="icon_url">
          <el-input type="text" v-model="categoryData.iconUrl" auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取 消</el-button>
          <!--          <el-button @click="resetForm('categoryData')">重置</el-button>-->
          <el-button type="primary" @click="submitForm('categoryData')">{{title}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {UpdateCategory, AddCategory} from "../../axios";

  export default {
    name: "AddAndUpdateCategory",
    props: ['addAndUpdateVisible', 'categoryId'],
    data() {
      return {
        categoryData: {
          id: 0,
          typeName: "",
          typeInfo: "",
          iconUrl: ""
        },
        title: "",
        flage: 0
      };
    },
    methods: {

      handleClose(done) {
        this.$emit("update:addAndUpdateVisible", false);
      },
      cancel() {
        this.$emit("update:addAndUpdateVisible", false);
      },

      async submitForm(formName) {
        // console.log(this.flage);
        if (this.flage === 1) {//修改
          await UpdateCategory({
            id: this.categoryData.id,
            typeName: this.categoryData.typeName,
            typeInfo: this.categoryData.typeInfo,
            iconUrl: this.categoryData.iconUrl
          }).then((res) => {
            console.log(res);
            this.$notify({
              message: '操作成功',
              type: 'success'
            });
            this.$emit("update:addAndUpdateVisible", false);
          }).catch((err) => {
            console.log(err);
            this.$notify({
              message: '操作失败',
              type: 'error'
            });
          });
        } else if (this.flage === 0) {//添加
          await AddCategory({
            id: this.categoryData.id,
            typeName: this.categoryData.typeName,
            typeInfo: this.categoryData.typeInfo,
            iconUrl: this.categoryData.iconUrl
          }).then((res) => {
            console.log(res);
            this.$notify({
              message: '操作成功',
              type: 'success'
            });
            this.$emit("update:addAndUpdateVisible", false);
          }).catch((err) => {
            console.log(err);
            this.$notify({
              message: '操作失败',
              type: 'error'
            });
          });
        }
        window.location.reload()

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      categoryId(newValue, oldValue) {
        if (newValue !== undefined) {
          this.flage = 1;
          this.title = "修改";
          // console.log(newValue);
          this.categoryData = newValue;
        } else {
          this.title = "添加";
          this.flage = 0;
          // console.log(newValue);
          this.categoryData = {};

        }
      }
    }

  }
</script>

<style scoped>

</style>