<script setup lang="ts">
import MarkdownEditor from './MarkdownEditor.vue';
import SubmitButton from './SubmitButton.vue';
import 'md-editor-v3/lib/style.css';
import PicoStyle from './PicoStyle.vue';
import { ref, computed, watch } from 'vue';
import { compressFile } from '../logic/compressImage';
import { buildMixedFormData } from '../logic/createFormData';
import playerHeadText from '../mdTemplates/playerHead.md?raw';
import medalComponentText from '../mdTemplates/medalComponent.md?raw';
import { maxLength } from '../variables/formValidation';
import CommunityMemberCard from './CommunityMemberCard.vue';
import type { EisvanaMember } from '../types/member';

const webhook = atob(import.meta.env.VITE_DISCORD_COMMUNITY_WEBHOOK ?? '');

const name = ref('');
const shortDesc = ref('');
const profilePic = ref<File | null>(null);
const profilePicUrl = ref('');
const about = ref('');
const interests = ref('');
const departments = ref('');
const contact = ref('');
const isCompressing = ref(false);

const placeholders = {
  about: 'Introduce yourself',
  interests: 'What you usually do in-game when playing',
  departments: 'What departments you are part of and what you do there',
  contact: 'How to contact you (Discord, Reddit, etc.)',
};

const form = ref<HTMLFormElement | null>(null);

const isIncomplete = computed(() => !name.value || !profilePic.value || !shortDesc.value);
const getsFullPage = computed(() => Boolean(about.value || interests.value || departments.value || contact.value));

watch(profilePic, (newVal) => {
  URL.revokeObjectURL(profilePicUrl.value);

  profilePicUrl.value = newVal ? URL.createObjectURL(newVal) : '';
});

const formData = computed(getFormData);

const pageContent = computed(() =>
  getsFullPage.value
    ? `${playerHeadText.replace('PLAYERNAME_PLACEHOLDER', name.value)}

# ${name.value}

## About Me

${about.value}

## Gameplay Interests

${interests.value}

## Departments

${departments.value}

<!-- ## Medals

${medalComponentText.trim()} -->

## Contact

${contact.value}`
    : ''
);

function getFormData(): FormData {
  // this is necessary so TS doesn't complain about a potentially undefined pic (it's technically right though)
  if (profilePic.value) {
    return buildMixedFormData(name.value, shortDesc.value, pageContent.value, profilePic.value);
  } else {
    return new FormData(); // this should never be sent, since the input validation will flag a missing pic as missing info
  }
}

async function uploadImg(e: Event) {
  const { target } = e;
  if (!(target instanceof HTMLInputElement)) return;

  const file = target.files?.[0];

  if (!file) return;

  isCompressing.value = true;
  const compressedFile = await compressFile(file);
  isCompressing.value = false;
  profilePic.value = compressedFile;
}

const text = computed(() => (isCompressing.value ? 'Compressing files...' : undefined));

function clearInputs() {
  form.value?.reset();
  name.value = '';
  shortDesc.value = '';
  profilePic.value = null;
  about.value = '';
  interests.value = '';
  departments.value = '';
  contact.value = '';
}

const member = computed<EisvanaMember>(() => ({
  avatar: profilePicUrl.value,
  name: name.value,
  desc: shortDesc.value,
}));
</script>

<template>
  <form
    @submit.prevent
    ref="form"
  >
    <PicoStyle>
      <label
        class="required"
        for="name-input"
        >Your name:</label
      >
      <input
        v-model="name"
        :maxlength="maxLength"
        id="name-input"
        type="text"
      />

      <label
        class="required"
        for="desc-input"
        >Short description of yourself (1 sentence):</label
      >
      <input
        v-model="shortDesc"
        :maxlength="maxLength"
        id="desc-input"
        type="text"
      />

      <label
        class="required"
        for="pic-input"
        >Profile picture:</label
      >
      <input
        id="pic-input"
        type="file"
        accept="image/*"
        @change="uploadImg"
      />
    </PicoStyle>

    <div>Preview:</div>
    <CommunityMemberCard
      :eisvana-members="[member]"
      size="small"
    />
    <hr />

    <h3>About Me</h3>
    <MarkdownEditor
      v-model="about"
      :placeholder="placeholders.about"
      editor-id="about"
      no-upload-img
    />

    <h3>Gameplay Interests</h3>
    <MarkdownEditor
      v-model="interests"
      :placeholder="placeholders.interests"
      editor-id="interests"
      no-upload-img
    />

    <h3>Departments</h3>
    <MarkdownEditor
      v-model="departments"
      :placeholder="placeholders.departments"
      editor-id="departments"
      no-upload-img
    />

    <h3>Contact</h3>
    <MarkdownEditor
      v-model="contact"
      :placeholder="placeholders.contact"
      editor-id="contact"
      no-upload-img
    />

    <SubmitButton
      :form-data-array="[formData]"
      :is-busy="isCompressing"
      :is-incomplete="isIncomplete"
      :text
      :webhook
      @success="clearInputs"
    />
  </form>
</template>

<style scoped lang="scss">
.required::after {
  color: red;
  content: '*';
  margin-inline-start: 0.25rem;
}
</style>
