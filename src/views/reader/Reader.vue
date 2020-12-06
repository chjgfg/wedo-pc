<template>
  <div id="reader">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/mains/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/mains/reader' }">管理读者信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="head">
      <el-table :data="user" class="user">
        <el-table-column label="id" width="120">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="200">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="500">
          <template slot-scope="scope">
            <p>{{ scope.row.nickname }}</p>
          </template>
        </el-table-column>
        <el-table-column label="电话" width="360">
          <template slot-scope="scope">
            <p>{{ scope.row.phone }}</p>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="300">
          <template slot-scope="scope">
            <el-image class="images" :src="scope.row.uPhoto" :fit="fit"/>
          </template>
        </el-table-column>
        <!-- <el-table-column label="盐" width="120">
           <template slot-scope="scope">
             <p>{{ scope.row.slat }}</p>
           </template>
         </el-table-column>-->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="'删除读者'+scope.row.username" placement="top-end">
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row.id)" type="danger" circle><i
                  class="el-icon-delete"/></el-button>&emsp;&emsp;&emsp;&emsp;
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <el-pagination background layout="prev, pager, next" :total="totalElements" :page-size="size" class="page-about"
                     @current-change="pageTo"/>
    </div>

  </div>
</template>

<script>
  import {UserList,DeleteUser} from "../../axios/index";

  export default {
    name: "reader",

    data() {
      return {
        fit: 'cover',
        user: [],
        addAndUpdateCategory: false,
        id: 0,
        totalElements: 0,
        size: 9,

      }
    },
    methods: {

      async pageTo(data) {
        await UserList({page: data, rows: this.size}).then((res) => {
          console.log(res);
          this.totalElements = res.total;
          this.size = 9;
        }).catch((err) => {
          console.log(err);
        })
      },
     async handleDelete(index, row) {
        this.$confirm('确认删除？').then(_ => {
          DeleteUser({id:row}).then((res)=>{
            console.log(res);
            this.$notify({
              message: '操作成功',
              type: 'success'
            });
            window.location.reload();
          }).catch((err)=>{
            console.log(err);
          });

        }).catch(_ => {
          this.$notify({
            message: '已取消操作',
            type: 'success'
          });
        });
        console.log(index, row);
      },

      async userList() {
        await UserList({page: 1, rows: this.size}).then((res) => {
          console.log(res);
          this.totalElements = res.total;
          this.size = 9;
          const ss = res.items
          ss.forEach((item, index) => {
            this.user.push(item);
          })
        }).catch((err) => {
          console.log(err);
        })
      }

    },
    created() {
      // this.getReader();
      this.userList()
    }


  }
</script>

<style scoped>
  .head {
    margin-top: 2%;
  }

  .user {
    width: 100%;
  }

  .images {
    width: 50px;
    height: 50px;
    border-radius: 0.5em;
  }

  .right {
    width: 100%;
    text-align: right;
  }

  .el-table {
    font-size: 20px;
  }

</style>