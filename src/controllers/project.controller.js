const prisma = require('../lib/prisma');

async function createProject(req, res) {
  try {
    const {
      title,
      description,
      url,
      profileId,
      technologyIds
    } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        url,
        profileId: Number(profileId),
        technologies: {
          connect: (technologyIds || []).map(id => ({
            id: Number(id)
          }))
        }
      },
      include: {
        profile: true,
        technologies: true
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao criar projeto'
    });
  }
}

async function getProjects(req, res) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        profile: true,
        technologies: true
      }
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar projetos'
    });
  }
}

module.exports = {
  createProject,
  getProjects
};