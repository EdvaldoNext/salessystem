// Configurações do seu projeto Supabase
const SB_URL = 'https://rpgjuzjnfkwjnvcuhkrr.supabase.co';
const SB_KEY = 'sb_publishable_9-lfhwy_-rMOOB2nAjEdjw_7FfBSSlQ';

// Inicializando o cliente globalmente para ser usado no app.js
const su = supabase.createClient(SB_URL, SB_KEY);