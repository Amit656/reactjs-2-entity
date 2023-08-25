<template>
  <Multiselect
    v-model="selectedOptions"
    :options="optionsList"
    :multiple="multiple"
    :track-by="trackBy"
    :label="label"
    :placeholder="placeholder"
    :tag-placeholder="tagPlaceholder"
    :taggable="taggable"
    @tag="addTag"
    @change="$emit('change', selectedOptions)"
    @select="$emit('change', selectedOptions)"
    @remove="$emit('change', selectedOptions)"
  />
</template>

<script setup>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

const props = defineProps({
  optionsList: {
    type: Array,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  trackBy: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  tagPlaceholder: {
    type: String,
    default: null,
  },
  taggable: {
    type: Boolean,
    default: false,
  },
});

const selectedOptions = ref([]);
const localOptionsList = ref(props.optionsList);

defineEmits(['change']);

function addTag(newTag) {
  localOptionsList.value.push(newTag);
  selectedOptions.value.push(newTag);
}

</script>

<style scoped>
</style>
