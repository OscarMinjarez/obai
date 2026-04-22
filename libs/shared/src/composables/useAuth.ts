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

  const API_URL = (typeof process !== 'undefined' && process.env?.VITE_API_URL) 
    ? process.env.VITE_API_URL 
    : 'http://localhost:8000/api';

  // Recuperar inmediatamente si estamos en el cliente
  if (typeof window !== 'undefined' && !token.value) {
    try {
      const storedToken = localStorage.getItem('obai_token');
      const storedUser = localStorage.getItem('obai_user');
      if (storedToken) {
        token.value = storedToken;
        if (storedUser) user.value = JSON.parse(storedUser);
      }
    } catch (e) {
      console.error('Error recovering session', e);
    }
  }
  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    // Detect device info
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : 'Server';
    const isMobile = typeof window !== 'undefined' && /mobile/i.test(userAgent);
    const deviceType = isMobile ? 'Móvil' : 'Web';

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, deviceType, userAgent })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error en login');
      
      const session = data.session || data;
      token.value = session.access_token || data.access_token;
      const refToken = session.refresh_token || data.refresh_token;
      
      user.value = data.user || data;
      
      if (typeof window !== 'undefined') {
        if (token.value) localStorage.setItem('obai_token', token.value);
        if (refToken) localStorage.setItem('obai_refresh_token', refToken);
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

  const logout = async () => {
    const refToken = typeof window !== 'undefined' ? localStorage.getItem('obai_refresh_token') : null;
    
    if (refToken) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: refToken })
        });
      } catch (e) {
        console.error('Error invalidating session on server', e);
      }
    }

    user.value = null;
    token.value = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('obai_token');
      localStorage.removeItem('obai_refresh_token');
      localStorage.removeItem('obai_user');
    }
  };

  const requestOtp = async (email: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${API_URL}/auth/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error requesting OTP');
      return data;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const verifyOtp = async (email: string, tokenVal: string, type: string = 'signup') => {
    isLoading.value = true;
    error.value = null;

    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : 'Server';
    const isMobile = typeof window !== 'undefined' && /mobile/i.test(userAgent);
    const deviceType = isMobile ? 'Móvil' : 'Web';

    try {
      const res = await fetch(`${API_URL}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: tokenVal, type, deviceType, userAgent })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error verifying OTP');
      
      const session = data.session || data;
      token.value = session.access_token || data.access_token;
      const refToken = session.refresh_token || data.refresh_token;
      
      user.value = data.user || data;
      
      if (typeof window !== 'undefined') {
        if (token.value) localStorage.setItem('obai_token', token.value);
        if (refToken) localStorage.setItem('obai_refresh_token', refToken);
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

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: () => !!token.value,
    login,
    register,
    requestOtp,
    verifyOtp,
    logout
  };
}