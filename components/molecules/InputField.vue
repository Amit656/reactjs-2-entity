<template>
  <div class="flex items-center gap-2 justify-center">
    <AtomsText
      tag="label"
      :for="id"
      :content="label"
    />
    <AtomsInput
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :type="inputtype"
      class=" border-2"
    />
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
  inputtype: {
    type: String,
    required: false,
    default: 'text',
  },
});
</script>

<style lang="scss" scoped>

</style>
