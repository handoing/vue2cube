
<template>
  <div class="box">
    <Text title="{{ message }}" ></Text>
    <input v-model="message">
    <span v-on:click="reverseMessage($event)"><Button text="反转消息"></Button></span>
    <span @click="reverseMessage($event)"><Button text="反转消息"></Button></span>
  </div>
</template>

<script>
import Button from './components/button.vue';
import Text from './components/text.vue';
export default {
  data() {
    return {
      message: 'vue-cube'
    }
  },
  components: [
    Button,
    Text
  ],
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
      console.log(this.$cube.getCubeInfo());
      this.message = this.message.split('').reverse().join('')
    }
  }
};
</script>

<style>
.box {
  text-align: center;
}
</style>
