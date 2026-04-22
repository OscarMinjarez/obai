import { ref } from 'vue';
import { useAuth } from './useAuth';

export function useAgents() {
  const { token } = useAuth();
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  const API_URL = ((import.meta as any).env?.VITE_API_URL as string) || 'http://localhost:8000/api';

  const getMyAgent = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_URL}/agents/me`, {
        headers: { 
          'Authorization': `Bearer ${token.value}` 
        }
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (e: any) {
      error.value = e.message;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const getSuggestion = async (lang: string = 'ES') => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_URL}/agents/suggest?lang=${lang}`, {
        headers: { 
          'Authorization': `Bearer ${token.value}` 
        }
      });
      const data = await res.json();
      if (!res.ok) {
        let msg = data.message || 'Error fetching suggestion';
        try {
          const parsed = JSON.parse(msg);
          if (parsed.error?.message) msg = parsed.error.message;
        } catch { /* not json */ }
        throw new Error(msg);
      }
      return data;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const saveAgent = async (agentData: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_URL}/agents`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}` 
        },
        body: JSON.stringify(agentData)
      });
      const data = await res.json();
      if (!res.ok) {
        let msg = data.message || 'Error saving agent';
        try {
          const parsed = JSON.parse(msg);
          if (parsed.error?.message) msg = parsed.error.message;
        } catch { /* not json */ }
        throw new Error(msg);
      }
      return data;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    getMyAgent,
    getSuggestion,
    saveAgent
  };
}
