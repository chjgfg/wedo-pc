<template>
  <div id="add-and-update-comment">
    <el-dialog :title="title" :visible="addAndUpdateBook" :close-on-click-modal="false" :before-close="handleClose" >
      <el-form :model="commentData" status-icon ref="commentData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="图书名" prop="title">
          <el-input type="text" v-model="commentData.title" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="作者" prop="a_name">
          <el-input type="text" v-model="a_name" auto-complete="off"  @blur="findOne"/>
        </el-form-item>
        <el-form-item label="图片地址" prop="image">
          <el-input type="text" v-model="commentData.image" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="书评" prop="bookComment">
          <el-input type="text" v-model="commentData.bookComment" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="简介" prop="intro">
          <el-input type="text" v-model="commentData.intro" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="主角名" prop="protagonist">
          <el-input type="text" v-model="commentData.protagonist" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="是否完结" prop="state">
          <!--          <el-input type="text" v-model="commentData.state" auto-complete="off"/>-->
          <el-radio v-model="commentData.state" :label="true">已完结</el-radio>
          <el-radio v-model="commentData.state" :label="false">未完结</el-radio>
        </el-form-item>
        <el-form-item label="图书分类" prop="category">
          <el-dropdown @command="handleCommand" disabled>
            <el-button type="">{{category_name}}<i class="el-icon-arrow-down el-icon--right"/></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" v-for="(item,index) in categorys" trigger="click">
                {{item.typeName}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <el-form-item>
          <el-button @click="cancel">取 消</el-button>
          <el-button @click="resetForm('commentData')">重置</el-button>
          <el-button type="primary" @click="submitForm('commentData')">{{title}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>


<script>


  import {AddBooK,AddOne, CategoryList, FindOne,FindBook,GetAuthor,FindCategory,UpdateBooK} from "../../axios";

  export default {
    name: "AddAndUpdateBook",
    props: ['addAndUpdateBook',"bookId"],
    data() {
      return {
        commentData: {
          id:0,
          title: "",
          aId: 0,
          image: "",
          creaDate: "",
          protagonist: "",
          state: false,
          cId: 0,
          bookComment:"",
          intro:""
        },

        title: "",
        categorys: [],
        category_name: "",
        a_name:"",
        author:{},
        authorId:0,
        ok:0,
      };
    },


    methods: {

      async handleCommand(command) {//el-dropdown
        // console.log(command);
        this.commentData.cId = command.id;
        this.category_name = command.typeName
      },

      async getCategory() {//初始化加载分类
        await CategoryList().then(res => {
          res.forEach((item, index) => {
            // console.log(item);
            this.categorys.push(item);
          })
        }).catch(err => {
          console.log(err);
        })
      },

      handleClose(done) {
        this.$emit("update:addAndUpdateBook", false);
      },
      cancel() {
        this.$emit("update:addAndUpdateBook", false);
      },

      async addOne(name){//添加作者
        console.log(name);
        await AddOne({name: name,introduce: "",aPhoto: ""}).then((res) => {
          console.log(res);
          this.authorId = res.id;
        }).catch((err) => {
          console.log(err);
        });
      },

      async findOne(){//找作者
        console.log(this.a_name);
        await FindOne({name:this.a_name,page:1, rows:5}).then((res) => {
          console.log(res);
          if(res === ""){
            this.addOne(this.a_name);
          }else{
            this.authorId = res.items[0].id;
          }
          console.log(this.authorId);
        }).catch((err) => {
          console.log(err);
        });
      },



      async submitForm(formName) {//添加或修改
        console.log(this.a_name);
        var d = new Date();
        d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        this.commentData.creaDate = d;//时间
        this.commentData.aId = this.authorId;//作者
        // console.log(this.authorId);
        // console.log(this.commentData);
        const book  = this.commentData;
        console.log(book);
        if(this.title === "添加"){
          await AddBooK({id:book.id,title:book.title,aId:book.aId,image:book.image,creaDate:book.creaDate,protagonist:book.protagonist,state:book.state,cId:book.cId,bookComment:book.bookComment,intro:book.intro}).then((res)=>{
            console.log(res);
            if(res !== null){
              this.$notify({
                message: '添加成功',
                type: 'success',
              });
              window.location.reload();
            }
          }).catch((err)=>{
            console.log(err);
          });
        }else{

          await this.findOne();
          // console.log(this.authorId);
          this.commentData.aId = this.authorId;
          /*setTimeout(()=>{
            console.log(this.commentData);
            },1000);*/
          console.log(this.commentData);
          await UpdateBooK({id:book.id,title:book.title,aId:book.aId,image:book.image,creaDate:book.creaDate,protagonist:book.protagonist,state:book.state,cId:book.cId,bookComment:book.bookComment,intro:book.intro}).then((res)=>{
            console.log(res);
            if(res !== null){
              this.$router.push("/index/mains/book")
            }
          }).catch((err)=>{
            console.log(err);
          })
        }
      },

      resetForm(formName) {
        this.a_name="";
        this.category_name = "请选择分类";
        this.$refs[formName].resetFields();
      },

      async getAuthor(id){//通过id找作者
        await GetAuthor({aId:id}).then((res)=>{
          console.log(res);
          this.a_name = res.name
        }).catch((err)=>{
          console.log(err);
        })
      },

      async findCategory(id){//通过分类id找到分类
        await FindCategory({cid:id}).then((res)=>{
          console.log(res);
          this.category_name = res.typeName
        }).catch((err)=>{
          console.log(err);
        })
      },

      async findBook(id){//通过书id找到书
        console.log(this.a_name);

        await FindBook({bid:id}).then((res)=>{
          console.log(res);
          this.getAuthor(res.aId);
          this.findCategory(res.cId);
          this.commentData = res;
        }).catch((err)=>{
          console.log(err);
        })
      }
    },


    watch: {
      bookId(newValue, oldValue) {

        if (newValue !== null) {
          this.title = "修改";
          this.ok = 1;
          console.log(newValue);
          this.findBook(newValue)
        }else{
          this.title = "添加";
          this.commentData = {};
          this.ok = 0;
        }
      },

    },

    created() {
      this.title = "添加";
      this.category_name = "请选择分类";
      this.getCategory()
    }


  }
</script>

<style scoped>
  .calendar {
    width: 100%;
    height: 30%;
  }

  .block{
    display: block;
  }
  .none{
    display: none;
  }


</style>