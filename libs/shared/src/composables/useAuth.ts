import { ref } from 'vue';

// Estado global reactivo para Vue.
// En un proyecto real con Nuxt (SSR), podrías querer usar useState() 
// o Pinia para evitar fugas de estado entre requests,
// pero localmente en CSR esto funciona perfecto para ambos proyectos (Web / Mobile).
const user = ref<any>(null);
const token = ref<string | null>(null);

export function useAuth() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  // Utilizaremos una URL base genérica. Podrías pasarla por variables de entorno.
  const API_URL = ((import.meta as any).env?.VITE_API_URL as string) || 'http://localhost:8000/api';

  // Sincronizar estado local al iniciar
  if (typeof window !== 'undefined' && !token.value) {
    const storedToken = localStorage.getItem('obai_token');
    const storedUser = localStorage.getItem('obai_user');
    if (storedToken) token.value = storedToken;
    if (storedUser) user.value = JSON.parse(storedUser);
  }

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Error en login');
      
      // Supongamos que la API devuelve { access_token, user } o similar
      // Si la API usa supabase, verifica la estructura exacta devuelta
      token.value = data.access_token || data.session?.access_token || data.token;
      user.value = data.user || data;

      if (typeof window !== 'undefined') {
        if (token.value) localStorage.setItem('obai_token', token.value);
        localStorage.setItem('obai_user', JSON.stringify(user.value));
      }
      
      return data;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error en registro');
      
      return data;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('obai_token');
      localStorage.removeItem('obai_user');
    }
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: () => !!token.value,
    login,
    register,
    logout
  };
}