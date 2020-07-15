const VUE_TEMPLATE = `
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

<style>
</style>
`

const TYPE_TO_FILENAME = {
  'template': 'cube.tpl',
  'script': 'cube.js',
  'styles': 'cube.css',
}

module.exports = {
  ENTRY: './cube.vue',
  OUTPUT: './src',
  VUE_TEMPLATE,
  TYPE_TO_FILENAME
};