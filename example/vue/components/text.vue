
<template>
  <h1>{{ title }}-{{ content }}</h1>
</template>

<script>
export default {
  name: 'Text',
  data() {
    return {
      content: '😆😆😆'
    }
  }
};
</script>

<style>
h1 {
  color: #3eaf0e;
}
</style>
