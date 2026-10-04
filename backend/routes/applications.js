const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');

router.post('/', requireAuth, function (req, res) {
  // Si on arrive ici, req.user existe et est garanti valide
  console.log("Dossier créé par l'utilisateur :", req.user.id);
  res.status(201).json({ msg: "Dossier créé", userId: req.user.id });
});

module.exports = router;