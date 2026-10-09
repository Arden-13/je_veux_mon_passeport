import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquante dans le fichier .env');
}

// Client réservé au serveur : ne jamais l'utiliser dans le frontend
const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

export default supabaseAdmin;