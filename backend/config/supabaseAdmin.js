const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.JWT_SECRET   // nouvelle variable, la clé "Secret"
);

module.exports = supabaseAdmin;