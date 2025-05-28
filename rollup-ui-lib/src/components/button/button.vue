<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
}
</script>

<style lang="scss">
// @use "../../css/theme.scss" as *;

.my-button {
  display: inline-flex;
  height: 32px;
  padding: 8px 15px;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: 4px;
}
</style>