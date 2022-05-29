<template>
  <div class="container">
    <div class="editor">
      <button @click="onClick">click</button>
    </div>
  </div>
</template>
<script>
import Test from '@/test';
import guid from '@/test/guid';
export default {
  name: 'App',
  methods: {
    onClick() {
      guid++;
      new Test().a();
    }
  },
  mounted() {}
};
</script>
