<template>
  <div id="book">
    <div class="head">
      <div class="head-ch1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/mains/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/mains/book' }">管理图书信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="head-ch2">
        <div class="select">
          <el-dropdown @command="handleCommand" disabled>
            <el-button type="mini" class="mini-btn">
              {{name.typeName}}<i class="el-icon-arrow-down el-icon--right"/>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" v-for="(item,index) in category" trigger="click">
                {{item.typeName}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="input">
          <el-input v-model="input" placeholder="请输入书名" size="mini " clearable/>
        </div>
        <div class="btn">
          <el-button type="mini" class="btn-ch1" @click="search">搜索</el-button>
        </div>
      </div>

    </div>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8" v-for="(item,index) in book" class="el-col">
        <el-card shadow="hover">
          <div class="hover-ch1">
            <div class="hover-ch1-ch1">
              <el-image :src="item.image" class="image" @click="goToBookInfo(item)"/>
            </div>
            <div class="item">
              <div class="ddddddd">
                <div class="ddddddd-ch1">
                  <span>{{item.title}}</span>
                </div>
                <div class="ddddddd-ch2">
                  <span class="el-icon-close ddd" @click="deleteOne(item)"/>
                </div>
              </div>
              <div class="intro" @click="goToBookInfo(item)">  <!--.substring(0,100)+"..."-->
                {{item.intro}}
              </div>

            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="el-col">
        <el-card shadow="hover">
          <div class="hover-ch1">
            <div class="el-icon-circle-plus-outline add" @click="addUpdateBook"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="right">
      <el-pagination background layout="prev, pager, next" :total="totalElements" :page-size="size" class="page-about"
                     @current-change="pageTo"/>
    </div>

    <add-and-update-book :addAndUpdateBook.sync="addAndUpdateBook"/>
  </div>
</template>

<script>
  import {CategoryList, BookList, GetBookListByBookNameAndCid, DeleteBook} from "../../axios";
  import AddAndUpdateBook from "./AddAndUpdateBook";

  export default {
    name: "book",
    components: {
      AddAndUpdateBook
    },
    data() {
      return {
        book: [],
        category: [],
        name: {},
        input: "",
        totalElements: 0,
        size: 8,
        cid: 0,
        addAndUpdateBook: false,
      }
    },
    methods: {

      addUpdateBook() {
        this.addAndUpdateBook = true;
      },

      async deleteOne(item) {
        console.log(item.id);
        await DeleteBook({id: item.id}).then((res) => {
          console.log(res);
          window.location.reload()
        }).catch((err) => {
          console.log(err);
        })
      },

      async pageTo(data) {
        let sss = "";
        if (this.cid !== 0) {
          sss = this.cid
        }
        console.log(this.cid);
        this.book = [];
        await BookList({cid: sss, page: data, rows: 8}).then((res) => {
          console.log(res);
          const items = res.items;
          this.totalElements = res.total;
          this.size = 8;
          items.forEach((item, index) => {
            if (item.intro === null || item.intro === "") {
              item.intro = "暂无简介!"
            } else if (item.intro.length > 50) {
              item.intro = item.intro.substring(0, 60) + "...";
            }
            this.book.push(item);
          })
        }).catch((err) => {
          console.log(err);
        });
      },

      async handleCommand(command) {
        this.cid = command.id;
        if (command === null) {
          this.name.typeName = "请选择分类";
          return;
        }
        this.name = command;
      },

      async getBook() {
        await BookList({cid: "", page: 1, rows: 8}).then((res) => {//初始化得到书
          console.log(res);
          const items = res.items;
          this.totalElements = res.total;
          this.size = 8;
          items.forEach((item, index) => {
            if (item.intro === null || item.intro === "") {
              item.intro = "暂无简介!"
            } else if (item.intro.length > 50) {
              item.intro = item.intro.substring(0, 60) + "...";
            }
            this.book.push(item);
          })
        }).catch((err) => {
          console.log(err);
        });
      },

      goToBookInfo(item) {
        console.log(item);
        this.$router.push({
          path: "/index/mains/bookInfo",
          query: {
            "item": encodeURIComponent(JSON.stringify(item))
          }
        });
      },

      async getCategory() {//初始化加载分类
        await CategoryList().then(res => {
          res.forEach((item, index) => {
            // console.log(item);
            this.category.push(item);
          })
        }).catch(err => {
          console.log(err);
        })
      },


      search() {//下拉框和搜索框并用
        if (this.name.name === "" && this.input === '') {
          this.$notify({
            message: '输入为空, 请重新输入!!!',
            type: 'success',
          });
          return;
        }
        this.book = [];

        let input = "";
        let cid = "";
        if (this.input !== "") {
          input = this.input
        }
        if (this.cid !== 0) {
          cid = this.cid
        }
        console.log(cid + "----" + input);
        GetBookListByBookNameAndCid({title: input, cid: cid, page: 1, rows: 8}).then((res) => {
          console.log(res);
          const items = res.items;
          this.totalElements = res.total;
          this.size = 8;
          items.forEach((item, index) => {
            if (item.intro === null || item.intro === "") {
              item.intro = "暂无简介!"
            } else if (item.intro.length > 50) {
              item.intro = item.intro.substring(0, 60) + "...";
            }
            this.book.push(item);
          })
        }).catch((err) => {
          console.log(err);
        });
      }

    },
    created() {
      this.book = [];
      this.name.typeName = "请选择分类";
      this.getBook();
      this.getCategory();
    }
  }
</script>

<style scoped>
  .head {
    display: flex;
    flex-direction: row;
  }

  .head-ch1 {
    width: 30%;
  }

  .head-ch2 {
    width: 70%;
    display: flex;
    flex-direction: row;
    height: 20px;
  }

  .select {
    width: 8%;
  }

  .input, .btn {
    margin-left: 5%;
  }

  .select, .input {
    vertical-align: middle;
  }

  .el-row {
    margin-top: 2%;
  }

  .el-col {
    margin-bottom: 2%;
  }

  .hover-ch1 {
    display: flex;
    cursor: pointer;
    height: 215px;
  }

  .hover-ch1-ch1 {
    width: 30%;
  }

  .image {
    width: 100%;
    border-radius: 0.5em;
    height: 215px;
  }

  .item {
    width: 65%;
    margin-left: 4%;
    font-size: 18px;
  }

  .intro {
    margin-top: 15%;
  }

  .right {
    width: 100%;
    text-align: right;
  }

  .add {
    font-size: 100px;
    margin: auto;
    color: darkgrey;
  }

  .add:hover {
    color: #8EC5FC;
  }


  .ddddddd {
    display: flex;
    flex-direction: row;
  }

  .ddddddd-ch1, .ddddddd-ch2 {
    width: 70%;
  }
  .ddddddd-ch2{
    width: 30%;
    text-align: right;
  }

  .ddddddd-ch2:hover{
    color: #8EC5FC;
  }

  .ddd {
    font-size: 22px;
  }

  /*
    .ddddddd-ch2:hover:before{
      -webkit-transform:scale(1,1);
      transform:scale(1,1);
      -webkit-transition:-webkit-transform 1s linear;
      transition:transform 1s linear;
    }
  */

  .ddddddd-ch2:hover::before {
    -webkit-animation: spin 1s linear 1s 2 alternate;
    animation: spin 1s linear 1s 2 alternate;
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }


</style>