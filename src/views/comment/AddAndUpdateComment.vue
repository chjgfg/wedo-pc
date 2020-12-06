<template>
  <div id="add-and-update-comment">
    <el-dialog :title="title" :visible="addAndUpdateVisible" :close-on-click-modal="false" :before-close="handleClose">
      <el-form :model="commentData" status-icon ref="commentData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id">
          <el-input type="text" v-model="commentData.id" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="图书id" prop="b_id">
          <el-input type="text" v-model="commentData.b_id" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="评论内容" prop="text">
          <el-input type="text" v-model="commentData.text" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="用户id" prop="u_id">
          <el-input type="text" v-model="commentData.u_id" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="评论时间" prop="date">
          <el-input type="text" v-model="commentData.date" auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取 消</el-button>
          <!--          <el-button @click="resetForm('categoryData')">重置</el-button>-->
          <el-button type="primary" @click="submitForm('commentData')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>



  export default {
    name: "AddAndUpdateComment",
    props: ['addAndUpdateVisible', 'commentId'],
    data() {
      return {
        commentData: {},
        title: ""
      };
    },
    methods: {

      handleClose(done) {
        this.$emit("update:addAndUpdateVisible", false);
        /* this.$confirm('确认关闭？').then(_ => {
           this.$notify({
             message: '操作成功',
             type: 'success'
           });
           this.$emit("update:addAndUpdateVisible", false);

         }).catch(_ => {
           this.$notify({
             message: '已取消操作',
             type: 'success'
           });
         });*/
      },
      cancel() {
        this.$emit("update:addAndUpdateVisible", false);
      },

      submitForm(formName) {
        console.log(this.commentData);
        /*this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.commentData);
            this.$notify({
              message: '操作成功',
              type: 'success'
            });
            this.$emit("update:addAndUpdateVisible", false);
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
      },
    },
    watch: {
      commentId(newValue, oldValue) {
        if (newValue !== undefined) {
          this.title = "修改";
          console.log(newValue);
          const categoryDatas = {
            id: newValue,
            b_id: '忘纪',
            text: '每一个强大的人，都要咬着牙度过一段没人帮忙，没人支持，没人嘘寒问暖的日子。过去了，这就是你的成人礼，过不去，求饶了，这就是你的无底洞。',
            u_id: "ddddd",
            date: "村上春树从"
          };
          this.commentData = categoryDatas;
        } else {
          this.title = "添加";
          this.commentData = {};
        }
        // window.location.reload()
      }
    }


  }
</script>

<style scoped>

</style>