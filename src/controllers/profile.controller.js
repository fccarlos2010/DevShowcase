const prisma = require('../lib/prisma');

async function createProfile(req, res) {
  try {
    const { name, bio, email } = req.body;

    const profile = await prisma.profile.create({
      data: {
        name,
        bio,
        email
      }
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao criar perfil'
    });
  }
}

async function getProfiles(req, res) {
  try {
    const profiles = await prisma.profile.findMany();

    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar perfis'
    });
  }
}

module.exports = {
  createProfile,
  getProfiles
};