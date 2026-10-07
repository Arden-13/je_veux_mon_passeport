import supabase from '../config/supabaseClient.js';

async function requireAuth(req, res, next) {
  const authHeader = req.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: "Token manquant" });
  }

  const token = authHeader.split(' ')[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ msg: "Token invalide ou expiré" });
  }

  req.user = data.user;
  next();
}

export default requireAuth;