
<template>
  <span class="button">{{ text }}</span>
</template>

<script>
export default {
  name: 'Button',
  data: {},
  created () {
    console.log('Button created')
  },
  mounted () {
    console.log('Button mounted')
  }
};
</script>

<style lang="less">
@base: #ffffff;
@background-base: #00c13c;
.button {
  font-size: 12px;
  color: @base;
  text-align: center;
  background-color: @background-base;
  border-radius: 2px;
  text-decoration: none;
  padding: 4px 6px;
  cursor: pointer;
}
</style>
