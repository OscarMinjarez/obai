<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Button } from '../components/ui/button';

const props = defineProps<{
  initialAgent?: any;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'save', agent: any): void;
  (e: 'regenerate'): void;
}>();

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
          Bot Setup
        </h1>
        <p class="text-muted-foreground">
          Customize your AI companion's personality and profile.
        </p>
      </div>

      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <label
            for="name"
            class="text-sm font-medium leading-none"
          >Name</label>
          <input 
            id="name"
            v-model="agent.name"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Agent Name"
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label
              for="gender"
              class="text-sm font-medium leading-none"
            >Tono de Género</label>
            <select 
              id="gender"
              v-model="agent.gender"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="MALE">
                Masculino
              </option>
              <option value="FEMALE">
                Femenino
              </option>
              <option value="NEUTRAL">
                Neutral
              </option>
            </select>
          </div>
          <div class="grid gap-2">
            <label
              for="maturity"
              class="text-sm font-medium leading-none"
            >Madurez</label>
            <select 
              id="maturity"
              v-model="agent.maturity"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="YOUNG">
                Joven
              </option>
              <option value="MATURE">
                Maduro
              </option>
              <option value="ELDER">
                Anciano
              </option>
            </select>
          </div>
        </div>

        <div class="grid gap-2">
          <label
            for="description"
            class="text-sm font-medium leading-none"
          >Descripción Corta</label>
          <input 
            id="description"
            v-model="agent.description"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Biografía rápida..."
          >
        </div>

        <div class="grid gap-2">
          <label
            for="personality"
            class="text-sm font-medium leading-none"
          >Personalidad</label>
          <textarea 
            id="personality"
            v-model="agent.personality"
            rows="2"
            class="flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Describe su personalidad..."
          />
        </div>

        <div class="grid gap-2">
          <label
            for="behaviors"
            class="text-sm font-medium leading-none"
          >Comportamientos (uno por línea)</label>
          <textarea 
            id="behaviors"
            :value="agent.behaviors ? agent.behaviors.join('\n') : ''"
            rows="4"
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Lista de comportamientos..."
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
          <span v-if="loading">Saving...</span>
          <span v-else>Save and Continue</span>
        </Button>
        <Button 
          variant="secondary" 
          :disabled="loading"
          @click="handleRegenerate"
        >
          Regenerate Suggestion
        </Button>
      </div>
    </div>
  </div>
</template>
