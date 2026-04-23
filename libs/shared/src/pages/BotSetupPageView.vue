<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Button } from '../components/ui/button';

const props = defineProps<{
  initialAgent?: any;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'save', agent: any): void;
  (e: 'regenerate'): void;
}>();

const { t } = useI18n();

const agent = ref({
  name: '',
  description: '',
  personality: '',
  gender: 'MALE',
  maturity: 'MATURE',
  behaviors: [] as string[]
});

onMounted(() => {
  if (props.initialAgent) {
    agent.value = { ...agent.value, ...props.initialAgent };
  }
});

watch(() => props.initialAgent, (newVal) => {
  if (newVal) {
    agent.value = { ...agent.value, ...newVal };
  }
});

function handleSave() {
  emit('save', agent.value);
}

function handleRegenerate() {
  emit('regenerate');
}
</script>

<template>
  <div class="container mx-auto max-w-2xl py-10 px-4">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          {{ t('setup.title') }}
        </h1>
        <p class="text-muted-foreground">
          {{ t('setup.subtitle') }}
        </p>
      </div>

      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <label
            for="name"
            class="text-sm font-medium leading-none"
          >{{ t('setup.name_label') }}</label>
          <input 
            id="name"
            v-model="agent.name"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :placeholder="t('setup.name_placeholder')"
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label
              for="gender"
              class="text-sm font-medium leading-none"
            >{{ t('setup.gender_label') }}</label>
            <select 
              id="gender"
              v-model="agent.gender"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="MALE">
                {{ t('setup.gender_male') }}
              </option>
              <option value="FEMALE">
                {{ t('setup.gender_female') }}
              </option>
              <option value="NEUTRAL">
                {{ t('setup.gender_neutral') }}
              </option>
            </select>
          </div>
          <div class="grid gap-2">
            <label
              for="maturity"
              class="text-sm font-medium leading-none"
            >{{ t('setup.maturity_label') }}</label>
            <select 
              id="maturity"
              v-model="agent.maturity"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="YOUNG">
                {{ t('setup.maturity_young') }}
              </option>
              <option value="MATURE">
                {{ t('setup.maturity_mature') }}
              </option>
              <option value="ELDER">
                {{ t('setup.maturity_elder') }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid gap-2">
          <label
            for="description"
            class="text-sm font-medium leading-none"
          >{{ t('setup.desc_label') }}</label>
          <input 
            id="description"
            v-model="agent.description"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :placeholder="t('setup.desc_placeholder')"
          >
        </div>

        <div class="grid gap-2">
          <label
            for="personality"
            class="text-sm font-medium leading-none"
          >{{ t('setup.personality_label') }}</label>
          <textarea 
            id="personality"
            v-model="agent.personality"
            rows="2"
            class="flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :placeholder="t('setup.personality_placeholder')"
          />
        </div>

        <div class="grid gap-2">
          <label
            for="behaviors"
            class="text-sm font-medium leading-none"
          >{{ t('setup.behaviors_label') }}</label>
          <textarea 
            id="behaviors"
            :value="agent.behaviors ? agent.behaviors.join('\n') : ''"
            rows="4"
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :placeholder="t('setup.behaviors_placeholder')"
            @input="e => agent.behaviors = (e.target as HTMLTextAreaElement).value.split('\n')"
          />
        </div>
      </div>

      <div class="flex items-center gap-4">
        <Button 
          class="flex-1"
          :disabled="loading"
          @click="handleSave"
        >
          <span v-if="loading">{{ t('common.loading') }}</span>
          <span v-else>{{ t('setup.save_button') }}</span>
        </Button>
        <Button 
          variant="secondary" 
          :disabled="loading"
          @click="handleRegenerate"
        >
          {{ t('setup.regenerate_button') }}
        </Button>
      </div>
    </div>
  </div>
</template>
