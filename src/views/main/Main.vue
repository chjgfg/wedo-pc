<template>
  <div id="mains">
    <div class="head">
      <div class="head-ch1">WEDO后台管理</div>
      <div class="head-ch2">
        <el-dropdown @command="over">
          <span class="el-dropdown-link">
             {{form}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div id="navigate">
      <div class="navigate">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="false" router>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-grid"/>
              <span slot="title">分类</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/mains/category">管理分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-reading"/>
              <span slot="title">图书</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/mains/book">管理图书信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-coordinate"/>
              <span slot="title">作者</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/mains/author">管理作者信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-user"/>
              <span slot="title">读者</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/mains/reader">管理读者信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-coordinate"/>
              <span slot="title">管理员</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/mains/sysop">管理管理员信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </div>


      <div class="context">
        <router-view/>
       <!-- <div :class="number === 0 ? 'none' : 'block'">
          <router-view/>
        </div>
        <div :class="number === 0 ? 'block' : 'none'">
          <el-image :src="images" style="width: 105%;"/>
        </div>-->

      </div>
    </div>

  </div>
</template>

<script>
  import {AdminName} from "../../axios/index.js"

  export default {
    name: 'Mains',
    data() {
      return {
        form: "",
        number: 0,
        // images:"../../images/1.jpg",
        images:"https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      over() {
        sessionStorage.removeItem("WD_TOKEN");
        this.$store.dispatch("form", "");
        console.log(this.$store.state.form);
        this.$router.replace("/")
      },
      async getAdminName() {
        await AdminName().then((res) => {
          console.log(res);
          console.log(res.user.username);
          this.form = res.user.username
        }).catch((err) => {
          console.log(err);
        })
      },

      routeChanger: function (to, from) {
        console.log(to.path);
        console.log(from.path);
        if (to.path !== "") {
          this.number = 1;
        }
      }

    },

    watch: {//监听路由变化
      "$route": "routeChanger"
    },
    created() {
      this.getAdminName()
    }


  }
</script>

<style scoped>

  .block {
    display: block;
  }

  .none {
    display: none;
  }

  .head {
    height: 50px;
    background-color: #000;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .head-ch1 {
    height: 100%;
    font-size: 30px;
    /*text-align: center;*/
    margin-left: 1%;
    color: white;
    width: 50%;
    line-height: 50px;
  }

  .head-ch2 {
    line-height: 50px;
    width: 10%;
    margin-left: 70%;
    color: white;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  #navigate {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }

  .el-menu-vertical-demo {
    height: 150%;
  }

  .context {
    width: 80%;
    margin-left: 3%;
    margin-top: 3%;
  }

  .el-dropdown-link {
    color: #8EC5FC;
    font-size: 18px;
  }

  .el-dropdown-link:hover {
    cursor: pointer;
  }

</style>