<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import SubmitButton from './SubmitButton.vue';
import { buildContactFormData } from '../logic/createFormData';
import PicoStyle from './PicoStyle.vue';
import CharacterCounterTextarea from './CharacterCounterTextarea.vue';
import { maxLength } from '../variables/formValidation';

const webhook = atob(import.meta.env.VITE_DISCORD_MESSAGE_WEBHOOK ?? '');

const form = ref<HTMLFormElement | null>(null);

const contact = ref('');
const requestType = ref('');
const requestText = ref('');

watchEffect(() => (requestText.value = requestText.value?.slice(0, maxLength)));

const isIncomplete = computed(() => !contact.value || !requestType.value || !requestText.value);

const formData = computed(() => buildContactFormData({ requestText, requestType, contact }));

const clearData = () => form.value?.reset();
</script>

<template>
  <PicoStyle>
    <form
      ref="form"
      @submit.prevent
    >
      <div>
        <label>Request Type:</label>
        <select
          v-model="requestType"
          class="select"
        >
          <option value="Message for the Bridge">General Message to the Bridge</option>
          <option value="Colony Suggestion">Colony Suggestion</option>
          <option value="Wiki Scholars Application">Wiki Scholars Application</option>
          <option value="Builder Collective Application">Builder Collective Application</option>
          <option value="Mentor Application">Mentor Application</option>
          <option value="Manager Application">Manager Application</option>
        </select>
      </div>
      <div>
        <label for="contactName">Your Username (for contact):</label>
        <input
          v-model="contact"
          :maxlength="maxLength"
          id="contactName"
          type="text"
        />
      </div>
      <div>
        <label for="requestText">Your Request:</label>
        <CharacterCounterTextarea
          v-model="requestText"
          textarea-id="requestText"
        />
      </div>
      <SubmitButton
        :webhook
        :form-data-array="[formData]"
        :is-incomplete="isIncomplete"
        @success="clearData"
      />
    </form>
  </PicoStyle>
</template>
