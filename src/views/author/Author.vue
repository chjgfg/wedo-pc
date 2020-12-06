<template>
  <div id="author">
    <div class="author-ch1">
      <div class="author-ch1-ch1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/mains/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/mains/author' }">管理作者信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="author-ch1-ch2">
        <div class="author-ch1-ch2-ch1">
          <el-input placeholder="请输入作者名" v-model="input" size="mini" class="csacacas" clearable/>
          <el-button size="mini" class="vgfdgvbf" @click="findOne">搜索作者</el-button>
        </div>
        <div class="author-ch1-ch2-ch2">
          <el-tooltip class="item" effect="dark" content="添加作者" placement="top-start">
            <el-button type="success primary" size="mini" class="btn" @click="handleEdit()" circle><i
                class="el-icon-plus"/>
            </el-button>
          </el-tooltip>
        </div>

      </div>
    </div>


    <el-table :data="author" style="width: 100%">
      <el-table-column label="id" width="100%">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="作者名" width="150%">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="简介" width="1000%">
        <template slot-scope="scope">
          <p>{{ scope.row.introduce }}</p>
        </template>
      </el-table-column>
      <el-table-column label="照片" width="200%">
        <template slot-scope="scope">
          <el-image :src="scope.row.aPhoto" style="width: 50px;height: 50px;border-radius: 0.5em"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200%">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改作者" placement="top-end">
            <el-button size="mini" @click="handleEdit(scope.row.id)" type="primary" circle><i class="el-icon-edit"/>
            </el-button>&emsp;&emsp;&emsp;&emsp;
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除作者" placement="top-start">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)" circle><i
                class="el-icon-delete"/></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <add-and-update-author :addAndUpdateVisible.sync="addAndUpdateAuthor" :author-id="id"/>
    <div class="right">
      <el-pagination background layout="prev, pager, next" :total="totalElements" :page-size="size" class="page-about"
                     @current-change="pageTo"/>
    </div>
  </div>
</template>

<script>
  import {AuthorList, FindOne, DeleteOne} from "../../axios/index.js";
  import AddAndUpdateAuthor from "./AddAndUpdateAuthor";

  export default {
    name: "author",
    components: {
      AddAndUpdateAuthor
    },
    data() {
      return {
        author: [],
        addAndUpdateAuthor: false,
        id: 0,
        size: 0,
        totalElements: 0,
        input: ""
      }
    },
    methods: {

      handleEdit(row) {//添加或修改作者
        this.id = row;
        this.addAndUpdateAuthor = true;
      },


      async handleDelete(index, row) {//删除作者
        await DeleteOne({id: row}).then((res) => {
          console.log(res);
          if (res !== null || res !== "") {
            this.$notify({
              message: '删除成功',
              type: 'success'
            });
            window.location.reload()
          }
        }).catch((err) => {
          console.log(err);
        })
      },


      async getAuthor() {//初始化获取作者
        await AuthorList({page: 1, rows: 8}).then((res) => {
          console.log(res);
          this.totalElements = res.total;//总条数
          this.size = 8;//一页多少条
          const items = res.items;
          items.forEach((item, index) => {
            this.author.push(item);
          })
        }).catch((err) => {
          console.log(err)
        })
      },

      pageTo(data) {
        console.log(data);
        this.author = [];
        AuthorList({page: data, rows: 8}).then((res) => {
          console.log(res);
          this.totalElements = res.total;
          this.size = 8;
          const items = res.items;
          items.forEach((item, index) => {
            this.author.push(item);
          })
        }).catch((err) => {
          console.log(err)
        })
      },

      async findOne() {//找到一个作者
        if (this.input === '') {
          this.getAuthor();
          return;
        }
        // console.log(this.input);
        this.author = [];
        await FindOne({name: this.input, page: 1, rows: 8}).then((res) => {
          console.log(res);
          this.totalElements = res.total;
          this.size = 8;
          const items = res.items;
          items.forEach((item, index) => {
            this.author.push(item);
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    created() {
      this.getAuthor();
    }

  }
</script>

<style scoped>

  .author-ch1 {
    display: flex;
    margin-bottom: 1%;
    vertical-align: middle;
  }

  .author-ch1-ch1 {
    width: 20%;
    vertical-align: middle;
  }

  .author-ch1-ch2 {
    width: 80%;
    display: flex;
    vertical-align: middle;
  }

  .author-ch1-ch2-ch1 {
    display: flex;
    width: 60%;
    vertical-align: middle;
  }

  .csacacas {
    width: 40%;
  }

  .vgfdgvbf {
    margin-left: 10%;
  }

  .author-ch1-ch2-ch2 {
    width: 40%;
    vertical-align: middle;
  }


  .btn {
    margin-left: 90%;
  }

  .right {
    width: 100%;
    text-align: right;
    margin-top: 3%;
  }
  .el-table {
    font-size: 20px;
  }

</style>