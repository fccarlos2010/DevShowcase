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
    const {
      technology,
      page = 1,
      limit = 5
    } = req.query;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);

    const skip = (pageNumber - 1) * limitNumber;

    const where = technology
      ? {
          technologies: {
            some: {
              name: {
                equals: technology
              }
            }
          }
        }
      : {};

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limitNumber,
        include: {
          profile: true,
          technologies: true
        }
      }),

      prisma.project.count({
        where
      })
    ]);

    res.json({
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      projects
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar projetos'
    });
  }
}


async function upvoteProject(req, res) {
  try {
    const { id } = req.params;

    const project = await prisma.project.update({
      where: {
        id: Number(id)
      },
      data: {
        upvotes: {
          increment: 1
        }
      }
    });

    res.json({
      message: 'Upvote registrado com sucesso',
      project
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao registrar upvote'
    });
  }
}


async function createFeedback(req, res) {
  try {
    const projectId = Number(req.params.id);

    const {
      rating,
      comment
    } = req.body;

    if (rating === undefined) {
      return res.status(400).json({
        error: 'A nota é obrigatória'
      });
    }

    const nota = Number(rating);

    if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
      return res.status(400).json({
        error: 'A nota deve ser um número inteiro entre 1 e 5'
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    });

    if (!project) {
      return res.status(404).json({
        error: 'Projeto não encontrado'
      });
    }

    const feedback = await prisma.feedback.create({
      data: {
        rating: nota,
        comment: comment || '',
        projectId: projectId
      }
    });

    const feedbacks = await prisma.feedback.findMany({
      where: {
        projectId: projectId
      }
    });

    const soma = feedbacks.reduce(
      (total, item) => total + item.rating,
      0
    );

    const media = soma / feedbacks.length;

    await prisma.project.update({
      where: {
        id: projectId
      },
      data: {
        averageRating: media
      }
    });

    res.status(201).json({
      message: 'Feedback criado com sucesso',
      feedback,
      averageRating: media
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao criar feedback'
    });
  }
}


module.exports = {
  createProject,
  getProjects,
  createFeedback,
  upvoteProject
};