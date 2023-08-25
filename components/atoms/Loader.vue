<template>
  <div
    class="flex items-center top-0 bottom-0 absolute sppiner-bg
    left-0 right-0 mr-auto z-20 justify-center"
  >
    <div>
      <div
        class="nb-spinner w-14 h-14 m-0 animate-spin
        align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      />
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.sppiner {
  color: $primary;
}
.sppiner-bg{
  background: #ffffff87;
}

.nb-spinner {
  background: #ffffff87;
  border-top: 4px solid $primary;
  border-right: 4px solid transparent;
  border-radius: 50%;
}
</style>
