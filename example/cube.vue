
<template>
  <div class="box">
    <p>{{ message }}</p>
    <input v-model="message">
    <button v-on:click="reverseMessage($event)">反转消息</button>
    <button @click="reverseMessage($event)">反转消息</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'vue-cube'
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  },
  destroyed () {
    console.log('destroyed')
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
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
