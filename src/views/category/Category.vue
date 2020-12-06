<template>
  <div id="look-category">
    <div class="head">
      <div class="head-ch1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/mains/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/mains/category' }">管理分类信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="head-ch2">
        <el-tooltip class="item" effect="dark" content="添加分类" placement="top-start">
          <el-button type="success primary" size="mini" class="btn" @click="handleEdit()" circle><i
              class="el-icon-plus"/>
          </el-button>
        </el-tooltip>
      </div>

    </div>

    <el-table :data="category" class="el-table">
      <el-table-column label="id" width="150%">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="200%">
        <template slot-scope="scope">
          {{ scope.row.typeName }}
        </template>
      </el-table-column>
      <el-table-column label="简介" width="700%">
        <template slot-scope="scope">
          <p>{{ scope.row.typeInfo }}</p>
        </template>
      </el-table-column>
      <el-table-column label="图片地址" width="300%">
        <template slot-scope="scope">
          <el-image :src="scope.row.iconUrl" class="el-image"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300%">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改分类" placement="top-end">
            <el-button size="mini" @click="handleEdit(scope.row)" type="primary" circle><i class="el-icon-edit"/>
            </el-button>&emsp;&emsp;&emsp;&emsp;
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除分类" placement="top-start">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)" circle><i
                class="el-icon-delete"/></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <add-and-update-category :addAndUpdateVisible.sync="addAndUpdateCategory" :categoryId="categoryData"/>
  </div>
</template>

<script>
  import AddAndUpdateCategory from './AddAndUpdateCategory'
  import {CategoryList, DeleteCategory} from "../../axios";

  export default {
    name: "LookCategory",
    components: {
      AddAndUpdateCategory
    },
    data() {
      return {
        category: [],
        addAndUpdateCategory: false,
        categoryData: {
          id: 0,
          typeName: "",
          typeInfo: "",
          iconUrl: ""
        },
        inject:['reload'],
      }
    },
    methods: {
      handleEdit(row) {
        this.categoryData = row;
        this.addAndUpdateCategory = true;
        // window.location.reload()
      },
      async handleDelete(row) {
        console.log(row);
        await DeleteCategory({id: row}).then((res) => {
          this.$notify({
            message: '操作成功',
            type: 'success'
          });
          window.location.reload();
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });

      },

      async getCategory() {//初始化数据
        await CategoryList().then(res => {
          res.forEach((item, index) => {
            // console.log(item);
            this.category.push(item);
          })
        }).catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      this.getCategory();
    }
  }
</script>

<style scoped>
  .head {
    display: flex;
    flex-direction: row;
    height: 20%;
  }

  .head-ch1 {
    width: 80%;
  }

  .head-ch2 {
    width: 20%;
  }

  .el-image {
    width: 50px;
    height: 50px;
    border-radius: 0.5cm;
  }

  .el-table {
    margin-top: 1%;
    width: 100%;
  }

  .btn {
    margin-left: 90%;
  }
  .el-table {
    font-size: 20px;
  }


</style>