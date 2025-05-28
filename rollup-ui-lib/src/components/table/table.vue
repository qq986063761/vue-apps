<template>
  <div class="my-table">
    测试
  </div>
</template>

<script>
export default {
  name: 'MyTable',
}
</script>

<style src="./table.scss"></style>
<style lang="scss">
.my-table {
  @include ellipsis;
}
</style>