<script setup lang="ts">
import { ref } from 'vue';
import { deselect } from '../logic/formHelpers';
import { maxLength } from '../variables/formValidation';

defineProps<{
  items: Record<string, string>;
  name: string;
  other?: boolean;
}>();

const otherInput = ref<HTMLInputElement | null>(null);

const model = defineModel({ type: String });
const otherValue = ref('');

const onDeselect = (e: Event) => deselect(e, model);

const checkOther = () => (model.value = otherValue.value);

// this only triggers when the radio button is selected, not when it's deselected
const focusInput = () => otherInput.value?.focus();
</script>

<template>
  <div class="radio-select">
    <label
      v-for="(item, id) in items"
      :for="`${name}-${id}`"
      :key="id"
    >
      <input
        v-model="model"
        :id="`${name}-${id}`"
        :name
        :value="item"
        type="radio"
        @click="onDeselect"
      />
      <span>{{ item }}</span>
    </label>
    <div
      v-if="other"
      class="radio-select-item-other"
    >
      <label
        :for="`${name}-other`"
        class="other-input-label"
      >
        <input
          v-model="model"
          :id="`${name}-other`"
          :name
          :value="otherValue"
          type="radio"
          @click="onDeselect"
          @change="focusInput"
        />
        <span>Other:</span>
      </label>
      <input
        v-model="otherValue"
        :id="`${name}-other-input`"
        :maxlength="maxLength"
        class="input-other"
        ref="otherInput"
        type="text"
        @input="checkOther"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.radio-select {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .radio-select-item-other {
    display: flex;
    gap: 0.5rem;
    align-items: baseline;

    .other-input-label {
      white-space: nowrap;
    }

    .input-other {
      flex-grow: 1;
    }
  }
}

@container (width <= 420px) {
  .radio-select {
    gap: 1rem;

    input[type='radio'] {
      margin-inline-end: 1rem;
    }
  }
}
</style>
