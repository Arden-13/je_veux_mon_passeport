const supabaseAdmin = require('../config/supabaseAdmin');

async function getApplication(req, res) {
  const { data, error } = await supabaseAdmin
    .from('passport_applications')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error || !data) return res.sendStatus(404);

  if (data.user_id !== req.user.id) {
    return res.sendStatus(403);  // existe, mais pas à toi
  }

  res.json(data);
}