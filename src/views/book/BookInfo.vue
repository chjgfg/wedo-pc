<template>
  <div id="bookInfo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/mains/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/mains/book' }">管理图书信息</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/mains/bookInfo' }">图书详细信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="item">
      <el-row class="item-ch1">
        <el-col :span="24">
          <el-card shadow="never">
            <div class="book-info">
              <div class="book-image">
                <el-image :src="n_item.image" style="border-radius: 0.5em"/>
              </div>
              <div class="book-info-ch2">
                <div class="dddd">
                  <div class="title">{{n_item.title}}</div>
                  <div class="author">{{author.name}}&emsp;&emsp;著</div>
                  <div class="xsxsxsx" @click="openAddAndUpdateBook(n_item)">
                    <i class="el-icon-edit"/>
                  </div>
                </div>
                <div class="font">
                  {{n_item.bookComment}}
                </div>
                <div class="font">
                  {{n_item.intro}}
                </div>
                <!--<div class="font">
                  {{n_item.protagonist}}
                </div>-->
                <div class="font">
                  {{n_item.state === false ? "未完结":"已完结"}}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>


      <div class="item-ch2">
        <div class="item-ch2-ch1">
          <span class="font">
            共<span class="fontSize">{{n_item.chapterNumber}}</span>页
          </span>
          <span class="font left1">
            <el-tooltip effect="dark" content="点击查看评论" placement="top-start">
              <el-button type="primary" icon="el-icon-s-comment" effect="dark" content="修改管理员" placement="top-end"
                         circle
                         @click="toComment"/>
            </el-tooltip>
          </span>
          <span class="font left2">
             <el-tooltip effect="dark" content="点击添加章节" placement="top-start">
              <el-button type="success" icon="el-icon-plus" circle @click="addOne"/>
             </el-tooltip>
          </span>
        </div>
        <br/>
        <br/>
        <div class="item-ch2-ch2">
          <div v-for="(item,index) in chapters" class="item-ch2-ch2-ch2" @click="goToChapter(item)">
            <!--            <el-tooltip  effect="dark" :content="item.title" placement="top-start">-->
            {{item.title = (item.title.length > 20 ? item.title.substring(0,20)+"...": item.title)}}
            <!--            </el-tooltip>-->

          </div>
        </div>
      </div>
      <add-and-update-book :addAndUpdateBook.sync="addAndUpdateBook" :bookId = "bookId"/>
    </div>
  </div>
</template>

<script>
  import AddAndUpdateBook from "./AddAndUpdateBook";
  import {GetAuthor, GetChapterList} from "../../axios";

  export default {
    name: "bookInfo",
    components: {
      AddAndUpdateBook
    },
    data() {
      return {
        n_item: {},
        chapters: [],
        author: {},
        item: "",
        addAndUpdateBook: false,
        bookId:0,

      }
    },


    methods: {

      openAddAndUpdateBook(intro) {//打开AddAndUpdateBook
        this.addAndUpdateBook=true;
        console.log(intro);
        this.bookId = intro.id
      },

      getInit(item) {//初始化获取书的信息
        console.log("item" + this.n_item);
        this.getGetAuthor(item.aId);
        this.GetChapterList(item.id);
        return item;
      },


      addOne() {
        // console.log(this.n_item.id);
        this.$router.push({
          path: "/index/mains/addchapter",
          query: {
            "id": encodeURIComponent(JSON.stringify(this.n_item.id)),
            "item": encodeURIComponent(JSON.stringify(this.n_item))
          }
        })
      },

      toComment() {
        this.$router.replace({
          path: "/index/mains/comment",
          query: {
            item: this.item
          }
        })
      },

      async getGetAuthor(id) {//初始化获取作者
        await GetAuthor({aId: id}).then((res) => {
          this.author = res;
          // console.log(res);
        }).catch((err) => {
          console.log(err);
        })
      },

      async GetChapterList(id) {//初始化获取章节
        // console.log(id);
        await GetChapterList({bid: id, page: 1, rows: 100000000}).then((res) => {
          if (res === null) {
            return
          }
          this.chapters = res.items.concat();

        }).catch((err) => {
          console.log(err);
        })
      },


      goToChapter(item) {
        console.log(item.id);
        const chapter = encodeURIComponent(JSON.stringify(item.id));
        this.$router.push({
          path: "/index/mains/chapter",
          query: {
            "chapter": chapter,
            "item": encodeURIComponent(JSON.stringify(this.n_item))
          }
        })
      }
    },
    created() {
      this.item = this.$route.query.item;
      this.n_item = JSON.parse(decodeURIComponent(this.item));
      this.getInit(this.n_item);
      console.log(this.n_item);
    },
  }
</script>

<style scoped>
  .item {
    width: 90%;
    /*margin-left: 5%;*/
    margin-top: 2%;
  }

  .item-ch1 {
    /*margin-left: 10%;*/

  }

  .book-info {
    display: flex;
    flex-direction: row;
  }

  .book-image {
    width: 20%;
  }

  .book-info-ch2 {
    width: 65%;
    margin-left: 10%;
  }

  .title {
    font-size: 36px;
    width: 50%;
  }

  .author {
    font-size: 20px;
    width: 30%;
  }


  .item-ch2 {
    margin-top: 5%;

  }

  .item-ch2-ch2 {
    /*display: inline-block;*/
  }

  .item-ch2-ch2-ch2 {
    cursor: pointer;
    margin-bottom: 2%;
    border-bottom: 1px solid #d8e3e7;
    width: 25%;
    text-align: left;
    font-size: 16px;
    display: inline-block;
  }

  .item-ch2-ch2-ch2:hover {
    color: #8EC5FC;
  }


  .item-ch2-ch1 {
    width: 100%;
  }

  .font {
    font-size: 17px;
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .left1 {
    margin-left: 86%;
  }

  .left2 {
    margin-left: 3%;
  }

  .fontSize {
    font-size: 30px;
    color: #8EC5FC;
  }

  .xsxsxsx {
    font-size: 22px;
    width: 20%;
    text-align: right;
  }

  .xsxsxsx:hover {
    color: #8EC5FC;
    cursor: pointer;
  }

  .dddd{
    display: flex;
    flex-direction: row;
  }

</style>