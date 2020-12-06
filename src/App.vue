<template>
  <div id="app">
    <index/>
  </div>
</template>

<script>
  import Index from './views/Index';

  export default {
    components: {
      Index
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    /* 设置背景颜色，背景图加载过程中会显示背景色 */
    /*background-color: #8EC5FC;*/
    /*background-image: linear-gradient(71deg, #8ec5fc 10%, #80D0C7 88%);*/

    /* 背景图垂直、水平均居中 */
    /*background-position: center center;*/
    /* 背景图不平铺 */
    /*background-repeat: no-repeat;*/
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    /*background-attachment: fixed;*/
    /*此条属性必须设置否则可能无效*/
    /* 让背景图基于容器大小伸缩 */
    /*background-size: cover;*/
  }

</style>
