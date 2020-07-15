
<template>
  <div class="box">
    <p>{{name}}</p>
    <input v-model="name" />
  </div>
</template>

<script>
export default {
  data: {
    name: 'vue-cube'
  },
  onReady() {}
};
</script>

<style lang="less">
@nice-blue: #00c13c;
.box {
  text-align: center;
  p {
    color: @nice-blue;
    font-size: 20px;
  }
}
</style>
