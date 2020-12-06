<template>
  <div id="comment">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/mains/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/mains/book' }">管理图书信息</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/mains/bookInfo' ,query:{item:this.item}}">图书详细信息</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/index/mains/comment' }">管理图书评论信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-tooltip class="item" effect="dark" content="添加评论" placement="top-start">
       <el-button type="success primary" size="mini" class="btn" @click="handleEdit()" circle><i class="el-icon-plus"/>
       </el-button>
     </el-tooltip>-->
    <br><br>
    <el-table :data="comment" style="width: 100%">
      <el-table-column label="id" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="图书id" width="100">
        <template slot-scope="scope">
          {{ scope.row.bId }}
        </template>
      </el-table-column>
      <el-table-column label="评论内容" width="700">
        <template slot-scope="scope">
          <p>{{ scope.row.text }}</p>
        </template>
      </el-table-column>
      <el-table-column label="用户" width="300">
        <template slot-scope="scope">
          <p>{{ scope.row.nickname }}</p>
        </template>
      </el-table-column>
      <el-table-column label="评论时间" width="300">
        <template slot-scope="scope">
          <p>{{ scope.row.created }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除评论" placement="top-start">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)" circle><i
                class="el-icon-delete"/></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <add-and-update-comment :addAndUpdateVisible.sync="addAndUpdateComment" :comment-id="id"/>
    <div class="right">
      <el-pagination background layout="prev, pager, next" :total="totalElements" :page-size="size" class="page-about"
                     @current-change="pageTo"/>
    </div>
  </div>
</template>

<script>
  import {FindReview, DeleteReview} from "../../axios/index";
  import AddAndUpdateComment from "./AddAndUpdateComment";

  export default {
    name: "Comment",
    components: {
      AddAndUpdateComment
    },
    data() {
      return {
        comment: [],
        addAndUpdateComment: false,
        id: 0,
        totalElements: 0,
        size: 0,
        item: "",
        n_item: {}
      }
    },
    methods: {
      handleEdit(row) {
        // console.log(index, row);
        this.id = row;
        this.addAndUpdateComment = true;
      },
      async handleDelete(index, row) {
        await DeleteReview({id: row}).then((res) => {
          console.log(res);
          if (res) {
            this.$notify({
              message: '操作成功',
              type: 'success'
            });
            window.location.reload()
          }
        }).catch((err) => {
          console.log(err);
        });
      },




      async getComment() {
        console.log(this.n_item.id);
        await FindReview({bid: this.n_item.id, page: 1, rows: 9}).then((res) => {
          console.log(res);
          this.totalElements = res.total;//总条数
          this.size = 9;//一页多少条
          const items = res.items;
          items.forEach((item, index) => {
            console.log(item.created);
            item.created = new Date(+new Date(new Date(item.created).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            this.comment.push(item);
          })
        }).catch((err) => {
          console.log(err);
        });

      },

     /* renderTime(date){
        var dates = new Date(item.created).toJSON();
        return new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      },*/

      async pageTo(data) {
        this.comment = [];
        await FindReview({bid: this.n_item.id, page: data, rows: 9}).then((res) => {
          console.log(res);
          this.totalElements = res.total;//总条数
          this.size = 9;//一页多少条
          const items = res.items;
          items.forEach((item, index) => {
            this.comment.push(item);
          })
        }).catch((err) => {
          console.log(err);
        });
      }


    },
    created() {
      this.item = this.$route.query.item;
      this.n_item = JSON.parse(decodeURIComponent(this.item));
      this.getComment();

    }


  }
</script>

<style scoped>
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