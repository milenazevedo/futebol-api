// Configuração da URL da API
// Em desenvolvimento: usa proxy do Vite (vite.config.ts) apontando para localhost:3000
// Em produção: usa a URL da API no Render definida em VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL || "";
export const API_BASE = `${API_URL}/api`;
